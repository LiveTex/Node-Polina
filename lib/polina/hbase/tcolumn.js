


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
