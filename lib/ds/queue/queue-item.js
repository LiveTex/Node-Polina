


/**
 * @constructor
 * @implements {ds.IDataItem}
 * @param {*} data Данные элемента очереди.
 */
ds.queue.QueueItem = function(data) {

  /**
   * @type {*}
   */
  this.__data = data;

  /**
   * @type {!ds.queue.QueueItem}
   * @protected
   */
  this._next = this;

  /**
   * @type {!ds.queue.QueueItem}
   * @protected
   */
  this._prev = this;
};


/**
 * @inheritDoc
 */
ds.queue.QueueItem.prototype.get = function() {
  return this.__data;
};


/**
 * @inheritDoc
 */
ds.queue.QueueItem.prototype.clear = function() {
  this.__data = null;
};
