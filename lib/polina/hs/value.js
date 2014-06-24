


/**
 * @constructor
 */
polina.hs.Value = function() {

  /**
   * @type {!polina.hs.Response}
   */
  this.__response = polina.hs.RESPONSE;

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
    if ((chunk[valueCursor] === polina.hs.TERMINAL)) {
      this.__response = polina.hs.decodeResponse(chunk.slice(
          cursor.getPosition(), valueCursor));
      cursor.incrPosition(valueCursor - cursor.getPosition() + 1);
      this.__isComplete = true;
      break;
    }
    valueCursor += 1;
  }
};


/**
 * @return {boolean}
 */
polina.hs.Value.prototype.isError = function() {
  return this.__response[0] !== '0';
};


/**
 * @return {(string|!polina.hs.Table)}
 */
polina.hs.Value.prototype.get = function() {
  var table = polina.hs.parseTable(this.__response);

  if (table === polina.hs.TABLE) {
    return '';
  }
  if ((table.length === 1) && (table[0].length === 1)) {
    return table[0][0];
  }

  return table;
};


/**
 * @return {boolean}
 */
polina.hs.Value.prototype.isComplete = function() {
  return this.__isComplete;
};
