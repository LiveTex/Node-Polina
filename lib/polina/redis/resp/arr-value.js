


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 */
polina.redis.resp.ArrValue = function(cursor) {

  /**
   * @type {number}
   */
  this.__StartPosition = cursor + 1;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {Array}
   */
  this.__output = [];

  /**
   * @type {number}
   */
  this.__arrLength = -1;

  /**
   * @type {null}
   */
  this.__value = null;

};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.process = function(cursor, chunk) {

  while (cursor < chunk.length && this.__arrLength < 0) {
    if (chunk[cursor] === 13) {
      this.__arrLength = chunk.toString('utf8', this.__StartPosition, cursor);
      cursor += 2;

      if (this.__arrLength === 0) {
        this.__output = [];
        this.__isComplete = true;
        cursor += 2;
        return cursor;
      }
      break;
    }
    cursor += 1;
  }

  var curentPosition = this.subHandler(cursor, chunk);

  if (this.__output.length == this.__arrLength) {
    this.__isComplete = true;
    return curentPosition;
  }
  return curentPosition;
};


/**
 * @param {number} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 * @return {number} New cursor index.
 */
polina.redis.resp.ArrValue.prototype.subHandler = function(cursor, chunk) {

  if (this.__value === null) {
    this.__value = polina.redis.resp.createValue(cursor, chunk);

    if (this.__value !== null) {
      cursor = this.__value.getStartPosition();
    }
  }

  if (this.__value !== null) {
    cursor = this.__value.process(cursor, chunk);

    if (this.__value.isComplete()) {
      this.__output.push(this.__value.get());
      this.__value = null;
    }
  }
  return cursor;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.getString = function() {
  return '';
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.getInteger = function() {

  return 0;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.getArray = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.getStartPosition = function() {

  return this.__StartPosition;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.isError = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.get = function() {
  return this.__output;
};
