


/**
 * Beanstalkd packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {string} expectedResponse Expected result.
 * @param {Function=} opt_callback Result handler.
 */
polina.beans.PacketHandler =
    function(expectedResponse, opt_callback) {

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
  this.__expectedResponse = expectedResponse;


  /**
   *
   */
  this.__valueHandler = function() {
    var callback = opt_callback || polina.nop;
    callback((self.__value.isError() ? self.__value.getState() : null),
        self.__value.getJid(), self.__value.getString());
  };

};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(cursor, chunk) {

  if (this.__value === null) {
    this.__value = new polina.beans.Value(this.__expectedResponse);
  }

  this.__value.process(cursor, chunk);

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
