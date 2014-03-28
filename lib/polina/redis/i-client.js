


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
 * Sets the value if the value isn`t exists.
 *
 * @param {string} key A key of set value.
 * @param {string} value Value to be set.
 * @param {function(number)} complete Result handler, 1 if value set.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.setnx =
    function(key, value, complete, cancel) {};


/**
 * Sets the value and return previous.
 *
 * @param {string} key A key of set value.
 * @param {string} value Value to be set.
 * @param {function(string)} complete Result handler, 1 if value set.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.getset =
    function(key, value, complete, cancel) {};


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
polina.redis.IClient.prototype.smembers = function(key, complete, cancel) {};


/**
 * Sets hash fields to values.
 *
 * @param {!Array.<string>} keys Ключи.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.sinter = function(keys, complete, cancel) {};


/**
 * @param {string} key Ключ.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.scard = function(key, complete, cancel) {};


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
 * Gets the value of a hash field.
 *
 * @param {string} key Key.
 * @param {string} hashkey Hash key.
 * @param {function(!Array)} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hget =
    function(key, hashkey, complete, cancel) {};


/**
 * Deletes one or more hash fields.
 *
 * @param {string} key Key.
 * @param {string} hashkey Hash key.
 * @param {function()} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hdel =
    function(key, hashkey, complete, cancel) {};


/**
 * Gets all the fields and values in a hash.
 *
 * @param {string} key Key.
 * @param {function(!Array.<string>)} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hgetall =
    function(key, complete, cancel) {};


/**
 * Executes script, which returns a number.
 *
 * @param {string} scriptName Registered script name.
 * @param {!Array.<string>} args Script's arguments.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.execInt =
    function(scriptName, args, complete, cancel) {};


/**
 * Executes script, which returns a string.
 *
 * @param {string} scriptName Registered script name.
 * @param {!Array.<string>} args Script's arguments.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.execString =
    function(scriptName, args, complete, cancel) {};


/**
 * Executes script, which returns an array.
 *
 * @param {string} scriptName Registered script name.
 * @param {!Array.<string>} args Script's arguments.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.execArray =
    function(scriptName, args, complete, cancel) {};


/**
 * Registers a script.
 *
 * @param {string} name Script name.
 * @param {string} script Lua script.
 */
polina.redis.IClient.prototype.registerScript = function(name, script) {};


/**
 * Destroys a client.
 */
polina.redis.IClient.prototype.destroy = function() {};


/**
 * A blocking list pop primitive.
 * Removes and gets the first element in a list,
 * or blocks until one is available.
 *
 * @param {Array.<string>} keys Lists' names to check whether they are empty.
 * @param {number} timeout The maximum number of seconds to block.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.blpop =
    function(keys, timeout, complete, cancel) {};


/**
 * A blocking list pop primitive.
 * Removes and gets the last element in a list,
 * or blocks until one is available.
 *
 * @param {Array.<string>} keys Lists' names to check whether they are empty.
 * @param {number} timeout The maximum number of seconds to block.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.brpop =
    function(keys, timeout, complete, cancel) {};


/**
 * The blocking variant of RPOPLPUSH.
 * Pops a value from a list, pushs it to another list and
 * returns it;
 * or
 * blocks until one's available.
 *
 * @param {string} source Name of the list, from which to pop a value.
 * @param {string} destination Name of the list, to which to push a value.
 * @param {number} timeout The maximum number of seconds to block.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {};


/**
 * Gets an element from a list by its index.
 *
 * @param {string} key Name of the list.
 * @param {number} index Position of an element.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.lindex =
    function(key, index, complete, cancel) {};


/**
 * Gets an element from a list by its index.
 *
 * @param {string} key Name of the list.
 * @param {string} position Where to insert the value. 'BEFORE' or 'AFTER'.
 * @param {string} pivot Name of an element, relating to which the value will
 * be inserted.
 * @param {string} value Value to insert to list.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {};


/**
 * Gets the length of a list.
 *
 * @param {string} key Name of the list.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.llen = function(key, complete, cancel) {};


/**
 * Removes and returns the first element of the list stored at key.
 *
 * @param {string} key Name of the list.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.lpop = function(key, complete, cancel) {};


/**
 * Inserts all the specified values at the head of the list stored at key.
 *
 * @param {string} key Name of the list.
 * @param {Array.<string>} values Values to insert.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.lpush =
    function(key, values, complete, cancel) {};


/**
 * Inserts value at the head of the list stored at key,
 * only if key already exists and holds a list.
 *
 * @param {string} key Name of the list.
 * @param {string} value Value to insert.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.lpushx =
    function(key, value, complete, cancel) {};


/**
 * Gets a range of elements from a list.
 *
 * @param {string} key Name of the list.
 * @param {number} start Start index.
 * @param {number} stop End index.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.lrange =
    function(key, start, stop, complete, cancel) {};


/**
 * Removes the first count occurrences of elements equal to value from the list
 * stored at key.
 *
 * @param {string} key Name of the list.
 * @param {number} count Number of occurrences.
 * @param {string} value Value to remove.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.lrem =
    function(key, count, value, complete, cancel) {};


/**
 * Sets the list element at index to value.
 *
 * @param {string} key Name of the list.
 * @param {number} index Position from which to set a value.
 * @param {string} value Value to set.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.lset =
    function(key, index, value, complete, cancel) {};


/**
 * Trims a list to the specified range.
 *
 * @param {string} key Name of the list.
 * @param {number} start Start index.
 * @param {number} stop End index.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.ltrim =
    function(key, start, stop, complete, cancel) {};


/**
 * Removes and returns the last element of the list stored at key.
 *
 * @param {string} key Name of the list.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.rpop = function(key, complete, cancel) {};


/**
 * Atomically returns and removes the last element (tail) of the list stored
 * at source, and pushes the element at the first element (head) of the list
 * stored at destination.
 *
 * @param {string} source Name of the list, from which to get a value.
 * @param {string} destination Name of the list, to which to push a value.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.rpoplpush =
    function(source, destination, complete, cancel) {};


/**
 * Appends one or multiple values to a list.
 *
 * @param {string} key Name of the list.
 * @param {Array.<string>} values Values to insert.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.rpush =
    function(key, values, complete, cancel) {};


/**
 * Appends a value to a list, only if the list exists.
 *
 * @param {string} key Name of the list.
 * @param {string} value Value to insert.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.rpushx =
    function(key, value, complete, cancel) {};


/**
 * Gets array of keys from iterated cursor
 * @param {string} cursor start cursor value.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {Object.<string, string>=} opt_options MATCH and COUNT options.
 */
polina.redis.IClient.prototype.scan =
    function(cursor, complete, cancel, opt_options) {};


/**
 * Gets array of keys from iterated cursor
 * @param {string} key Name of the Set.
 * @param {string} cursor start cursor value.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {Object.<string, string>=} opt_options MATCH and COUNT options.
 */
polina.redis.IClient.prototype.sscan =
    function(key, cursor, complete, cancel, opt_options) {};


/**
 * Gets array of keys from iterated cursor
 * @param {string} key Name of the Hash.
 * @param {string} cursor start cursor value.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {Object.<string, string>=} opt_options MATCH and COUNT options.
 */
polina.redis.IClient.prototype.hscan =
    function(key, cursor, complete, cancel, opt_options) {};

