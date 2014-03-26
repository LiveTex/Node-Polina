
polina.thrift.createValue = function(type, methodName, userProtocol, isError) {

  if (type === polina.thrift.Types.BOOL ||
          type === polina.thrift.Types.STRING) {
    return new polina.thrift.SimpleValue(type, isError);
  }

  if (type > polina.thrift.Types.BOOL &&
          type < polina.thrift.Types.STRING) {
    return new polina.thrift.NumericValue(type, isError);
  }

  if (type === polina.thrift.Types.LIST ||
          type === polina.thrift.Types.SET) {
    return new polina.thrift.ArrayValue(userProtocol, methodName);
  }


  if (type === polina.thrift.Types.MAP) {
    return new polina.thrift.MapValue(userProtocol, methodName);
  }


  if (type === polina.thrift.Types.STRUCT) {
    return new polina.thrift.StructValue(userProtocol, methodName, isError);
  }

  //  console.log('ERROR! Incorrect value type');
  return null;

};
