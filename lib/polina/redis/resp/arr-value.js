


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 */
polina.redis.resp.ArrValue = function(cursor, chunk) {

  /**
   * @type {number}
   */
  this.__cursor = cursor + 1;

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

  this.__subHandler = function(cursor, chunk) {

  };


};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.process = function(cursor, chunk) {
  var tempData = '';
  while (cursor < chunk.length && this.__arrLength < 0) {

    if (chunk[cursor] == 13) {
      this.__arrLength = parseInt(tempData);
      cursor += 2;

      if (this.__arrLength < 0) {
        this.__output = 'null';
        this.__isComplete = true;
        return cursor;
      }

      if (this.__arrLength == 0) {
        this.__output = [];
        this.__isComplete = true;
        return cursor;
      }

      break;
    }
    tempData += String.fromCharCode(chunk[cursor]);
    cursor++;
  }

  this.__cursor = this.subHandler(cursor, chunk);

  if (this.__output.length == this.__arrLength) {
    this.__isComplete = true;
    return this.__cursor;
  }
  return this.__cursor;
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
      cursor = this.__value.getPosition();
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
  return null;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.getInteger = function() {

  return null;
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
polina.redis.resp.ArrValue.prototype.getPosition = function() {

  return this.__cursor;
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
