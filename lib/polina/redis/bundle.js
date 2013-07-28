


/**
 * A bundle of buckets.
 *
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} count Connection count.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
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
 * Registers a fallback destination.
 *
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
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
polina.redis.Bundle.prototype.incr = function(key, complete, cancel) {
  this.__currentClient.incr(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.decr = function(key, complete, cancel) {
  this.__currentClient.decr(key, complete, cancel);
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
polina.redis.Bundle.prototype.expire =
    function(key, seconds, complete, cancel) {
  this.__currentClient.expire(key, seconds, complete, cancel);
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
 * @inheritDoc.
 */
polina.redis.Bundle.prototype.mget = function(keys, complete, cancel) {
  this.__currentClient.mget(keys, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc.
 */
polina.redis.Bundle.prototype.keys = function(pattern, complete, cancel) {
  this.__currentClient.keys(pattern, complete, cancel);
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
  this.__updateCurrentClient();
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
polina.redis.Bundle.prototype.scriptLoad = function(lua, complete, cancel) {
  this.__currentClient.scriptLoad(lua, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.evalshaInt =
    function(sha, args, complete, cancel) {
  this.__currentClient.evalshaInt(sha, args, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.evalshaString =
    function(sha, args, complete, cancel) {
  this.__currentClient.evalshaString(sha, args, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.evalshaArray =
    function(sha, args, complete, cancel) {
  this.__currentClient.evalshaArray(sha, args, complete, cancel);
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
