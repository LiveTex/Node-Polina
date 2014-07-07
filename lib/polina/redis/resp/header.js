


/**
 * Header of Redis response packet.
 *
 * @constructor
 * @extends {polina.Packet}
 */
polina.redis.resp.Header = function() {
  polina.Packet.call(this);

  /**
   * @type {string}
   */
  this.__status = '';

  /**
   * @type {string}
   */
  this.__length = '';
};

util.inherits(polina.redis.resp.Header, polina.Packet);


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
