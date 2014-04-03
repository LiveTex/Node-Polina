


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
   * @type {boolean}
   */
  this.writeToWAL = true;

  /**
   * @type {string}
   */
  this.value = value;

  /**
   *  @type {string}
   */
  this.column = column;
};


/**
 * @inheritDoc
 */
polina.hbase.Mutation.prototype.getFieldInfo = function(propertyName) {
  var id = 0;
  var type = 0;
  var vtype = -1;
  var ktype = -1;

  switch (propertyName) {
    case 'isDelete':
      type = polina.thrift.Types.BOOL;
      id = 1;

      break;
    case 'column':
      id = 2;
      type = polina.thrift.Types.STRING;
      break;
    case 'value':
      id = 3;
      type = polina.thrift.Types.STRING;
      break;
    case 'writeToWAL':
      id = 4;
      type = polina.thrift.Types.BOOL;
      break;
    default:
      return null;
  }
  return {'id' : id, 'type': type, 'vType': vtype, 'kType': ktype};
};
