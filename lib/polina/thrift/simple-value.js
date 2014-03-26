


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.SimpleValue = function(type, error) {
  console.log('Create SimpleValue');
  this.__type = type;
  this.__output = '';
  this.__isComplit = false;
  this.__isError = error;
};
polina.thrift.SimpleValue.prototype.process = function(cursor, chunk, protocol) {

  if (this.__type === polina.thrift.Types.STRING) {
    this.__output = protocol.readString(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.BOOL) {
    this.__output = protocol.readBool(cursor, chunk);
  }

  if (cursor.isParsed()) {
    this.__isComplit = true;
  }
};
polina.thrift.SimpleValue.prototype.getBool = function() {
  return this.__output;
};

polina.thrift.SimpleValue.prototype.getDouble = function() {
  return this.__output;
};

polina.thrift.SimpleValue.prototype.getInteger = function() {
  return this.__output;
};

polina.thrift.SimpleValue.prototype.getArray = function() {
  return [];
};

polina.thrift.SimpleValue.prototype.getMap = function() {
  return {};
};

polina.thrift.SimpleValue.prototype.get = function() {
  return this.__output;
};

polina.thrift.SimpleValue.prototype.isError = function() {
  return this.__isError;
};

polina.thrift.SimpleValue.prototype.getString = function() {
  return this.__output;
};

polina.thrift.SimpleValue.prototype.isComplete = function() {
  return this.__isComplit;
};
