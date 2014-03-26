


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.ArrayValue = function(userProtocol, methodName) {
  this.__userProtocol = userProtocol;
  this.__methodName = methodName;
  this.__elementsType = 0;
  this.__output = [];
  this.__isComplit = false;
  this.__header = null;
  this.__element = null;
  this.__elementCounter = 0;

};

polina.thrift.ArrayValue.prototype.process = function(cursor, chunk, protocol) {

  if (this.__header === null) {
    this.__header = protocol.readListBegin(cursor, chunk);
    if (cursor.isParsed()) {
      this.__elementsType = this.__header.type;
    }
  }

  while (!this.__isComplit && cursor.isParsed() && this.__header !== null) {

    if (this.__elementCounter === this.__header.size) {
      this.__isComplit = true;
      break;
    }

    if (this.__element === null) {
      this.__element = polina.thrift.createValue(this.__elementsType,
          this.__methodName, this.__userProtocol);
    }

    if (this.__element !== null) {

      this.__element.process(cursor, chunk, protocol);

      if (this.__element.isComplete()) {
        this.__output.push(this.__element.get());
        this.__elementCounter += 1;
        this.__element = null;
      }
    }
  }
};

polina.thrift.ArrayValue.prototype.getBool = function() {
  return false;
};
polina.thrift.ArrayValue.prototype.getDouble = function() {
  return 0;
};
polina.thrift.ArrayValue.prototype.getInteger = function() {
  return 0;
};
polina.thrift.ArrayValue.prototype.getArray = function() {
  return this.__output;
};
polina.thrift.ArrayValue.prototype.getMap = function() {
  return {};
};
polina.thrift.ArrayValue.prototype.get = function() {
  return this.__output;
};
polina.thrift.ArrayValue.prototype.isError = function() {
};
polina.thrift.ArrayValue.prototype.getString = function() {
  return '';
};
polina.thrift.ArrayValue.prototype.isComplete = function() {
  return this.__isComplit;
};
