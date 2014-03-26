


/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 */

polina.hbase.TScan = function( startRow, stopRow, timestamp, columns, caching,
                               filterString, batchSize, sortColumns){

  /**
   * @type {String}
   */
  this.startRow = startRow;

  /**
   * @type {String}
   */
  this.stopRow = stopRow;

  /**
   * @type {number}
   */
  this.timestamp = timestamp;

  /**
   * @type {Array.<String>}
   */
  this.columns = columns;

  /**
   * @type {number}
   */
  this.caching = caching;

  /**
   * @type {String}
   */
  this.filterString = filterString;

  /**
   * @type {number}
   */
  this.batchSize = batchSize;

  /**
     * @type {Boolean}
     */
  this.sortColumns = sortColumns;
};


polina.hbase.TScan.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
  switch (propertyName) {
    case 'startRow':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'stopRow':
      id = 2;
      type = polina.thrift.Types.STRING;
      break;
    case 'timestamp':
      id = 3;
      type = polina.thrift.Types.I64;
      break;
    case 'columns':
      id = 4;
      type = polina.thrift.Types.LIST;
      break;
    case 'caching':
      id = 5;
      type = polina.thrift.Types.I32;
      break;
    case 'filterString':
      id = 6;
      type = polina.thrift.Types.STRING;
      break;
    case 'batchSize':
      id = 7;
      type = polina.thrift.Types.I32;
      break;
    case 'sortColumns':
      id = 8;
      type = polina.thrift.Types.BOOL;
      break;
    default:
      return null;
  }
  return {'id'  : id,
    'type': type};

};
