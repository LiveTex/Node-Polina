

/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 */

polina.hbase.TCell = function() {
  /**
   * @type {String}
   */
  this.value = '';

  /**
   *  @type {number}
   */
  this.timestamp = 0;
};
