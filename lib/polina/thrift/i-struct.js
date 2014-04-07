


/**
 * @interface
 * Interface for user protocol structures
 */
polina.thrift.IStruct = function() {};


/**
 * Return ID and Type of arguments on name.
 *
 * @param {string} propertyName
 * @return {polina.thrift.FieldInfo}
 */
polina.thrift.IStruct.prototype.getFieldInfo = function(propertyName) {};
