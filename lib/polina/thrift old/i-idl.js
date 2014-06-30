


/**
 * @interface
 */
polina.thrift.IIdl = function() {};


/**
 * @param {string} type
 * @param {Array.<*>} args
 * @return {polina.thrift.IStruct}
 */
polina.thrift.IIdl.prototype.createStructure = function(type, args) {};


/**
 * @param {string} type
 * @return {polina.thrift.StructureInfo}
 */
polina.thrift.IIdl.prototype.getStructureInfo = function(type) {};

