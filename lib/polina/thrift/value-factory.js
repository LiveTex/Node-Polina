

/**
 * Create IValue on type;
 *
 * @param {number} type
 * @param {polina.thrift.FieldInfo} valueInfo
 * @param {boolean} isError
 * @return {polina.thrift.IValue}
 */
polina.thrift.createValue = function(type, valueInfo, isError) {
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
    return new polina.thrift.ArrayValue(valueInfo.getVInfo());
  }


  if (type === polina.thrift.Types.MAP) {
    return new polina.thrift.MapValue(valueInfo.getKInfo(),
                                      valueInfo.getVInfo());
  }


  if (type === polina.thrift.Types.STRUCT) {
    return new polina.thrift.StructValue(valueInfo, isError);
  }

  console.log('ERROR! Incorrect value type');
  return null;
};
