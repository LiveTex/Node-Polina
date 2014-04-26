


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 *
 * @param {string} column
 * @param {string} value
 */
polina.hbase.Mutation = function(column, value) {

  /**
   * @type {boolean}
   */
  this.isDelete = false;

  /**
   *  @type {string}
   */
  this.column = column;

  /**
   * @type {string}
   */
  this.value = value;

  /**
   * @type {boolean}
   */
  this.writeToWAL = true;

};