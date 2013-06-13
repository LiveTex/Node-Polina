


/**
 * @constructor
 * @extends {ds.queue.QueueItem}
 * @implements {ds.IDataSet}
 */
ds.queue.Queue = function() {
  ds.queue.QueueItem.call(this, null);

  /**
   * @type {number}
   */
  this.length = 0;

  /**
   * @type {Array.<ds.queue.QueueIterator>}
   * @protected
   */
  this._activeIterators = [];
};

util.inherits(ds.queue.Queue, ds.queue.QueueItem);


/**
 * @inheritDoc
 */
ds.queue.Queue.prototype.getIterator = function(opt_type) {
  return new ds.queue.QueueIterator(this);
};


/**
 * @inheritDoc
 */
ds.queue.Queue.prototype.get = function() {
  var result = [];
  var iterator = this.getIterator();

  while (iterator.hasNext()) {
    result.push(iterator.next().get());
  }

  iterator.destroy();

  return result;
};


/**
 * @inheritDoc
 */
ds.queue.Queue.prototype.clear = function() {
  while (this._prev !== this) {
    this._prev.clear();
    this.remove(this._prev);
  }
};


/**
 * @inheritDoc
 */
ds.queue.Queue.prototype.destroy = function() {
  while (this._prev !== this) {
    this.remove(this._prev);
  }
};


/**
 * @param {!ds.queue.QueueIterator} iterator Итератор.
 */
ds.queue.Queue.prototype.addActiveIterator = function(iterator) {
  this._activeIterators.push(iterator);
};


/**
 * @param {!ds.queue.QueueIterator} iterator Итератор.
 */
ds.queue.Queue.prototype.removeActiveIterator = function(iterator) {
  var index = this._activeIterators.indexOf(iterator);
  if (index !== -1) {
    this._activeIterators.splice(iterator);
  }
};


/**
 * @return {ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.getFirst = function() {
  if (this._prev !== this) {
    return this._prev;
  }

  return null;
};


/**
 * @return {ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.getLast = function() {
  if (this._next !== this) {
    return this._next;
  }

  return null;
};


/**
 * @param {!ds.queue.QueueItem} target Элемент очереди.
 * @return {ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.getBefore = function(target) {
  if (target._prev !== this) {
    return target._prev;
  }

  return null;
};


/**
 * @param {!ds.queue.QueueItem} target Элемент очереди.
 * @return {ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.getAfter = function(target) {
  if (target._next !== this) {
    return target._next;
  }

  return null;
};


/**
 * @param {!ds.queue.QueueItem} item Элемент очереди.
 * @param {!ds.queue.QueueItem} target Элемент очереди.
 * @return {!ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.addBefore = function(item, target) {
  target._prev._next = item;
  item._prev = target._prev;

  target._prev = item;
  item._next = target;

  this.length += 1;

  return item;
};


/**
 * @param {!ds.queue.QueueItem} item Элемент очереди.
 * @param {!ds.queue.QueueItem} target Элемент очереди.
 * @return {!ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.addAfter = function(item, target) {
  target._next._prev = item;
  item._next = target._next;

  target._next = item;
  item._prev = target;

  this.length += 1;

  return item;
};


/**
 * @param {!ds.queue.QueueItem|*} data Элемент очереди.
 * @return {!ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.push = function(data) {
  if (data instanceof ds.queue.QueueItem) {
    return this.addBefore(data, this._next);
  }

  return this.addBefore(new ds.queue.QueueItem(data), this._next);
};


/**
 * @param {!ds.queue.QueueItem|*} data Элемент очереди.
 * @return {!ds.queue.QueueItem} Элемент очереди.
 */
ds.queue.Queue.prototype.unshift = function(data) {
  if (data instanceof ds.queue.QueueItem) {
    return this.addAfter(data, this._prev);
  }

  return this.addAfter(new ds.queue.QueueItem(data), this._prev);
};


/**
 * @inheritDoc
 */
ds.queue.Queue.prototype.remove = function(item) {
  var i = 0,
      l = this._activeIterators.length;

  while (i < l) {
    if (this._activeIterators[i].isNext(item)) {
      this._activeIterators[i].next();
    }

    i += 1;
  }

  item._next._prev = item._prev;
  item._prev._next = item._next;

  item._next = item;
  item._prev = item;

  this.length -= 1;

  return item;
};


/**
 * @return {*} Элемент очереди.
 */
ds.queue.Queue.prototype.shift = function() {
  if (this._prev !== this) {
    var item = this.remove(this._prev);
    if (item !== null) {
      return item.get();
    }
  }

  return null;
};


/**
 * @return {*} Элемент очереди.
 */
ds.queue.Queue.prototype.pop = function() {
  if (this._prev !== this) {
    var item = this.remove(this._next);
    if (item !== null) {
      return item.get();
    }
  }

  return null;
};


/**
 * @param {function(*)} callback Обработчик элемента очереди.
 */
ds.queue.Queue.prototype.map = function(callback) {
  var iterator = this.getIterator();

  while (iterator.hasNext()) {
    callback(iterator.next());
  }

  iterator.destroy();
};
