


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
  this.__packet = packet;

  /**
   * @param {!polina.Cursor} cursor
   * @param {!Buffer} chunk
   * @return {boolean}
   */
  this.__process = function(cursor, chunk) {
    return parser(self.__packet, cursor, chunk, args);
  };

  /**
   *
   */
  this.__resultHandler = function() {
    resultHandler(self.__packet);
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
  }
  cursor.breakParsing();
  return false;
};


/**
 *
 */
polina.PacketHandler.prototype.reset = function() {
  this.__packet.reset();
};
