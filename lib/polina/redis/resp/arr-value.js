


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 */
polina.redis.resp.ArrValue = function() {

  /**
   * @type {number}
   */
  this.__handledSize = 0;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {!Array}
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
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.process = function(cursor, chunk) {

  var valueCursor = cursor.getPosition();

  while (valueCursor < chunk.length && !this.__isLengthComplite) {

    this.__handledSize += 1;

    if (chunk[valueCursor] > 47 && !this.__isComplete) {
      this.__length = (this.__length * 10) + (chunk[valueCursor] - 48);
    }

    if (chunk[valueCursor] === 45) {
      this.__isComplete = true;
      this.__length = -1;
      this.__output = null;
    }

    if (chunk[valueCursor] === 10) {
      this.__isLengthComplite = true;

      if (this.__length === 0) {
        this.__isComplete = true;
      }
    }
    valueCursor += 1;
  }


  cursor.incrPosition(valueCursor - cursor.getPosition());

  while (this.__length > 0 && !this.__isComplete && cursor.isParsed()) {

    this.__subHandler(cursor, chunk);

    if (this.__value.isComplete()) {
      this.__output.push(this.__value.get());
      this.__value = null;
    }

    if (this.__output.length === this.__length) {
      this.__isComplete = true;
      break;
    }
  }

  if (!this.__isComplete) {
    cursor.endParsing();
  }

};


/**
 * @param {number} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 */
polina.redis.resp.ArrValue.prototype.__subHandler = function(cursor, chunk) {
  if (this.__value === null) {
    this.__value = polina.redis.resp.createValue(cursor, chunk);
  }

  if (this.__value !== null) {
    this.__value.process(cursor, chunk);
    this.__handledSize += this.__value.getHandledSize();
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


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.getHandledSize = function() {
  return this.__handledSize;
};
