


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 * @param {string=} opt_startRow
 * @param {string=} opt_stopRow
 * @param {number=} opt_timestamp
 * @param {Array.<String>=} opt_columns
 * @param {number=} opt_caching
 * @param {string=} opt_filterString
 * @param {number=} opt_batchSize
 * @param {boolean=} opt_sortColumns
 */

polina.hbase.TScan = function(opt_startRow, opt_stopRow, opt_timestamp,
                              opt_columns, opt_caching, opt_filterString,
                              opt_batchSize, opt_sortColumns) {

  /**
   * @type {string|undefined}
   */
  this.startRow = opt_startRow;

  /**
   * @type {string|undefined}
   */
  this.stopRow = opt_stopRow;

  /**
   * @type {number|undefined}
   */
  this.timestamp = opt_timestamp;

  /**
   * @type {Array.<String>|undefined}
   */
  this.columns = opt_columns;

  /**
   * @type {number|undefined}
   */
  this.caching = opt_caching;

  /**
   * @type {string|undefined}
   */
  this.filterString = opt_filterString;

  /**
   * @type {number|undefined}
   */
  this.batchSize = opt_batchSize;

  /**
   * @type {boolean|undefined}
   */
  this.sortColumns = opt_sortColumns;
};

