


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 * @param {string} startRow
 * @param {string} stopRow
 * @param {number} timestamp
 * @param {Array.<String>} columns
 * @param {number} caching
 * @param {string} filterString
 * @param {number} batchSize
 * @param {Boolean} sortColumns
 */

polina.hbase.TScan = function(startRow, stopRow, timestamp, columns, caching,
    filterString, batchSize, sortColumns) {

  /**
   * @type {string}
   */
  this.startRow = startRow;

  /**
   * @type {string}
   */
  this.stopRow = stopRow;

  /**
   * @type {number}
   */
  this.timestamp = timestamp;

  /**
   * @type {Array.<String>}
   */
  this.columns = columns;

  /**
   * @type {number}
   */
  this.caching = caching;

  /**
   * @type {string}
   */
  this.filterString = filterString;

  /**
   * @type {number}
   */
  this.batchSize = batchSize;

  /**
     * @type {Boolean}
     */
  this.sortColumns = sortColumns;
};

