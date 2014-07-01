


/**
 * @param {!function(!polina.Cursor, !Buffer)} extractor
 * @implements {polina.IPacketHandler}
 * @constructor
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

  /**
   * @type {boolean}
   */
  this.__isCompleted = false;

};


/**
 * @inheritDoc
 */
polina.Header.prototype.process = function(cursor, chunk) {
  if (!this.__isCompleted) {
    var header = this.__extract(cursor, chunk);
    if (header) {
      this.__output = header;
      this.__isCompleted = true;
    }
  }

  return this.__isCompleted;
};


/**
 * @return {*}
 */
polina.Header.prototype.get = function() {
  return this.__output;
};
