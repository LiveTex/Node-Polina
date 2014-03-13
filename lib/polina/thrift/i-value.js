


/**
 * @interface
 */
polina.thrift.IValue = function() {};


/**
 * @param {number} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {number} Новое положение курсора.
 */
polina.thrift.IValue.prototype.process = function(cursor, chunk) {};


/**
 * @return {boolean} Резльтат проверки готовности значения.
 */
polina.thrift.IValue.prototype.isComplete = function() {};


/**
 * @return {boolean} Резльтат проверки значения на ошибку.
 */
polina.thrift.IValue.prototype.isError = function() {};


/**
 * @return {string} Значение.
 */
polina.thrift.IValue.prototype.getString = function() {};


/**
 * @return {number} Значение.
 */
polina.thrift.IValue.prototype.getInteger = function() {};


/**
 * @return {number} Значение.
 */
polina.thrift.IValue.prototype.getDouble = function() {};


/**
 * @return {!Array} Значение.
 */
polina.thrift.IValue.prototype.getArray = function() {};


/**
 * @return {!Array} Значение.
 */
polina.thrift.IValue.prototype.getBool = function() {};



/**
 * @return {!Array} Значение.
 */
polina.thrift.IValue.prototype.getMap = function() {};


/**
 * @return {*} Значение.
 */
polina.thrift.IValue.prototype.get = function() {};


/**
 * @return {number}
 */
polina.thrift.IValue.prototype.getHandledSize = function() {};
