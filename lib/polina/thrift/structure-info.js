


/**
 * @constructor
 *
 * @param {!string} name
 */

polina.thrift.StructureInfo = function(name) {

  /**
   * @type {!string}
   */
  this.__name = name;

  /**
   * @type {Object.<string, number>}
   */
  this.__idByNameTable = {};


  /**
   * @type {Object.<string, !polina.thrift.FieldType>}
   */
  this.__typeByIdTable = {};

};


/**
 * @param {string} name
 * @param {number} id
 * @param {number|string} type
 * @param {!polina.thrift.FieldType|string|number=} opt_vType
 * @param {!polina.thrift.FieldType|string|number=} opt_kType
 * @return {boolean}
 */
polina.thrift.StructureInfo.prototype.addField =
    function(name, id, type, opt_vType, opt_kType) {

  if (this.__idByNameTable.hasOwnProperty(name) ||
      this.__typeByIdTable.hasOwnProperty(String(id))) {
    return false;
  }

  if (opt_vType) {
    var __opt_vType = (opt_vType instanceof polina.thrift.FieldType) ?
        opt_vType : new polina.thrift.FieldType(opt_vType);
  }

  if (opt_kType) {
    var __opt_kType = (opt_kType instanceof polina.thrift.FieldType) ?
        opt_kType : new polina.thrift.FieldType(opt_kType);
  }

  this.__idByNameTable[name] = id;
  this.__typeByIdTable[String(id)] =
      new polina.thrift.FieldType(type, __opt_vType, __opt_kType);

  return true;
};


/**
 * @param {number} id
 * @return {!polina.thrift.FieldType}
 */
polina.thrift.StructureInfo.prototype.getTypeById = function(id) {
  return this.__typeByIdTable[String(id)];
};


/**
 * @param {string} name
 * @return {!polina.thrift.FieldType}
 */
polina.thrift.StructureInfo.prototype.getTypeByName = function(name) {
  var id = this.__idByNameTable[name];
  return this.__typeByIdTable[String(id)];
};


/**
 * @param {string} name
 * @return {number}
 */
polina.thrift.StructureInfo.prototype.getIdByName = function(name) {
  return this.__idByNameTable[name];
};
