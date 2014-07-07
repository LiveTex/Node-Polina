


/**
 * Beanstalkd response packet.
 *
 * @param {polina.beans.protocol.Status} expectedResponse Status to be expected
 *  in response.
 *
 * @constructor
 * @extends {polina.Packet}
 */
polina.beans.protocol.Packet = function(expectedResponse) {
  polina.Packet.call(this);

  /**
   * @type {!polina.beans.protocol.Header}
   */
  this.__header = new polina.beans.protocol.Header();

  /**
   * @type {!polina.Packet}
   */
  this.__body = new polina.Packet();

  /**
   * @type {string}
   */
  this.__expectedResponse = expectedResponse;

};

util.inherits(polina.beans.protocol.Packet, polina.Packet);


/**
 * @return {!polina.beans.protocol.Header}
 */
polina.beans.protocol.Packet.prototype.getHeader = function() {
  return this.__header;
};


/**
 * @return {!polina.Packet}
 */
polina.beans.protocol.Packet.prototype.getBody = function() {
  return this.__body;
};


/**
 * @return {boolean}
 */
polina.beans.protocol.Packet.prototype.isError = function() {
  return this.__header.getStatus() === this.__expectedResponse;
};
