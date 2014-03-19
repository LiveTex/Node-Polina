


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 */
polina.redis.resp.ArrValue = function() {

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {!Array.<polina.redis.resp.IValue>|null}
   */
  this.__output = [];

  /**
   * @type {number}
   */
  this.__length = 0;

  /**
   * @type {polina.redis.resp.IValue}
   */
  this.__value = null;


  this.__isLengthComplite = false;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.process = function(cursor, chunk) {

  if (!this.__isLengthComplite) {
    this.__readLength(cursor, chunk);
  }

  while (this.__length > 0 && !this.__isComplete && cursor.isParsed()) {
    this.__subHandler(cursor, chunk);
    if (this.__output.length === this.__length) {
      this.__isComplete = true;
      break;
    }
  }

};


/**
 * @param {polina.Cursor} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 */
polina.redis.resp.ArrValue.prototype.__readLength = function(cursor, chunk) {

  while (cursor.getPosition() < chunk.length && !this.__isLengthComplite) {

    if (chunk[cursor.getPosition()] > 47 && !this.__isComplete) {
      this.__length = (this.__length * 10) + (chunk[cursor.getPosition()] - 48);
    }

    if (chunk[cursor.getPosition()] === 45) {
      this.__length = -1;
      this.__output = null;
    }

    if (chunk[cursor.getPosition()] === 10) {
      this.__isLengthComplite = true;
      if (this.__length <= 0) {
        this.__isComplete = true;
      }
    }
    cursor.incrPosition(1);
  }
};


/**
 * @param {polina.Cursor} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 */
polina.redis.resp.ArrValue.prototype.__subHandler = function(cursor, chunk) {

  if (this.__value === null) {
    this.__value = polina.redis.resp.createValue(cursor, chunk);
    if (this.__value === null) {
      cursor.breakParsing();
    }
  }

  if (this.__value !== null) {
    this.__value.process(cursor, chunk);
    if (this.__value.isComplete()) {
      this.__output.push(this.__value.get());
      this.__value = null;
    } else {
      cursor.breakParsing();
    }
  }
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
