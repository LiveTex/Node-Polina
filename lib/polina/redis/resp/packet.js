


/**
 * Redis response packet.
 *
 * @constructor
 * @extends {polina.Packet}
 */
polina.redis.resp.Packet = function() {
  polina.Packet.call(this);

  /**
   * @type {!polina.redis.resp.Header}
   */
  this.__header = new polina.redis.resp.Header();

  /**
   * @type {!polina.Packet}
   */
  this.__body = new polina.redis.resp.Body();

};

util.inherits(polina.redis.resp.Packet, polina.Packet);


/**
 * @return {*}
 */
polina.redis.resp.Packet.prototype.get = function() {
  return this.__body.get(this.__header.getStatus());
};


/**
 * @return {!polina.redis.resp.Header}
 */
polina.redis.resp.Packet.prototype.getHeader = function() {
  return this.__header;
};


/**
 * @return {!polina.Packet}
 */
polina.redis.resp.Packet.prototype.getBody = function() {
  return this.__body;
};


/**
 * @return {boolean}
 */
polina.redis.resp.Packet.prototype.isError = function() {
  return this.__header.getStatus() === polina.redis.resp.DataType.ERROR;
};
