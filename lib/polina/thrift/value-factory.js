
polina.thrift.createValue = function(type, clientType){

      if (type >= polina.thrift.Types.BOOL &&
          type <= polina.thrift.Types.STRING){
         return new polina.thrift.SimpleValue(type);
      }

      if (type === polina.thrift.Types.LIST  ||
          type === polina.thrift.Types.SET){
        return new polina.thrift.ArrayValue(type);
      }


      if (type === polina.thrift.Types.MAP){
        return new polina.thrift.MapValue();
      }


      if (type === polina.thrift.Types.STRUCT){
        return new polina.thrift.StructValue(clientType);
      }

  console.log('ERROR! Incorrect value type');
  return null;

};