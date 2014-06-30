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



polina.thrift.completeException = function(value, cancel){
	cancel('EXCEPTION:' + value.getString());
}



polina.thrift.completeReply = function(result, complete, cancel){

  var field = result[0];
  var errorField = result[1];

  if (result === null) {
    cancel('Broken value.');
  } else if (errorField) {
    cancel('EXCEPTION:' + errorField.getValue());
  } else {
    cancel('field:' + field.getValue());
  }

//	var type = returnType.getType();
//	var i = 0;
//
//	while (i < self.result.length) {
//		if (result[i] === null) {
//			cancel('Broken value.');
//		} else if (result[i].isError()) {
//			cancel('EXCEPTION:' + result[i].getString());
//		} else if (type === polina.thrift.Types.STRING ||
//				type === polina.thrift.Types.I64) {
//			complete(result[i].getString());
//		} else if (type === polina.thrift.Types.BOOL) {
//			complete(result[i].getBool());
//		} else if (type === polina.thrift.Types.BYTE ||
//				type === polina.thrift.Types.I08 ||
//				type === polina.thrift.Types.I16 ||
//				type === polina.thrift.Types.I32) {
//			complete(result[i].getInteger());
//		} else if (type === polina.thrift.Types.DOUBLE) {
//			complete(result[i].getDouble());
//		} else if (type === polina.thrift.Types.MAP) {
//			complete(result[i].getMap());
//		} else if (type === polina.thrift.Types.LIST ||
//				type === polina.thrift.Types.SET) {
//			complete(result[i].getArray());
//		} else if (type === polina.thrift.Types.STRUCT) {
//			complete(result[i].get());
//
//			cancel('Unknown value type.');
//		}
//		i += 1;
//	}
//	}
};


polina.thrift.completeCall = function(args, methodName){};




