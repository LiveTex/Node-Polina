


/**
 * @constructor
 * @extends {polina.PacketHandler}
 * @param {!polina.thrift.FieldType} valueInfo
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.ArrayHandler = function(valueInfo, idl, complete, cancel) {
  console.log('Array with elements', valueInfo.getType());

  polina.PacketHandler.call(this);

  /**
   * @type {!polina.thrift.IIdl}
   */
  this.__idl = idl;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__valueInfo = valueInfo.getVInfo();
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
  return polina.thrift.createValue(this.__valueInfo.getType(),
      this.__valueInfo, this.__idl);
};

/**
 *
 */
polina.thrift.ArrayHandler.prototype._headerFactory = this.protocol.readListHeader;
