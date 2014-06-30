


/**
 * @constructor
 * @extends {polina.PacketHandler}
 */
polina.thrift.ArrayHandler = function() {
  polina.PacketHandler.call(this);

};

util.inherits(polina.thrift.ArrayHandler, polina.PacketHandler);

/**
 *
 */
polina.thrift.ArrayHandler.prototype._complete = function(){

};



/**
 *
 */
polina.thrift.ArrayHandler.prototype._stopCondition = function(){
  return this.__output.size === this.__header.size;
};


/**
 *
 */
polina.thrift.ArrayHandler.prototype._valueFactory = function(){
  return polina.thrift.createValue(this.__header.type);
};

/**
 *
 */
polina.thrift.ArrayHandler.prototype._headerFactory =
    this.protocol.readListHeader;
