


/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 */


polina.hbase.Mutation = function(column, value) {

  /**
   * @type {Boolean}
   */
  this.isDelete = false;

  /**
   * @type {Boolean}
   */
  this.writeToWAL = 1;

  /**
   * @type {String}
   */
  this.value = value;

  /**
   *  @type {String}
   */
  this.column = column;
};

polina.hbase.Mutation.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
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
  return {'id'  : id,
          'type': type};
};
