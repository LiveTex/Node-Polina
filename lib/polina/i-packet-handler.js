


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

