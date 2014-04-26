/**
 * Create IValue on type;
 *
 * TODO #4: Соответственно эта борода будет принимать экземпляр филда.
 * TODO #5: Может разделить эту бороду натри разных фабрики? У тебя, получется,
 * в зависимости от комбинации требуемого результата, полученного результата и
 * иногда требуется idl.
 * TODO #6: вообще этот файл, в нашей схеме дожен называться thrift.js.
 *
 *
 * @param {number} type
 * @param {!polina.thrift.FieldType} valueInfo
 * @param {boolean} isError
 * @return {polina.thrift.IValue}
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.createValue = function(type, valueInfo, isError, idl) {
  if (type === polina.thrift.Types.I64 ||
      type === polina.thrift.Types.STRING) {
    return new polina.thrift.SimpleValue(type, isError);
  }

  if (type >= polina.thrift.Types.BOOL &&
      type < polina.thrift.Types.I64) {
    return new polina.thrift.NumericValue(type, isError);
  }

  if (type === polina.thrift.Types.LIST ||
          type === polina.thrift.Types.SET) {
    return new polina.thrift.ArrayValue(valueInfo.getVInfo(), idl);
  }

  if (type === polina.thrift.Types.MAP) {
    return new polina.thrift.MapValue(valueInfo.getKInfo(),
                                      valueInfo.getVInfo(), idl);
  }

  if (type === polina.thrift.Types.STRUCT) {
    return new polina.thrift.StructValue(valueInfo, isError, idl);
  }

  console.log('ERROR! Incorrect value type');
  return null;
};