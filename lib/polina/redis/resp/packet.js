


/**
 * Redis response packet.
 *
 * @constructor
 * @implements {polina.IPacket}
 */
polina.redis.resp.Packet = function() {

  /**
   * @type {!polina.redis.resp.Header}
   */
  this.__header = new polina.redis.resp.Header();

  /**
   * @type {!polina.redis.resp.Body}
   */
  this.__body = new polina.redis.resp.Body();

};


/**
 * @inheritDoc
 */
polina.redis.resp.Packet.prototype.get = function() {

  switch (this.__header.getStatus()) {
    case polina.redis.resp.DataType.STRING:
    case polina.redis.resp.DataType.BULK:
    case polina.redis.resp.DataType.ERROR: {
      return this.__body.getString();
    }

    case polina.redis.resp.DataType.INTEGER: {
      return this.__body.getNumber();
    }

    case polina.redis.resp.DataType.ARRAY: {
      return this.__body.getArray();
    }
  }

  return this.__body.get();
};


/**
 * @inheritDoc
 */
polina.redis.resp.Packet.prototype.isCompleted = function() {
  return this.__header.isCompleted() && this.__body.isCompleted();
};


/**
 * @return {!polina.redis.resp.Header}
 */
polina.redis.resp.Packet.prototype.getHeader = function() {
  return this.__header;
};


/**
 * @return {!polina.redis.resp.Body}
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
