


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 */
polina.thrift.MapValue = function(userProtocol, methodName) {
  this.__userProtocol = userProtocol;
  this.__methodName = methodName;
  this.__output = [];
  this.__isComplit = false;
  this.__header = null;
  this.__element = null;
  this.__key = null;
  this.__currentElementType = 0;
  this.__pairCounter = 0;

};
polina.thrift.MapValue.prototype.process = function(cursor, chunk, protocol) {

  if (this.__header === null) {
    this.__header = protocol.readMapBegin(cursor, chunk);
    if(cursor.isParsed()){
      this.__currentElementType = this.__header.ktype;
    }
  }

  while (!this.__isComplit  && this.__header !== null && cursor.isParsed()) {
    if (this.__pairCounter === this.__header.size) {
      this.__isComplit = true;
      break;
    }

    if (this.__element === null) {
      this.__element = polina.thrift.createValue(this.__currentElementType,
          this.__methodName, this.__userProtocol);
    }
    

    if (this.__element !== null) {
      this.__element.process(cursor, chunk, protocol);
      if (this.__element.isComplete()) {
        if (this.__currentElementType === this.__header.ktype){
          this.__key = this.__element;
          this.__currentElementType = this.__header.vtype;
        } else {
          this.__output [this.__key.get()] =  this.__element.get();
          this.__key = null;
          this.__pairCounter += 1;
          this.__currentElementType = this.__header.ktype;
        }
        console.log('Finish element:', this.__element.get() );
        this.__element = null;
      }
    }
  }
};
polina.thrift.MapValue.prototype.getBool = function() {
};
polina.thrift.MapValue.prototype.getDouble = function() {
};
polina.thrift.MapValue.prototype.getInteger = function() {
};
polina.thrift.MapValue.prototype.getArray = function() {
};
polina.thrift.MapValue.prototype.getMap = function() {
  return  this.__output;
};
polina.thrift.MapValue.prototype.get = function() {
  return  this.__output;
};
polina.thrift.MapValue.prototype.isError = function() {
};
polina.thrift.MapValue.prototype.getHandledSize = function() {
};
polina.thrift.MapValue.prototype.getString = function() {
};
polina.thrift.MapValue.prototype.isComplete = function() {
};
