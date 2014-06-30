polina.thrift.createValue = function(type) {

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
