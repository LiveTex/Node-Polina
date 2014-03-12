



polina.hbase.thrift.createValue = function(type){

  if (type >= polina.hbase.thrift.Types.BOOL &&
      type <= polina.hbase.thrift.Types.STRING){
     return new polina.hbase.thrift.SimpleValue();
  }


  if (type === polina.hbase.thrift.Types.LIST  ||
      type === polina.hbase.thrift.Types.SET){
    return new polina.hbase.thrift.ArrayValue();
  }


  if (type === polina.hbase.thrift.Types.MAP){
    return new polina.hbase.thrift.MapValue();
  }


  if (type === polina.hbase.thrift.Types.STRUCT){
    return new polina.hbase.thrift.StructValue();
  }

  console.log('ERROR! Incorrect value type');
  return null;

};