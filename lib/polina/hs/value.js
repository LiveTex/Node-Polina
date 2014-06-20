


/**
 * @constructor
 */
polina.hs.Value = function() {

  /**
   * @type {string}
   */
  this.__header = '';

  /**
   * @type {number}
   */
  this.__length = -1;

  /**
   * @type {!polina.hs.Response}
   */
  this.__value = polina.hs.DummyResponse;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

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

    if (octet === polina.hs.SEPARATOR) {
      data = chunk.slice(cursor.getPosition(), valueCursor).toString();
      if (!this.__header) {
        this.__header = data;
      } else if (this.__length === -1) {
        this.__length = parseInt(data, 10);
      }
      cursor.incrPosition(valueCursor - cursor.getPosition() + 1);
    }

    if (octet === polina.hs.TERMINAL) {
      data = chunk.slice(cursor.getPosition(), valueCursor);
      if (this.__length === -1) {
        this.__length = parseInt(data.toString(), 10);
      } else {
        this.__value = polina.hs.decodeResponse(data, this.__length);
      }
      cursor.incrPosition(valueCursor - cursor.getPosition() + 1);
      this.__isComplete = true;
      break;
    }

    valueCursor += 1;
  }
};


/**
 * @return {string}
 */
polina.hs.Value.prototype.getHeader = function() {
  return this.__header;
};


/**
 * @return {!polina.hs.Response}
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
