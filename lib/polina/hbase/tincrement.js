


/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 * @param {string} table
 * @param {string} row
 * @param {string} column
 * @param {number} ammount
 */
polina.hbase.TIncrement = function(table, row, column, ammount) {


  /**
   * @type {string}
   */
  this.table = table;


  /**
   * @type {string}
   */
  this.row = row;


  /**
   * @type {string}
   */
  this.column = column;


  /**
   * @type {number}
   */
  this.ammount = ammount;
};


/**
 * @inheritDoc
 */
polina.hbase.TIncrement.prototype.getFieldInfo = function(propertyName) {
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
  return {'id' : id,
    'type': type};
};
