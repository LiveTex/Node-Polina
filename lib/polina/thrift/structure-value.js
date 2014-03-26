


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.StructValue = function(userProtocol, methodName, isError) {
  this.__methodName = methodName;
  this.__type = userProtocol.getType(methodName).structType;
  console.log('Create StructValue', this.__type );
  this.__userProtocol = userProtocol;
  this.__output = null;
  this.__args = [];
  this.__isComplete = false;
  this.__element = null;
  this.__isException = isError;
};
polina.thrift.StructValue.prototype.process = function(cursor, chunk, protocol) {

  while (cursor.isParsed()) {
    if (this.__element === null) {
      var field = protocol.readFieldBegin(cursor, chunk);
      if (field === null) {
        break;
      } else {
        if (field.type === polina.thrift.Types.STOP) {
          this.__isComplete = true;
          break;
        }
        console.log('Create element of structure');
        this.__element = polina.thrift.createValue(field.type,
            this.__methodName,  this.__userProtocol);
      }
    }

    if (this.__element !== null){
      console.log('Process element');
      this.__element.process(cursor, chunk, protocol);
      if (this.__element.isComplete()) {
        this.__args.push(this.__element.get());
        this.__element = null;
      }
    }
  }

  if (this.__isComplete && !this.__isException) {
    this.__output = this.__userProtocol.createValue(this.__type, this.__args);
  }
};
polina.thrift.StructValue.prototype.getBool = function() {
};
polina.thrift.StructValue.prototype.getDouble = function() {
};
polina.thrift.StructValue.prototype.getInteger = function() {
};
polina.thrift.StructValue.prototype.getArray = function() {
};
polina.thrift.StructValue.prototype.getMap = function() {
};
polina.thrift.StructValue.prototype.get = function() {
  return this.__output;
};
polina.thrift.StructValue.prototype.isError = function() {
  return this.__isException;
};
polina.thrift.StructValue.prototype.getHandledSize = function() {

};
polina.thrift.StructValue.prototype.getString = function(){
return this.__args
};
polina.thrift.StructValue.prototype.isComplete = function() {
  return this.__isComplete;
};
