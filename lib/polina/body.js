


/**
 * @param {!function(!polina.Cursor, !Buffer, !polina.Header)} extractor
 * @param {!polina.Header} header
 * @constructor
 * @extends {polina.PacketHandler}
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

};


/**
 * @inheritDoc
 */
polina.Body.prototype.process = function(cursor, chunk) {
  var body = this.__extract(cursor, chunk, this.__header);
  if (body !== null) {
    this.__output = body;
    return true;
  }
  return false;
};


/**
 * @inheritDoc
 */
polina.Body.prototype.reset = function() {
  this.__output = null;
};


/**
 * @return {*}
 */
polina.Body.prototype.get = function() {
  return this.__output;
};
