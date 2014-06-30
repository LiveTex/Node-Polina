


/**
 * @constructor
 * @implements {polina.IMessageHandler}
 * @extends {polina.MessageHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {!polina.thrift.FieldType} returnType Тип получаемого значения.
 * @param {!polina.thrift.IProtocol} protocol
 */
polina.thrift.MessageHandler = function(complete, cancel, returnType,
                                       protocol) {
  polina.PacketHandler.call(this);

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__returnInfo = returnType;

  /**
   * @type {polina.thrift.IProtocol}
   */
  this.__protocol = protocol;
};

util.inherits(polina.thrift.MessageHandler,  polina.PacketHandler);

/**
 *
 */
polina.thrift.MessageHandler.prototype._complete = function(){

  if (this.__header.type === polina.thrift.MessageTypes.REPLY){
    process.nextTick(polina.thrift.completeReply(this.__result, complete, cancel));
  }

  if (this.__header.type === polina.thrift.MessageTypes.EXCEPTION){
    process.nextTick(polina.thrift.completeException(this.__result, cancel));
  }

  if (this.__header.type === polina.thrift.MessageTypes.CALL){
    process.nextTick(polina.thrift.completeCall(this.__result, this.__header.name));
  }
};


/**
 *
 */
polina.thrift.MessageHandler.prototype._stopCondition = function(){
  return this.__currentValue.getType() === polina.thrift.Types.STOP;
};


/**
 *
 */
polina.thrift.MessageHandler.prototype._valueFactory = function(){
  return new polina.thrift.FieldHandler();
};


/**
 *
 */
polina.thrift.MessageHandler.prototype._headerFactory =
    this.__protocol.readMessageHeader;

