


// перенести I64  в SimpleValue
/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {number} type
 * @param {boolean} isError
 */
polina.thrift.NumericValue = function(type, isError) {
  console.log('Create NumericValue');

  /**
   * @type {number}
   */
  this.__type = type;

  /**
   * @type {number}
   */
  this.__output = 0;

  /**
   * @type {boolean}
   */
  this.__isComplit = false;

  /**
   * @type {boolean}
   */
  this.__isError = isError;
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.process = function(cursor, chunk,
                                                        protocol) {

  if (this.__type === polina.thrift.Types.I32) {
    this.__output = protocol.readI32(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.BYTE) {
    this.__output = protocol.readByte(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.I16) {
    this.__output = protocol.readI16(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.DOUBLE) {
    this.__output = protocol.readDouble(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.BOOL) {
    this.__output = protocol.readBool(cursor, chunk);
  }

  if (cursor.isParsed()) {
    this.__isComplit = true;
  }
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.getBool = function() {
  return this.__output !== 0;
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.getDouble = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.getInteger = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.getArray = function() {
  return [];
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.getMap = function() {
  return {};
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.get = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.isError = function() {
  return this.__isError;
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.getString = function() {
  return '';
};


/**
 * @inheritDoc
 */
polina.thrift.NumericValue.prototype.isComplete = function() {
  return this.__isComplit;
};
