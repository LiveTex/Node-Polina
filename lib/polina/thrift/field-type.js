


/**
 * Wrapper for types;
 * @constructor
 *
 * @param {number|string} type
 * @param {!polina.thrift.FieldType|string|number=} opt_vType
 * @param {!polina.thrift.FieldType|string|number=} opt_kType
 */
polina.thrift.FieldType = function(type, opt_vType, opt_kType) {

  if (opt_vType) {
    var __opt_vType = (opt_vType instanceof polina.thrift.FieldType) ?
        opt_vType :
        new polina.thrift.FieldType(opt_vType || polina.thrift.Types.STRING);
  }

  if (opt_kType) {
    var __opt_kType = (opt_kType instanceof polina.thrift.FieldType) ?
        opt_kType :
        new polina.thrift.FieldType(opt_kType || polina.thrift.Types.STRING);
  }

  /**
   * @type {number}
   */
  this.__type = (typeof type === 'string') ? polina.thrift.Types.STRUCT : type;

  /**
   * @type {!polina.thrift.FieldType|undefined}
   */
  this.__kType = __opt_kType;

  /**
   * @type {!polina.thrift.FieldType|undefined}
   */
  this.__vType = __opt_vType;

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
  // TODO #1: Пусть __kType создается в конструкторе - геттер будет просто геттер.
  return this.__kType ||
      new polina.thrift.FieldType(polina.thrift.Types.STRING);
};


/**
 * @return {!polina.thrift.FieldType}
 */
polina.thrift.FieldType.prototype.getVInfo = function() {
  // TODO #2: тоже что и #1.
  return this.__vType ||
      new polina.thrift.FieldType(polina.thrift.Types.STRING);
};


/**
 * @return {string}
 */
polina.thrift.FieldType.prototype.getStructType = function() {
  return this.__structType;
};

