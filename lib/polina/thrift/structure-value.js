

/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.StructValue = function(type){

  this.__type = type;
  this.__output = null;
  this.__args = [];
  this.__isComplete = false;

};
polina.thrift.StructValue.prototype.process = function (cursor, chunk) {

  polina.thrift.readStructBegin();

  while(cursor.isParsed()){

    var field = polina.thrift.readFieldBegin();

    if (field.type === polina.thrift.Types.STOP){
       this.__isComplete = true;
       break;
    }

    var subValue = polina.thrift.createValue(field.type);

    subValue.process(cursor, chunk);

    if(subValue.isComplete()){
      this.__output.push(subValue);
    }
    polina.thrift.readFieldEnd();
  }

  polina.thrift.readStructEnd();

  this.__output = polina.hbase.createValue(this.__type);

};
polina.thrift.StructValue.prototype.getBool = function () {
};
polina.thrift.StructValue.prototype.getDouble = function () {
};
polina.thrift.StructValue.prototype.getInteger = function () {
};
polina.thrift.StructValue.prototype.getArray = function () {
};
polina.thrift.StructValue.prototype.getMap = function () {
};
polina.thrift.StructValue.prototype.get = function () {
  return this.__output;
};
polina.thrift.StructValue.prototype.isError = function () {
};
polina.thrift.StructValue.prototype.getHandledSize = function () {
};
polina.thrift.StructValue.prototype.getString = function () {
};
polina.thrift.StructValue.prototype.isComplete = function () {
};