/**
 *
 * @param {!function(!polina.Cursor, !Buffer)} headerExtractor
 * @param {!function(!polina.Cursor, !Buffer, !polina.Header)} bodyExtractor
 * @param {!function(string, string)} resultHandler
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
  }

};


/**
 * @inheritDoc
 */
polina.PacketHandler.prototype.process = function(cursor, chunk) {
  var isCompleted = false;

  if (this.__header.process(cursor, chunk)) {
    if (this.__body.process(cursor, chunk)) {
      isCompleted = true;
      process.nextTick(this.__resultHandler);
    } else {
      cursor.breakParsing();
    }
  } else {
    cursor.breakParsing();
  }

  return isCompleted;
};


/**
 * @inheritDoc
 */
polina.PacketHandler.prototype.reset = function() {
  this.__reset();
};
