
//перенести в Thrift

/**
 * Hbase protocol.
 * @interface
 */

polina.hbase.IUserProtocol = function() {};


/**
 * Create user structure on name
 *
 * @param {string} type
 * @param {Array.<*>} args
 * @return {polina.thrift.IStruct}
 */
polina.hbase.IUserProtocol.prototype.createValue = function(type, args) {};

//
///**
// * Get return thrift type of User method on name.
// *
// * @param {string} methodName
// * @return {{type: string, structType: string}}
// */
//polina.hbase.IUserProtocol.prototype.getType = function(methodName) {};
