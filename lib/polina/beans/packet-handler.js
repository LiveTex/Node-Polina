


/**
 * Beanstalkd packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {string} expectedState Expected result.
 * @param {!Array.<string>=} opt_expectedErrors
 * @param {function(string, string)=} opt_complete Result handler.
 * @param {function(string, number=)=} opt_cancel Error handler.
 *
 */
polina.beans.PacketHandler =
    function(expectedState, opt_expectedErrors, opt_complete, opt_cancel) {

  var self = this;

  /**
   * @type {polina.beans.Value}
   */
  this.__value = null;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {string}
   */
  this.__expectedState = expectedState;

  /**
   * @type {!Array.<string>}
   */
  this.__expectedErrors = ['OUT_OF_MEMORY', 'INTERNAL_ERROR', 'BAD_FORMAT',
    'UNKNOWN_COMMAND'].concat(opt_expectedErrors);

  /**
   *
   */
  this.__valueHandler = function() {
    if (self.__value.isError()) {
      var cancel = opt_cancel || polina.nop;
      cancel([self.__value.getState(), self.__value.getJid(),
            self.__value.get()].join(' '));
    } else {
      var complete = opt_complete || polina.nop;
      complete(self.__value.getJid(), self.__value.getString());
    }
  };

};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(cursor, chunk) {

  if (this.__value === null) {
    this.__value = new polina.beans.Value(this.__expectedState,
        this.__expectedErrors);
  }

  while (!this.__value.isComplete() && (cursor.getPosition() < chunk.length)) {
    this.__value.process(cursor, chunk);
  }

  if (this.__value.isComplete()) {
    this.__isComplete = true;
    process.nextTick(this.__valueHandler);
  } else {
    cursor.breakParsing();
  }

  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.reset = function() {
  this.__value = null;
  this.__isComplete = false;
};
