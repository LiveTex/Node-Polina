


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 * @param {string} row
 * @param { {String: polina.hbase.TCell}=} opt_columns
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

