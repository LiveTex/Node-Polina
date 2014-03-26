
/**
 * @interface
 */

polina.thrift.IProtocol = function() {};

polina.thrift.IProtocol.prototype.serializeValue = function(value, type) {};

/**
 * @param {string} name
 * @param {string} type
 * @param {string} seq
 */
polina.thrift.IProtocol.prototype.writeMessageBegin = function(name, type, seq) {};


/**
 *
 */
polina.thrift.IProtocol.prototype.writeMessageEnd = function() {};


/**
 * @param {string} name
 */
polina.thrift.IProtocol.prototype.writeStructBegin = function(name) {};


/**
 *
 */
polina.thrift.IProtocol.prototype.writeStructEnd = function() {};


/**
 * @param {String} name
 * @param {number} type
 * @param {number} id
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeFieldBegin = function(name, type, id) {};


/**
 *
 */
polina.thrift.IProtocol.prototype.writeFieldEnd = function() {};


/**
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeFieldStop = function() {};


/**
 * @param {number} ktype
 * @param {number} vtype
 * @param {number} size
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeMapBegin = function(ktype, vtype, size) {};


/**
 *
 */
polina.thrift.IProtocol.prototype.writeMapEnd = function() {};


/**
 * @param {number} type
 * @param {number} size
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeListBegin = function(type, size) {};


/**
 *
 */
polina.thrift.IProtocol.prototype.writeListEnd = function() {};


/**
 * @param {number} type
 * @param {number} size
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeSetBegin = function(type, size) {};


/**
 *
 */
polina.thrift.IProtocol.prototype.writeSetEnd = function() {};


/**
 * @param {Boolean} value.
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeBool = function(value) {};


/**
 * @param {number} value.
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeByte = function(value) {};


/**
 * @param {number} value.
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeI16 = function(value) {};


/**
 * @param {number} value.
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeI32 = function(value) {};


/**
 * @param {number} value.
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeI64 = function(value) {};


/**
 * @param {number} value.
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeDouble = function(value) {};


/**
 * @param {String} value.
 * @return {Buffer}
 */
polina.thrift.IProtocol.prototype.writeString = function(value) {};


/**
 * @param cursor
 * @param chunk
 * @return {{name: String, type: number, seq: number}}
 */
polina.thrift.IProtocol.prototype.readMessageBegin = function(cursor, chunk) {};

polina.thrift.IProtocol.prototype.readMessageEnd = function() {};


/**
 *
 */
polina.thrift.IProtocol.prototype.readStructBegin = function() {};


/**
 *
 */
polina.thrift.IProtocol.prototype.readStructEnd = function() {};


/**
 * @param cursor
 * @param chunk
 * @return {{name: String, type: number, id: number}}
 */
polina.thrift.IProtocol.prototype.readFieldBegin = function(cursor, chunk) {};

polina.thrift.IProtocol.prototype.readFieldEnd = function() {};


/**
 * @param cursor
 * @param chunk
 * @return {{ktype: number, vtype: number, size: number}}
 */
polina.thrift.IProtocol.prototype.readMapBegin = function(cursor, chunk) {};

polina.thrift.IProtocol.prototype.readMapEnd = function() {};


/**
 * @param cursor
 * @param chunk
 * @return {{type: number, size: number}}
 */
polina.thrift.IProtocol.prototype.readListBegin = function(cursor, chunk) {};

polina.thrift.IProtocol.prototype.readListEnd = function() {};


/**
 * @param cursor
 * @param chunk
 * @return {{type: number, size: number}}
 */
polina.thrift.IProtocol.prototype.readSetBegin = function(cursor, chunk) {};

polina.thrift.IProtocol.prototype.readSetEnd = function() {};


/**
 * @param cursor
 * @param chunk
 * @return {Boolean}
 */
polina.thrift.IProtocol.prototype.readBool = function(cursor, chunk) {};


/**
 * @param cursor
 * @param chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readByte = function(cursor, chunk) {};


/**
 * @param cursor
 * @param chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readI16 = function(cursor, chunk) {};


/**
 * @param cursor
 * @param chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readI32 = function(cursor, chunk) {};
//i32 = readI32()


/**
 * @param cursor
 * @param chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readI64 = function(cursor, chunk) {};


/**
 * @param cursor
 * @param chunk
 * @return {number}
 */
polina.thrift.IProtocol.prototype.readDouble = function(cursor, chunk) {};


/**
 * @param cursor
 * @param chunk
 * @return {String}
 */
polina.thrift.IProtocol.prototype.readString = function(cursor, chunk) {};
