


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 *
 * @param {string} columnName
 * @param {polina.hbase.TCell} cell
 */
polina.hbase.TColumn = function(columnName, cell) {

  /**
   * @type {string}
   */
  this.columnName = columnName;

  /**
   *  @type {polina.hbase.TCell}
   */
  this.cell = cell;
};


/**
 * @inheritDoc
 */
polina.hbase.TColumn.prototype.getFieldInfo = function(propertyName) {
  var id = 0;
  var type = 0;


  switch (propertyName) {
    case 'columnName':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'cell':
      id = 2;
      type = 'TCell';
      break;
    default:
      return null;
  }
  return polina.thrift.FieldInfo(id, type);
};
