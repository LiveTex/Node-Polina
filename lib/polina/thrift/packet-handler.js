


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {!polina.thrift.FieldType} returnType Тип получаемого значения.
 * @param {!polina.thrift.IProtocol} protocol
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.PacketHandler = function(complete, cancel, returnType,
                                       protocol, idl) {

  var self = this;

  /**
   * @type {!polina.thrift.IIdl}
   */
  this.__idl = idl;

  /**
   * @type {Array}
   */
  this.__valueQueue = [];

  /**
   * TODO #12 Не совсем понял про __returnInfo, переменных в общем может быть несколько, а
   * возвращаемый тип один?
   *
   * Тип один, могут прийти ёщё эксепшены.
   *
   * @type {!polina.thrift.FieldType}
   */
  this.__returnInfo = returnType;

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
   * TODO #11: Вообще от __header тебе нужен только его тип, может как-тоу простить?
   * Нужно ещё имя, если решим слушать запросы на выполнение методов.
   *
   * @type {Object}
   */
  this.__header = null;



  /**
   * @inheritDoc
   */
  this.__valueHandler = function() {
    var type = returnType.getType();
    var i = 0;

    // TODO #10: Ты шо несколько раз complete вызываешь??
    // complete один, cancels может быть несколько )
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
    this.__header = this.__protocol.readMessageHeader(cursor, chunk);

  }




  while (cursor.isParsed() && this.__header !== null && !this.__isComplete) {
    if (this.__value === null) {
      var fieldHeader = this.__protocol.readFieldHeader(cursor, chunk);

      if (cursor.isParsed() &&
          fieldHeader.type === polina.thrift.Types.STOP) {
        process.nextTick(this.__valueHandler);
        this.__isComplete = true;
        break;
      }

      if (cursor.isParsed()) {
        this.__value = polina.thrift.createValue(
            fieldHeader.type,
            this.__returnInfo,
            this.__header.type === polina.thrift.MessageTypes.EXCEPTION ||
                fieldHeader.id > 0,
            this.__idl);
      }
    }

    if (!this.__isComplete && cursor.isParsed() && this.__value !== null) {
      // TODO #8: Это тоже может возвращать boolean, как и PacketHandler, и
      // можно будет не вызывать isComplete
      this.__value.process(cursor, chunk, this.__protocol);

      if (this.__value.isComplete()) {
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
  // TODO #7: И массив наверное нужно очищать?
  this.__valueQueue = [];
  this.__value = null;
};

