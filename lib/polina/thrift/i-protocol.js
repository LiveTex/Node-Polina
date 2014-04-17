


/**
 * @interface
 */

polina.thrift.IProtocol = function() {};


/**
 * @param {string|!Object|number|boolean|!Array} value
 * @param {!polina.thrift.FieldType} FieldType
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.serializeValue =
    function(value, FieldType) {};


/**
 * @param {!Object} userStructure
 * @param {!string} type
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.serializeStruct =
    function(userStructure, type) {};


/**
 * @param {!Object} array
 * @param {!polina.thrift.FieldType} valInfo
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.serializeArray = function(array, valInfo) {};


/**
 * @param {!Object} map
 * @param {!polina.thrift.FieldType} keyInfo
 * @param {!polina.thrift.FieldType} valInfo
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.serializeMap =
    function(map, keyInfo, valInfo) {};


/**
 * @param {string} methodName
 * @param {number} type
 * @param {number} seqid
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeMessageBegin =
    function(methodName, type, seqid) {};


/**
 * @param {number} type
 * @param {number} id
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeFieldBegin = function(type, id) {};


/**
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeFieldStop = function() {};


/**
 * @param {number} ktype
 * @param {number} vtype
 * @param {number} size
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeMapBegin =
    function(ktype, vtype, size) {};


/**
 * @param {number} type
 * @param {number} size
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeListBegin = function(type, size) {};


/**
 * @param {number} type
 * @param {number} size
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeSetBegin = function(type, size) {};


/**
 * @param {boolean} value
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeBool = function(value) {};


/**
 * @param {number} value
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeByte = function(value) {};


/**
 * @param {number} value
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeI16 = function(value) {};


/**
 * @param {number} value
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeI32 = function(value) {};


/**
 * @param {number} value
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeI64 = function(value) {};


/**
 * @param {number} value
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeDouble = function(value) {};


/**
 * @param {string} value
 * @return {!Buffer}
 */
polina.thrift.IProtocol.prototype.writeString = function(value) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {Object} 'name' : name, 'type' : type, 'seqid': seqid
 */
polina.thrift.IProtocol.prototype.readMessageBegin = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {{name: string, type: number, id: number}|null}
 */
polina.thrift.IProtocol.prototype.readFieldBegin = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {{ktype: number, vtype: number, size: number}|null}
 */
polina.thrift.IProtocol.prototype.readMapBegin = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {{type: number, size: number}|null}
 */
polina.thrift.IProtocol.prototype.readListBegin = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {{type: number, size: number}|null}
 */
polina.thrift.IProtocol.prototype.readSetBegin = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readBool = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readByte = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readI16 = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readI32 = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {string}
 */
polina.thrift.IProtocol.prototype.readI64 = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readDouble = function(cursor, chunk) {};


/**
 * @param {polina.Cursor} cursor
 * @param {Buffer} chunk
 * @return {string}
 */
polina.thrift.IProtocol.prototype.readString = function(cursor, chunk) {};
