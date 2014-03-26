


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.NumericValue = function(type, isError) {
  console.log('Create NumericValue');
  this.__type = type;
  this.__elementType = 0;
  this.__output = '';
  this.__isComplit = false;
  this.__isError = isError;
};

polina.thrift.NumericValue.prototype.process = function(cursor, chunk, protocol) {

  if (this.__type === polina.thrift.Types.I32) {
    this.__output = protocol.readI32(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.BYTE) {
    this.__output = protocol.readByte(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.I16) {
    this.__output = protocol.readI16(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.I64) {
    this.__output = protocol.readI64(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.DOUBLE) {
    this.__output = protocol.readDouble(cursor, chunk);
  }

  if (cursor.isParsed()) {
    this.__isComplit = true;
  }
};
polina.thrift.NumericValue.prototype.getBool = function() {
  return false;
};

polina.thrift.NumericValue.prototype.getDouble = function() {
  return this.__output;
};

polina.thrift.NumericValue.prototype.getInteger = function() {
  return this.__output;
};

polina.thrift.NumericValue.prototype.getArray = function() {
  return [];
};

polina.thrift.NumericValue.prototype.getMap = function() {
  return {};
};

polina.thrift.NumericValue.prototype.get = function() {
  return this.__output;
};

polina.thrift.NumericValue.prototype.isError = function() {
  return this.__isError;
};

polina.thrift.NumericValue.prototype.getString = function() {
  return this.__output;
};

polina.thrift.NumericValue.prototype.isComplete = function() {
  return this.__isComplit;
};
