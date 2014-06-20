


/**
 * @param {number} terminal
 * @param {number} separator
 * @constructor
 */
polina.hs.Value = function(terminal, separator) {

  /**
   * @type {number}
   */
  this.__header = -1;

  /**
   * @type {number}
   */
  this.__length = 0;

  /**
   * @type {(string|!Array.<string>)}
   */
  this.__value = '';

  /**
   * @type {number}
   */
  this.__separator = separator;

  /**
   * @type {number}
   */
  this.__terminal = terminal;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {boolean}
   */
  this.__hasHeader = false;

  /**
   * @type {boolean}
   */
  this.__hasLength = false;

};


/**
 * @param {!polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 */
polina.hs.Value.prototype.process = function(cursor, chunk) {
  var valueCursor = cursor.getPosition();

  while (valueCursor < chunk.length) {
    var octet = chunk[valueCursor];
    var data;

    if (octet === this.__separator) {
      data = chunk.slice(cursor.getPosition(), valueCursor);
      if (!this.__hasHeader) {
        this.__header = parseInt(data.toString(), 10);
        this.__hasHeader = true;
      } else if (!this.__hasLength) {
        this.__length = parseInt(data.toString(), 10);
        this.__hasLength = true;
      }
      cursor.incrPosition(valueCursor - cursor.getPosition() + 1);
    }

    if (octet === this.__terminal) {
      data = chunk.slice(cursor.getPosition(), valueCursor);
      if (!this.__hasLength) {
        this.__length = parseInt(data.toString(), 10);
        this.__hasLength = true;
      } else {
        var response = polina.hs.decodeResponse(data, this.__separator);
        this.__value = polina.hs.groupResponse(response, this.__length);
      }
      cursor.incrPosition(valueCursor - cursor.getPosition() + 1);
      this.__isComplete = true;
      break;
    }

    valueCursor += 1;
  }
};


/**
 * @return {number}
 */
polina.hs.Value.prototype.getHeader = function() {
  return this.__header;
};


/**
 * @return {(!Array.<string>|string)}
 */
polina.hs.Value.prototype.get = function() {
  return this.__value;
};


/**
 * @return {boolean}
 */
polina.hs.Value.prototype.isComplete = function() {
  return this.__isComplete;
};
