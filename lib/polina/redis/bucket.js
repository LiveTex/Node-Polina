


/**
 * Redis Bucket.
 *
 * @param {number} size Bucket size.
 * 
 * @constructor
 * @implements {polina.redis.IClient}
 */
polina.redis.Bucket = function(size) {};


// ---- KEYS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.del = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.keys = function(pattern, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.persist = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.scan =
    function(cursor, complete, cancel, opt_options) {};


// ---- STRINGS ----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.decr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.get = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.getset =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.mget = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.set = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.setnx =
    function(key, value, complete, cancel) {};


// ---- HASHES -----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hdel = function(key, hkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hget = function(key, hkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hgetall = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hset =
    function(key, hkey, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hscan =
    function(key, cursor, complete, cancel, opt_options) {};


// ---- LISTS ------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.blpop =
    function(keys, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.brpop =
    function(keys, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lindex =
    function(key, index, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.llen = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpop = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpush =
    function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpushx =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lrange =
    function(key, start, stop, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lrem =
    function(key, count, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lset =
    function(key, index, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.ltrim =
    function(key, start, stop, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpop = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpoplpush =
    function(source, destination, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpush =
    function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpushx =
    function(key, value, complete, cancel) {};


// ---- SETS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sadd = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.scard = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sinter = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sismember =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.smembers = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.srem = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sscan =
    function(key, cursor, complete, cancel, opt_options) {};


// ---- SCRIPTING --------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.evalsha =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.scriptLoad = function(name, script) {};


// -----------------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.destroy = function() {};
