 

/**
 * @type {number}
 */
polina.beans.USER_TTL = 60000;

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


