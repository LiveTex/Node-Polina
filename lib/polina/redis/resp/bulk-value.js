


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 */
polina.redis.resp.BulkValue = function() {

  /**
   * @type {number}
   */
  this.__handledSize = 0;

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
    this.__handledSize += 1;

    if (chunk[cursor] === 10) {
      if (this.__length > -1) {
        this.__isComplete = true;
        this.__output = chunk.toString('utf8',
            cursor - this.__length - 1, cursor - 1);

        cursor += 1;
        break;
      }

      if (this.__length === -2) {
        this.__length = Number(chunk.toString('utf8',
            cursor - this.__handledSize + 2, cursor - 1));

        this.__handledSize += 1;
        cursor += 1;

        if (this.__length === -1) {
          this.__isComplete = true;
          break;
        }
      }
    }

    cursor += 1;
  }

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


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getHandledSize = function() {
  return this.__handledSize;
};
