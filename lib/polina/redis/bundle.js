


/**
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} count Количество соединений.
 * @param {number} port Порт.
 * @param {string=} opt_host Хост.
 */
polina.redis.Bundle = function(count, port, opt_host) {
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
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.redis.Bundle.prototype.registerFallback = function(port, opt_host) {
  var i = 0,
      l = this.__clients.length;

  while (i < l) {
    this.__clients[i].registerFallback(port, opt_host);

    i += 1;
  }
};


/**
 *
 */
polina.redis.Bundle.prototype.__updateCurrentClient = function() {
  if (!this.__updateRequested) {
    this.__updateRequested = true;
    process.nextTick(this.__updateClient);
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.set =
    function(key, value, complete, cancel) {
  this.__currentClient.set(key, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.incrby =
    function(key, value, complete, cancel) {
  this.__currentClient.incrby(key, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.setex =
    function(key, seconds, value, complete, cancel) {
  this.__currentClient.setex(key, seconds, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.get = function(key, complete, cancel) {
  this.__currentClient.get(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.del = function(key, complete, cancel) {
  this.__currentClient.del(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sadd =
    function(key, value, complete, cancel) {
  this.__currentClient.sadd(key, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.srem =
    function(key, value, complete, cancel) {
  this.__currentClient.srem(key, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sismember =
    function(key, value, complete, cancel) {
  this.__currentClient.sismember(key, value, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.smembers =
    function(key, complete, cancel) {
  this.__currentClient.smembers(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.destroy = function() {
  var i = 0,
      l = this.__clients.length;

  while (i < l) {
    this.__clients[i].destroy();

    i += 1;
  }
};
