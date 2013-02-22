 

/**
 * @namespace
 */
var polina = {};

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




