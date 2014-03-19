


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

  if (!this.__isLengthComplite){
   // console.log('!!!!');
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
 *
 * @param cursor
 * @param chunk
 * @private
 */
polina.redis.resp.ArrValue.prototype.__readLength = function(cursor, chunk) {
  while (cursor.getPosition() < chunk.length && !this.__isLengthComplite) {

    this.__handledSize += 1;

    if (chunk[cursor.getPosition()] > 47 && !this.__isComplete) {
      this.__length = (this.__length * 10) + (chunk[cursor.getPosition()] - 48);
    }

    if (chunk[cursor.getPosition()] === 45) {
      this.__length = -1;
      this.__output = null;
    }

    if (chunk[cursor.getPosition()] === 10) {
    //  console.log('Length complite in' + cursor.getPosition());
   //   console.log('Length  is' + cursor.getPosition());
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
    //console.log('Create subValue in ' + cursor.getPosition());
    this.__value = polina.redis.resp.createValue(cursor, chunk);
    if (this.__value === null) {
      cursor.breakParsing();
    }
  }

  if (this.__value !== null) {

    var temp = this.__value.getHandledSize();
    this.__value.process(cursor, chunk);
    this.__handledSize += (this.__value.getHandledSize() - temp);
   // console.log('this.__handledSize after sub Process' + this.__handledSize);
    if (this.__value.isComplete()) {
      this.__output.push(this.__value.get());
      this.__value = null;
    } else {
     // console.log('Break subheandler in ' + cursor.getPosition());
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


/**
 * @inheritDoc
 */
polina.redis.resp.ArrValue.prototype.getHandledSize = function() {
  return this.__handledSize;
};
