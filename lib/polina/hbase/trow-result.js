


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 * @param {string} row
 * @param {Object.<string, polina.hbase.TCell>=} opt_columns
 * @param {Array.<polina.hbase.TColumn>=} opt_sortedColumns
 */
polina.hbase.TRowResult = function(row, opt_columns, opt_sortedColumns) {
  /**
   * @type {string}
   */
  this.row = row;

  /**
   * @type {Object.<string, polina.hbase.TCell>|undefined}
   */
  this.columns = opt_columns;

  /**
   * @type {Array.<polina.hbase.TColumn>|undefined}
   */
  this.sortedColumns = opt_sortedColumns;
};

