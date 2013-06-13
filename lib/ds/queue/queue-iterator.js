


/**
 * @constructor
 * @implements {ds.IIterator}
 * @param {!ds.queue.Queue} queue Очередь.
 */
ds.queue.QueueIterator = function(queue) {

  /**
   * @type {!ds.queue.Queue}
   */
  this.__queue = queue;

  /**
   * @type {ds.queue.QueueItem}
   */
  this.__next = queue.getFirst();

  if (this.__next !== null) {
    this.__queue.addActiveIterator(this);
  }
};


/**
 * @inheritDoc
 */
ds.queue.QueueIterator.prototype.hasNext = function() {
  return this.__next !== null;
};


/**
 * @inheritDoc
 */
ds.queue.QueueIterator.prototype.isNext = function(item) {
  return this.__next === item;
};


/**
 * @inheritDoc
 */
ds.queue.QueueIterator.prototype.next = function() {
  var current = this.__next;

  if (this.__next !== null) {
    this.__next = this.__queue.getBefore(this.__next);
  } else {
    this.__queue.removeActiveIterator(this);
  }

  return current;
};


/**
 * @inheritDoc
 */
ds.queue.QueueIterator.prototype.destroy = function() {
  this.__queue.removeActiveIterator(this);
  this.__next = null;
};
