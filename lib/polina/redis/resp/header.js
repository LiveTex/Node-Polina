


/**
 * Header of Redis response packet.
 *
 * @constructor
 * @implements {polina.IPacket}
 */
polina.redis.resp.Header = function() {

  /**
   * @type {number}
   */
  this.__status = -1;

  /**
   * @type {string}
   */
  this.__length = '';

};


/**
 * @inheritDoc
 */
polina.redis.resp.Header.prototype.get = function() {
  return this;
};


/**
 * @inheritDoc
 */
polina.redis.resp.Header.prototype.isCompleted = function() {
  if ((this.__status === polina.redis.resp.DataType.ARRAY) ||
      (this.__status === polina.redis.resp.DataType.BULK)) {
    return this.__length !== '';
  } else {
    return this.__status !== -1;
  }
};


/**
 * @return {number}
 */
polina.redis.resp.Header.prototype.getStatus = function() {
  return this.__status;
};


/**
 * @param {number} status
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
