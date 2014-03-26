/**
 *
 * @param type
 * @param {Array|String|object}value
 * @param id
 * @param {number}vtype
 * @param {number}ktype
 * @constructor
 */
polina.thrift.Argument = function(type, value, id, vtype, ktype) {

  this.id = id;

  this.type = type;

  if (type === polina.thrift.Types.MAP){
    this.data = new polina.thrift.Map(value, ktype, vtype);
  } else if (type === polina.thrift.Types.LIST ||
             type === polina.thrift.Types.SET){
    this.data = new polina.thrift.TArray(value, vtype);
  } else {
    this.data = value;
  }
};
