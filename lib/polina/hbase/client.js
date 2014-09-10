


/**
 * Hbase client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.hbase.Client = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);
  this.__thriftClient =
      new thrift.Client(new polina.hbase.Idl(), port, opt_host);

  this.__thriftClient.registerResponseHandler(function(message) {
    console.log('Response ', message.getName(), message.getData());
  });
};

util.inherits(polina.hbase.Client, polina.Connection);

/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.enableTable =
    function(tableName, complete, cancel) {
  var args = [
    new thrift.Argument(thrift.Type.STRING, tableName, 1)];
  this.__thriftClient.encodeRequest('enableTable', args);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.disableTable =
    function(tableName, complete, cancel) {
  var args = [
    new thrift.Argument(thrift.Type.STRING, tableName, 1)];
  this.__thriftClient.encodeRequest('disableTable', args);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.isTableEnabled =
    function(tableName, complete, cancel) {
  var args = [
    new thrift.Argument(thrift.Type.STRING, tableName, 1)];

  var returnType = new thrift.FieldType(thrift.Type.BOOL);
  this.__thriftClient.encodeRequest('isTableEnabled', args, returnType);
};


/**
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getTableNames = function(complete, cancel) {
  var returnType = new thrift.FieldType(thrift.Type.LIST,
      thrift.Type.STRING);
  this.__thriftClient.encodeRequest('getTableNames', [], returnType);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getColumnDescriptors =
    function(tableName, complete, cancel) {
  var args = [
    new thrift.Argument(thrift.Type.STRING, tableName, 1)];
  var returnType = new thrift.FieldType(thrift.Type.MAP,
      'ColumnDescriptor', thrift.Type.STRING);
  this.__thriftClient.encodeRequest('getColumnDescriptors', args, complete,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1)];
  var returnType = new thrift.FieldType(thrift.Type.LIST,
      'TRegionInfo');
  this.__thriftClient.encodeRequest('getTableRegions', args, complete,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.LIST, columnDescriptors, 2,
        'ColumnDescriptor')];

  this.__thriftClient.encodeRequest('createTable', args);
};


/**
 * @param {!string} tableName
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.deleteTable =
    function(tableName, complete, cancel) {
  this.__thriftClient.encodeRequest('deleteTable',
      [new thrift.Argument(thrift.Type.STRING, tableName, 1)],
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.STRING, column, 3),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TCell');

  this.__thriftClient.encodeRequest('get', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.STRING, column, 3),
    new thrift.Argument(thrift.Type.I32, numVersions, 4),
    new thrift.Argument(thrift.Type.MAP, attributes, 5,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TCell');
  this.__thriftClient.encodeRequest('getVer', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.STRING, column, 3),
    new thrift.Argument(thrift.Type.I64, timestamp, 4),
    new thrift.Argument(thrift.Type.I32, numVersions, 5),
    new thrift.Argument(thrift.Type.MAP, attributes, 6,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TCell');
  this.__thriftClient.encodeRequest('getVerTs', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.MAP, attributes, 3,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRow', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.LIST, columns, 3,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRowWithColumns', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.I64, timestamp, 3),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRowTs', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.LIST, columns, 3,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.I64, timestamp, 4),
    new thrift.Argument(thrift.Type.MAP, attributes, 5,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRowWithColumnsTs', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.LIST, rows, 2,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.MAP, attributes, 3,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRows', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.LIST, rows, 2,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.LIST, columns, 3,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRowsWithColumns', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.LIST, rows, 2,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.I64, timestamp, 3),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRowsTs', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.LIST, rows, 2,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.LIST, columns, 3,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.I64, timestamp, 4),
    new thrift.Argument(thrift.Type.MAP, attributes, 5,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('getRowsWithColumnsTs', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.LIST, mutations, 3,
        new thrift.FieldType('Mutation')),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('mutateRow', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.LIST, mutations, 3,
        new thrift.FieldType('Mutation')),
    new thrift.Argument(thrift.Type.I64, timestamp, 4),
    new thrift.Argument(thrift.Type.MAP, attributes, 5,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('mutateRowTs', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.LIST, rowBatches, 2,
        new thrift.FieldType('BatchMutation')),
    new thrift.Argument(thrift.Type.MAP, attributes, 3,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('mutateRows', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.LIST, rowBatches, 2,
        new thrift.FieldType('BatchMutation')),
    new thrift.Argument(thrift.Type.I64, timestamp, 3),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('mutateRowsTs', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.STRING, column, 3),
    new thrift.Argument(thrift.Type.I64, value, 4)];
  var returnType = new thrift.FieldType(thrift.Type.I64);
  this.__thriftClient.encodeRequest('atomicIncrement', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.STRING, column, 3),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('deleteAll', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.STRING, column, 3),
    new thrift.Argument(thrift.Type.I64, timestamp, 4),
    new thrift.Argument(thrift.Type.MAP, attributes, 5,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('deleteAllTs', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.MAP, attributes, 3,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('deleteAllRow', args);
};


/**
 * @param {!Object} increment
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.increment =
    function(increment, complete, cancel) {
  var args = [
    new thrift.Argument('TIncrement', increment, 1)];
  this.__thriftClient.encodeRequest('increment', args);
};


/**
 * @param {!Array} increments
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.incrementRows =
    function(increments, complete, cancel) {
  var args = [
    new thrift.Argument(thrift.Type.LIST, increments, 1,
        new thrift.FieldType('TIncrement'))];
  this.__thriftClient.encodeRequest('incrementRows', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.I64, timestamp, 3),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];

  this.__thriftClient.encodeRequest('deleteAllRowTs', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument('TScan', scan, 2),
    new thrift.Argument(thrift.Type.MAP, attributes, 3,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType = new thrift.FieldType(thrift.Type.I32);
  this.__thriftClient.encodeRequest('scannerOpenWithScan', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, startRow, 2),
    new thrift.Argument(thrift.Type.LIST, columns, 3,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType = new thrift.FieldType(thrift.Type.I32);
  this.__thriftClient.encodeRequest('scannerOpen', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, startRow, 2),
    new thrift.Argument(thrift.Type.STRING, stopRow, 3),
    new thrift.Argument(thrift.Type.LIST, columns, 4,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.MAP, attributes, 5,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType = new thrift.FieldType(thrift.Type.I32);
  this.__thriftClient.encodeRequest('scannerOpenWithStop', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, startAndPrefix, 2),
    new thrift.Argument(thrift.Type.LIST, columns, 3,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.MAP, attributes, 4,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType = new thrift.FieldType(thrift.Type.I32);
  this.__thriftClient.encodeRequest('scannerOpenWithPrefix', args,
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, startRow, 2),
    new thrift.Argument(thrift.Type.LIST, columns, 3,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.I64, timestamp, 4),
    new thrift.Argument(thrift.Type.MAP, attributes, 5,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType = new thrift.FieldType(thrift.Type.I32);
  this.__thriftClient.encodeRequest('scannerOpenTs', args, returnType);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, startRow, 2),
    new thrift.Argument(thrift.Type.STRING, stopRow, 3),
    new thrift.Argument(thrift.Type.LIST, columns, 4,
        new thrift.FieldType(thrift.Type.STRING)),
    new thrift.Argument(thrift.Type.I64, timestamp, 5),
    new thrift.Argument(thrift.Type.MAP, attributes, 6,
        new thrift.FieldType(thrift.Type.STRING),
        new thrift.FieldType(thrift.Type.STRING))];
  var returnType = new thrift.FieldType(thrift.Type.I32);
  this.__thriftClient.encodeRequest('scannerOpenWithStopTs', args,
      complete, cancel, returnType);
};


/**
 * @param {number} id
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerGet = function(id, complete, cancel) {
  var args = [new thrift.Argument(thrift.Type.I32, id, 1)];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('scannerGet', args, returnType);
};


/**
 * @param {number} id
 * @param {number} nbRows
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerGetList =
    function(id, nbRows, complete, cancel) {
  var args = [new thrift.Argument(thrift.Type.I32, id, 1),
        new thrift.Argument(thrift.Type.I32, nbRows, 2)];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TRowResult');
  this.__thriftClient.encodeRequest('scannerGetList', args, returnType);
};


/**
 * @param {number} id
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.scannerClose = function(id, complete, cancel) {
  var args = [new thrift.Argument(thrift.Type.I32, id, 1)];
  this.__thriftClient.encodeRequest('scannerClose', args);
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
    new thrift.Argument(thrift.Type.STRING, tableName, 1),
    new thrift.Argument(thrift.Type.STRING, row, 2),
    new thrift.Argument(thrift.Type.STRING, family, 3)];
  var returnType =
      new thrift.FieldType(thrift.Type.LIST, 'TCell');

  this.__thriftClient.encodeRequest('getRowOrBefore', args, returnType);
};


/**
 * @param {!string} row
 * @param {function()} complete
 * @param {function()} cancel
 */
polina.hbase.Client.prototype.getRegionInfo = function(row, complete, cancel) {
  var args = [new thrift.Argument(thrift.Type.STRING, row, 1)];
  var returnType = new thrift.FieldType('TRegionInfo');
  this.__thriftClient.encodeRequest('getRegionInfo', args, returnType);
};


