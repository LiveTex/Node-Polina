


/**
 * @constructor
 *
 * @param {number|string} type
 * @param {string|!Object|number|boolean|!polina.thrift.IStruct} value
 * @param {number} id
 * @param {!polina.thrift.FieldType|number|string=} opt_vType
 * @param {!polina.thrift.FieldType|number|string=} opt_kType
 */
polina.thrift.Argument = function(type, value, id, opt_vType, opt_kType) {

  /**
   * @type {!number}
   */
  this.__id = id;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__fieldType =
      new polina.thrift.FieldType(type, opt_vType, opt_kType);

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
