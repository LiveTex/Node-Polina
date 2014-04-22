


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
 * set this.__isParsed in false, flag - finish data.
 */
polina.Cursor.prototype.breakParsing = function() {
  this.__isParsed = false;
};



