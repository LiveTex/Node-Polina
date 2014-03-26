

polina.hbase.HbaseSpec = function() {
};


polina.hbase.HbaseSpec.prototype.createValue = function(type, args) {
  var value = null;

  switch (type) {
    case 'TCell':
      value = new polina.hbase.TCell(args[0], args[1]);
      break;
    case 'ColumnDescriptor':
      value = new polina.hbase.ColumnDescriptor(args[0], args[1], args[2],
          args[3] ,args[4], args[5], args[6], args[7], args[8]);
      break;
    case 'TColumn':
      value = new polina.hbase.TColumn(args[0], args[1]);
      break;
    case 'TRowResult':
      value = new polina.hbase.TRowResult(args[0], args[1], args[2]);
      break;
    default:
      console.log(' ERROR Undefined structure type ');
  }
  return value;
};



polina.hbase.HbaseSpec.prototype.getType = function(methodName) {

  var type = '';
  var structType = '';

  switch (methodName) {

    case 'enableTable':
      type = polina.thrift.Types.VOID;
      break;
    case 'disableTable':
      type = polina.thrift.Types.VOID;
      break;
    case 'isTableEnabled':
      type = polina.thrift.Types.BOOL;
      break;
    case 'getTableNames':
      console.log('!!!!!!!!!!!!!!!!!!');
      type = polina.thrift.Types.LIST;
      break;
    case 'getColumnDescriptors':
      type = polina.thrift.Types.MAP;
      structType = 'ColumnDescriptor';
      break;
    case 'getTableRegions':
      type = polina.thrift.Types.LIST;
      structType = 'TRegionInfo';
      break;
    case 'createTable':
      type = polina.thrift.Types.VOID;
      break;
    case 'deleteTable':
      type = polina.thrift.Types.VOID;
      break;
    case 'get':
      type = polina.thrift.Types.LIST;
      structType = 'TCell';
      break;
    case 'getVer':
      type = polina.thrift.Types.LIST;
      structType = 'TCell';
      break;
    case 'getVerTs':
      type = polina.thrift.Types.LIST;
      structType = 'TCell';
      break;
    case 'getRow':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'getRowWithColumns':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'getRowTs':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'getRowWithColumnsTs':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'getRows':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'getRowsWithColumns':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'getRowsTs':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'getRowsWithColumnsTs':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;

    case 'mutateRow':
      type = polina.thrift.Types.VOID;
      break;
    case 'mutateRowTs':
      type = polina.thrift.Types.VOID;
      break;
    case 'mutateRows':
      type = polina.thrift.Types.VOID;
      break;
    case 'mutateRowsTs':
      type = polina.thrift.Types.VOID;
      break;

    case 'atomicIncrement':
      type = polina.thrift.Types.I64;
      break;
    case 'deleteAll':
      type = polina.thrift.Types.VOID;
      break;
    case 'deleteAllTs':
      type = polina.thrift.Types.VOID;
      break;
    case 'deleteAllRow':
      type = polina.thrift.Types.VOID;
      break;
    case 'increment':
      type = polina.thrift.Types.VOID;
      break;
    case 'incrementRows':
      type = polina.thrift.Types.VOID;
      break;
    case 'deleteAllRowTs':
      type = polina.thrift.Types.VOID;
      break;


    case 'scannerOpenWithScan':
      type = polina.thrift.I32;
      break;
    case 'scannerOpen':
      type = polina.thrift.I32;
      break;
    case 'scannerOpenWithStop':
      type = polina.thrift.I32;
      break;
    case 'scannerOpenWithPrefix':
      type = polina.thrift.I32;
      break;
    case 'scannerOpenTs':
      type = polina.thrift.I32;
      break;
    case 'scannerOpenWithStopTs':
      type = polina.thrift.I32;
      break;
    case 'scannerGet':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'scannerGetList':
      type = polina.thrift.Types.LIST;
      structType = 'TRowResult';
      break;
    case 'scannerClose':
      type = polina.thrift.Types.VOID;
      break;
    case 'getRowOrBefore':
      type = polina.thrift.Types.LIST;
      structType = 'TCell';
      break;
    case 'getRegionInfo':
      type = polina.thrift.STRUCT;
      structType = 'TRegionInfo';
      break;

    default:
      console.log(' ERROR method doesn\'t exist or doesn\'t use structures ');
  }

  return {'type' : type,
    'structType' : structType};
};
