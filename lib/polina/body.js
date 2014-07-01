


/**
 * @param {!function(!polina.Cursor, !Buffer, !polina.Header)} extractor
 * @param {!polina.Header} header
 * @implements {polina.IPacketHandler}
 * @constructor
 */
polina.Body = function(extractor, header) {

  /**
   * @type {!polina.Header}
   */
  this.__header = header;

  /**
   * @type {!function(!polina.Cursor, !Buffer, !polina.Header)}
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
polina.Body.prototype.process = function(cursor, chunk) {
  if (!this.__isCompleted) {
    var body = this.__extract(cursor, chunk, this.__header);
    if (body !== null) {
      this.__output = body;
      this.__isCompleted = true;
    }
  }

  return this.__isCompleted;
};


/**
 * @return {*}
 */
polina.Body.prototype.get = function() {
  return this.__output;
};
