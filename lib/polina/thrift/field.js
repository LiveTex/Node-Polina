polina.thrift.Field = function(name, type, id, idl, protocol){


  this.__name = name;
	this.__type = type;
	this.__id = id;
	this.__idl = idl;
	this.__protocol = protocol;

	this.__value = polina.thrift.createValue(this.__type);
	this.__isComplete = false;

};


polina.thrift.Field.prototype.process = function(cursor, chunk){

	if (cursor.isParsed() && this.__value !== null) {
		if (this.__value.process(cursor, chunk, this.__protocol)) {
			this.__isComplete = true;
		}
	}

	return this.__isComplete;
};

polina.thrift.Field.prototype.getType = function(){
	return this.__type;
};

polina.thrift.Field.prototype.getValue = function(){
	return this.__value;
};

polina.thrift.Field.prototype.createValue = function(valueInfo) {

    if (type >= polina.thrift.Types.BOOL &&
        type < polina.thrift.Types.STRING) {
      return new polina.thrift.SimpleValue(this.type);
    }

    if (type === polina.thrift.Types.LIST ||
        type === polina.thrift.Types.SET) {
      return new polina.thrift.ArrayValue(this.type, valueInfo, this.__idl);
    }

    if (type === polina.thrift.Types.MAP) {
      return new polina.thrift.MapValue(this.type, valueInfo, this.__idl);
    }

    if (type === polina.thrift.Types.STRUCT) {
      return new polina.thrift.StructValue(this.type, valueInfo, isError, this.__idl);
    }

    if (type === polina.thrift.Types.STOP) {
      return null;
    }

    console.log('ERROR! Incorrect value type');
    return null;
};