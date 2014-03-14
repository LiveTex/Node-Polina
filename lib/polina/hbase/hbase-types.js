

polina.hbase.createValue = function(type, args){
  var value = null;

  switch (type){
    case 'TCell':
      value = new polina.hbase.TCell(args);
      break;
    default:
      console.log(' ERROR Undefined structure type ');
  }

  return value;
}