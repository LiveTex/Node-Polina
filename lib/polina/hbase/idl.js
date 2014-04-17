


/**
 * @constructor
 * @implements {polina.thrift.IIdl}
 */
polina.hbase.Idl = function() {

  /**
   * A BatchMutation object is used to apply a
   * number of Mutations to a single row.
   *
   * @type {polina.thrift.StructureInfo}
   */
  this.batchMutation = new polina.thrift.StructureInfo('BatchMutation');
  this.batchMutation.addField('row', 1, polina.thrift.Types.STRING);
  this.batchMutation.addField('mutations', 2,
      polina.thrift.Types.LIST, 'Mutation');

  /**
   * An HColumnDescriptor contains information about a column family
   * such as the number of versions, compression settings, etc. It is
   * used as input when creating a table or adding a column.
   *
   * @type {polina.thrift.StructureInfo}
   */
  this.columnDescriptor = new polina.thrift.StructureInfo('ColumnDescriptor');
  this.columnDescriptor.addField('name', 1, polina.thrift.Types.STRING);
  this.columnDescriptor.addField('maxVersions', 2, polina.thrift.Types.I32);
  this.columnDescriptor.addField('compression', 3, polina.thrift.Types.STRING);
  this.columnDescriptor.addField('inMemory', 4, polina.thrift.Types.BOOL);
  this.columnDescriptor.addField('bloomFilterType', 5,
      polina.thrift.Types.STRING);
  this.columnDescriptor.addField('bloomFilterVectorSize', 6,
      polina.thrift.Types.I32);
  this.columnDescriptor.addField('bloomFilterNbHashes', 7,
      polina.thrift.Types.I32);
  this.columnDescriptor.addField('blockCacheEnabled', 8,
      polina.thrift.Types.BOOL);
  this.columnDescriptor.addField('timeToLive', 9, polina.thrift.Types.I32);

  /**
   * A Mutation object is used to either update or delete a column-value.
   *
   * @type {polina.thrift.StructureInfo}
   */
  this.mutation = new polina.thrift.StructureInfo('Mutation');
  this.mutation.addField('isDelete', 1, polina.thrift.Types.BOOL);
  this.mutation.addField('column', 4, polina.thrift.Types.STRING);
  this.mutation.addField('value', 3, polina.thrift.Types.STRING);
  this.mutation.addField('writeToWAL', 2, polina.thrift.Types.BOOL);

  /**
   * TCell - Used to transport a cell value (byte[]) and the timestamp it was
   * stored with together as a result for get and getRow methods. This promotes
   * the timestamp of a cell to a first-class value, making it easy to take
   * note of temporal data. Cell is used all the way from HStore up to HTable.
   */
  this.tCell = new polina.thrift.StructureInfo('TCell');
  this.tCell.addField('value', 1, polina.thrift.Types.STRING);
  this.tCell.addField('timestamp', 2, polina.thrift.Types.I64);

  /**
   * Holds column name and the cell.
   *
   * @type {polina.thrift.StructureInfo}
   */
  this.tColumn = new polina.thrift.StructureInfo('TColumn');
  this.tColumn.addField('columnName', 1, polina.thrift.Types.STRING);
  this.tColumn.addField('cell', 2, 'TCell');

  /**
   * For increments that are not incrementColumnValue equivalents.
   */
  this.tIncrement = new polina.thrift.StructureInfo('TIncrement');
  this.tIncrement.addField('table', 1, polina.thrift.Types.STRING);
  this.tIncrement.addField('row', 2, polina.thrift.Types.STRING);
  this.tIncrement.addField('column', 3, polina.thrift.Types.STRING);
  this.tIncrement.addField('ammount', 4, polina.thrift.Types.I64);

  /**
   * A TRegionInfo contains information about an HTable region.
   *
   * @type {polina.thrift.StructureInfo}
   */
  this.tRegionInfo = new polina.thrift.StructureInfo('TRegionInfo');
  this.tRegionInfo.addField('startKey', 1, polina.thrift.Types.STRING);
  this.tRegionInfo.addField('endKey', 2, polina.thrift.Types.STRING);
  this.tRegionInfo.addField('id', 3, polina.thrift.Types.I64);
  this.tRegionInfo.addField('name', 4, polina.thrift.Types.STRING);
  this.tRegionInfo.addField('version', 5, polina.thrift.Types.BYTE);
  this.tRegionInfo.addField('serverName', 6, polina.thrift.Types.STRING);
  this.tRegionInfo.addField('port', 7, polina.thrift.Types.I32);

  /**
   * Holds row name and then a map of columns to cells.
   *
   * @type {polina.thrift.StructureInfo}
   */
  this.tRowResult = new polina.thrift.StructureInfo('TRowResult');
  this.tRowResult.addField('row', 1, polina.thrift.Types.STRING);
  this.tRowResult.addField('columns', 2, polina.thrift.Types.MAP, 'TCell',
      polina.thrift.Types.STRING);
  this.tRowResult.addField('sortedColumns', 3, polina.thrift.Types.LIST,
      'TColumn');

  /**
   * A Scan object is used to specify scanner parameters when opening a scanner.
   *
   * @type {polina.thrift.StructureInfo}
   */
  this.tScan = new polina.thrift.StructureInfo('TScan');
  this.tScan.addField('startRow', 1, polina.thrift.Types.STRING);
  this.tScan.addField('stopRow', 2, polina.thrift.Types.STRING);
  this.tScan.addField('timestamp', 3, polina.thrift.Types.I64);
  this.tScan.addField('columns', 4, polina.thrift.Types.LIST);
  this.tScan.addField('caching', 5, polina.thrift.Types.I32);
  this.tScan.addField('filterString', 6, polina.thrift.Types.STRING);
  this.tScan.addField('batchSize', 7, polina.thrift.Types.I32);
  this.tScan.addField('sortColumns', 8, polina.thrift.Types.BOOL);

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
    case 'TRowResult':
      value = new polina.hbase.TRowResult(args[0], args[1], args[2]);
      break;
    default:
      console.log(' ERROR Undefined structure type ');
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
  }

  return structInfo;
};

