
/**
 * @interface
 */

polina.hbase.thrift.IProtocol = function(){};

/**
 * @param {string} name
 * @param {string} type
 * @param {string} seq
 */
polina.hbase.thrift.IProtocol.prototype.writeMessageBegin = function(name, type, seq){};

/**
 *
 */
polina.hbase.thrift.IProtocol.prototype.writeMessageEnd = function(){};

/**
 * @param {string}name
 */
polina.hbase.thrift.IProtocol.prototype.writeStructBegin = function(name){};
polina.hbase.thrift.IProtocol.prototype.writeStructEnd = function(){};
polina.hbase.thrift.IProtocol.prototype.writeFieldBegin = function(name, type, id){};
polina.hbase.thrift.IProtocol.prototype.writeFieldEnd = function(){};
polina.hbase.thrift.IProtocol.prototype.writeFieldStop = function(){};
polina.hbase.thrift.IProtocol.prototype.writeMapBegin = function(ktype, vtype, size){};
polina.hbase.thrift.IProtocol.prototype.writeMapEnd = function(){};
polina.hbase.thrift.IProtocol.prototype.writeListBegin = function(etype, size){};
polina.hbase.thrift.IProtocol.prototype.writeListEnd = function(){};
polina.hbase.thrift.IProtocol.prototype.writeSetBegin = function(etype, size){};
polina.hbase.thrift.IProtocol.prototype.writeSetEnd = function(){};
polina.hbase.thrift.IProtocol.prototype.writeBool = function(bool){};
polina.hbase.thrift.IProtocol.prototype.writeByte = function(byte){};
polina.hbase.thrift.IProtocol.prototype.writeI16 = function(i16){};
polina.hbase.thrift.IProtocol.prototype.writeI32 = function(i32){};
polina.hbase.thrift.IProtocol.prototype.writeI64 = function(i64){};
polina.hbase.thrift.IProtocol.prototype.writeDouble = function(double){};
polina.hbase.thrift.IProtocol.prototype.writeString = function(string){};



polina.hbase.thrift.IProtocol.prototype.readMessageBegin = function(){};
//name, type, seq = readMessageBegin()

polina.hbase.thrift.IProtocol.prototype.readMessageEnd = function(){};

polina.hbase.thrift.IProtocol.prototype.readStructBegin = function(){};
//name = readStructBegin()

polina.hbase.thrift.IProtocol.prototype.readStructEnd = function(){};

polina.hbase.thrift.IProtocol.prototype.readFieldBegin = function(){};
//name, type, id = readFieldBegin()

polina.hbase.thrift.IProtocol.prototype.readFieldEnd = function(){};

polina.hbase.thrift.IProtocol.prototype.readMapBegin = function(){};
//k, v, size = readMapBegin()

polina.hbase.thrift.IProtocol.prototype.readMapEnd = function(){};
polina.hbase.thrift.IProtocol.prototype.readListBegin = function(){};
//etype, size = readListBegin()
polina.hbase.thrift.IProtocol.prototype.readListEnd = function(){};
polina.hbase.thrift.IProtocol.prototype.readSetBegin = function(){};
//etype, size = readSetBegin()
polina.hbase.thrift.IProtocol.prototype.readSetEnd = function(){};

polina.hbase.thrift.IProtocol.prototype.readBool = function(){};
//bool = readBool()
polina.hbase.thrift.IProtocol.prototype.readByte = function(){};
//byte = readByte()
polina.hbase.thrift.IProtocol.prototype.readI16 = function(){};
//i16 = readI16()
polina.hbase.thrift.IProtocol.prototype.readI32 = function(){};
//i32 = readI32()
polina.hbase.thrift.IProtocol.prototype.readI64 = function(){};
//i64 = readI64()
polina.hbase.thrift.IProtocol.prototype.readDouble = function(){};
//double = readDouble()
polina.hbase.thrift.IProtocol.prototype.readString = function(){};
//string = readString()
