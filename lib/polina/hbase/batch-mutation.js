/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 * @param {String} row
 * @param mutations
 */
polina.hbase.BatchMutation = function(row, mutations) {
  /**
   * @type {String}
   */
  this.row = row;

  /**
   *  @type {Array.<polina.hbase.Mutation>}
   */
  this.mutations = mutations;

};

polina.hbase.BatchMutation.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
  switch (propertyName) {
    case 'row':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'mutations':
      id = 2;
      type = polina.thrift.Types.LIST;
      break;
    default:
      return null;
  }
  return {'id'  : id,
    'type': type};
};
