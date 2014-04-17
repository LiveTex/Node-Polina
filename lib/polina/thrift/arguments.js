


/**
 * @constructor
 *
 * @param {number|string} type
 * @param {string|!Object|number|boolean|!polina.thrift.IStruct} value
 * @param {number} id
 * @param {!polina.thrift.FieldType|number=} opt_vType
 * @param {!polina.thrift.FieldType|number=} opt_kType
 */
polina.thrift.Argument = function(type, value, id, opt_vType, opt_kType) {

  /**
   * @type {!number}
   */
  this.__id = id;

  if (opt_vType) {
    var __opt_vType = (opt_vType instanceof polina.thrift.FieldType) ?
        opt_vType :
        new polina.thrift.FieldType(opt_vType || polina.thrift.Types.STRING);
  }

  if (opt_kType) {
    var __opt_kType = (opt_vType instanceof polina.thrift.FieldType) ?
        opt_vType :
        new polina.thrift.FieldType(opt_vType || polina.thrift.Types.STRING);
  }

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__fieldType =
      new polina.thrift.FieldType(type, __opt_vType, __opt_kType);

  /**
   * @type {string|!Object|number|boolean|!polina.thrift.IStruct}
   */
  this.__value = value;



};


/**
 * @return {number}
 */
polina.thrift.Argument.prototype.getType = function() {
  return this.__fieldType.getType();
};


/**
 * @return {!polina.thrift.FieldType}
 */
polina.thrift.Argument.prototype.getFieldType = function() {
  return this.__fieldType;
};


/**
 * @return {number}
 */
polina.thrift.Argument.prototype.getId = function() {
  return this.__id;
};


/**
 * @return {!string|!Object|!number|!boolean|!polina.thrift.IStruct}
 */
polina.thrift.Argument.prototype.getValue = function() {
  return this.__value;
};
