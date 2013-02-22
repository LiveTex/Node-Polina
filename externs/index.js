 

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
 * @interface
 */
polina.IPacketHandler = function() {};

/**
 * @return {boolean} Обработан ли пакет.
 */
polina.IPacketHandler.prototype.isComplete = function() {};

/**
 * @param {string} chunk Пакет данных.
 * @return {string} Не обработанный остаток.
 */
polina.IPacketHandler.prototype.process = function(chunk) {};

/**
 * Удаление обработчика.
 */
polina.IPacketHandler.prototype.destroy = function() {};

/**
 * @constructor
 * @param {function(!Error)} errorHandler Обработчик ошибок.
 * @param {number} reconnectTimeout Интервал переподключения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.Connection = function(errorHandler, reconnectTimeout, port, opt_host) {};

/**
 *
 */
polina.Connection.prototype.destroy = function() {};

/**
 * @param {string} payload Данные.
 * @param {!polina.IPacketHandler} handler Обработчик пакета.
 */
polina.Connection.prototype.send = function(payload, handler) {};

/**
 * @constructor
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Client = function(port, opt_host) {};

/**
 * @type {number}
 */
polina.beans.Client.RECONNECT_TIMEOUT = 1000;

/**
 * @param {string} tube Труба.
 * @param {function(Error)=} opt_callback Обработчик результата.
 */
polina.beans.Client.prototype.use = function(tube, opt_callback) {};

/**
 *
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {?function(Error, string=)=} opt_callback Обработчик результата.
 */
polina.beans.Client.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {};

/**
 * @param {string} tube Труба.
 * @param {Function=} opt_callback Обработчик результата.
 */
polina.beans.Client.prototype.watch = function(tube, opt_callback) {};

/**
 * @param {function(Error, string=, string=)} callback Обработчик результата.
 */
polina.beans.Client.prototype.reserve = function(callback) {};

/**
 * @param {string} jobId Идентификатор задачи.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Client.prototype.delete = function(jobId, callback) {};

/**
 * @param {string} jobId Идентификатор задачи.
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Client.prototype.release =
    function(jobId, priority, timeout, callback) {};

/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {string} expectedResponse Ожидaемый результат.
 * @param {Function} callback Обработчик результата.
 */
polina.beans.PacketHandler = function(expectedResponse, callback) {};

/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.isComplete = function() {};

/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(chunk) {};

/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.destroy = function() {};


