


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {number} type Тип получаемого значения.
 * @param {polina.thrift.IProtocol} protocol
 * @param {polina.hbase.IUserProtocol} userProtocol
 */
polina.thrift.PacketHandler = function(complete, cancel, type,
                                       protocol, userProtocol) {

  var self = this;

  /**
   * @type {polina.hbase.IUserProtocol}
   */
  this.__userProtocol = userProtocol;

  /**
   * @type {Array}
   */
  this.__valueQueue = [];

  /**
   * @type {number}
   */
  this.__type = type;

  /**
   * @type {polina.thrift.IProtocol}
   */
  this.__protocol = protocol;

  /**
   * @type {polina.thrift.IValue}
   */
  this.__value = null;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {Object}
   */
  this.__header = null;



  /**
   * @inheritDoc
   */
  this.__valueHandler = function() {
    var i = 0;
    while (i < self.__valueQueue.length) {
      if (self.__valueQueue[i] === null) {
        cancel('Broken value.');
      } else if (self.__valueQueue[i].isError()) {
        cancel('EXCEPTION:' + self.__valueQueue[i].getString());
      } else if (type === polina.thrift.Types.STRING ||
                 type === polina.thrift.Types.I64) {
        complete(self.__valueQueue[i].getString());
      } else if (type === polina.thrift.Types.BOOL) {
        complete(self.__valueQueue[i].getBool());
      } else if (type === polina.thrift.Types.BYTE ||
                 type === polina.thrift.Types.I08 ||
                 type === polina.thrift.Types.I16 ||
                 type === polina.thrift.Types.I32) {
        complete(self.__valueQueue[i].getInteger());
      } else if (type === polina.thrift.Types.DOUBLE) {
        complete(self.__valueQueue[i].getDouble());
      } else if (type === polina.thrift.Types.MAP) {
        complete(self.__valueQueue[i].getMap());
      } else if (type === polina.thrift.Types.LIST ||
                 type === polina.thrift.Types.SET) {
        complete(self.__valueQueue[i].getArray());
      } else if (type === polina.thrift.Types.STRUCT) {
        complete(self.__valueQueue[i].get());

        cancel('Unknown value type.');
      }
      i += 1;
    }
  };

};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.process = function(cursor, chunk) {

  if (cursor.isParsed() && this.__header === null) {
    this.__header = this.__protocol.readMessageBegin(cursor, chunk);
  }

  while (!this.__isComplete && cursor.isParsed() && this.__header !== null) {

    if (this.__value === null) {
      var field = this.__protocol.readFieldBegin(cursor, chunk);
      if (cursor.isParsed() && field.type === polina.thrift.Types.STOP) {
        console.log('STOP__________________________________________________');
        process.nextTick(this.__valueHandler);
        this.__isComplete = true;
        break;
      }

      if (cursor.isParsed()) {
        console.log('Create  value with type ', field.type);

        this.__value = polina.thrift.createValue(
            field.type,
            this.__header.name,
            this.__userProtocol,
            this.__header.type === polina.thrift.MessageTypes.EXCEPTION ||
            field.id > 0);
      }
    }

    if (!this.__isComplete && cursor.isParsed() && this.__value !== null) {
      console.log('Process value');
      this.__value.process(cursor, chunk, this.__protocol);

      if (this.__value.isComplete()) {
        console.log('value complete', this.__value.__output);
        this.__valueQueue.push(this.__value);
        this.__value = null;

      } else {
        cursor.breakParsing();
      }
    }
  }
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.reset = function() {
  this.__value = null;
};

