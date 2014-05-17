


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @extends {polina.PacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {!polina.thrift.FieldType} returnType Тип получаемого значения.
 * @param {!polina.thrift.IProtocol} protocol
 */
polina.thrift.PacketHandler = function(complete, cancel, returnType,
                                       protocol) {
  polina.PacketHandler.call(this);

  /**
   * @type {Array}
   */
  this.__result = [];

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__returnInfo = returnType;

  /**
   * @type {polina.thrift.IProtocol}
   */
  this.__protocol = protocol;

  /**
   * @type {polina.thrift.Field}
   */
  this.__currentValue = null;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {Object}
   */
  this.__header = null;
};

util.inherits(polina.thrift.PacketHandler,  polina.PacketHandler);

/**
 *
 */
polina.thrift.PacketHandler.prototype._complete = function(){

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
polina.thrift.PacketHandler.prototype._stopCondition = function(){
  return this.__currentValue.getType() === polina.thrift.Types.STOP;
};


/**
 *
 */
polina.thrift.PacketHandler.prototype._valueFactory = function(){
  return new polina.thrift.Field(this.__returnInfo);
};


/**
 *
 */
polina.thrift.PacketHandler.prototype._headerFactory =
    this.__protocol.readMessageHeader;

