

/**
 * @type {number}
 */
polina.beans.USER_TTL = 10000;


/**
 * @type {number}
 */
polina.beans.MAX_USER_POOL_SIZE = 5;


/**
 * @type {number}
 */
polina.beans.TASK_TTR = 30;


/**
 * @param {!polina.beans.Tube} tube Туба.
 * @return {string} Сериализованная туба.
 */
polina.beans.serializeTube = function(tube) {
  return tube.getId();
};


/**
 * @param {string} string Сериализованная туба.
 * @return {!polina.beans.Tube} Туба.
 */
polina.beans.reconstructTube = function(string) {
  var hostIndex = string.indexOf('/');
  var host = string.substring(0, hostIndex);

  hostIndex += 1;

  var portIndex = string.indexOf('/', hostIndex);
  var port = Number(string.substring(hostIndex, portIndex));

  return new polina.beans.Tube(string.substring(portIndex + 1), port, host);
};


/**
 * @param {!polina.beans.Tube} tube Туба.
 * @param {function(string)} handler Обработчик.
 */
polina.beans.unsafeWatch = function(tube, handler) {
  var watcher = new polina.beans.Watcher(tube);

  function handle(jid, data) {
    watcher.delete(jid, watch);

    handler(data);
  }

  function watch() {
    watcher.reserve(handle);
  }

  watch();
};


/**
 * @param {string|!polina.beans.Tube} tubeOrString Туба.
 * @param {function(boolean)} complete Обработчик блокировки.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.beans.hasWatchers = function(tubeOrString, complete, cancel) {
  var tube = tubeOrString;
  if (typeof tube === 'string') {
    tube = polina.beans.reconstructTube(tube);
  }

  var user = new polina.beans.User(tube);
  user.statsTube(function(stats) {
    user.destroy();

    complete(stats['current-watching'] !== '0');
  });
};


/**
 * @param {string} id Идентификатор трубы.
 * @param {!Array.<!polina.beans.Tube>} tubes Трубы.
 */
polina.beans.initUsersPool = function(id, tubes) {
  var users = [];

  var i = 0,
      l = tubes.length;

  while (i < l) {
    users.push(new polina.beans.User(tubes[i]));
    i += 1;
  }

  polina.beans.__usersPool[id] = users;
};


/**
 * @param {string|!polina.beans.Tube} tubeOrString Туба.
 * @param {string} data Данные.
 * @param {function(string)=} opt_callback Обработчик результата.
 */
polina.beans.put = function(tubeOrString, data, opt_callback) {
  if (typeof tubeOrString === 'string') {
    polina.beans.__putSerialized(polina.beans.reconstructTube(tubeOrString),
        tubeOrString, data, opt_callback);
  } else {
    polina.beans.__putSerialized(tubeOrString,
        polina.beans.serializeTube(tubeOrString), data, opt_callback);
  }
};


/**
 * @param {!polina.beans.Tube} tube Туба.
 * @param {string} id Туба.
 * @param {string} data Данные.
 * @param {function(string)=} opt_callback Обработчик результата.
 */
polina.beans.__putSerialized = function(tube, id, data, opt_callback) {
  polina.beans.__selectUser(id, tube).put(0, 0,
      polina.beans.TASK_TTR, data, opt_callback);

  polina.beans.__usersLastPutTime[id] = Date.now();

  if (polina.beans.__ticker === -1) {
    polina.beans.__ticker =
        setTimeout(polina.beans.__clearUnusedTubes, polina.beans.USER_TTL);
  }
};


/**
 * @param {string} id Туба.
 * @param {!polina.beans.Tube} tube Туба.
 * @return {!polina.beans.User}
 */
polina.beans.__selectUser = function(id, tube) {
  if (polina.beans.__usersPool[id] === undefined) {
    polina.beans.__usersPool[id] = [new polina.beans.User(tube)];
  }

  var pool = polina.beans.__usersPool[id];
  var i = 0,
      l = pool.length;

  while (i < l) {
    if (pool[i].isRunning()) {
      i += 1;
    } else {
      return pool[i];
    }
  }

  if (l < polina.beans.MAX_USER_POOL_SIZE) {
    pool.push(new polina.beans.User(tube));

    return pool[l];
  }

  return pool[Math.random() * l | 0];
};


/**
 * Clear unused.
 */
polina.beans.__clearUnusedTubes = function() {
  var now = Date.now();
  var count = 0;

  for (var id in polina.beans.__usersPool) {
    if (now - polina.beans.__usersLastPutTime[id] > polina.beans.USER_TTL) {
      var pool = polina.beans.__usersPool[id];
      var i = pool.length - 1;

      while (i >= 0) {
        if (!pool[i].isRunning()) {
          pool[i].destroy();
          pool.splice(i, 1);
        }

        i -= 1;
      }

      if (pool.length === 0) {
        delete polina.beans.__usersPool[id];
        delete polina.beans.__usersLastPutTime[id];
      }
    }

    count += 1;
  }

  if (count === 0) {
    polina.beans.__ticker = -1;
  } else {
    polina.beans.__ticker =
        setTimeout(polina.beans.__clearUnusedTubes, polina.beans.USER_TTL);
  }
};


/**
 * @type {!Object.<string, !Array.<!polina.beans.User>>}
 */
polina.beans.__usersPool = {};


/**
 * @type {!Object.<string, number>}
 */
polina.beans.__usersLastPutTime = {};


/**
 * @type {number}
 */
polina.beans.__ticker = -1;
