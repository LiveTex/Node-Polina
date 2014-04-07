


/**
 * @constructor
 *
 * @param {number} type
 * @param {string|!Object|number|boolean|!polina.thrift.IStruct} value
 * @param {number} id
 * @param {!polina.thrift.FieldInfo} opt_vType
 * @param {!polina.thrift.FieldInfo} opt_kType
 */
polina.thrift.Argument = function(type, value, id, opt_vType, opt_kType) {

  /**
   * @type {!polina.thrift.FieldInfo}
   */
  this.__fieldInfo = new polina.thrift.FieldInfo(id, type, opt_vType,
      opt_kType);


  /**
   * @type {string|!Object|number|boolean|!polina.thrift.IStruct}
   */
  this.__value = value;
};


/**
 * @return {number}
 */
polina.thrift.Argument.prototype.getType = function() {
  return this.__fieldInfo.getType();
};


/**
 * @return {!polina.thrift.FieldInfo}
 */
polina.thrift.Argument.prototype.getFieldInfo = function() {
  return this.__fieldInfo;
};


/**
 * @return {number}
 */
polina.thrift.Argument.prototype.getId = function() {
  return this.__fieldInfo.getId();
};


/**
 * @return {!string|!Object|!number|!boolean|!polina.thrift.IStruct}
 */
polina.thrift.Argument.prototype.getValue = function() {
  return this.__fieldInfo;
};
