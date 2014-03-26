


/**
 * @interface
 */
polina.thrift.IValue = function() {};


/**
 * @param {polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {number} Новое положение курсора.
 * @param {polina.thrift.IProtocol} protocol
 */
polina.thrift.IValue.prototype.process = function(cursor, chunk, protocol) {};


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