


/**
 * Global cursor.
 * @constructor
 */
polina.Cursor = function() {

  /**
   * @type {number}.
   */
  this.__position = 0;

  /**
   * @type {boolean}.
   */
  this.__isParsed = true;

};


/**
 * @return {number} current cursor position.
 */
polina.Cursor.prototype.getPosition = function() {
  return this.__position;
};


/**
 * @param {number} value increment current position on value.
 */
polina.Cursor.prototype.incrPosition = function(value) {
  this.__position += value;
};


/**
 * @return {boolean}
 */
polina.Cursor.prototype.isParsed = function() {
  return this.__isParsed;
};


/**
 * Sets isParsed flag to false if packet parsing is not finished.
 * True - packet is completely parsed.
 * False - packet is being parsed now.
 */
polina.Cursor.prototype.breakParsing = function() {
  this.__isParsed = false;
};



