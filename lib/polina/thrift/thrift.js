/**
 * Create IValue on type;
 *
 * TODO #4: Соответственно эта борода будет принимать экземпляр филда.
 * TODO #5: Может разделить эту бороду натри разных фабрики? У тебя, получется,
 * в зависимости от комбинации требуемого результата, полученного результата и
 * иногда требуется idl.
 *
 *
 * @param {number} type
 * @param {!polina.thrift.FieldType} valueInfo
 * @param {boolean} isError
 * @return {polina.thrift.IValue}
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.createValue = function(type, valueInfo, idl) {

  if (type >= polina.thrift.Types.BOOL &&
      type < polina.thrift.Types.STRING) {
    return new polina.thrift.SimpleValue(type);
  }

  if (type === polina.thrift.Types.LIST ||
          type === polina.thrift.Types.SET) {
    return new polina.thrift.ArrayValue(type, valueInfo, idl);
  }

  if (type === polina.thrift.Types.MAP) {
    return new polina.thrift.MapValue(type, valueInfo, idl);
  }

  if (type === polina.thrift.Types.STRUCT) {
    return new polina.thrift.StructValue(type, valueInfo, isError, idl);
  }

  if (type === polina.thrift.Types.STOP) {
    return null;
  }

  console.log('ERROR! Incorrect value type');
  return null;
};



polina.thrift.compliteException = function(value, cancel){
	cancel('EXCEPTION:' + value.getString());
}



polina.thrift.compliteReply = function(value, complite, cancel){

	var type = returnType.getType();
	var i = 0;

	while (i < self.__valueQueue.length) {
		if (self.__valueQueue[i] === null) {
			cancel('Broken value.');
		} else if (self.__valueQueue[i].isError()) {
			cancel('EXCEPTION:' + self.__valueQueue[i].getString());
		} else if (type === polina.thrift.Types.STRING ||
				type === polina.thrift.Types.I64) {
			complete(self.__valueQueue[i].getString());
		} else if (type === polina.thrift.Types.BOOL) {
			complete(self.__valueQueue[i].getBool());
		} else if (type === polina.thrift.Types.BYTE ||
				type === polina.thrift.Types.I08 ||
				type === polina.thrift.Types.I16 ||
				type === polina.thrift.Types.I32) {
			complete(self.__valueQueue[i].getInteger());
		} else if (type === polina.thrift.Types.DOUBLE) {
			complete(self.__valueQueue[i].getDouble());
		} else if (type === polina.thrift.Types.MAP) {
			complete(self.__valueQueue[i].getMap());
		} else if (type === polina.thrift.Types.LIST ||
				type === polina.thrift.Types.SET) {
			complete(self.__valueQueue[i].getArray());
		} else if (type === polina.thrift.Types.STRUCT) {
			complete(self.__valueQueue[i].get());

			cancel('Unknown value type.');
		}
		i += 1;
	}
}


polina.thrift.compliteCall = function(methodName){}


polina.thrift.processField = function(field){
	if (field === null) {
		var fieldHeader = this.__protocol.readFieldHeader(cursor, chunk);
		if (cursor.isParsed()) {
			if (fieldHeader.type === polina.thrift.Types.STOP){
				process.nextTick(this.__compliteMessage);
				this.__isComplete = true;
				break;
			} else {
				this.__value = polina.thrift.createValue(
						fieldHeader.type,
						this.__returnInfo,
						this.__idl);
			}
		}
	}

	if (cursor.isParsed() && this.__value !== null) {
		this.__value.process(cursor, chunk);
		if (this.__value.isComplete()) {
			this.__valueQueue.push(this.__value);
			this.__value = null;
		} else {
			cursor.breakParsing();
		}
	}
}




