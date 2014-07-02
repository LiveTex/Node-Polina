


/**
 * @param {!polina.Packet} packet
 * @param {!function(!polina.Packet, !polina.Cursor,
 *  !Buffer, !Array.<*>=): boolean} parser
 * @param {!function(!polina.Packet)} resultHandler
 * @param {!Array.<*>=} opt_args
 * @constructor
 */
polina.PacketHandler = function(packet, parser, resultHandler, opt_args) {

  var self = this;
  var args = opt_args || [];

  /**
   * @type {!polina.Packet}
   */
  this.__result = packet;

  /**
   * @param {!polina.Cursor} cursor
   * @param {!Buffer} chunk
   * @return {boolean}
   */
  this.__process = function(cursor, chunk) {
    return parser(self.__result, cursor, chunk, args);
  };

  /**
   *
   */
  this.__resultHandler = function() {
    resultHandler(self.__result);
  };

};


/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {boolean}
 */
polina.PacketHandler.prototype.process = function(cursor, chunk) {
  if (this.__process(cursor, chunk)) {
    process.nextTick(this.__resultHandler);
    return true;
  } else {
    cursor.breakParsing();
  }

  return false;
};


/**
 *
 */
polina.PacketHandler.prototype.reset = function() {
  this.__result.reset();
};
