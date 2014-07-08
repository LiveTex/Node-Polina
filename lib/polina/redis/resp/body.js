


/**
 * Header of Redis response packet.
 *
 * @constructor
 * @extends {polina.Packet}
 */
polina.redis.resp.Body = function() {
  polina.Packet.call(this);

  /**
   * @type {?(string|!Array.<string>)}
   */
  this.__data = null;

};

util.inherits(polina.redis.resp.Body, polina.Packet);


/**
 * @param {polina.redis.resp.DataType=} opt_type
 * @return {*}
 */
polina.redis.resp.Body.prototype.get = function(opt_type) {
  switch (opt_type) {
    case polina.redis.resp.DataType.STRING:
    case polina.redis.resp.DataType.BULK:
    case polina.redis.resp.DataType.ERROR: {
      return this.__getString();
    }

    case polina.redis.resp.DataType.INTEGER: {
      return this.__getNumber();
    }

    case polina.redis.resp.DataType.ARRAY: {
      return this.__getArray();
    }
  }
  return this.__data;
};


/**
 * @return {string}
 */
polina.redis.resp.Body.prototype.__getString = function() {
  return (this.__data ? this.__data.toString() : '');
};


/**
 * @return {number}
 */
polina.redis.resp.Body.prototype.__getNumber = function() {
  return parseInt(this.__getString(), 10);
};


/**
 * @return {(!Array.<*>|string)}
 */
polina.redis.resp.Body.prototype.__getArray = function() {
  var result = (this.__data === polina.redis.resp.__NULL) ? this.__data : [];

  if (this.__data instanceof Array) {
    var i = 0;
    while (i < this.__data.length) {
      var item = this.__data[i];
      if (item instanceof polina.redis.resp.Packet) {
        result.push(item.get());
      } else {
        result.push(item);
      }
      i += 1;
    }
  }

  return result;
};


/**
 * @param {(string|!Array.<string>)} data
 */
polina.redis.resp.Body.prototype.set = function(data) {
  this.__data = data;
};
