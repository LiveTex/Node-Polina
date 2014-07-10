


/**
 * @param {function(!polina.Cursor, !Buffer)} parser
 * @param {function()} resultHandler
 *
 * @constructor
 */
polina.PacketHandler = function(parser, resultHandler) {

  /**
   * @type {function(!polina.Cursor, !Buffer)}
   */
  this.__process = parser;

  /**
   * @type {function()}
   */
  this.__resultHandler = resultHandler;

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
