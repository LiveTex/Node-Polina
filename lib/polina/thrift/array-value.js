

/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.ArrayValue = function(type){
  this.__type = type;
  this.__elementType = 0;
  this.__output = [];
  this.__isComplit = false;
};

polina.thrift.ArrayValue.prototype.process = function (cursor, chunk) {
  var header,element;
  header = polina.thrift.readListBegin(cursor, chunk);
  this.__elementType = header.type;
  var i = header.size;
  while(i--){
    element = polina.thrift.createValue(this.__elementType);
    element.process(cursor, chunk);
    if(element.isComplete()){
      this.__output.push( element.get());
    }
  }
  this.__isComplit = true;
};
polina.thrift.ArrayValue.prototype.getBool = function () {
};
polina.thrift.ArrayValue.prototype.getDouble = function () {
};
polina.thrift.ArrayValue.prototype.getInteger = function () {
};
polina.thrift.ArrayValue.prototype.getArray = function () {
  return this.__output;
};
polina.thrift.ArrayValue.prototype.getMap = function () {
};
polina.thrift.ArrayValue.prototype.get = function () {
};
polina.thrift.ArrayValue.prototype.isError = function () {
};
polina.thrift.ArrayValue.prototype.getHandledSize = function () {
};
polina.thrift.ArrayValue.prototype.getString = function () {
};
polina.thrift.ArrayValue.prototype.isComplete = function () {
  return this.__isComplit;
};