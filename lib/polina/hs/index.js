


/**
 * @param {string} dbName
 * @param {string} tableName
 * @param {!Array.<string>} columns
 * @param {!Array.<string>=} opt_filterColumns
 * @param {string=} opt_indexName
 * @param {number=} opt_indexId
 * @constructor
 */
polina.hs.Index = function(dbName, tableName, columns,
                           opt_filterColumns, opt_indexName, opt_indexId) {

  /**
   * @type {number}
   */
  this.__indexId = opt_indexId || 0;

  /**
   * @type {string}
   */
  this.__indexName = opt_indexName || 'PRIMARY';

  /**
   * @type {string}
   */
  this.__dbName = dbName;

  /**
   * @type {string}
   */
  this.__tableName = tableName;

  /**
   * @type {!Array.<string>}
   */
  this.__columns = columns;

  /**
   * @type {!Array.<string>}
   */
  this.__fcolumns = opt_filterColumns || [];

};


/**
 * @return {number}
 */
polina.hs.Index.prototype.getId = function() {
  return this.__indexId;
};


/**
 * @return {string}
 */
polina.hs.Index.prototype.getName = function() {
  return this.__indexName;
};


/**
 * @return {string}
 */
polina.hs.Index.prototype.getDBName = function() {
  return this.__dbName;
};


/**
 * @return {string}
 */
polina.hs.Index.prototype.getTableName = function() {
  return this.__tableName;
};


/**
 * @return {!Array.<string>}
 */
polina.hs.Index.prototype.getColumns = function() {
  return this.__columns;
};


/**
 * @return {!Array.<string>}
 */
polina.hs.Index.prototype.getFilterColumns = function() {
  return this.__fcolumns;
};
