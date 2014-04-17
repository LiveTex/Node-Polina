


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 *
 * @param {string} value
 * @param {number} timestamp
 */

polina.hbase.TCell = function(value, timestamp) {
  /**
   * @type {string}
   */
  this.value = value;

  /**
   *  @type {number}
   */
  this.timestamp = timestamp;
};
