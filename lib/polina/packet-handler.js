


/**
 * @param {!polina.IPacket} packet
 * @param {!function(!polina.IPacket, !polina.Cursor, !Buffer)} parser
 * @param {!function(!polina.IPacket)} resultHandler
 *
 * @constructor
 */
polina.PacketHandler = function(packet, parser, resultHandler) {

  var self = this;

  /**
   * @type {!polina.IPacket}
   */
  this.__packet = packet;

  /**
   * @param {!polina.Cursor} cursor
   * @param {!Buffer} chunk
   */
  this.__process = function(cursor, chunk) {
    parser(self.__packet, cursor, chunk);
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
