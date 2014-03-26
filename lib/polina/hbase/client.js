


/**
 * hbase client.
 *
 * @constructor
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.hbase.Client = function(port, opt_host) {
  this.thrift = new polina.thrift.Client(port, opt_host);
};


/**
 * @param {String} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.enableTable = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('enableTable', args, callback);
};


/**
 * @param {String} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.disableTable = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('disableTable', args, callback);
};


/**
 * @param {String} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.isTableEnabled = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('isTableEnabled', args, callback);
};


/**
 *
 */
polina.hbase.Client.prototype.getTableNames = function(callback) {
  this.thrift.writeMethod('getTableNames', [], callback);
};
/**
 * @param {String} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getColumnDescriptors = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('getColumnDescriptors', args, callback);
};


/**
 * @param {String} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getTableRegions = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('getTableRegions', args, callback);
};

/**
 * @param {String} tableName
 * @param {Array<polina.hbase.ColumnDescriptor>} columnDescriptors list;
 * @param {function()} callback
 */
polina.hbase.Client.prototype.createTable = function(tableName,
                                                     columnDescriptors,
                                                     callback){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
             new polina.thrift.Argument(polina.thrift.Types.LIST,
                 columnDescriptors, 2, polina.thrift.Types.STRUCT)];

  this.thrift.writeMethod('createTable', args, callback);
};


/**
 * @param {String} tableName
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteTable = function(tableName, callback){
  this.thrift.writeMethod('deleteTable',
      [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)],
      callback);
};
/**
 * @param {String} tableName
 * @param {String} row
 * @param {String} column
 * @param {Object.<String,String>}attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.get = function(tableName, row, column, attributes,
                                             callback){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
             new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
             new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
             new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
                       polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('get', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {String} column
 * @param {number} numVersions
 * @param {Object.<String,String>}attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getVer = function(tableName, row, column,
                                                numVersions, attributes,
                                                callback){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I32, numVersions, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getVer', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {String} column
 * @param {number} timestamp
 * @param {number} numVersions
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getVerTs = function(tableName, row, column,
                                                  timestamp, numVersions,
                                                  attributes, callback){

  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.I32, numVersions, 5),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 6,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getVerTs', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRow = function(tableName, row, attributes,
                                                callback){

  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRow', args, callback);
};

/**
 * @param {String} tableName
 * @param {String} row
 * @param {String} columns
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowWithColumns = function(tableName, row,
                                                           columns, attributes,
                                                           callback) {
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRowWithColumns', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {number} timestamp
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowTs = function(tableName, row,
                                                  timestamp, attributes,
                                                  callback) {
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRowTs', args, callback);
};

/**
 * @param {String} tableName
 * @param {String} row
 * @param {number} timestamp
 * @param {String} columns
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowWithColumnsTs = function(tableName, row,
                                                             columns,  timestamp,
                                                             attributes,
                                                             callback) {
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRowWithColumnsTs', args, callback);
};


/**
 * @param {String} tableName
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 * @param {String} rows
 */
polina.hbase.Client.prototype.getRows = function(tableName, rows, attributes,
                                                 callback){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRows', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} columns
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 * @param {String} rows
 */
polina.hbase.Client.prototype.getRowsWithColumns = function(tableName, rows,
                                                            columns, attributes,
                                                            callback) {
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRowsWithColumns', args, callback);
};
/**
 * @param {String} tableName
 * @param {number} timestamp
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 * @param {String} rows
 */
polina.hbase.Client.prototype.getRowsTs = function(tableName, rows,
                                                   timestamp, attributes,
                                                   callback) {
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRowsTs', args, callback);
};

/**
 * @param {String} tableName
 * @param {String} rows
 * @param {String} columns
 * @param {number} timestamp
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowsWithColumnsTs = function(tableName, rows,
                                                              columns,  timestamp,
                                                              attributes,
                                                              callback) {
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rows, 2,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('getRowsWithColumnsTs', args, callback);
};

/**
 * @param {string} tableName
 * @param {string} row
 * @param {Array.<polina.hbase.Mutation>} mutations
 *@param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.mutateRow = function(tableName, row, mutations,
                                                   attributes, callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
             new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
             new polina.thrift.Argument(polina.thrift.Types.LIST, mutations, 3,
                 polina.thrift.Types.STRUCT),
             new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
                 polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('mutateRow', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {Array.<polina.hbase.Mutation>} mutations
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 * @param {number} timestamp
 */
polina.hbase.Client.prototype.mutateRowTs = function(tableName, row, mutations,
                                                     timestamp,
                                                     attributes, callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, mutations, 3,
        polina.thrift.Types.STRUCT),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('mutateRowTs', args, callback);
};


/**
 * @param {String} tableName
 * @param {Array.<polina.hbase.BatchMutation>}rowBatches
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.mutateRows = function(tableName, rowBatches,
                                                    attributes, callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rowBatches, 2,
        polina.thrift.Types.STRUCT),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('mutateRows', args, callback);
};


/**
 * @param {String} tableName
 * @param {Array.<polina.hbase.BatchMutation>} rowBatches
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 * @param {number} timestamp
 */
