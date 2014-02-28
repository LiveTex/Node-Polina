


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 */
polina.redis.resp.BulkValue = function(cursor) {
  this.__startPosition = cursor + 1;
  this.__cursor = this.__startPosition;
  this.__isComplete = false;
  this.__output = '';
  this.__bulkLength = -1;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.process = function(cursor, chunk) {


  while (cursor < chunk.length) {
    if (chunk[this.__startPosition] == '-'.charCodeAt(0)) {
      this.__output = 'null';
      cursor += 3;
      this.__isComplete = true;
      break;
    }

    if (chunk[cursor] == 13) {
      cursor = cursor + 2;
      if (this.__bulkLength < 0) {
        this.__bulkLength = this.__output;
        this.__output = '';
      }
      else {
        this.__isComplete = true;
        break; }
    }
    this.__output += String.fromCharCode(chunk[cursor]);
    cursor++;
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
polina.redis.resp.BulkValue.prototype.getPosition = function() {

  return this.__cursor;
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
