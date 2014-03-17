


/**
 * Beanstalkd packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {string} expectedResponse Expected result.
 * @param {Function=} opt_callback Result handler.
 */
polina.beans.PacketHandler = function(expectedResponse, opt_callback) {

  /**
   * @type {string}
   */
  this.__expectedResponse = expectedResponse;

  /**
   * @type {boolean}
   */
  this.__isHeadParsed = false;

  /**
   * @type {Array.<string>}
   */
  this.__header = [];

  /**
   * @type {string}
   */
  this.__body = '';

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {!Function}
   */
  this.__callback = opt_callback || polina.nop;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.getHandledSize = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.reset = function() {
  this.__isHeadParsed = false;
  this.__header.length = 0;
  this.__body = '';
  this.__isComplete = false;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(cursor, chunk) {
  var lCursor = cursor.getPosition();
  if (!this.__isHeadParsed) {

    var i = lCursor;

    while (i < chunk.length) {
      if (chunk[i] === 10) {
        this.__isHeadParsed = true;
        this.__header = chunk.toString('utf8', lCursor, i - 1).split(' ');

        i += 1;
        break;
      }

      i += 1;
    }

    if (this.__isHeadParsed) {
      lCursor = i;
    }
  }

  if (this.__isHeadParsed) {
    if (this.__header[0] === 'RESERVED' ||
        this.__header[0] === 'FOUND' ||
        this.__header[0] === 'OK') {

      var payloadLength = parseInt(this.__header[this.__header.length - 1], 10);
      if (chunk.length >= lCursor + payloadLength + 2) {
        this.__isComplete = true;
        this.__body = chunk.slice(lCursor, lCursor + payloadLength).toString();

        lCursor += payloadLength + 2;
      }
    } else {
      this.__isComplete = true;
    }
  }

  if (this.__isComplete) {
    var error = null;

    if (this.__header[0] !== this.__expectedResponse) {
      error = Error(this.__header[0]);
    }

    this.__callback(error, this.__header[1] || '', this.__body);
  }

  cursor.incrPosition(lCursor - cursor.getPosition());
};
