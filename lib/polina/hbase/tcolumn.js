/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 * @param columnName
 * @param cell
 */
polina.hbase.TColumn = function(columnName, cell) {
  /**
   * @type {String}
   */
  this.columnName = columnName;

  /**
   *  @type {polina.hbase.TCell}
   */
  this.cell = cell;

};

polina.hbase.TColumn.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
  switch (propertyName) {
    case 'columnName':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'cell':
      id = 2;
      type = polina.thrift.Types.STRUCT;
      break;
    default:
      return null;
  }
  return {'id'  : id,
    'type': type};
};