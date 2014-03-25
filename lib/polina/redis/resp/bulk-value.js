


/**
 * @constructor
 * @implements {polina.redis.resp.IValue}
 */
polina.redis.resp.BulkValue = function() {

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {string}
   */
  this.__output = '';

  /**
   * @type {number}
   */
  this.__length = 0;


  /**
   * @type {boolean}
   */
  this.__isLengthComplite = false;


};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.process = function(cursor, chunk) {

  var valueCursor = cursor.getPosition();

  while (valueCursor < chunk.length && !this.__isLengthComplite) {

    if (chunk[valueCursor] > 47 && this.__length > -1) {
      this.__length = (this.__length * 10) + (chunk[valueCursor] - 48);
    }

    if (chunk[valueCursor] === 45) {
      this.__length = -1;
    }

    if (chunk[valueCursor] === 10) {
      this.__isLengthComplite = true;

      if (this.__length === -1) {
        this.__isComplete = true;
      }
    }
    valueCursor += 1;
  }


  if (!this.__isComplete) {
    if ((valueCursor + this.__length + 1) < chunk.length) {
      this.__output = String(chunk.slice(valueCursor,
          valueCursor + this.__length));

      this.__isComplete = true;
      valueCursor += this.__length + 2;
    }
  }
  cursor.incrPosition(valueCursor - cursor.getPosition());
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getString = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getInteger = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.getArray = function() {
  return [];
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.isError = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.BulkValue.prototype.get = function() {
  return this.__output;
};
