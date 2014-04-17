


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 * @param {string} table
 * @param {string} row
 * @param {string} column
 * @param {number} ammount
 */
polina.hbase.TIncrement = function(table, row, column, ammount) {


  /**
   * @type {string}
   */
  this.table = table;


  /**
   * @type {string}
   */
  this.row = row;


  /**
   * @type {string}
   */
  this.column = column;


  /**
   * @type {number}
   */
  this.ammount = ammount;
};
