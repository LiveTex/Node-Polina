


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {string} expectedResponse Ожидaемый результат.
 * @param {Function} callback Обработчик результата.
 */
polina.beans.PacketHandler = function(expectedResponse, callback) {

  /**
   * @type {string}
   */
  this.__expectedResponse = expectedResponse;

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
   * @type {Function}
   */
  this.__callback = callback;
};


/**
 * @param {Error} a Ошибка.
 * @param {string} b Строка.
 * @param {string} c Строка.
 */
polina.beans.PacketHandler.__nop = function(a, b, c) {};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(chunk) {
  var result = chunk;

  if (this.__header.length === 0) {
    var eol = result.indexOf('\r\n');
    if (eol > -1) {
      this.__header = result.substring(0, eol).split(' ');

      result = result.substr(eol + 2);
    }
  }

  if (this.__header.length > 0) {
    if (this.__header[0] === 'RESERVED' ||
        this.__header[0] === 'FOUND' ||
        this.__header[0] === 'OK') {

      var payloadLength = Number(this.__header[this.__header.length - 1]);
      if (result.length >= payloadLength + 2) {
        this.__isComplete = true;
        this.__body = result.substring(0, payloadLength);

        result = result.substr(payloadLength + 2);
      }
    } else {
      this.__isComplete = true;
    }
  }

  if (this.__isComplete && this.__callback !== null) {
    var callback = this.__callback;
    var head = this.__header[1] || '';
    var body = this.__body;
    var error = null;

    if (this.__header[0] !== this.__expectedResponse) {
      error = Error(this.__header[0]);
    }

    process.nextTick(function() {
      callback(error, head, body);
    });
  }

  return result;};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.destroy = function() {
  this.__expectedResponse = '';
  this.__header.length = 0;
  this.__body = '';
  this.__callback = polina.beans.PacketHandler.__nop;
};

