


/**
 * @interface
 */
polina.thrift.IValue = function() {};


/**
 * @param {polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {boolean} Резльтат готовности значения.
 */
polina.thrift.IValue.prototype.process = function(cursor, chunk, protocol) {};


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
polina.thrift.IValue.prototype.getNumber = function() {};


/**
 * @return {polina.thrift.Int64} Значение.
 */
polina.thrift.IValue.prototype.getInt64 = function() {};


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
