/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 * @param {String} row
 * @param table
 * @param column
 * @param ammount
 */
polina.hbase.TIncrement = function(table, row, column, ammount) {


  /**
   * @type {String}
   */
  this.table = table;


  /**
   * @type {String}
   */
  this.row = row;


  /**
   * @type {String}
   */
  this.column = column;


  /**
   * @type {number}
   */
  this.ammount = ammount;

};

polina.hbase.TIncrement.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
  switch (propertyName) {
    case 'table':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'row':
      id = 2;
      type = polina.thrift.Types.STRING;
      break;
    case 'column':
      id = 3;
      type = polina.thrift.Types.STRING;
      break;
    case 'ammount':
      id = 4;
      type = polina.thrift.Types.I64;
      break;

    default:
      return null;
  }
  return {'id'  : id,
    'type': type};
};
