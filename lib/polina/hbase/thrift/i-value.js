


/**
 * @interface
 */
polina.hbase.thrift.IValue = function() {};


/**
 * @param {number} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {number} Новое положение курсора.
 */
polina.hbase.thrift.IValue.prototype.process = function(cursor, chunk) {};


/**
 * @return {boolean} Резльтат проверки готовности значения.
 */
polina.hbase.thrift.IValue.prototype.isComplete = function() {};


/**
 * @return {boolean} Резльтат проверки значения на ошибку.
 */
polina.hbase.thrift.IValue.prototype.isError = function() {};


/**
 * @return {string} Значение.
 */
polina.hbase.thrift.IValue.prototype.getString = function() {};


/**
 * @return {number} Значение.
 */
polina.hbase.thrift.IValue.prototype.getInteger = function() {};


/**
 * @return {number} Значение.
 */
polina.hbase.thrift.IValue.prototype.getDouble = function() {};


/**
 * @return {!Array} Значение.
 */
polina.hbase.thrift.IValue.prototype.getArray = function() {};


/**
 * @return {!Array} Значение.
 */
polina.hbase.thrift.IValue.prototype.getBool = function() {};



/**
 * @return {!Array} Значение.
 */
polina.hbase.thrift.IValue.prototype.getMap = function() {};


/**
 * @return {*} Значение.
 */
polina.hbase.thrift.IValue.prototype.get = function() {};


/**
 * @return {number}
 */
polina.hbase.thrift.IValue.prototype.getHandledSize = function() {};
