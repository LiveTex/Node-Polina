


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
  this.__length = -1;

  /**
   * @type {polina.redis.resp.IValue}
   */
  this.__value = null;
};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.process = function(cursor, chunk) {
  while (cursor < chunk.length && this.__length < 0) {
    this.__handledSize += 1;

    if (chunk[cursor] === 10) {
      this.__length = Number(chunk.toString('utf8',
          cursor - this.__handledSize + 2, cursor - 1));

      cursor += 1;

      if (this.__length === 0) {
        this.__isComplete = true;
      }

      break;
    }

    cursor += 1;
  }


  while (this.__length > 0 && cursor < chunk.length && !this.__isComplete) {

    cursor = this.__subHandler(cursor, chunk);

    if (this.__value.isComplete()) {
      this.__output.push(this.__value.get());
      this.__value = null;
    } else {
      break;
    }

    if (this.__output.length === this.__length) {
      this.__isComplete = true;
      break;
    }
  }


  return cursor;
};


/**
 * @param {number} cursor Cursor index.
 * @param {!Buffer} chunk Data package.
 * @return {number} New cursor index.
 */
polina.redis.resp.ArrValue.prototype.__subHandler = function(cursor, chunk) {
  if (this.__value === null) {
    this.__value = polina.redis.resp.createValue(cursor, chunk);
  }

  if (this.__value !== null) {
    cursor = this.__value.process(cursor, chunk);
    this.__handledSize += this.__value.getHandledSize();
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
