


/**
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
  this.__body = new polina.Packet();

};

util.inherits(polina.redis.resp.Packet, polina.Packet);


/**
 * @return {polina.PacketType}
 */
polina.redis.resp.Packet.prototype.__getType = function() {
  var status = this.__header.getStatus();

  switch (status) {
    case polina.redis.resp.DataType.INTEGER:
      return polina.PacketType.NUMBER;

    case polina.redis.resp.DataType.ARRAY:
      return polina.PacketType.ARRAY;
  }

  return polina.PacketType.STRING;
};


/**
 * @inheritDoc
 */
polina.redis.resp.Packet.prototype.get = function() {
  return this.__body.get(this.__getType());
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
