

polina.hbase.HbaseSpec = function() {
};


polina.hbase.HbaseSpec.prototype.createValue = function(type, args) {
  var value = null;

  switch (type) {
    case 'TCell':
      value = new polina.hbase.TCell(args);
      break;
    case 'ColumnDescriptor':
      value = new polina.hbase.TCell(args);
      break;
    case 'TRegionInfo':
      value = new polina.hbase.TCell(args);
      break;
    default:
      console.log(' ERROR Undefined structure type ');
  }
  return value;
};



polina.hbase.HbaseSpec.prototype.getType = function(methodName) {
  var type = '';
  switch (methodName) {
    case 'getColumnDescriptors': type = 'ColumnDescriptor';
    break;
    case 'getTableRegions': type = 'TRegionInfo';
    break;
    case 'get': type = 'TCell';
    break;
    case 'getVer': type = 'TCell';
    break;
    case 'getVerTs': type = 'TCell';
    break;
    case 'getRow': type = 'TRowResult';
    break;
    case 'getRowWithColumns': type = 'TRowResult';
    break;
    case 'getRowTs': type = 'TRowResult';
    break;
    case 'getRowWithColumnsTs': type = 'TRowResult';
    break;
    case 'scannerGet': type = 'TRowResult';
    break;
    case 'scannerGetList': type = 'TRowResult';
    break;
    case 'getRowOrBefore': type = 'TCell';
    break;
    case 'getRegionInfo': type = 'TRegionInfo';
    break;
    default:
      console.log(' ERROR method doesn\'t exist or doesn\'t use structures ');
  }

  return type;
};
