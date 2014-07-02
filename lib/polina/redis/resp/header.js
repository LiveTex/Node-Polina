


/**
 * @constructor
 * @extends {polina.Packet}
 */
polina.redis.resp.Header = function() {
  polina.Packet.call(this);
};

util.inherits(polina.redis.resp.Header, polina.Packet);


/**
 * @return {string}
 */
polina.redis.resp.Header.prototype.getStatus = function() {
  return (this.__data.length > 0) ? this.__data[0] : '';
};


/**
 * @return {number}
 */
polina.redis.resp.Header.prototype.getLength = function() {
  return parseInt(((this.__data.length > 1) ? this.__data.slice(1) : ''), 10);
};
