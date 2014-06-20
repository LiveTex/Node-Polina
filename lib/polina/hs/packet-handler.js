


/**
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {number=} opt_terminal
 * @param {number=} opt_separator
 * @implements {polina.IPacketHandler}
 * @constructor
 */
polina.hs.PacketHandler =
    function(complete, cancel, opt_terminal, opt_separator) {
  var self = this;

  /**
   * @type {number}
   */
  this.__separator = opt_separator || 0x09;

  /**
   * @type {number}
   */
  this.__terminal = opt_terminal || 0x0a;

  /**
   * @type {!polina.hs.Value}
   */
  this.__data = new polina.hs.Value(this.__terminal, this.__separator);

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   *
   */
  this.__dataHandler = function() {
    var code = self.__data.getHeader();
    var value = self.__data.get();
    if (code) {
      cancel(value[0], code);
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
  this.__data.process(cursor, chunk);

  if (this.__data.isComplete()) {
    this.__isComplete = true;
    process.nextTick(this.__dataHandler);
  } else {
    cursor.breakParsing();
  }

  return this.__isComplete;
};


/**
 * Clears a packet for reconnect.
 */
polina.hs.PacketHandler.prototype.reset = function() {
  this.__data = new polina.hs.Value(this.__terminal, this.__separator);
};
