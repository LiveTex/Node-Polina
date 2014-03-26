


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
 * @param tableName
 * @param callback
 */
polina.hbase.Client.prototype.enableTable = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('enableTable', args, callback);
};


/**
 * @param tableName
 * @param callback
 */
polina.hbase.Client.prototype.disableTable = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('disableTable', args, callback);
};


/**
 * @param tableName
 * @param callback
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
 * @param tableName
 * @param callback
 */
polina.hbase.Client.prototype.getColumnDescriptors = function(tableName, callback) {
  var args = [new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1)];
  this.thrift.writeMethod('getColumnDescriptors', args, callback);
};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getTableRegions = function(tableName) {};

/**
 * @param tableName
 * @param {Array<polina.hbase.ColumnDescriptor>} columnDescriptors list;
 * @param callback
 */
polina.hbase.Client.prototype.createTable = function(tableName,
                                                     columnDescriptors,
                                                     callback){
  var methodName = 'createTable';
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
             new polina.thrift.Argument(polina.thrift.Types.LIST,
                 columnDescriptors, 2, polina.thrift.Types.STRUCT)];

  this.thrift.writeMethod(methodName, args, callback);
};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.deleteTable = function(tableName){};


/**
 * @param tableName
 * @param row
 * @param column
 * @param {Object.<String,String>}attributes
 * @param callback
 */
polina.hbase.Client.prototype.get = function(tableName, row, column, attributes,
                                             callback){
  var methodName = 'get';
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
             new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
             new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
             new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
                       polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod(methodName, args, callback);
};


/**
 * @param tableName
 * @param row
 * @param column
 * @param numVersions
 * @param {Object.<String,String>}attributes
 */
polina.hbase.Client.prototype.getVer = function(tableName, row, column,
                                                numVersions, attributes){
  var methodName = 'get';
  var args=[ new polina.thrift.Argument(polina.thrift.Types.STRING, tableName, 1),
    new polina.thrift.Argument(polina.thrift.Types.STRING, row, 2),
    new polina.thrift.Argument(polina.thrift.Types.STRING, column, 3),
    new polina.thrift.Argument(polina.thrift.Types.MAP, attributes, 4,
        polina.thrift.Types.STRING, polina.thrift.Types.STRING)];

  this.thrift.writeMethod(methodName, args, callback);
};


/**
 * @param tableName
 * @param row
 * @param column
 * @param timestamp
 * @param numVersions
 * @param {Object.<String,String>} attributes
 */
polina.hbase.Client.prototype.getVerTs = function(tableName, row, column,
                                                  timestamp, numVersions,
                                                  attributes){};


/**
 * @param tableName
 * @param row
 * @param attributes {Object.<String,String>}attributes
 */
polina.hbase.Client.prototype.getRow = function(tableName, row, attributes){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRowWithColumns = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRowTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRowWithColumnsTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRows = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRowsWithColumns = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRowsTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRowsWithColumnsTs = function(){};


/**
 * @param {string} tableName
 * @param {string} row
 * @param {Array.<polina.hbase.Mutation>} mutations
 * @param {Object.<String,String>} attributes
 * @param callback
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
 * @param tableName
 */
polina.hbase.Client.prototype.mutateRowTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.mutateRows = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.mutateRowsTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.atomicIncrement = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.deleteAll = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.deleteAllTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.deleteAllRow = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.increment = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.incrementRows = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.deleteAllRowTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerOpenWithScan = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerOpen = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerOpenWithStop = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerOpenWithPrefix = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerOpenTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerOpenWithStopTs = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerGet = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerGetList = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.scannerClose = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRowOrBefore = function(){};


/**
 * @param tableName
 */
polina.hbase.Client.prototype.getRegionInfo = function(){};


