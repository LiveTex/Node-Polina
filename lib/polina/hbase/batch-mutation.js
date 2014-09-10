


/**
 * @constructor
 *
 * @param {string} row
 * @param {Array.<polina.hbase.Mutation>} mutations
 */
polina.hbase.BatchMutation = function(row, mutations) {

  /**
   * @type {string}
   */
  this.row = row;

  /**
   *  @type {Array.<polina.hbase.Mutation>}
   */
  this.mutations = mutations;

};
