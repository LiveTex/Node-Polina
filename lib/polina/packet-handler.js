


/**
 * @param {!function(!polina.Cursor, !Buffer)} headerExtractor
 * @param {!function(!polina.Cursor, !Buffer, !polina.Header)} bodyExtractor
 * @param {!Function} resultHandler
 * @implements {polina.IPacketHandler}
 * @constructor
 */
polina.PacketHandler = function(headerExtractor, bodyExtractor, resultHandler) {

  var self = this;

  /**
   * @type {!polina.Header}
   */
  this.__header = new polina.Header(headerExtractor);

  /**
   * @type {!polina.Body}
   */
  this.__body = new polina.Body(bodyExtractor, this.__header);

  /**
   * @type {!function()}
   */
  this.__resultHandler = function() {
    resultHandler(self.__header.get(), self.__body.get());
  };

  /**
   *
   */
  this.__reset = function() {
    self.__header = new polina.Header(headerExtractor);
    self.__body = new polina.Body(bodyExtractor, self.__header);
  };

};


/**
 * @inheritDoc
 */
polina.PacketHandler.prototype.process = function(cursor, chunk) {
  var isCompleted = false;

  console.log('------------------');
  console.log('CHUNK:', chunk.toString());

  if (this.__header.process(cursor, chunk) &&
      this.__body.process(cursor, chunk)) {
    isCompleted = true;
    process.nextTick(this.__resultHandler);
  } else {
    console.log('BREAK');
    cursor.breakParsing();
  }

  console.log(this.__header.get(), this.__body.get(), isCompleted);

  return isCompleted;
};


/**
 *
 */
polina.PacketHandler.prototype.reset = function() {
  this.__reset();
};
