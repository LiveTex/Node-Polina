


/**
 * @interface
 */
polina.IPacketHandler = function() {};


/**
 * @return {boolean} Обработан ли пакет.
 */
polina.IPacketHandler.prototype.isComplete = function() {};


/**
 * @param {number} cursor Курсор.
 * @param {!Buffer} chunk Пакет данных.
 * @return {number} Новое положение курсора.
 */
polina.IPacketHandler.prototype.process = function(cursor, chunk) {};

