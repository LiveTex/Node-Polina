


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


/**
 * @inheritDoc
 */
polina.hbase.TCell.prototype.getFieldInfo = function(propertyName) {
  var id = 0;
  var type = 0;
  var vtype = -1;
  var ktype = -1;

  switch (propertyName) {
    case 'value':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'timestamp':
      id = 2;
      type = polina.thrift.Types.I64;
      break;
    default:
      return null;
  }
  return polina.thrift.FieldInfo(id, type);
};

