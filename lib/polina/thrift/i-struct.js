


/**
 * @interface
 * Interface for user protocol structures
 */
polina.thrift.IStruct = function() {};


/**
 * Return ID and Type of arguments on name.
 *
 * @param {string} propertyName
 * @return {{id: number, type: number, vType: number, kType: number}|null}
 */
polina.thrift.IStruct.prototype.getFieldInfo = function(propertyName) {};
