/**
 * @namespace
 */
var polina = {};


/**
 * @type {string}
 */
polina.VERSION = '0.0.1';


/**
 * @namespace
 */
polina.beans = {};


/**
 * @namespace
 */
polina.redis = {};


/**
 * Ничего.
 */
polina.nop = function() {};


/**
 * JS Implementation of MurmurHash2
 *
 * @see http://github.com/garycourt/murmurhash-js
 * @see http://sites.google.com/site/murmurhash/
 *
 * @param {string} str ASCII only.
 * @return {number} 32-bit positive integer hash.
 */
polina.murmur = function(str) {};



/**
 * @interface
 */
polina.IPacketHandler = function() {};


/**
 * Returns true if a pachket was handled.
 *
 * @return {boolean} Flag of packet handling.
 */
polina.IPacketHandler.prototype.isComplete = function() {};


/**
 * Shifts cursor and returns is's new position.
 *
 * @param {number} cursor Data cursor.
 * @param {!Buffer} chunk Data packet.
 * @return {number} New cursor position.
 */
polina.IPacketHandler.prototype.process = function(cursor, chunk) {};


/**
 * Clears a packet for reconnect.
 */
polina.IPacketHandler.prototype.reset = function() {};



/**
 * Connection establisher.
 *
 * @constructor
 * @param {number} port Connection port.
 * @param {string=} opt_host Хост Connection host.
 */
polina.Connection = function(port, opt_host) {};


/**
 * Registers a fallback destination.
 *
 * @param {number} port Fallback connection port.
 * @param {string=} opt_host Fallback connection host.
 */
polina.Connection.prototype.registerFallback = function(port, opt_host) {};


/**
 * @return {boolean} В процессе ли звпрос.
 */
polina.Connection.prototype.isRunning = function() {};


/**
 * Destroys connection.
 */
polina.Connection.prototype.destroy = function() {};


/**
 * @param {string} payload Data.
 * @param {!polina.IPacketHandler} handler Packet handler.
 */
polina.Connection.prototype._send = function(payload, handler) {};


/**
 * @return {string} Initializes request.
 */
polina.Connection.prototype._getHandshakePayload = function() {};


/**
 * @return {string} Initializes request.
 */
polina.Connection.prototype._getDestoryPayload = function() {};


/**
 * @return {polina.IPacketHandler} Initializes packet.
 */
polina.Connection.prototype._getHandshakeHandler = function() {};



/**
 * @type {number}
 */
polina.beans.USER_TTL = 60000;


/**
 * @type {number}
 */
polina.beans.MAX_USER_POOL_SIZE = 5;


/**
 * @type {number}
 */
polina.beans.TASK_TTR = 30;


/**
 * @param {!polina.beans.Tube} tube Туба.
 * @return {string} Сериализованная туба.
 */
polina.beans.serializeTube = function(tube) {};


/**
 * @param {string} string Сериализованная туба.
 * @return {!polina.beans.Tube} Туба.
 */
polina.beans.reconstructTube = function(string) {};


/**
 * @param {!polina.beans.Tube} tube Туба.
 * @param {function(string)} handler Обработчик.
 */
polina.beans.unsafeWatch = function(tube, handler) {};


/**
 * @param {string|!polina.beans.Tube} tubeOrString Туба.
 * @param {function(boolean)} complete Обработчик блокировки.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.beans.hasWatchers = function(tubeOrString, complete, cancel) {};


/**
 * @param {string|!polina.beans.Tube} tubeOrString Туба.
 * @param {string} data Данные.
 * @param {function(string)=} opt_callback Обработчик результата.
 */
polina.beans.put = function(tubeOrString, data, opt_callback) {};



/**
 * Beanstalkd client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @param {string} destroyPayload Initializes packet.
 * @param {string} handshakePayload Initializes packet.
 * @param {!polina.beans.PacketHandler} handshakeHandler A handler for a
 *   handshake.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.beans.Client =
    function(destroyPayload, handshakePayload, handshakeHandler, port,
             opt_host) {};


/**
 * @return {string} Initializes request.
 */
polina.beans.Client.prototype._getHandshakePayload = function() {};


/**
 * @return {polina.IPacketHandler} Initializes packet.
 */
polina.beans.Client.prototype._getHandshakeHandler = function() {};


/**
 * @inheritDoc
 */
polina.beans.Client.prototype._getDestoryPayload = function() {};


/**
 * @param {string} name Command name.
 * @param {string} args Command arguments.
 * @param {string} response Expected result.
 * @param {Function} callback Result handler.
 * @param {string=} opt_data Data.
 */
polina.beans.Client.prototype._command =
    function(name, args, response, callback, opt_data) {};



/**
 * @constructor
 * @param {string} name Observation tube.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.beans.Tube = function(name, port, opt_host) {};


/**
 * @return {string} ID of the tube.
 */
polina.beans.Tube.prototype.getId = function() {};


