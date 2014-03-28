


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
polina.redis.Bundle.prototype.setnx = function(key, value, complete, cancel) {
  this.__currentClient.setnx(key, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.getset = function(key, value, complete, cancel) {
  this.__currentClient.getset(key, value, complete, cancel);
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
polina.redis.Bundle.prototype.sinter = function(keys, complete, cancel) {
  this.__currentClient.sinter(keys, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.scard = function(key, complete, cancel) {
  this.__currentClient.scard(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hset =
    function(key, hashkey, value, complete, cancel) {
  this.__currentClient.hset(key, hashkey, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hget =
    function(key, hashkey, complete, cancel) {
  this.__currentClient.hget(key, hashkey, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hdel =
    function(key, hashkey, complete, cancel) {
  this.__currentClient.hdel(key, hashkey, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hgetall =
    function(key, complete, cancel) {
  this.__currentClient.hgetall(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.execInt =
    function(sha, args, complete, cancel) {
  this.__currentClient.execInt(sha, args, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.execString =
    function(sha, args, complete, cancel) {
  this.__currentClient.execString(sha, args, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.execArray =
    function(sha, args, complete, cancel) {
  this.__currentClient.execArray(sha, args, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.registerScript = function(name, script) {
  var i = 0,
      l = this.__clients.length;

  while (i < l) {
    this.__clients[i].registerScript(name, script);

    i += 1;
  }
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


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.blpop =
    function(keys, timeout, complete, cancel) {

  this.__currentClient.blpop(keys, timeout, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.brpop =
    function(keys, timeout, complete, cancel) {

  this.__currentClient.brpop(keys, timeout, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {

  this.__currentClient.brpoplpush(source, destination, timeout,
      complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lindex = function(key, index, complete, cancel) {

  this.__currentClient.lindex(key, index, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {
  this.__currentClient.linsert(key, position, pivot, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.llen = function(key, complete, cancel) {
  this.__currentClient.llen(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lpop = function(key, complete, cancel) {
  this.__currentClient.lpop(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lpush = function(key, values, complete, cancel) {
  this.__currentClient.lpush(key, values, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lpushx = function(key, value, complete, cancel) {
  this.__currentClient.lpushx(key, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lrange =
    function(key, start, stop, complete, cancel) {
  this.__currentClient.lrange(key, start, stop, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lrem =
    function(key, count, value, complete, cancel) {
  this.__currentClient.lrem(key, count, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lset =
    function(key, index, value, complete, cancel) {
  this.__currentClient.lset(key, index, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.ltrim =
    function(key, start, stop, complete, cancel) {
  this.__currentClient.ltrim(key, start, stop, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpop = function(key, complete, cancel) {
  this.__currentClient.rpop(key, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpoplpush =
    function(source, destination, complete, cancel) {
  this.__currentClient.rpoplpush(source, destination, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpush = function(key, values, complete, cancel) {
  this.__currentClient.rpush(key, values, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpushx = function(key, value, complete, cancel) {
  this.__currentClient.rpushx(key, value, complete, cancel);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.scan = function(cursor, complete, cancel,
                                              opt_options) {
  this.__currentClient.scan(cursor, complete, cancel, opt_options);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sscan = function(key, cursor, complete, cancel,
                                              opt_options) {
  this.__currentClient.sscan(key, cursor, complete, cancel, opt_options);
  this.__updateCurrentClient();
};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hscan = function(key, cursor, complete, cancel,
                                              opt_options) {
  this.__currentClient.hscan(key, cursor, complete, cancel, opt_options);
  this.__updateCurrentClient();
};
