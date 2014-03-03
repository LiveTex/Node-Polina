


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 * @param {boolean=} opt_isError Cursor index.
 */
polina.redis.resp.SimpleValue = function(cursor, opt_isError) {

  /**
   * @type {number}
   */
  this.__startPosition = cursor;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {string}
   */
  this.__output = '';

  /**
   * @type {boolean}
   */
  this.__isError = opt_isError === true;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.process = function(cursor, chunk) {

  while (cursor < chunk.length) {
    if (chunk[cursor] === 10) {
      this.__output = chunk.toString('utf8', this.__startPosition + 1,
          cursor - 1);
      cursor += 1;
      this.__isComplete = true;
      return cursor;
    }
    cursor += 1;
  }
  return this.__startPosition;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.getString = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.getInteger = function() {
  return parseInt(this.__output, 10);
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.getArray = function() {
  return [];
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.getStartPosition = function() {
  return this.__startPosition;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.isError = function() {
  return this.__isError;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.get = function() {
  return this.__output;
};
