


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 */
polina.redis.resp.IntValue = function(cursor, chunk) {

  this.__cursor = cursor + 1;
  this.__isComplete = false;
  this.__output = '';
};


/**
 * @inheritDoc
 */
polina.redis.resp.IntValue.prototype.process = function(cursor, chunk) {

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
polina.redis.resp.IntValue.prototype.getString = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.IntValue.prototype.getInteger = function() {
  return parseInt(this.__output);
};


/**
 * @inheritDoc
 */
polina.redis.resp.IntValue.prototype.getArray = function() {
  return null;
};


/**
 * @inheritDoc
 */
polina.redis.resp.IntValue.prototype.getPosition = function() {

  return this.__cursor;
};


/**
 * @inheritDoc
 */
polina.redis.resp.IntValue.prototype.isError = function() {

};


/**
 * @inheritDoc
 */
polina.redis.resp.IntValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.IntValue.prototype.get = function() {
  return parseInt(this.__output);};
