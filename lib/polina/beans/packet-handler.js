


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
  if (!this.__isHeadParsed) {

    var i = cursor;

    while (i < chunk.length) {
      if (chunk[i] === 10) {
        this.__isHeadParsed = true;
        this.__header = chunk.slice(cursor, i - 1).toString().split(' ');

        i += 1;
        break;
      }

      i += 1;
    }

    if (this.__isHeadParsed) {
      cursor = i;
    }
  }

  if (this.__isHeadParsed) {
    if (this.__header[0] === 'RESERVED' ||
        this.__header[0] === 'FOUND' ||
        this.__header[0] === 'OK') {

      var payloadLength = parseInt(this.__header[this.__header.length - 1], 10);
      if (chunk.length >= cursor + payloadLength + 2) {
        this.__isComplete = true;
        this.__body = chunk.slice(cursor, cursor + payloadLength).toString();

        cursor += payloadLength + 2;
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

    var callback = this.__callback;
    var header = this.__header[1] || '';
    var body = this.__body;

    process.nextTick(function() {
      callback(error, header, body);
    });
  }

  return cursor;
};
