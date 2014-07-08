


/**
 * Header of Redis response packet.
 *
 * @constructor
 * @implements {polina.IPacket}
 */
polina.redis.resp.Header = function() {

  /**
   * @type {string}
   */
  this.__status = '';

  /**
   * @type {string}
   */
  this.__length = '';

  /**
   * @type {boolean}
   */
  this.__isCompleted = false;

};


/**
 * @inheritDoc
 */
polina.redis.resp.Header.prototype.isCompleted = function() {
  return this.__isCompleted;
};


/**
 * @return {*}
 */
polina.redis.resp.Header.prototype.get = function() {
  return this;
};


/**
 *
 */
polina.redis.resp.Header.prototype.complete = function() {
  this.__isCompleted = true;
};


/**
 * @return {string}
 */
polina.redis.resp.Header.prototype.getStatus = function() {
  return this.__status;
};


/**
 * @param {string} status
 */
polina.redis.resp.Header.prototype.setStatus = function(status) {
  this.__status = status;
};


/**
 * @return {number}
 */
polina.redis.resp.Header.prototype.getLength = function() {
  return parseInt(this.__length, 10);
};


/**
 * @param {string} length
 */
polina.redis.resp.Header.prototype.setLength = function(length) {
  this.__length = length;
};
