

/**
 * @type {!polina.thrift.IProtocol}
 */
polina.thrift.__protocol = new polina.thrift.BineryProtocol();


/**
 * @param protocol
 */
polina.thrift.setProtocol = function(protocol) {
  polina.thrift.__protocol = protocol
};


/**
 * @param {string} name
 * @param {string} type
 * @param {string} seq
 */
polina.thrift.writeMessageBegin = function(name, type, seq){
  return polina.thrift.__protocol.writeMessageBegin(name, type, seq);
};


polina.thrift.writeMessageEnd = function(){
  return polina.thrift.__protocol.writeMessageEnd();
};

/**
 * @param {string}name
 */
polina.thrift.writeStructBegin = function(name){};

polina.thrift.writeStructEnd = function(){};
polina.thrift.writeFieldBegin = function(name, type, id){};
polina.thrift.writeFieldEnd = function(){};
polina.thrift.writeFieldStop = function(){};
polina.thrift.writeMapBegin = function(ktype, vtype, size){};
polina.thrift.writeMapEnd = function(){};
polina.thrift.writeListBegin = function(etype, size){};
polina.thrift.writeListEnd = function(){};
polina.thrift.writeSetBegin = function(etype, size){};
polina.thrift.writeSetEnd = function(){};
polina.thrift.writeBool = function(bool){};

polina.thrift.writeByte = function(byte){
  polina.thrift.__protocol.writeByte(byte);
};

polina.thrift.writeI16 = function(i16){};

polina.thrift.writeI32 = function(value){
  polina.thrift.__protocol.writeI32(value);
};


polina.thrift.writeI64 = function(i64){};
polina.thrift.writeDouble = function(double){};

polina.thrift.writeString = function(value){
  polina.thrift.__protocol.writeString(value);
};



polina.thrift.readMessageBegin = function(cursor,chunk){
  return polina.thrift.__protocol.readMessageBegin(cursor,chunk);
};

//name, type, seq = readMessageBegin()

polina.thrift.readMessageEnd = function(){};

polina.thrift.readStructBegin = function(){};
//name = readStructBegin()

polina.thrift.readStructEnd = function(){};

polina.thrift.readFieldBegin = function(cursor, chunk){
  return polina.thrift.__protocol.readFieldBegin(cursor, chunk);
};
//name, type, id = readFieldBegin()

polina.thrift.readFieldEnd = function(cursor, chunk){
  return polina.thrift.__protocol.readFieldEnd(cursor, chunk);
};

polina.thrift.readMapBegin = function(){};
//k, v, size = readMapBegin()

polina.thrift.readMapEnd = function(){};
polina.thrift.readListBegin = function(cursor, chunk){
  return polina.thrift.__protocol.readListBegin(cursor, chunk);
};
//etype, size = readListBegin()
polina.thrift.readListEnd = function(){};
polina.thrift.readSetBegin = function(){};
//etype, size = readSetBegin()
polina.thrift.readSetEnd = function(){};

polina.thrift.readBool = function(){};
//bool = readBool()
polina.thrift.readByte = function(){};
//byte = readByte()
polina.thrift.readI16 = function(){};
//i16 = readI16()
polina.thrift.readI32 = function(){};
//i32 = readI32()
polina.thrift.readI64 = function(){};
//i64 = readI64()
polina.thrift.readDouble = function(){};
//double = readDouble()
polina.thrift.readString = function(chunk,cursor){
  return polina.thrift.__protocol.readString(chunk,cursor);
};
//string = readString()