/**
 * @return {string} Name of the tube.
 */
polina.beans.Tube.prototype.getName = function() {};


/**
 * @return {number} Connection port.
 */
polina.beans.Tube.prototype.getPort = function() {};


/**
 * @return {string} Connection host.
 */
polina.beans.Tube.prototype.getHost = function() {};



/**
 * User of a tube.
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {!polina.beans.Tube} tube Observation tube.
 */
polina.beans.User = function(tube) {};


/**
 * Puts data to execution tube.
 *
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {function(string)=} opt_callback Обработчик результата.
 */
polina.beans.User.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {};


/**
 * @param {function(!Object.<string, string>)} complete Обработчик результата.
 */
polina.beans.User.prototype.statsTube = function(complete) {};


/**
 * Picks data, which is ready for task.
 *
 * @param {function(string, string)} complete Result handler.
 */
polina.beans.User.prototype.peekReady = function(complete) {};


/**
 * Deletes job by id.
 *
 * @param {string} jid Job id.
 * @param {function()} callback Result handler.
 */
polina.beans.User.prototype.delete = function(jid, callback) {};



/**
 * Event watcher
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {!polina.beans.Tube} tube Observation tube.
 */
polina.beans.Watcher = function(tube) {};


/**
 * Reserves ready-task, which can be deleted, buried, released with delay or
 * just released.
 *
 * @param {function(string, string)} callback Result handler.
 */
polina.beans.Watcher.prototype.reserve = function(callback) {};


/**
 * Deletes task from tube.
 *
 * @param {string} jid Job id.
 * @param {function()} callback Result handler.
 */
polina.beans.Watcher.prototype.delete = function(jid, callback) {};


/**
 * Releases task. Puts it into ready-tasks tube.
 *
 * @param {string} jid Job id.
 * @param {number} priority Priority of a job.
 * @param {number} timeout Execution timeout.
 * @param {function()} callback Result handler.
 */
polina.beans.Watcher.prototype.release =
    function(jid, priority, timeout, callback) {};


/**
 * @inheritDoc
 */
polina.beans.Watcher.prototype.destroy = function() {};



/**
 * Beanstalkd packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {string} expectedResponse Expected result.
 * @param {Function=} opt_callback Result handler.
 */
polina.beans.PacketHandler = function(expectedResponse, opt_callback) {};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.reset = function() {};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.isComplete = function() {};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(cursor, chunk) {};



/**
 * A bundle of beanstalkd users.
 *
 * @constructor
 * @param {!Array.<!polina.beans.Tube>} tubes Connection tubes.
 */
polina.beans.UsersBundle = function(tubes) {};


/**
 * Puts data to execution tube.
 *
 * @param {number} priority Priority of data handling.
 * @param {number} timeout Execution timeout.
 * @param {number} execTime Execution time.
 * @param {string} data Data to handle.
 * @param {function(string)=} opt_callback Result handler.
 */
polina.beans.UsersBundle.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {};


/**
 * Destroys a bundle.
 */
polina.beans.UsersBundle.prototype.destroy = function() {};



/**
 * @param {!Array.<string>} args Arguments.
 * @return {string} Command payload.
 */
polina.redis.encodeCommand = function(args) {};



/**
 * @constructor
 * @param {!Array.<string>} args Script's arguments.
 * @param {!Function} complete  Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {!polina.redis.ResultType} type Тип результата.
 */
polina.redis.ScriptInvoke = function(args, complete, cancel, type) {};


/**
 * @param {string} sha Контрольная сумма скрипта.
 * @return {string} Данные команды.
 */
polina.redis.ScriptInvoke.prototype.compilePayload = function(sha) {};


/**
 * @return {!polina.redis.PacketHandler} Обрабтчик результа.
 */
polina.redis.ScriptInvoke.prototype.createHandler = function() {};



/**
 * @enum {number}
 */
polina.redis.ResponseType = {
  OK: '+'.charCodeAt(0),
  ERR: '-'.charCodeAt(0),
  INT: ':'.charCodeAt(0),
  BULK: '$'.charCodeAt(0),
  MULTI_BULK: '*'.charCodeAt(0)
};



/**
 * @enum {number}
 */
polina.redis.ResultType = {
  INT: 0,
  STR: 1,
  ARR: 2
};



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
polina.redis.IClient.prototype.smembers = function(key, complete, cancel) {};


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
 * @param {function(!Array)} complete Success handler.
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
 * @param {function(!Array.<string>)} complete Success handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.hgetall =
    function(key, complete, cancel) {};