polina.hbase.Client.prototype.mutateRowsTs = function(tableName, rowBatches,
                                                      timestamp,
                                                      attributes, callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.LIST, rowBatches, 2,
        polina.thrift.Types.STRUCT),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('mutateRowsTs', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {String} column
 * @param {number} value
 * @param {function()} callback
 */
polina.hbase.Client.prototype.atomicIncrement = function(tableName, row,
                                                         column, value,
                                                         callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, value, 4)];

  this.thrift.writeMethod('atomicIncrement', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {String} column
 * @param {function()} callback
 * @param {Object.<String,String>} attributes
 */
polina.hbase.Client.prototype.deleteAll = function(tableName, row,
                                                   column, attributes,
                                                   callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('deleteAll', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {String} column
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 * @param {number} timestamp
 */
polina.hbase.Client.prototype.deleteAllTs = function(tableName, row,
                                                     column, timestamp,
                                                     attributes, callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('deleteAllTs', args, callback);
};

/**
 * @param {String} tableName
 * @param {String} row
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteAllRow = function(tableName, row,
                                                      attributes,
                                                      callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('deleteAllRow', args, callback);
};

/**
 * @param {polina.hbase.TIncrement}increment
 * @param {function()} callback
 */
polina.hbase.Client.prototype.increment = function(increment, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRUCT, increment, 1)];
  this.thrift.writeMethod('increment', args, callback);
};


/**
 * @param {Array.<polina.hbase.TIncrement>} increments
 * @param {function()} callback
 */
polina.hbase.Client.prototype.incrementRows = function(increments, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.LIST, increments, 1,
                                       polina.thrift.Types.STRUCT)];
  this.thrift.writeMethod('incrementRows', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} row
 * @param {number} timestamp
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.deleteAllRowTs = function(tableName, row,
                                                        timestamp, attributes,
                                                        callback ){
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod('deleteAllRowTs', args, callback);
};

/**
 * @param {String} tableName
 * @param {polina.hbase.TScan} scan
 * @param {function()} callback
 * @param {Object.<String,String>} attributes
 */
polina.hbase.Client.prototype.scannerOpenWithScan = function(tableName, scan,
                                                             attributes, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRUCT, scan, 2),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 3,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];
  this.thrift.writeMethod('scannerOpenWithScan', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} startRow
 * @param {Array.<String>} columns
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpen = function(tableName, startRow,
                                                     columns,
                                                     attributes, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
                               polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
                               polina.thrift.Types.STRING,
                               polina.thrift.Types.STRING)];
  this.thrift.writeMethod('scannerOpen', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} startRow
 * @param {String} stopRow
 * @param {String} columns
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenWithStop = function(tableName, startRow,
                                                             stopRow, columns,
                                                             attributes, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, stopRow, 3),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 4,
                               polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
                               polina.thrift.Types.STRING,
                               polina.thrift.Types.STRING)];
  this.thrift.writeMethod('scannerOpenWithStop', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} startAndPrefix
 * @param {String} columns
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenWithPrefix = function(tableName,
                                                               startAndPrefix,
                                                               columns,
                                                               attributes,
                                                               callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startAndPrefix, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
                               polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
                               polina.thrift.Types.STRING,
                               polina.thrift.Types.STRING)];
  this.thrift.writeMethod('scannerOpenWithPrefix', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} startRow
 * @param {String} columns
 * @param {number} timestamp
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenTs = function(tableName, startRow,
                                                       columns, timestamp,
                                                       attributes, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 3,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 4),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 5,
        polina.thrift.Types.STRING,
        polina.thrift.Types.STRING)];
  this.thrift.scannerOpenTs('scannerOpen', args, callback);
};


/**
 * @param {String} tableName
 * @param {String} startRow
 * @param {String} stopRow
 * @param {String} columns
 * @param {number} timestamp
 * @param {Object.<String,String>} attributes
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerOpenWithStopTs = function(tableName,
                                                               startRow,
                                                               stopRow, columns,
                                                               timestamp,
                                                               attributes,
                                                               callback){

  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, startRow, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, stopRow, 3),
    new polina.thrift.Argument(polina.thrift.Types.LIST, columns, 4,
        polina.thrift.Types.STRING),
    new polina.thrift.Argument(polina.thrift.Types.I64, timestamp, 5),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 6,
        polina.thrift.Types.STRING,
        polina.thrift.Types.STRING)];
  this.thrift.writeMethod('scannerOpenWithStopTs', args, callback);
};

/**
 * @param {number} id
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerGet = function(id, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.I32, id, 1)];
  this.thrift.writeMethod('scannerGet', args, callback);
};


/**
 * @param {number} id
 * @param nbRows
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerGetList = function(id, nbRows, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.I32, id, 1),
            new polina.thrift.Argument(polina.thrift.Types.I32, nbRows, 2) ];
  this.thrift.writeMethod('scannerGetList', args, callback);
};

/**
 * @param {number} id
 * @param {function()} callback
 */
polina.hbase.Client.prototype.scannerClose = function(id, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.I32, id, 1)];
  this.thrift.writeMethod('scannerClose', args, callback);
};

/**
 * @param {String} tableName
 * @param {String} row
 * @param family
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRowOrBefore = function(tableName, row, family,
                                                        callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, family, 3) ];
  this.thrift.writeMethod('getRowOrBefore', args, callback);
};


/**
 * @param {String} row
 * @param {function()} callback
 */
polina.hbase.Client.prototype.getRegionInfo = function(row, callback){
  var args=[new polina.thrift.Argument(polina.thrift.Types.STRING, row, 1)];
  this.thrift.writeMethod('getRegionInfo', args, callback);
};



