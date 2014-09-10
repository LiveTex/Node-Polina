


/**
 * @constructor
 * @implements {thrift.IIdl}
 */
polina.hbase.Idl = function() {

  /**
   * A BatchMutation object is used to apply a
   * number of Mutations to a single row.
   *
   * @type {thrift.StructureInfo}
   */
  this.batchMutation = new thrift.StructureInfo('BatchMutation');
  this.batchMutation.addField('row', 1, thrift.Type.STRING);
  this.batchMutation.addField('mutations', 2,
      thrift.Type.LIST, 'Mutation');

  /**
   * An HColumnDescriptor contains information about a column family
   * such as the number of versions, compression settings, etc. It is
   * used as input when creating a table or adding a column.
   *
   * @type {thrift.StructureInfo}
   */
  this.columnDescriptor = new thrift.StructureInfo('ColumnDescriptor');
  this.columnDescriptor.addField('name', 1, thrift.Type.STRING);
  this.columnDescriptor.addField('maxVersions', 2, thrift.Type.I32);
  this.columnDescriptor.addField('compression', 3, thrift.Type.STRING);
  this.columnDescriptor.addField('inMemory', 4, thrift.Type.BOOL);
  this.columnDescriptor.addField('bloomFilterType', 5,
      thrift.Type.STRING);
  this.columnDescriptor.addField('bloomFilterVectorSize', 6,
      thrift.Type.I32);
  this.columnDescriptor.addField('bloomFilterNbHashes', 7,
      thrift.Type.I32);
  this.columnDescriptor.addField('blockCacheEnabled', 8,
      thrift.Type.BOOL);
  this.columnDescriptor.addField('timeToLive', 9, thrift.Type.I32);

  /**
   * A Mutation object is used to either update or delete a column-value.
   *
   * @type {thrift.StructureInfo}
   */
  this.mutation = new thrift.StructureInfo('Mutation');
  this.mutation.addField('isDelete', 1, thrift.Type.BOOL);
  this.mutation.addField('column', 2, thrift.Type.STRING);
  this.mutation.addField('value', 3, thrift.Type.STRING);
  this.mutation.addField('writeToWAL', 4, thrift.Type.BOOL);

  /**
   * TCell - Used to transport a cell value (byte[]) and the timestamp it was
   * stored with together as a result for get and getRow methods. This promotes
   * the timestamp of a cell to a first-class value, making it easy to take
   * note of temporal data. Cell is used all the way from HStore up to HTable.
   */
  this.tCell = new thrift.StructureInfo('TCell');
  this.tCell.addField('value', 1, thrift.Type.STRING);
  this.tCell.addField('timestamp', 2, thrift.Type.I64);

  /**
   * Holds column name and the cell.
   *
   * @type {thrift.StructureInfo}
   */
  this.tColumn = new thrift.StructureInfo('TColumn');
  this.tColumn.addField('columnName', 1, thrift.Type.STRING);
  this.tColumn.addField('cell', 2, 'TCell');

  /**
   * For increments that are not incrementColumnValue equivalents.
   */
  this.tIncrement = new thrift.StructureInfo('TIncrement');
  this.tIncrement.addField('table', 1, thrift.Type.STRING);
  this.tIncrement.addField('row', 2, thrift.Type.STRING);
  this.tIncrement.addField('column', 3, thrift.Type.STRING);
  this.tIncrement.addField('ammount', 4, thrift.Type.I64);

  /**
   * A TRegionInfo contains information about an HTable region.
   *
   * @type {thrift.StructureInfo}
   */
  this.tRegionInfo = new thrift.StructureInfo('TRegionInfo');
  this.tRegionInfo.addField('startKey', 1, thrift.Type.STRING);
  this.tRegionInfo.addField('endKey', 2, thrift.Type.STRING);
  this.tRegionInfo.addField('id', 3, thrift.Type.I64);
  this.tRegionInfo.addField('name', 4, thrift.Type.STRING);
  this.tRegionInfo.addField('version', 5, thrift.Type.BYTE);
  this.tRegionInfo.addField('serverName', 6, thrift.Type.STRING);
  this.tRegionInfo.addField('port', 7, thrift.Type.I32);

  /**
   * Holds row name and then a map of columns to cells.
   *
   * @type {thrift.StructureInfo}
   */
  this.tRowResult = new thrift.StructureInfo('TRowResult');
  this.tRowResult.addField('row', 1, thrift.Type.STRING);
  this.tRowResult.addField('columns', 2, thrift.Type.MAP, 'TCell',
      thrift.Type.STRING);
  this.tRowResult.addField('sortedColumns', 3, thrift.Type.LIST,
      'TColumn');

  /**
   * A Scan object is used to specify scanner parameters when opening a scanner.
   *
   * @type {thrift.StructureInfo}
   */
  this.tScan = new thrift.StructureInfo('TScan');
  this.tScan.addField('startRow', 1, thrift.Type.STRING);
  this.tScan.addField('stopRow', 2, thrift.Type.STRING);
  this.tScan.addField('timestamp', 3, thrift.Type.I64);
  this.tScan.addField('columns', 4, thrift.Type.LIST);
  this.tScan.addField('caching', 5, thrift.Type.I32);
  this.tScan.addField('filterString', 6, thrift.Type.STRING);
  this.tScan.addField('batchSize', 7, thrift.Type.I32);
  this.tScan.addField('sortColumns', 8, thrift.Type.BOOL);

  /**
   * Exception structure.
   *
   * @type {thrift.StructureInfo}
   */
  this.exception = new thrift.StructureInfo('exception');
  this.exception.addField('message', 1, thrift.Type.STRING);
};


