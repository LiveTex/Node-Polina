


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

 // console.log("Process Array in " + cursor.getPosition());
  //console.log("chunk !!!!!!!!!!!! " + chunk.length);

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
      this.__isLengthComplite = true;
      if (this.__length <= 0) {
        this.__isComplete = true;
      }
     // console.log("Size " + this.__length);
    }
    cursor.incrPosition(1);
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
polina.redis.resp.ArrValue.prototype.__subHandler = function(cursor, chunk) {

  if (this.__value === null) {
    this.__value = polina.redis.resp.createValue(cursor, chunk);
    if (this.__value === null) {
      cursor.breakParsing();
//      console.log('Break in create value');
    }
  }

  if (this.__value !== null) {
    var newData = this.__value.getHandledSize();
    this.__value.process(cursor, chunk);
    this.__handledSize += this.__value.getHandledSize() - newData;
    if (this.__value.isComplete()) {
      //console.log("Complite " + this.__output);
      this.__output.push(this.__value.get());
      this.__value = null;
    } else {

//      console.log('__________________Break cursor in SubHandler in ' + cursor.getPosition());
//      console.log('Chunk Length ' + chunk.length);
//      console.log('Array  handledSize ' +   this.__handledSize);

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
