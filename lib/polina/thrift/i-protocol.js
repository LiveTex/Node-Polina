
/**
 * @interface
 */

polina.thrift.IProtocol = function(){};

/**
 * @param {string} name
 * @param {string} type
 * @param {string} seq
 */
polina.thrift.IProtocol.prototype.writeMessageBegin = function(name, type, seq){};

/**
 *
 */
polina.thrift.IProtocol.prototype.writeMessageEnd = function(){};

/**
 * @param {string}name
 */
polina.thrift.IProtocol.prototype.writeStructBegin = function(name){};
polina.thrift.IProtocol.prototype.writeStructEnd = function(){};
polina.thrift.IProtocol.prototype.writeFieldBegin = function(name, type, id){};
polina.thrift.IProtocol.prototype.writeFieldEnd = function(){};
polina.thrift.IProtocol.prototype.writeFieldStop = function(){};
polina.thrift.IProtocol.prototype.writeMapBegin = function(ktype, vtype, size){};
polina.thrift.IProtocol.prototype.writeMapEnd = function(){};
polina.thrift.IProtocol.prototype.writeListBegin = function(etype, size){};
polina.thrift.IProtocol.prototype.writeListEnd = function(){};
polina.thrift.IProtocol.prototype.writeSetBegin = function(etype, size){};
polina.thrift.IProtocol.prototype.writeSetEnd = function(){};
polina.thrift.IProtocol.prototype.writeBool = function(bool){};
polina.thrift.IProtocol.prototype.writeByte = function(byte){};
polina.thrift.IProtocol.prototype.writeI16 = function(i16){};
polina.thrift.IProtocol.prototype.writeI32 = function(i32){};
polina.thrift.IProtocol.prototype.writeI64 = function(i64){};
polina.thrift.IProtocol.prototype.writeDouble = function(double){};
polina.thrift.IProtocol.prototype.writeString = function(string){};



polina.thrift.IProtocol.prototype.readMessageBegin = function(){};
//name, type, seq = readMessageBegin()

polina.thrift.IProtocol.prototype.readMessageEnd = function(){};

polina.thrift.IProtocol.prototype.readStructBegin = function(){};
//name = readStructBegin()

polina.thrift.IProtocol.prototype.readStructEnd = function(){};

polina.thrift.IProtocol.prototype.readFieldBegin = function(){};
//name, type, id = readFieldBegin()

polina.thrift.IProtocol.prototype.readFieldEnd = function(){};

polina.thrift.IProtocol.prototype.readMapBegin = function(){};
//k, v, size = readMapBegin()

polina.thrift.IProtocol.prototype.readMapEnd = function(){};
polina.thrift.IProtocol.prototype.readListBegin = function(){};
//etype, size = readListBegin()
polina.thrift.IProtocol.prototype.readListEnd = function(){};
polina.thrift.IProtocol.prototype.readSetBegin = function(){};
//etype, size = readSetBegin()
polina.thrift.IProtocol.prototype.readSetEnd = function(){};

polina.thrift.IProtocol.prototype.readBool = function(){};
//bool = readBool()
polina.thrift.IProtocol.prototype.readByte = function(){};
//byte = readByte()
polina.thrift.IProtocol.prototype.readI16 = function(){};
//i16 = readI16()
polina.thrift.IProtocol.prototype.readI32 = function(){};
//i32 = readI32()
polina.thrift.IProtocol.prototype.readI64 = function(){};
//i64 = readI64()
polina.thrift.IProtocol.prototype.readDouble = function(){};
//double = readDouble()
polina.thrift.IProtocol.prototype.readString = function(){};
//string = readString()
