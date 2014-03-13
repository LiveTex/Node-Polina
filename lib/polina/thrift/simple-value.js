

/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.SimpleValue = function(type){
  this.__type = type;
  this.__elementType = 0;
  this.__output = '';
  this.__isComplit = false;
};
polina.thrift.SimpleValue.prototype.process = function (cursor, chunk) {

    if(this.__type === polina.thrift.Types.STRING){

      this.__output = polina.thrift.readString(cursor, chunk);
    }
  this.__isComplit = true;
};
polina.thrift.SimpleValue.prototype.getBool = function () {
};
polina.thrift.SimpleValue.prototype.getDouble = function () {
};
polina.thrift.SimpleValue.prototype.getInteger = function () {
};
polina.thrift.SimpleValue.prototype.getArray = function () {
};
polina.thrift.SimpleValue.prototype.getMap = function () {
};
polina.thrift.SimpleValue.prototype.get = function () {
 return this.__output;
};
polina.thrift.SimpleValue.prototype.isError = function () {
};
polina.thrift.SimpleValue.prototype.getHandledSize = function () {
};
polina.thrift.SimpleValue.prototype.getString = function () {
};
polina.thrift.SimpleValue.prototype.isComplete = function () {
  return  this.__isComplit;
};