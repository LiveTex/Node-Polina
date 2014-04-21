


/**
 * Hbase client.
 *
 * @constructor
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.hbase.Client = function(port, opt_host) {
  this.thrift =
      new polina.thrift.Client(new polina.hbase.Idl(), port, opt_host);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.enableTable =
    function(tableName, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('enableTable', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.disableTable =
    function(tableName, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('disableTable', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.isTableEnabled =
    function(tableName, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];

  var returnType = new polina.thrift.FieldType(polina.thrift.Types.BOOL);
  this.thrift.writeMethod('isTableEnabled', args, complete, cancel, returnType);
};


/**
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getTableNames = function(complete, cancel) {
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.LIST,
      polina.thrift.Types.STRING);
  this.thrift.writeMethod('getTableNames', [], complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getColumnDescriptors =
    function(tableName, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.MAP,
      'ColumnDescriptor', polina.thrift.Types.STRING);
  this.thrift.writeMethod('getColumnDescriptors', args, complete,
      cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getTableRegions =
    function(tableName, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.LIST,
      'TRegionInfo');
  this.thrift.writeMethod('getTableRegions', args, complete,
      cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!Array} columnDescriptors list;
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.createTable =
    function(tableName, columnDescriptors, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columnDescriptors, 2,
        'ColumnDescriptor')];

  this.thrift.writeMethod('createTable', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.deleteTable =
    function(tableName, complete, cancel) {
  this.thrift.writeMethod('deleteTable',
      [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)],
      complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.get =
    function(tableName, row, column, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TCell');

  this.thrift.writeMethod('get', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} numVersions
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getVer =
    function(tableName, row, column, numVersions, attributes,
             complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I32, numVersions, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TCell');
  this.thrift.writeMethod('getVer', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} timestamp
 * @param {number} numVersions
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getVerTs =
    function(tableName, row, column, timestamp, numVersions,
             attributes, complete, cancel) {

  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.I32, numVersions, 5),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 6,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TCell');
  this.thrift.writeMethod('getVerTs', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRow =
    function(tableName, row, attributes, complete, cancel) {

  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRow', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRowWithColumns =
    function(tableName, row, columns, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRowWithColumns', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRowTs =
    function(tableName, row, timestamp, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRowTs', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} columns
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRowWithColumnsTs =
    function(tableName, row, columns, timestamp, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRowWithColumnsTs', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRows =
    function(tableName, rows, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRows', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRowsWithColumns =
    function(tableName, rows, columns, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRowsWithColumns', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRowsTs =
    function(tableName, rows, timestamp, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRowsTs', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {!Array} columns
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRowsWithColumnsTs =
    function(tableName, rows, columns, timestamp, attributes,
             complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('getRowsWithColumnsTs', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} mutations
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.mutateRow =
    function(tableName, row, mutations, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, mutations, 3,
        new polina.thrift.FieldType('Mutation')),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRow', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} mutations
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.mutateRowTs =
    function(tableName, row, mutations, timestamp, attributes,
             complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, mutations, 3,
        new polina.thrift.FieldType('Mutation')),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRowTs', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!Array} rowBatches
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.mutateRows =
    function(tableName, rowBatches, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rowBatches, 2,
        new polina.thrift.FieldType('BatchMutation')),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRows', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!Array} rowBatches
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.mutateRowsTs =
    function(tableName, rowBatches, timestamp, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rowBatches, 2,
        new polina.thrift.FieldType('BatchMutation')),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRowsTs', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} value
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.atomicIncrement =
    function(tableName, row, column, value, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, value, 4)];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.I64);
  this.thrift.writeMethod('atomicIncrement', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.deleteAll =
    function(tableName, row, column, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAll', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.deleteAllTs =
    function(tableName, row, column, timestamp, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAllTs', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.deleteAllRow =
    function(tableName, row, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAllRow', args, complete, cancel);
};


/**
 * @param {!Object} increment
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.increment =
    function(increment, complete, cancel) {
  var args = [
    new polina.thrift.Argument('TIncrement', increment, 1)];
  this.thrift.writeMethod('increment', args, complete, cancel);
};


/**
 * @param {!Array} increments
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.incrementRows =
    function(increments, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.LIST, increments, 1,
        new polina.thrift.FieldType('TIncrement'))];
  this.thrift.writeMethod('incrementRows', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.deleteAllRowTs =
    function(tableName, row, timestamp, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAllRowTs', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!Object} scan
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerOpenWithScan =
    function(tableName, scan, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument('TScan', scan, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.I32);
  this.thrift.writeMethod('scannerOpenWithScan', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerOpen =
    function(tableName, startRow, columns, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.I32);
  this.thrift.writeMethod('scannerOpen', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!string} stopRow
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerOpenWithStop =
    function(tableName, startRow, stopRow, columns, attributes,
             complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, stopRow, 3),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.I32);
  this.thrift.writeMethod('scannerOpenWithStop', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} startAndPrefix
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerOpenWithPrefix =
    function(tableName, startAndPrefix, columns, attributes, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startAndPrefix, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.I32);
  this.thrift.writeMethod('scannerOpenWithPrefix', args,
      complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!Array} columns
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerOpenTs =
    function(tableName, startRow, columns, timestamp, attributes,
             complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.I32);
  this.thrift.writeMethod('scannerOpenTs', args, complete, cancel, returnType);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!string} stopRow
 * @param {!Array} columns
 * @param {!number} timestamp
 * @param {!Object} attributes
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerOpenWithStopTs =
    function(tableName, startRow, stopRow, columns, timestamp, attributes,
             complete, cancel) {

  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, stopRow, 3),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 5),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 6,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  var returnType = new polina.thrift.FieldType(polina.thrift.Types.I32);
  this.thrift.writeMethod('scannerOpenWithStopTs', args,
      complete, cancel, returnType);
};


/**
 * @param {number} id
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerGet = function(id, complete, cancel) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.I32, id, 1)];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('scannerGet', args, complete, cancel, returnType);
};


/**
 * @param {number} id
 * @param {number} nbRows
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerGetList =
    function(id, nbRows, complete, cancel) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.I32, id, 1),
        new polina.thrift.Argument(polina.thrift.Types.I32, nbRows, 2)];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TRowResult');
  this.thrift.writeMethod('scannerGetList', args, complete, cancel, returnType);
};


/**
 * @param {number} id
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerClose = function(id, complete, cancel) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.I32, id, 1)];
  this.thrift.writeMethod('scannerClose', args, complete, cancel);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} family
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRowOrBefore =
    function(tableName, row, family, complete, cancel) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, family, 3)];
  var returnType =
      new polina.thrift.FieldType(polina.thrift.Types.LIST, 'TCell');

  this.thrift.writeMethod('getRowOrBefore', args, complete, cancel, returnType);
};


/**
 * @param {!string} row
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRegionInfo = function(row, complete, cancel) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, row, 1)];
  var returnType = new polina.thrift.FieldType('TRegionInfo');
  this.thrift.writeMethod('getRegionInfo', args, complete, cancel, returnType);
};


