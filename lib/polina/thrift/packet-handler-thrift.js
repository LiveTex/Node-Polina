


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {!polina.thrift.FieldType} returnType Тип получаемого значения.
 * @param {!polina.thrift.IProtocol} protocol
 */
polina.thrift.ThriftPacketHandler = function(complete, cancel, returnType,
                                       protocol) {

  polina.thrift.PacketHandlerGeneric.call(this);

  var self = this;

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

  /**
   *
   */
	this.__complete = function(){

		if (self.__header.type === polina.thrift.MessageTypes.REPLY){
			process.nextTick(polina.thrift.completeReply(self.__result, complete, cancel));
		}

		if (self.__header.type === polina.thrift.MessageTypes.EXCEPTION){
			process.nextTick(polina.thrift.completeException(self.__result, cancel));
		}

		if (self.__header.type === polina.thrift.MessageTypes.CALL){
			process.nextTick(polina.thrift.completeCall(self.__result, self.__header.name));
		}
	};


  /**
   *
   */
  this.__stopCondition = function(){
    return this.__currentValue.getType() === polina.thrift.Types.STOP;
  };


  /**
   *
   */
  this.__valueFactory = function(){
    return new polina.thrift.Field(returnType);
  };


  /**
   *
   */
  this.__headerFactory = this.__protocol.readMessageHeader;

};

util.inherits(polina.thrift.ThriftPacketHandler,
    polina.thrift.PacketHandlerGeneric);