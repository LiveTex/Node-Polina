


/**
 *
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 */
polina.redis.resp.StrValue = function(cursor, chunk) {
  this.__cursor = cursor + 1;
  this.__isComplete = false;
  this.__output = '';
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.process = function(cursor, chunk) {

  while (cursor < chunk.length) {
    if (chunk[cursor] == 13) {
      this.__isComplete = true;
      cursor = cursor + 2;
      break;
    }
    this.__output += String.fromCharCode(chunk[cursor]);
    cursor++;
  }

  this.__cursor = cursor;
  return cursor;
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.getString = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.getInteger = function() {
  return null;
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.getArray = function() {
  return null;
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.getPosition = function() {
  return this.__cursor;
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.isError = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.StrValue.prototype.get = function() {
  return this.__output;};
