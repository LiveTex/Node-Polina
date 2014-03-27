

//перенести в Thrift



/**
 * @interface
 * Interface for user protocol structures
 */
polina.hbase.IStruct = function() {};


/**
 * Return ID and Type of arguments on name.
 *
 * @param {string} propertyName
 * @return {{id: number, type: number}|null}
 */
polina.hbase.IStruct.prototype.getFieldInfo = function(propertyName) {};
