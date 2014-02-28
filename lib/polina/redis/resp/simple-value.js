


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 * @param {boolean=} opt_isError Cursor index.
 */
polina.redis.resp.SimpleValue = function(cursor, opt_isError) {
  this.__cursor = cursor + 1;
  this.__isComplete = false;
  this.__output = '';
  this.__isError = opt_isError === true;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.process = function(cursor, chunk) {
  while (cursor < chunk.length) {
    if (chunk[cursor] === 13) {
      this.__isComplete = true;
      cursor = cursor + 2;
      break;
    }
    this.__output += String.fromCharCode(chunk[cursor]);
    cursor += 1;
  }

  this.__cursor = cursor;
  return cursor;
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
  return parseInt(this.__output);
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
polina.redis.resp.SimpleValue.prototype.getPosition = function() {
  return this.__cursor;
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
