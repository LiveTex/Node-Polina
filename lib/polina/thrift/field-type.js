


/**
 * Wrapper for types;
 * @constructor
 *
 * @param {number|string} type
 * @param {!polina.thrift.FieldType=} opt_vType
 * @param {!polina.thrift.FieldType=} opt_kType
 */

polina.thrift.FieldType = function(type, opt_vType, opt_kType) {

  /**
   * @type {number}
   */
  this.__type = (typeof type === 'string') ? polina.thrift.Types.STRUCT : type;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__kType = opt_kType ||
      new polina.thrift.FieldType(polina.thrift.Types.STRING);

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__vType = opt_vType ||
      new polina.thrift.FieldType(polina.thrift.Types.STRING);

  /**
   * @type {string}
   */
  this.__structType = (typeof type === 'string') ? type : '';

};


/**
 * @return {number}
 */
polina.thrift.FieldType.prototype.getType = function() {
  return this.__type;
};


/**
 * @return {!polina.thrift.FieldType}
 */
polina.thrift.FieldType.prototype.getKInfo = function() {
  return this.__kType;
};


/**
 * @return {!polina.thrift.FieldType}
 */
polina.thrift.FieldType.prototype.getVInfo = function() {
  return this.__vType;
};


/**
 * @return {string}
 */
polina.thrift.FieldType.prototype.getStructType = function() {
  return this.__structType;
};

