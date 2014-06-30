polina.thrift.FieldHandler = function(complete) {
  polina.thrift.FieldHandler.call(this);
  this.__complete = complete;
};

util.inherits(polina.thrift.FieldHandler,  polina.PacketHandler);

/**
 *
 */
polina.thrift.FieldHandler.prototype._complete = function() {
  this.__complete(this.__result);
};


/**
 *
 */
polina.thrift.FieldHandler.prototype._stopCondition = function() {
  return this.__result.length === 1;
};


/**
 *
 */
polina.thrift.FieldHandler.prototype._valueFactory = function() {
  return polina.thrift.createValue(this.__header.type);
};


/**
 *
 */
polina.thrift.FieldHandler.prototype._headerFactory =
    this.__protocol.readFieldHeader;
