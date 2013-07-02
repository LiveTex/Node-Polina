 

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
 * @return {polina.IPacketHandler} Initializes packet.
 */
polina.Connection.prototype._getHandshakeHandler = function() {};

/**
 * Beanstalkd client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @param {string} handshakePayload Initializes packet.
 * @param {!polina.beans.PacketHandler} handshakeHandler A handler for a
 *   handshake.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.beans.Client =
    function(handshakePayload, handshakeHandler, port, opt_host) {};

/**
 * @return {string} Initializes request.
 */
polina.beans.Client.prototype._getHandshakePayload = function() {};

/**
 * @return {polina.IPacketHandler} Initializes packet.
 */
polina.beans.Client.prototype._getHandshakeHandler = function() {};

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
 * User of a tube.
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {string} tube Observation tube.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.beans.User = function(tube, port, opt_host) {};

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
 * @param {string} tube Observation tube.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.beans.Watcher = function(tube, port, opt_host) {};

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
 * @param {string} tube Observation tube.
 * @param {!Array.<number>} ports Connection ports.
 * @param {!Array.<string>=} opt_hosts Connection hosts.
 */
polina.beans.UsersBundle = function(tube, ports, opt_hosts) {};

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
 *
 *
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
 * Load a script into the scripts cache, without executing it.
 *
 * @param {string} lua Lua script.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.scriptLoad = function(lua, complete, cancel) {};

/**
 *
 * @param {string} sha SHA1 digest of a script.
 * @param {Array.<string>} args Script's arguments.
 * @param {string} type Type of return-value.
 * @param {function(number)|function(string)|function(Array.<string>)} complete
 *    Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.evalsha = function(sha, args, type,
                                                  complete, cancel) {};

/**
 * Destroys a client.
 */
polina.redis.IClient.prototype.destroy = function() {};

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
polina.redis.Client.prototype.scriptLoad = function(lua, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Client.prototype.evalsha = function(sha, args, type,
                                                 complete, cancel) {};

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
polina.redis.Bucket.prototype.scriptLoad = function(lua, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.evalsha = function(sha, args, type,
                                                 complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.destroy = function() {};

/**
 * Redis packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {number} type Response type.
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
polina.redis.Bundle.prototype.scriptLoad = function(lua, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.evalsha = function(sha, args, type,
                                                 complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bundle.prototype.destroy = function() {};


