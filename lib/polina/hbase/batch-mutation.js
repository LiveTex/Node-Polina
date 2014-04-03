


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
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


/**
 * @inheritDoc
 */
polina.hbase.BatchMutation.prototype.getFieldInfo = function(propertyName) {
  var id = 0;
  var type = 0;
  var vtype = -1;
  var ktype = -1;

  switch (propertyName) {
    case 'row':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'mutations':
      id = 2;
      type = polina.thrift.Types.LIST;
      vtype = polina.thrift.Types.STRUCT;
      break;
    default:
      return null;
  }
  return {'id' : id, 'type': type, 'vType': vtype, 'kType': ktype};
};
