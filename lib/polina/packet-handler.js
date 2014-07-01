


/**
 * @param {!polina.IPacket} packet
 * @param {!function(polina.IPacket, !polina.Cursor, !Buffer, !Array.<*>=):
 *  boolean} parser
 * @param {!function(*)} resultHandler
 * @param {!Array.<*>=} opt_args
 * @constructor
 */
polina.PacketHandler = function(packet, parser, resultHandler, opt_args) {

  var self = this;

  /**
   * @type {!polina.IPacket}
   */
  this.__result = packet;

  /**
   * @param {!polina.Cursor} cursor
   * @param {!Buffer} chunk
   * @return {boolean}
   */
  this.__process = function(cursor, chunk) {
    return parser(self.__result, cursor, chunk, opt_args);
  };

  /**
   *
   */
  this.__resultHandler = function() {
    resultHandler(self.__result.get());
  };

};


/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {boolean}
 */
polina.PacketHandler.prototype.process = function(cursor, chunk) {
  var isCompleted = this.__process(cursor, chunk);

  if (isCompleted) {
    process.nextTick(this.__resultHandler);
  } else {
    cursor.breakParsing();
  }

  return isCompleted;
};


/**
 *
 */
polina.PacketHandler.prototype.reset = function() {
  this.__result.reset();
};
