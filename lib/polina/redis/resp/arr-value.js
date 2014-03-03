


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 * @param {number} cursor Cursor index.
 */
polina.redis.resp.ArrValue = function(cursor) {
  /**
   * @type {number}
   */
  this.__startPosition = cursor;

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
  this.__length = -1;

  /**
   * @type {polina.redis.resp.IValue}
   */
  this.__value = null;

  /**
   * @type {number}
   */
  this.__subValueStartPosition = 0;

};


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.process = function(cursor, chunk) {

  while (cursor < chunk.length && this.__length < 0) {
    if (chunk[cursor] === 10) {
      this.__length = Number(chunk.toString('utf8', this.__startPosition + 1,
          cursor - 1));
      cursor += 1;

      if (this.__length === 0) {
        this.__output = [];
        this.__isComplete = true;
        return cursor;
      }
      break;
    }
    cursor += 1;
  }


  while (this.__length > 0) {
    cursor = this.subHandler(cursor, chunk);
    if (cursor == this.__subValueStartPosition) {
      break;
    }

    if (this.__output.length == this.__length) {
      this.__isComplete = true;
      return cursor;
    }
  }



  cursor = this.__startPosition;
  this.__startPosition = 0;
  this.__length = -1;
  this.__output = [];
  this.__value = null;
  return cursor;
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
      this.__subValueStartPosition = cursor;
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

  return this.__startPosition;
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
