

/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 */

polina.hbase.TCell = function(value, timestamp) {
  /**
   * @type {String}
   */
  this.value = value;

  /**
   *  @type {number}
   */
  this.timestamp = timestamp;
};

polina.hbase.TCell.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
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
  return {'id'  : id,
          'type': type};
};