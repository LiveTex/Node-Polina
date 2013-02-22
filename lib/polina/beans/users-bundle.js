


/**
 * @constructor
 * @param {string} tube Труба наблюдения.
 * @param {!Array.<number>} ports Порт подключения.
 * @param {!Array.<string>=} opt_hosts Хост для подключения.
 */
polina.beans.UsersBundle = function(tube, ports, opt_hosts) {
  var self = this;
  var hosts = opt_hosts || [];

  /**
   * @type {number}
   */
  this.__robinCounter = 0;

  /**
   * @type {boolean}
   */
  this.__robinRequested = false;

  /**
   * @type {!Array.<!polina.beans.User>}
   */
  this.__users = new Array(ports.length);

  /**
   *
   */
  this.__incrementRobin = function() {
    self.__robinCounter += 1;
    self.__robinRequested = false;
  };

  var i = 0,
      l = this.__users.length;

  while (i < l) {
    this.__users[i] = new polina.beans.User(tube, ports[i], hosts[i]);

    i += 1;
  }
};


/**
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {?function(Error, string=)=} opt_callback Обработчик результата.
 */
polina.beans.UsersBundle.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {
  var user = this.__users[this.__robinCounter % this.__users.length] || null;
  if (user !== null) {
    user.put(priority, timeout, execTime, data, opt_callback);
  }

  if (!this.__robinRequested) {
    this.__robinRequested = true;
    process.nextTick(this.__incrementRobin);
  }
};
