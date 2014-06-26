


/**
 * @interface
 */
polina.IValue = function() {};


/**
 * @param {polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 */
polina.IValue.prototype.process = function(cursor, chunk) {};


/**
 * @return {boolean} Резльтат проверки готовности значения.
 */
polina.IValue.prototype.isComplete = function() {};


/**
 * @return {boolean} Резльтат проверки значения на ошибку.
 */
polina.IValue.prototype.isError = function() {};


/**
 * @return {*} Значение.
 */
polina.IValue.prototype.get = function() {};


/**
 * @return {string} Значение.
 */
polina.IValue.prototype.getString = function() {};


/**
 * @return {number} Значение.
 */
polina.IValue.prototype.getInteger = function() {};


/**
 * @return {!Array.<polina.IValue>|null} Значение.
 */
polina.IValue.prototype.getArray = function() {};
