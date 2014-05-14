


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {polina.thrift.Types} type
 * @param {!polina.thrift.FieldType} valueInfo
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.ArrayValue = function(type, valueInfo, idl) {
  console.log('Array with elements', valueInfo.getType());

  polina.thrift.PacketHandlerGeneric.call(this);
	/**
	 * @type {number}
	 */
	this.__type = type;

  /**
   * @type {!polina.thrift.IIdl}
   */
  this.__idl = idl;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__valueInfo = valueInfo.getVInfo();

  /**
   * @type {!Array}
   */
  this.__output = [];

  /**
   * @type {boolean}
   */
  this.__isComplit = false;

  /**
   * @type {Object}
   */
  this.__header = null;

  /**
   * @type {polina.thrift.IValue}
   */
  this.__element = null;

  /**
   * @type {boolean}
   */
  this.__isError = false;


  /**
   *
   */
  this.__complete = function(){

  };


  /**
   *
   */
  this.__stopCondition = function(){
    return this.__output.size === this.__header.size;
  };

  /**
   *
   */
  this.__valueFactory = function(){
    return polina.thrift.createValue(this.__valueInfo.getType(),
        this.__valueInfo, this.__idl);
  };


  /**
   *
   */
  this.__headerFactory = protocol.readListHeader;


};

util.inherits(polina.thrift.ArrayValue, polina.thrift.PacketHandlerGeneric);

/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getBool = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getInt64 = function() {
  return null;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getNumber = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getArray = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getMap = function() {
  return {};
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.get = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.isError = function() {
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getString = function() {
  var exception = 'Wrong Return type, ' + '\n Value type: ' +
      this.__header.type + ' expected: ' + this.__valueInfo.getType();

  return this.isError() ? exception : '';
}

