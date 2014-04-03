


/**
 * @constructor
 *
 * @param {number} type
 * @param {string|!Object|number|boolean|!polina.thrift.IStruct} value
 * @param {number} id
 * @param {number=} opt_vType
 * @param {number=} opt_kType
 */
polina.thrift.Argument = function(type, value, id, opt_vType, opt_kType) {

  /**
   * @type {number}
   */
  this.__id = id;


  /**
   * @type {number}
   */
  this.__type = type;


  /**
   * @type {number}
   */
  this.__vtype = opt_vType || polina.thrift.Types.STRING;


  /**
   * @type {number}
   */
  this.__ktype = opt_kType || polina.thrift.Types.STRING;


  /**
   * @type {string|!Object|number|boolean|!polina.thrift.IStruct}
   */
  this.__value = value;


  if (typeof value === 'object') {
    this.__value = this.__wrap(type, value, this.__ktype, this.__vtype);
  }

};


/**
 * @param {number} type
 * @param {!Object|!polina.thrift.IStruct} value
 * @param {number} ktype
 * @param {number} vtype
 * @return {!Object|!polina.thrift.IStruct}
 */
polina.thrift.Argument.prototype.__wrap = function(type, value, ktype, vtype) {
  var wrapped = value;
  if (type === polina.thrift.Types.MAP) {
    wrapped = new polina.thrift.Map(value, ktype, vtype);
  }

  if (type === polina.thrift.Types.LIST || type === polina.thrift.Types.SET) {
    wrapped = new polina.thrift.TArray(value, vtype);
  }

  if (type === polina.thrift.Types.STRUCT) {
    for (var field in value) {
      if (value.hasOwnProperty(field)) {
        if (typeof value[field] === 'object') {
          var fInfo = value.getFieldInfo(field);
          value[field] = this.__wrap(fInfo.type, value[field],
              fInfo.vType, fInfo.kType);
        }
      }
    }
  }
  return wrapped;
};


/**
 * @return {number}
 */
polina.thrift.Argument.prototype.getType = function() {
  return this.__type;
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
