


/**
 * A bundle of connections.
 *
 * @param {number} count Connection count.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 *
 * @constructor
 * @implements {polina.redis.IClient}
 */
polina.redis.Bundle = function(count, port, opt_host) {
};


// ---- KEYS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.del = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.keys = function(pattern, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.persist = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.scan =
    function(cursor, complete, cancel, opt_options) {};


// ---- STRINGS ----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.decr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.get = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.getset =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.incr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.mget = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.set = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.setnx =
    function(key, value, complete, cancel) {};


// ---- HASHES -----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hdel = function(key, hkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hget = function(key, hkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hgetall = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hset =
    function(key, hkey, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hscan =
    function(key, cursor, complete, cancel, opt_options) {};


// ---- LISTS ------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.blpop =
    function(keys, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.brpop =
    function(keys, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lindex =
    function(key, index, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.llen = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lpop = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lpush =
    function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lpushx =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lrange =
    function(key, start, stop, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lrem =
    function(key, count, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lset =
    function(key, index, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.ltrim =
    function(key, start, stop, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpop = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpoplpush =
    function(source, destination, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpush =
    function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpushx =
    function(key, value, complete, cancel) {};


// ---- SETS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sadd = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.scard = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sinter = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sismember =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.smembers = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.srem = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sscan =
    function(key, cursor, complete, cancel, opt_options) {};


// ---- SCRIPTING --------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.evalsha =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.scriptLoad = function(name, script) {};


// -----------------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.destroy = function() {};
