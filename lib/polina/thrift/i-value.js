


/**
 * @interface
 */
polina.thrift.IValue = function() {};


/**
 * @param {polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
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
 * TODO #9 getInteger и getDouble можно объединить. Цель - возвращать только js
 * типы.
 * Не объединить, так как разный процесс десереализации.
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
 * @return {boolean} Значение.
 */
polina.thrift.IValue.prototype.getBool = function() {};


/**
 * @return {Object} Значение.
 */
polina.thrift.IValue.prototype.getMap = function() {};


/**
 * @return {*} Значение.
 */
polina.thrift.IValue.prototype.get = function() {};
