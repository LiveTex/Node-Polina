/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 * @param {String} row
 * @param opt_columns
 * @param opt_sortedColumns
 */
polina.hbase.TRowResult = function(row, opt_columns, opt_sortedColumns) {
  /**
   * @type {String}
   */
  this.row = row;

  /**
   *  @type {{String: polina.hbase.TCell}}
   */
  this.columns = opt_columns;

  /**
   *  @type {Array<polina.hbase.TColumn>}
   */
  this.sortedColumns = opt_sortedColumns;
};

polina.hbase.TRowResult.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
  switch (propertyName) {
    case 'row':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'columns':
      id = 2;
      type = polina.thrift.Types.MAP;
      break;
    case 'sortedColumns':
      id = 3;
      type = polina.thrift.Types.LIST;
      break;
    default:
      return null;
  }
  return {'id'  : id,
    'type': type};
};
