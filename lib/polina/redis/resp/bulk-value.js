


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 */
polina.redis.resp.BulkValue = function(cursor) {
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
   * @type {number}
   */
  this.__length = -2;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.process = function(cursor, chunk) {

  while (cursor < chunk.length) {
    if (chunk[cursor] === 10) {
      if (this.__length === -1) {
        this.__output = '';
        this.__isComplete = true;
        cursor += 1;
        return cursor;
      }
      if (this.__length > -1) {
        this.__output = chunk.toString('utf8', cursor - this.__length - 1,
            cursor - 1);
        this.__isComplete = true;
        cursor += 1;
        return cursor;
      }
      if (this.__length === -2) {
        this.__length = Number(chunk.toString('utf8', this.__startPosition + 1,
            cursor - 1));
        cursor += 1;
      }
    }
    cursor += 1;
  }
  this.__length = -2;
  cursor = this.__startPosition;
  this.__startPosition = 0;
  return cursor;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getString = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getInteger = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getArray = function() {
  return [];
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getStartPosition = function() {

  return this.__startPosition;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.isError = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.get = function() {
  return this.__output;
};
