


/**
 * @param {!function(!polina.Cursor, !Buffer)} extractor
 * @constructor
 * @extends {polina.PacketHandler}
 */
polina.Header = function(extractor) {

  /**
   * @type {!function(!polina.Cursor, !Buffer)}
   */
  this.__extract = extractor;

  /**
   * @type {*}
   */
  this.__output = null;

};


/**
 * @inheritDoc
 */
polina.Header.prototype.process = function(cursor, chunk) {
  var header = this.__extract(cursor, chunk);
  if (header) {
    this.__output = header;
    return true;
  }
  return false;
};


/**
 * @inheritDoc
 */
polina.Header.prototype.reset = function() {
  this.__output = '';
};


/**
 * @return {string}
 */
polina.Header.prototype.get = function() {
  return this.__output;
};
