


/**
 * Redis packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {polina.redis.resp.ValueType} type Тип получаемого значения.
 */
polina.redis.PacketHandler = function(complete, cancel, type) {
  var self = this;

  /**
   * @type {polina.redis.resp.IValue}
   */
  this.__value = null;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   *
   */
  this.__valueHandler = function() {
    if (self.__value === null) {
      cancel('Broken value. [polina.redis.PacketHandler#__valueHandler]');
    } else if (self.__value.isError()) {
      cancel(self.__value.getString());
    } else if (type === polina.redis.resp.ValueType.STRING) {
      complete(self.__value.getString());
    } else if (type === polina.redis.resp.ValueType.INTEGER) {
      complete(self.__value.getInteger());
    } else if (type === polina.redis.resp.ValueType.ARRAY) {
      complete(self.__value.getArray());
    } else {
      cancel('Unknown value type. [polina.redis.PacketHandler#__valueHandler]');
    }
  };
};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.process = function(cursor, chunk) {

  if (this.__value === null) {
    this.__value = polina.redis.resp.createValue(cursor, chunk);
    if (this.__value === null) {
      cursor.breakParsing();
    }
  }

  if (this.__value !== null) {
    this.__value.process(cursor, chunk);

    if (this.__value.isComplete()) {
      this.__isComplete = true;
      process.nextTick(this.__valueHandler);
    } else {
      cursor.breakParsing();
    }
  }
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.reset = function() {
  this.__value = null;
};
