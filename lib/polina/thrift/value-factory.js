



polina.thrift.createValue = function(type,cursor,chunk){

  var header = polina.thrift.readMessageBegin(cursor,chunk);

  if(header.type === polina.thrift.MessageTypes.EXCEPTION){
    console.log('YOOO nigga, it\'s EXCEPTION');
  }

  console.log(header.name);
  console.log(header.seqid);

  if(header.type === polina.thrift.MessageTypes.REPLY){

      if (type >= polina.thrift.Types.BOOL &&
          type <= polina.thrift.Types.STRING){
         return new polina.thrift.SimpleValue();
      }


      if (type === polina.thrift.Types.LIST  ||
          type === polina.thrift.Types.SET){
        return new polina.thrift.ArrayValue();
      }


      if (type === polina.thrift.Types.MAP){
        return new polina.thrift.MapValue();
      }


      if (type === polina.thrift.Types.STRUCT){
        return new polina.thrift.StructValue();
      }
  }
  console.log('ERROR! Incorrect value type');
  return null;

};