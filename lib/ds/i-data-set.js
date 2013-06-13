


/**
 * @interface
 * @extends {ds.IDataItem}
 */
ds.IDataSet = function() {};


/**
 * @param {(number|string)=} opt_type Тип итератора.
 * @return {!ds.IIterator} Итератор.
 */
ds.IDataSet.prototype.getIterator = function(opt_type) {};


/**
 * @param {!ds.IDataItem} item Элемент для удаления.
 * @return {!ds.IDataItem} Удаленный элемент.
 */
ds.IDataSet.prototype.remove = function(item) {};


/**
 *
 */
ds.IDataSet.prototype.destroy = function() {};
