2;



/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 */
polina.redis.resp.ErrValue = function(cursor, chunk) {
  this.__cursor = cursor + 1;
  this.__isComplete = false;
  this.__output = '';
  this.__errorType = '';

};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.process = function(cursor, chunk) {


  while (cursor < chunk.length) {

    if (chunk[cursor] == 13) {
      this.__isComplete = true;
      cursor = cursor + 2;
      break;
    }

    if (chunk[cursor] == 32 && this.__errorType == '') {
      this.__errorType = this.__output;
      this.__output = '';
      cursor++;
    }

    this.__output += String.fromCharCode(chunk[cursor]);
    cursor++;

  }
  return cursor;

};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.getString = function() {
  return this.__errorType + ' ' + this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.getInteger = function() {
  return null;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.getArray = function() {
  return null;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.getPosition = function() {
  return this.__cursor;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.isError = function() {
  return true;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ErrValue.prototype.get = function() {
  return this.__errorType + ' ' + this.__output;
};