/**
 * @inheritDoc
 */
polina.hbase.Idl.prototype.createStructure = function(type, args) {
  var value = null;

  switch (type) {
    case 'TCell':
      value = new polina.hbase.TCell(args[0], args[1]);
      break;
    case 'ColumnDescriptor':
      value = new polina.hbase.ColumnDescriptor(args[0], args[1], args[2],
          args[3] , args[4], args[5], args[6], args[7], args[8]);
      break;
    case 'TColumn':
      value = new polina.hbase.TColumn(args[0], args[1]);
      break;
    case 'TRegionInfo':
      value = new polina.hbase.TRegionInfo(args[0], args[1], args[2], args[3],
          args[4], args[5], args[6]);
      break;
    case 'Mutation':
      value = new polina.hbase.Mutation(args[0], args[1], args[2], args[3]);
      break;
    case 'BatchMutation':
      value = new polina.hbase.BatchMutation(args[0], args[1]);
      break;
    case 'TIncrement':
      value = new polina.hbase.TIncrement(args[0], args[1], args[2], args[3]);
      break;
    case 'TRowResult':
      value = new polina.hbase.TRowResult(args[0], args[1], args[2]);
      break;
    case 'TScan':
      value = new polina.hbase.TScan(args[0], args[1], args[2], args[3],
          args[4], args[5], args[6], args[7]);
      break;
    default:
      console.error(' ERROR Undefined structure type ');
  }
  return value;
};


/**
 * @inheritDoc
 */
polina.hbase.Idl.prototype.getStructureInfo = function(type) {

  var structInfo = null;

  switch (type) {
    case 'BatchMutation':
      structInfo = this.batchMutation;
      break;

    case 'ColumnDescriptor':
      structInfo = this.columnDescriptor;
      break;

    case 'Mutation':
      structInfo = this.mutation;
      break;

    case 'TCell':
      structInfo = this.tCell;
      break;

    case 'TColumn':
      structInfo = this.tColumn;
      break;

    case 'TIncrement':
      structInfo = this.tIncrement;
      break;

    case 'TRegionInfo':
      structInfo = this.tRegionInfo;
      break;

    case 'TRowResult':
      structInfo = this.tRowResult;
      break;

    case 'TScan':
      structInfo = this.tScan;
      break;

    case 'exception':
      structInfo = this.exception;
      break;
  }



  return structInfo;
};

