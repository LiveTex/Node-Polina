


/**
 * Header of Redis response packet.
 *
 * @constructor
 * @implements {polina.IPacket}
 */
polina.redis.resp.Body = function() {

  /**
   * @type {*}
   */
  this.__data = null;

  /**
   * @type {boolean}
   */
  this.__isCompleted = false;

};


/**
 * @inheritDoc
 */
polina.redis.resp.Body.prototype.isCompleted = function() {
  return this.__isCompleted;
};


/**
 * @return {*}
 */
polina.redis.resp.Body.prototype.get = function() {
  return this.__data;
};


/**
 * @return {string}
 */
polina.redis.resp.Body.prototype.getString = function() {
  return (this.__data ? this.__data.toString() : '');
};


/**
 * @return {number}
 */
polina.redis.resp.Body.prototype.getNumber = function() {
  return parseInt(this.getString(), 10);
};


/**
 * @return {(!Array.<*>|string)}
 */
polina.redis.resp.Body.prototype.getArray = function() {
  var result = (this.__data === polina.redis.resp.__NULL) ? this.__data : [];

  if (this.__data instanceof Array) {
    var i = 0;
    while (i < this.__data.length) {
      result.push(this.__data[i].get());
      i += 1;
    }
  }

  return result;
};


/**
 * @param {*} data
 */
polina.redis.resp.Body.prototype.set = function(data) {
  this.__data = data;
  this.__isCompleted = (data !== null);
};


/**
 * @param {*} item
 * @param {number} length
 */
polina.redis.resp.Body.prototype.add = function(item, length) {
  if (this.__data === null) {
    this.__data = [];
  }
  if (this.__data instanceof Array) {
    this.__data.push(item);
    if (this.__data.length === length) {
      this.__isCompleted = true;
    }
  }
};
