


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 * @param {string} row
 * @param {{String: polina.hbase.TCell}=} opt_columns
 * @param {Array.<polina.hbase.TColumn>=} opt_sortedColumns
 */
polina.hbase.TRowResult = function(row, opt_columns, opt_sortedColumns) {
  /**
   * @type {string}
   */
  this.row = row;

  /**
   *  @type {*}
   */
  this.columns = opt_columns;

  /**
   *  @type {*}
   */
  this.sortedColumns = opt_sortedColumns;
};


/**
 * @inheritDoc
 */
polina.hbase.TRowResult.prototype.getFieldInfo = function(propertyName) {
  var id = 0;
  var type = 0;
  var vtype, ktype;

  switch (propertyName) {
    case 'row':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'columns':
      id = 2;
      type = polina.thrift.Types.MAP;
      vtype = polina.thrift.FieldInfo(0, 'TCell');
      ktype = polina.thrift.FieldInfo(0, polina.thrift.Types.STRING);
      break;
    case 'sortedColumns':
      id = 3;
      type = polina.thrift.Types.LIST;
      vtype = polina.thrift.FieldInfo(0, 'TColumn');
      break;
  }
  return polina.thrift.FieldInfo(id, type, vtype, ktype);
};
