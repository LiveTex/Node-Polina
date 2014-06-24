


/**
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @implements {polina.IPacketHandler}
 * @constructor
 */
polina.hs.PacketHandler = function(complete, cancel) {

  var self = this;


  /**
   * @type {!polina.hs.Value}
   */
  this.__value = new polina.hs.Value();

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   *
   */
  this.__valueHandler = function() {
    var value = self.__value.get();
    if (self.__value.isError()) {
      cancel(value.toString());
    } else {
      complete(value);
    }
  };

};


/**
 * Returns true if a packet was handled.
 *
 * @param {!polina.Cursor} cursor object.
 * @param {!Buffer} chunk Data packet.
 * @return {boolean} Flag of packet handling.
 */
polina.hs.PacketHandler.prototype.process = function(cursor, chunk) {
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
 * Clears a packet for reconnect.
 */
polina.hs.PacketHandler.prototype.reset = function() {
  this.__value = new polina.hs.Value();
};
