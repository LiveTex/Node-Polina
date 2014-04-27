polina.thrift.Field = function(name, type, id){
	this.__name = name;
	this.__type = type;
	this.__id = id;
	this.__value = polina.thrift.createValue(this.__type);
	this.__isComplete;

};


polina.thrift.Field.prototype.process = function(cursor, chunk, returnInfo, idl){

	if (cursor.isParsed() && this.__value !== null) {
		if (this.__value.process(cursor, chunk)) {
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