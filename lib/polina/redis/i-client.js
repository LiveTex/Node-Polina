


/**
 * @interface
 */
polina.redis.IClient = function() {};


/**
 * Sets the string value of a key.
 *
 * @param {string} key A key of set value.
 * @param {string} value Value to be set.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.set =
    function(key, value, complete, cancel) {};


/**
 * Increments the integer value of a key by the given amount.
 *
 * @param {string} key A key of a value to be incremented.
 * @param {number} value Increment value.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * Increments the integer value of a key by one.
 *
 * @param {string} key A key of a value to be incremented..
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.incr =
    function(key, complete, cancel) {};


/**
 * Decrements the integer value of a key by one.
 *
 * @param {string} key A key of a value to be decremented.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.decr =
    function(key, complete, cancel) {};


/**
 * Sets the value and expiration of a key.
 *
 * @param {string} key A key of set value.
 * @param {number} seconds Duration of key's life.
 * @param {string} value Value to be set.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * Sets a timeout on key.
 *
 * @param {string} key A key.
 * @param {number} seconds Duration of key's life.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * Gets the value of a key.
 *
 * @param {string} key A key.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.get = function(key, complete, cancel) {};


/**
 * Gets the values of all the given keys
 *
 * @param {!Array.<string>} keys Keys of values to be get.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.mget = function(keys, complete, cancel) {};


/**
 * Finds all keys matching the given pattern.
 *
 * @param {string} pattern Pattern of keys.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.keys = function(pattern, complete, cancel) {};


/**
 * Deletes kleys.
 *
 * @param {string} keys Keys to be deleted.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.del = function(keys, complete, cancel) {};


/**
 * Adds one or more values to a set.
 *
 * @param {string} key Key of values.
 * @param {string|!Array.<string>} value Values to be set to a key.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.sadd =
    function(key, value, complete, cancel) {};


/**
 * Removes the specified values from the set stored at key.
 *
 * @param {string} key A key of values to be removed.
 * @param {string|!Array.<string>} value Values of a key to be removed.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.srem =
    function(key, value, complete, cancel) {};


/**
 * Checks if value is a value of the set stored at key.
 *
 * @param {string} key Key of a set.
 * @param {string} value Value to check.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.sismember =
    function(key, value, complete, cancel) {};


/**
 * Extracts all the values of the set stored at key.
 *
 * @param {string} key Key of a set.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.smembers =
    function(key, complete, cancel) {};


/**
 * @param {string} key Key.
 * @param {string} hashkey Hash key.
 * @param {string} value Value.
 * @param {function()} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hset =
    function(key, hashkey, value, complete, cancel) {};


/**
 * @param {string} key Key.
 * @param {string} hashkey Hash key.
 * @param {function()} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hget =
    function(key, hashkey, complete, cancel) {};


/**
 * @param {string} key Key.
 * @param {string} hashkey Hash key.
 * @param {function()} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hdel =
    function(key, hashkey, complete, cancel) {};


/**
 * @param {string} key Key.
 * @param {function()} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hgetall =
    function(key, complete, cancel) {};


/**
 * Load a script into the scripts cache, without executing it.
 *
 * @param {string} lua Lua script.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.scriptLoad = function(lua, complete, cancel) {};


/**
 * @param {string} sha SHA1 digest of a script.
 * @param {Array.<string>} args Script's arguments.
 * @param {function(number)} complete
 *    Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.evalshaInt =
    function(sha, args, complete, cancel) {};


/**
 *
 * @param {string} sha SHA1 digest of a script.
 * @param {Array.<string>} args Script's arguments.
 * @param {function(string)} complete
 *    Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.evalshaString =
    function(sha, args, complete, cancel) {};


/**
 *
 * @param {string} sha SHA1 digest of a script.
 * @param {Array.<string>} args Script's arguments.
 * @param {function(!Array.<string>)} complete
 *    Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.evalshaArray =
    function(sha, args, complete, cancel) {};


/**
 * Destroys a client.
 */
polina.redis.IClient.prototype.destroy = function() {};