/**
 * @param {string} scriptName Registered script name.
 * @param {!Array.<string>} args Script's arguments.
 * @param {function(number)} complete
 *    Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.execInt =
    function(scriptName, args, complete, cancel) {};


/**
 *
 * @param {string} scriptName Registered script name.
 * @param {!Array.<string>} args Script's arguments.
 * @param {function(string)} complete
 *    Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.execString =
    function(scriptName, args, complete, cancel) {};


/**
 * @param {string} scriptName Registered script name.
 * @param {!Array.<string>} args Script's arguments.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.execArray =
    function(scriptName, args, complete, cancel) {};


/**
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
 * @param {string} position Where to insert the value. 'BEFORE' or 'AFTER'
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
 * Redis client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @implements {polina.redis.IClient}
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.redis.Client = function(port, opt_host) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype._getDestoryPayload = function() {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.set = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.decr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.get = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.mget = function(keys, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.keys = function(pattern, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.del = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sadd = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.srem = function(key, value, complete, cancel) {};


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
polina.redis.Client.prototype.hset =
    function(key, hashkey, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hget =
    function(key, hashkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hdel =
    function(key, hashkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hgetall =
    function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execInt =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execString =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execArray =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.registerScript = function(name, script) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.destroy = function() {};


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
polina.redis.Client.prototype.lindex = function(key, index, complete, cancel) {};


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
polina.redis.Client.prototype.lpush = function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpushx = function(key, value, complete, cancel) {};


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
polina.redis.Client.prototype.rpush = function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpushx = function(key, value, complete, cancel) {};



/**
 * Redis Bucket.
 *
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} size Bucket size.
 */
polina.redis.Bucket = function(size) {};


/**
 * Changes a size of a bucket.
 *
 * @param {number} size Bucket size.
 */
polina.redis.Bucket.prototype.resize = function(size) {};


/**
 * Registers client in a bucket.
 *
 * @param {number} intervalStart A start point of curtain interval.
 * @param {number} intervalEnd An end point of curtain interval.
 * @param {!polina.redis.IClient} client Redis-client.
 * @param {string} id Client identificator.
 */
polina.redis.Bucket.prototype.registerClient =
    function(intervalStart, intervalEnd, client, id) {};


/**
 * Terminates client in bucket by id.
 *
 * @param {string} id Client identificator.
 */
polina.redis.Bucket.prototype.terminateClient = function(id) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.set = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.decr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * @inheritDoc.
 */
polina.redis.Bucket.prototype.get = function(key, complete, cancel) {};


/**
 * @inheritDoc.
 */
polina.redis.Bucket.prototype.mget = function(keys, complete, cancel) {};


/**
 * @inheritDoc.
 */
polina.redis.Bucket.prototype.keys = function(pattern, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.del = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sadd = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.srem = function(key, value, complete, cancel) {};


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
polina.redis.Bucket.prototype.hset =
    function(key, hashkey, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hget =
    function(key, hashkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hdel =
    function(key, hashkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hgetall =
    function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.execInt =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.execString =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.execArray =
    function(name, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.registerScript = function(name, script) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.destroy = function() {};


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
polina.redis.Bucket.prototype.lindex = function(key, index, complete, cancel) {};


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
polina.redis.Bucket.prototype.lpush = function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpushx = function(key, value, complete, cancel) {};


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
polina.redis.Bucket.prototype.rpop =
    function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpoplpush =
    function(source, destination, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpush = function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpushx = function(key, value, complete, cancel) {};



/**
 * Redis packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {!polina.redis.ResultType} type Response type.
 */
polina.redis.PacketHandler = function(complete, cancel, type) {};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.reset = function() {};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.isComplete = function() {};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.process = function(cursor, chunk) {};


/**
 *
 */
polina.redis.PacketHandler.prototype._complete = function() {};


/**
 * @param {!Buffer} error Error to be handled.
 */
polina.redis.PacketHandler.prototype._cancel = function(error) {};



/**
 * A bundle of buckets.
 *
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} count Connection count.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.redis.Bundle = function(count, port, opt_host) {};


/**
 * Registers a fallback destination.
 *
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.redis.Bundle.prototype.registerFallback = function(port, opt_host) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.set =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.incr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.decr = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.get = function(key, complete, cancel) {};


/**
 * @inheritDoc.
 */
polina.redis.Bundle.prototype.mget = function(keys, complete, cancel) {};


/**
 * @inheritDoc.
 */
polina.redis.Bundle.prototype.keys = function(pattern, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.del = function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sadd =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.srem =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.sismember =
    function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.smembers =
    function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hset =
    function(key, hashkey, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hget =
    function(key, hashkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hdel =
    function(key, hashkey, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.hgetall =
    function(key, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.execInt =
    function(sha, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.execString =
    function(sha, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.execArray =
    function(sha, args, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.registerScript = function(name, script) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.destroy = function() {};


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
polina.redis.Bundle.prototype.lindex = function(key, index, complete, cancel) {};


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
polina.redis.Bundle.prototype.lpush = function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lpushx = function(key, value, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lrange =
    function(key, start, stop, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.lrem = function(key, count, value, complete, cancel) {};


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
polina.redis.Bundle.prototype.rpush = function(key, values, complete, cancel) {};


/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.rpushx = function(key, value, complete, cancel) {};



