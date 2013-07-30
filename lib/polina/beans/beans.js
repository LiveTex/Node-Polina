

/**
 * @type {number}
 */
polina.beans.USER_TTL = 60000;


/**
 * @param {!polina.beans.Tube} tube Туба.
 * @return {string} Сериализованная туба.
 */
polina.beans.serializeTube = function(tube) {
  return tube.getHost() + '/' +
      tube.getPort() + '/' + tube.getName();
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
    handler(data);

    watcher.delete(jid, watch);
  }

  function watch() {
    watcher.reserve(handle);
  }

  watch();
};


/**
 * @param {string|!polina.beans.Tube} tube Туба.
 * @param {string} data Данные.
 * @param {function(string)=} opt_callback Обработчик результата.
 */
polina.beans.put = function(tube, data, opt_callback) {
  if (typeof tube === 'string') {
    polina.beans.__putSerialized(
        polina.beans.reconstructTube(tube), tube, data, opt_callback);
  } else {
    polina.beans.__putSerialized(
        tube, polina.beans.serializeTube(tube), data, opt_callback);
  }
};


/**
 * @param {!polina.beans.Tube} tube Туба.
 * @param {string} id Туба.
 * @param {string} data Данные.
 * @param {function(string)=} opt_callback Обработчик результата.
 */
polina.beans.__putSerialized = function(tube, id, data, opt_callback) {
  if (polina.beans.__usersPool[id] === undefined) {
    polina.beans.__usersPool[id] = new polina.beans.User(tube);
  }

  polina.beans.__usersPool[id].put(0, 0, 30, data, opt_callback);
  polina.beans.__usersLastPutTime[id] = Date.now();

  if (polina.beans.__ticker === -1) {
    polina.beans.__ticker =
        setInterval(polina.beans.__checkTubes, polina.beans.USER_TTL);
  }
};


/**
 * Clear unused.
 */
polina.beans.__checkTubes = function() {
  var now = Date.now();
  var count = 0;

  for (var id in polina.beans.__usersPool) {
    if (now - polina.beans.__usersLastPutTime[id] > polina.beans.USER_TTL) {
      polina.beans.__usersPool[id].destroy();

      delete polina.beans.__usersPool[id];
      delete polina.beans.__usersLastPutTime[id];
    }

    count += 1;
  }

  if (count === 0) {
    clearInterval(polina.beans.__ticker);
    polina.beans.__ticker = -1;
  }
};


/**
 * @type {!Object.<string, !polina.beans.User>}
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
