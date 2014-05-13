


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {!polina.thrift.FieldType} returnType Тип получаемого значения.
 * @param {!polina.thrift.IProtocol} protocol
 */
polina.thrift.PacketHandler = function(complete, cancel, returnType,
                                       protocol) {

  var self = this;

  /**
   * @type {Array}
   */
  this.__fields = [];

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
  this.__currentField = null;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {Object}
   */
  this.__header = null;


	this.__completeMessage = function(){

		if (self.__header.type === polina.thrift.MessageTypes.REPLY){
			process.nextTick(polina.thrift.completeReply(self.__valueQueue, complete, cancel));
		}

		if (self.__header.type === polina.thrift.MessageTypes.EXCEPTION){
			process.nextTick(polina.thrift.completeException(self.__valueQueue, cancel));
		}

		if (self.__header.type === polina.thrift.MessageTypes.CALL){
			process.nextTick(polina.thrift.completeCall(self.__valueQueue, self.__header.name));
		}
	}

};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.process = function(cursor, chunk) {

  if (cursor.isParsed() && this.__header === null) {
    this.__header = this.__protocol.readMessageHeader(cursor, chunk);
  }

  while (cursor.isParsed()) {
    if ( this.__currentField === null) {
			this.__currentField = this.__protocol.readField(cursor, chunk);
      if (cursor.isParsed()) {
				if (this.__currentField.getType() === polina.thrift.Types.STOP){
					this.__completeMessage();
					this.__isComplete = true;
				}
      }
    }

    if (cursor.isParsed() &&  this.__currentField !== null) {
      if (this.__currentField.process(cursor, chunk)) {
         this.__fields.push(this.__currentField);
         this.__currentField = null;
      }
    }
  }
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandler.prototype.reset = function() {
  this.__valueQueue = [];
  this.__value = null;
};

