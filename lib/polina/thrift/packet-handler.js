


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {polina.thrift.Types} type Тип получаемого значения.
 */
polina.thrift.PacketHandler = function(complete, cancel, type) {

  var self = this;

  this.__type = type;

  /**
   * @type {polina.thrift.IValue}
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
    } else if (type === polina.thrift.Types.STRING) {
      cancel(self.__value.getString());
    } else if (type === polina.thrift.Types.BOOL) {
      cancel(self.__value.getBool());
    } else if (type === polina.thrift.Types.BYTE ||
               type === polina.thrift.Types.I08 ||
               type === polina.thrift.Types.I16 ||
               type === polina.thrift.Types.I32 ||
               type === polina.thrift.Types.I64 ) {
      cancel(self.__value.getInteger());
    } else if (type === polina.thrift.Types.DOUBLE) {
      cancel(self.__value.getDouble());
    } else if (type === polina.thrift.Types.MAP) {
      cancel(self.__value.getMap());
    } else if (type === polina.thrift.Types.LIST ||
               type === polina.thrift.Types.SET) {
      cancel(self.__value.getArray());

      cancel('Unknown value type.');
    }
  };
};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.process = function(cursor, chunk) {

  var header = polina.thrift.readMessageBegin(cursor,chunk);
  if(header.type === polina.thrift.MessageTypes.EXCEPTION){
    console.log('YOOO nigga, it\'s EXCEPTION');

  } else if(header.type === polina.thrift.MessageTypes.REPLY){
    var field = polina.thrift.readFieldBegin(cursor,chunk);
  }

  if (this.__value === null) {
    this.__value = polina.thrift.createValue(field.type, cursor, chunk);
  }

  if (this.__value !== null) {
   this.__value.process(cursor, chunk);
    if (this.__value.isComplete()) {
      this.__isComplete = true;
      polina.thrift.readFieldEnd(cursor,chunk);
      process.nextTick(this.__valueHandler);
    }
  }

};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.reset = function() {
  this.__value = null;
};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.getHandledSize = function() {
  if (this.__value !== null) {
    return this.__value.getHandledSize();
  }

  return 0;
};

