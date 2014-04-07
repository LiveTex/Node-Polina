


/**
 * Wrapper for types;
 * @constructor
 *
 * @param {number} id
 * @param {number|string} type
 * @param {polina.thrift.FieldInfo=} opt_vType
 * @param {polina.thrift.FieldInfo=} opt_kType
 */

polina.thrift.FieldInfo = function(id, type, opt_vType, opt_kType) {

  /**
   * @type {number}
   */
  this.__id = id;

  /**
   * @type {number}
   */
  this.__type = (typeof type === 'string') ? polina.thrift.Types.STRUCT : type;

  /**
   * @type {!polina.thrift.FieldInfo}
   */
  this.__kType = opt_kType ||
      new polina.thrift.FieldInfo(0, polina.thrift.Types.STRING);

  /**
   * @type {!polina.thrift.FieldInfo}
   */
  this.__vType = opt_vType ||
      new polina.thrift.FieldInfo(0, polina.thrift.Types.STRING);

  /**
   * @type {string}
   */
  this.__structType = (typeof type === 'string') ? type : '';

};


/**
 * @return {number}
 */
polina.thrift.FieldInfo.prototype.getType = function() {
  return this.__type;
};


/**
 * @return {number}
 */
polina.thrift.FieldInfo.prototype.getId = function() {
  return this.__id;
};


/**
 * @return {!polina.thrift.FieldInfo}
 */
polina.thrift.FieldInfo.prototype.getKInfo = function() {
  return this.__kType;
};


/**
 * @return {!polina.thrift.FieldInfo}
 */
polina.thrift.FieldInfo.prototype.getVInfo = function() {
  return this.__vType;
};


/**
 * @return {string}
 */
polina.thrift.FieldInfo.prototype.getStructType = function() {
  return this.__structType;
};

