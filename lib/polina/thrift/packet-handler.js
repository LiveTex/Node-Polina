/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {polina.thrift.Types} type Тип получаемого значения.
 * @param clientType
 */
polina.thrift.PacketHandler = function(complete, cancel, type, clientType) {

  var self = this;
  this.__valueQueue = [];
  this.__type = type;
  this.__clientType = clientType;

  /**
   * @type {polina.thrift.IValue}
   */

  this.__value = null;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;


  this.__header = null;



  /**
   *
   */
  this.__valueHandler = function() {

    var i = self.__valueQueue.length;
    while(i--){
      if (self.__valueQueue[i] === null) {
        cancel('Broken value.');
      } else if (self.__valueQueue[i].isError()) {
        cancel(self.__valueQueue[i].getString());
      } else if (type === polina.thrift.Types.STRING) {
        cancel(self.__valueQueue[i].getString());
      } else if (type === polina.thrift.Types.BOOL) {
        cancel(self.__valueQueue[i].getBool());
      } else if (type === polina.thrift.Types.BYTE ||
                 type === polina.thrift.Types.I08 ||
                 type === polina.thrift.Types.I16 ||
                 type === polina.thrift.Types.I32 ||
                 type === polina.thrift.Types.I64 ) {
        cancel(self.__valueQueue[i].getInteger());
      } else if (type === polina.thrift.Types.DOUBLE) {
        cancel(self.__valueQueue[i].getDouble());
      } else if (type === polina.thrift.Types.MAP) {
        cancel(self.__valueQueue[i].getMap());
      } else if (type === polina.thrift.Types.LIST ||
                 type === polina.thrift.Types.SET) {
        cancel(self.__valueQueue[i].getArray());
      } else if (type === polina.thrift.Types.STRUCT){
        cancel(self.__valueQueue[i].get());

        cancel('Unknown value type.');
      }
    }
  };

};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.process = function(cursor, chunk) {

  if ( cursor.isParsed() && this.__header === null) {
    console.log ('New Header');
    this.__header = polina.thrift.readMessageBegin(cursor,chunk);

    if(cursor.isParsed()){
      if ( this.__header.type === polina.thrift.MessageTypes.EXCEPTION) {
        console.log('YOOO nigga, it\'s EXCEPTION');
      }
    }
  }

  while (cursor.isParsed() &&  this.__header !== null) {

    if (cursor.isParsed() && this.__value === null) {

      if (this.__header.type === polina.thrift.MessageTypes.REPLY) {
        var field = polina.thrift.readFieldBegin(cursor,chunk);
        console.log('FIELD ' + field.type);
      }

      if (cursor.isParsed() && field.type === polina.thrift.Types.STOP) {
        console.log('STOP');
        process.nextTick(this.__valueHandler);
        this.__isComplete = true;
        break;
      }

      this.__value = polina.thrift.createValue(field.type, this.__clientType );
      if (this.__value === null) {
        cursor.breakParsing();
      }
    }

    if (cursor.isParsed() && this.__value !== null) {
      this.__value.process(cursor, chunk);
        if (this.__value.isComplete()) {
        this.__valueQueue.push(this.__value);
        this.__value = null;
      } else  {
        cursor.breakParsing();
      }
    }
  }
  console.log('GO HOME!!! ' + this.__valueQueue[1]);
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

