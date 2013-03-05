


/**
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} count Количество соединений.
 * @param {number} port Порт.
 * @param {string=} opt_host Хост.
 */
polina.redis.ConnectionsBundle = function(count, port, opt_host) {
  var self = this;

  /**
   * @type {!polina.redis.Client}
   */
  this.__currentClient = new polina.redis.Client(port, opt_host);

  /**
   * @type {!Array.<!polina.redis.Client>}
   */
  this.__clients = [this.__currentClient];

  /**
   * @type {number}
   */
  this.__robin = 0;

  /**
   * @type {boolean}
   */
  this.__updateRequested = false;

  /**
   * @type {function()}
   */
  this.__updateClient = function() {
    self.__robin += 1;
    self.__updateRequested = false;
    self.__currentClient = self.__clients[self.__robin % self.__clients.length];
  };

  var i = 1;
  while (i < count) {
    this.__clients.push(new polina.redis.Client(port, opt_host));

    i += 1;
  }
};


/**
 * @param {string} key Ключ.
 * @param {string} value Значение.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.ConnectionsBundle.prototype.set =
    function(key, value, complete, cancel) {
      if (value.length > 0) {
        this.__currentClient.set(key, value, complete, cancel);
        this.__updateCurrentClient();
      } else {
        this.del(key, complete, cancel);
      }
    };


/**
 * @param {string} key Ключ.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.ConnectionsBundle.prototype.get = function(key, complete, cancel) {
  this.__currentClient.get(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 *
 * @param {string} key Ключ.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.ConnectionsBundle.prototype.del = function(key, complete, cancel) {
  this.__currentClient.del(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @param {string} key Ключ.
 * @param {string|!Array.<string>} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.ConnectionsBundle.prototype.sadd =
    function(key, value, complete, cancel) {
      this.__currentClient.sadd(key, value, complete, cancel);
      this.__updateCurrentClient();
    };


/**
 * @param {string} key Ключ.
 * @param {string|!Array.<string>} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.ConnectionsBundle.prototype.srem =
    function(key, value, complete, cancel) {
      this.__currentClient.srem(key, value, complete, cancel);
      this.__updateCurrentClient();
    };


/**
 * @param {string} key Ключ.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.ConnectionsBundle.prototype.smembers =
    function(key, complete, cancel) {
      this.__currentClient.smembers(key, complete, cancel);
      this.__updateCurrentClient();
    };


/**
 *
 */
polina.redis.ConnectionsBundle.prototype.__updateCurrentClient = function() {
  if (!this.__updateRequested) {
    this.__updateRequested = true;
    process.nextTick(this.__updateClient);
  }
};
