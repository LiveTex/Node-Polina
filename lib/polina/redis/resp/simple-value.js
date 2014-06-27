


/**
 * @constructor
 * @implements {polina.IValue}
 * @param {boolean=} opt_isError Cursor index.
 */
polina.redis.resp.SimpleValue = function(opt_isError) {

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {string}
   */
  this.__output = '';

  /**
   * @type {boolean}
   */
  this.__isError = opt_isError === true;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.process = function(cursor, chunk) {
  var valueCursor = cursor.getPosition();

  while (valueCursor < chunk.length) {
    if (chunk[valueCursor] === 10) {
      this.__isComplete = true;
      this.__output = chunk.toString('utf8',
          cursor.getPosition() + 1, valueCursor - 1);
      valueCursor += 1;
      cursor.incrPosition(valueCursor - cursor.getPosition());
      break;
    }
    valueCursor += 1;
  }
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.getString = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.getInteger = function() {
  return parseInt(this.__output, 10);
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.getStringArray = function() {
  return [''];
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.isError = function() {
  return this.__isError;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.resp.SimpleValue.prototype.get = function() {
  return this.__output;
};
