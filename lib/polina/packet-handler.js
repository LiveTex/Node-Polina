


/**
 * @param {!function(*, !polina.Cursor, !Buffer,
 *  !Array.<*>=):*} parser
 * @param {!function(*, !Array.<*>=)} completeCondition
 * @param {!function(*)} resultHandler
 * @param {!Array.<*>=} opt_args
 * @constructor
 */
polina.PacketHandler =
    function(parser, completeCondition, resultHandler, opt_args) {

  var self = this;

  /**
   * @type {*}
   */
  this.__result = null;

  /**
   * @param {!polina.Cursor} cursor
   * @param {!Buffer} chunk
   * @return {*}
   */
  this.__process = function(cursor, chunk) {
    return parser(self.__result, cursor, chunk, opt_args);
  };

  /**
   * @return {boolean}
   */
  this.__isCompleted = function() {
    return completeCondition(self.__result, opt_args);
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
  this.__result = this.__process(cursor, chunk);
  var isCompleted = this.__isCompleted();

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
  this.__result = null;
};
