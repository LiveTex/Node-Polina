


/**
 * @interface
 */
polina.redis.resp.IValue = function() {};


/**
 * @param {polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 */
polina.redis.resp.IValue.prototype.process = function(cursor, chunk) {};


/**
 * @return {boolean} Резльтат проверки готовности значения.
 */
polina.redis.resp.IValue.prototype.isComplete = function() {};


/**
 * @return {boolean} Резльтат проверки значения на ошибку.
 */
polina.redis.resp.IValue.prototype.isError = function() {};


/**
 * @return {string} Значение.
 */
polina.redis.resp.IValue.prototype.getString = function() {};


/**
 * @return {number} Значение.
 */
polina.redis.resp.IValue.prototype.getInteger = function() {};


/**
 * @return {!Array.<polina.redis.resp.IValue>|null} Значение.
 */
polina.redis.resp.IValue.prototype.getArray = function() {};


/**
 * @return {*} Значение.
 */
polina.redis.resp.IValue.prototype.get = function() {};
