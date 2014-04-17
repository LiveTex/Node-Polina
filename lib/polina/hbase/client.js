


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
 * @param {function()} callback
 */
polina.hbase.Client.prototype.enableTable = function(tableName, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('enableTable', args, callback);
};


/**
 * @param {!string} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.disableTable = function(tableName, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('disableTable', args, callback);
};


/**
 * @param {!string} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.isTableEnabled = function(tableName, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];

  var returnType = new polina.thrift.FieldType(polina.thrift.Types.BOOL);
  this.thrift.writeMethod('isTableEnabled', args, callback, returnType);
};


/**
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getTableNames = function(callback) {
  this.thrift.writeMethod('getTableNames', [], callback);
};


/**
 * @param {!string} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getColumnDescriptors =
    function(tableName, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('getColumnDescriptors', args, callback);
};


/**
 * @param {!string} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getTableRegions = function(tableName, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('getTableRegions', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Array} columnDescriptors list;
 * @param {function()} callback
 */
polina.hbase.Client.prototype.createTable =
    function(tableName, columnDescriptors, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columnDescriptors, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRUCT))];

  this.thrift.writeMethod('createTable', args, callback);
};


/**
 * @param {!string} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteTable = function(tableName, callback) {
  this.thrift.writeMethod('deleteTable',
      [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)],
      callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.get =
    function(tableName, row, column, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('get', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} numVersions
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getVer =
    function(tableName, row, column, numVersions, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I32, numVersions, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getVer', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} timestamp
 * @param {number} numVersions
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getVerTs =
    function(tableName, row, column, timestamp, numVersions,
             attributes, callback) {

  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.I32, numVersions, 5),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 6,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getVerTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRow =
    function(tableName, row, attributes, callback) {

  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getRow', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowWithColumns =
    function(tableName, row, columns, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getRowWithColumns', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowTs =
    function(tableName, row, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getRowTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} columns
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowWithColumnsTs =
    function(tableName, row, columns, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  this.thrift.writeMethod('getRowWithColumnsTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRows =
    function(tableName, rows, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getRows', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowsWithColumns =
    function(tableName, rows, columns, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getRowsWithColumns', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowsTs =
    function(tableName, rows, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('getRowsTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Array} rows
 * @param {!Array} columns
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowsWithColumnsTs =
    function(tableName, rows, columns, timestamp, attributes, callback) {
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

  this.thrift.writeMethod('getRowsWithColumnsTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} mutations
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.mutateRow =
    function(tableName, row, mutations, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, mutations, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRUCT)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRow', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Array} mutations
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.mutateRowTs =
    function(tableName, row, mutations, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, mutations, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRUCT)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRowTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Array} rowBatches
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.mutateRows =
    function(tableName, rowBatches, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rowBatches, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRUCT)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRows', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Array} rowBatches
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.mutateRowsTs =
    function(tableName, rowBatches, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rowBatches, 2,
        new polina.thrift.FieldType(polina.thrift.Types.STRUCT)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('mutateRowsTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} value
 * @param {function()} callback
 */
polina.hbase.Client.prototype.atomicIncrement =
    function(tableName, row, column, value, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, value, 4)];

  this.thrift.writeMethod('atomicIncrement', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteAll =
    function(tableName, row, column, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAll', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} column
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteAllTs =
    function(tableName, row, column, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAllTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteAllRow =
    function(tableName, row, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAllRow', args, callback);
};


/**
 * @param {!Object} increment
 * @param {function()} callback
 */
polina.hbase.Client.prototype.increment = function(increment, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRUCT, increment, 1)];
  this.thrift.writeMethod('increment', args, callback);
};


/**
 * @param {!Array} increments
 * @param {function()} callback
 */
polina.hbase.Client.prototype.incrementRows = function(increments, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.LIST, increments, 1,
        new polina.thrift.FieldType(polina.thrift.Types.STRUCT))];
  this.thrift.writeMethod('incrementRows', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteAllRowTs =
    function(tableName, row, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];

  this.thrift.writeMethod('deleteAllRowTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!Object} scan
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenWithScan =
    function(tableName, scan, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRUCT, scan, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  this.thrift.writeMethod('scannerOpenWithScan', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpen =
    function(tableName, startRow, columns, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  this.thrift.writeMethod('scannerOpen', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!string} stopRow
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenWithStop =
    function(tableName, startRow, stopRow, columns, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, stopRow, 3),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  this.thrift.writeMethod('scannerOpenWithStop', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} startAndPrefix
 * @param {!Array} columns
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenWithPrefix =
    function(tableName, startAndPrefix, columns, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startAndPrefix, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  this.thrift.writeMethod('scannerOpenWithPrefix', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!Array} columns
 * @param {number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenTs =
    function(tableName, startRow, columns, timestamp, attributes, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        new polina.thrift.FieldType(polina.thrift.Types.STRING)),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        new polina.thrift.FieldType(polina.thrift.Types.STRING),
        new polina.thrift.FieldType(polina.thrift.Types.STRING))];
  this.thrift.writeMethod('scannerOpenTs', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} startRow
 * @param {!string} stopRow
 * @param {!Array} columns
 * @param {!number} timestamp
 * @param {!Object} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenWithStopTs =
    function(tableName, startRow, stopRow, columns, timestamp, attributes,
             callback) {

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
  this.thrift.writeMethod('scannerOpenWithStopTs', args, callback);
};


/**
 * @param {number} id
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerGet = function(id, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.I32, id, 1)];
  this.thrift.writeMethod('scannerGet', args, callback);
};


/**
 * @param {number} id
 * @param {number} nbRows
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerGetList = function(id, nbRows, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.I32, id, 1),
        new polina.thrift.Argument(polina.thrift.Types.I32, nbRows, 2)];
  this.thrift.writeMethod('scannerGetList', args, callback);
};


/**
 * @param {number} id
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerClose = function(id, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.I32, id, 1)];
  this.thrift.writeMethod('scannerClose', args, callback);
};


/**
 * @param {!string} tableName
 * @param {!string} row
 * @param {!string} family
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowOrBefore =
    function(tableName, row, family, callback) {
  var args = [
    new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, family, 3)];
  this.thrift.writeMethod('getRowOrBefore', args, callback);
};


/**
 * @param {!string} row
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRegionInfo = function(row, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, row, 1)];
  this.thrift.writeMethod('getRegionInfo', args, callback);
};



