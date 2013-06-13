


/**
 * @interface
 */
ds.IIterator = function() {};


/**
 * Имеется ли следующий элемент.
 *
 * @return {boolean} Результат проверки.
 */
ds.IIterator.prototype.hasNext = function() {};


/**
 * @param {!ds.IDataItem} item Элемент для проверки.
 * @return {boolean} Результат проверки.
 */
ds.IIterator.prototype.isNext = function(item) {};


/**
 * @return {ds.IDataItem} Следующий элемент.
 */
ds.IIterator.prototype.next = function() {};


/**
 *
 */
ds.IIterator.prototype.destroy = function() {};
