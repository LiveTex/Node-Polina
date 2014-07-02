


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
  var result = this.__result.split('\r\n');
  return (result.length > 0) ? result[0] : '';
};


/**
 * @return {number}
 */
polina.redis.resp.Header.prototype.getLength = function() {
  var result = this.__result.split('\r\n');
  return parseInt(((result.length > 1) ? result[1] : ''), 10);
};
