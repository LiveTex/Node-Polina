


/**
 * Redis client.
 *
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 *
 * @constructor
 * @extends {polina.Connection}
 * @implements {polina.redis.IClient}
 */
polina.redis.Client = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);
};

util.inherits(polina.redis.Client, polina.Connection);


/**
 * @inheritDoc
 */
polina.redis.Client.prototype._getDestroyPayload = function() {
  return polina.redis.resp.encodeCommand(['QUIT']);
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__command = function(args, complete, cancel) {
  this._send(polina.redis.resp.encodeCommand(args),
      polina.redis.resp.PACKET_HANDLER(complete, cancel));
};


// ---- KEYS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.del = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.keys = function(pattern, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.persist = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scan =
    function(cursor, complete, cancel, opt_options) {};


// ---- STRINGS ----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.decr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.get = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.getset =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.mget = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.set = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.setnx =
    function(key, value, complete, cancel) {};


// ---- HASHES -----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hdel = function(key, hkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hget = function(key, hkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hgetall = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hset =
    function(key, hkey, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hscan =
    function(key, cursor, complete, cancel, opt_options) {};


// ---- LISTS ------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.blpop =
    function(keys, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.brpop =
    function(keys, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lindex =
    function(key, index, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.llen = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpop = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpush =
    function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpushx =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lrange =
    function(key, start, stop, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lrem =
    function(key, count, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lset =
    function(key, index, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.ltrim =
    function(key, start, stop, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpop = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpoplpush =
    function(source, destination, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpush =
    function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpushx =
    function(key, value, complete, cancel) {};


// ---- SETS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sadd = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scard = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sinter = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sismember =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.smembers = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.srem = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sscan =
    function(key, cursor, complete, cancel, opt_options) {};


// ---- SCRIPTING --------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.evalsha =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scriptLoad = function(name, script) {};


// -----------------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.destroy = function() {};
