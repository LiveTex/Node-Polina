


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {polina.hbase.thrift.Types} type Тип получаемого значения.
 */
polina.hbase.PacketHandler = function(complete, cancel, type) {
  var self = this;

  this.__header = {};

  this.__type = type;

  /**
   * @type {polina.hbase.thrift.IValue}
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
      cancel('Broken value.');
    } else if (self.__value.isError()) {
      cancel(self.__value.getString());
    } else if (type === polina.hbase.thrift.Types.STRING) {
      cancel(self.__value.getString());
    } else if (type === polina.hbase.thrift.Types.BOOL) {
      cancel(self.__value.getBool());
    } else if (type === polina.hbase.thrift.Types.BYTE ||
               type === polina.hbase.thrift.Types.I08 ||
               type === polina.hbase.thrift.Types.I16 ||
               type === polina.hbase.thrift.Types.I32 ||
               type === polina.hbase.thrift.Types.I64 ) {
      cancel(self.__value.getInteger());
    } else if (type === polina.hbase.thrift.Types.DOUBLE) {
      cancel(self.__value.getDouble());
    } else if (type === polina.hbase.thrift.Types.MAP) {
      cancel(self.__value.getMap());
    } else if (type === polina.hbase.thrift.Types.LIST ||
               type === polina.hbase.thrift.Types.SET) {
      cancel(self.__value.getArray());

      cancel('Unknown value type.');
    }
  };
};


/**
 * @inheritDoc
 */
polina.hbase.PacketHandler.prototype.process = function(cursor, chunk) {
  if (this.__value === null && chunk.length >= 8) {
    this.__header = polina.hbase.thrift.IProtocol.readMessageBegin(chunk);
    cursor += 8;
    this.__value = polina.hbase.createValue(this.__type);
  }
  if (this.__value !== null) {
    var prevPosition = cursor;
    cursor = this.__value.process(cursor, chunk);
    if (this.__value.isComplete()) {
      this.__isComplete = true;
      process.nextTick(this.__valueHandler);
    } else {
      cursor = prevPosition;
    }
  }
 return cursor;
};


/**
 * @inheritDoc
 */
polina.hbase.PacketHandler.prototype.reset = function() {
  this.__value = null;
};


/**
 * @inheritDoc
 */
polina.hbase.PacketHandler.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.hbase.PacketHandler.prototype.getHandledSize = function() {
  if (this.__value !== null) {
    return this.__value.getHandledSize();
  }

  return 0;
};

