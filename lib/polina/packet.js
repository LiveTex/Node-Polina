


/**
 * @param {polina.PacketType=} opt_type
 * @constructor
 */
polina.Packet = function(opt_type) {

  /**
   * @type {polina.PacketType}
   */
  this.__type = opt_type || polina.PacketType.RAW;

  /**
   * @type {?(string|Array.<*>)}
   */
  this.__data = null;

  /**
   * @type {boolean}
   */
  this.__isCompleted = false;

};


/**
 * @param {polina.PacketType=} opt_type
 * @return {?(string|number|Array.<*>)}
 */
polina.Packet.prototype.get = function(opt_type) {
  var dataType = opt_type || this.__type;

  switch (dataType) {
    case polina.PacketType.STRING:
      return this.getString();

    case polina.PacketType.NUMBER:
      return this.getNumber();

    case polina.PacketType.ARRAY:
      return this.getArray();
  }

  return this.__data;
};


/**
 * @return {string}
 */
polina.Packet.prototype.getString = function() {
  return ((typeof this.__data === 'string') ? this.__data : '');
};


/**
 * @return {number}
 */
polina.Packet.prototype.getNumber = function() {
  return parseInt(((typeof this.__data === 'string') ?
      this.__data : ''), 10);
};


/**
 * @return {!Array.<*>}
 */
polina.Packet.prototype.getArray = function() {
  var data = [];

  if (this.__data instanceof Array) {
    var i = 0;

    while (i < this.__data.length) {
      var value = this.__data[i];
      if (value instanceof polina.Packet) {
        data.push(value.get());
      } else {
        data.push(value);
      }
      i += 1;
    }
  }

  return data;
};


/**
 * @param {(string|!Array.<*>)} data
 */
polina.Packet.prototype.set = function(data) {
  this.__data = data;
};


/**
 *
 */
polina.Packet.prototype.complete = function() {
  this.__isCompleted = true;
};


/**
 * @return {boolean}
 */
polina.Packet.prototype.isCompleted = function() {
  return this.__isCompleted;
};


/**
 *
 */
polina.Packet.prototype.reset = function() {
  this.__data = null;
  this.__isCompleted = false;
};
