/**
 * @constructor
 * @implements {polina.hbase.thrift.IProtocol}
 */

polina.hbase.thrift.BineryProtocol  = function(){
    this.__version = -2147418112; // 0x80010000
    this.__output = new Buffer([]);

};

polina.hbase.thrift.BineryProtocol.prototype.writeMessageBegin = function(methodName,
                                                                         type, seqid){

  this.writeI32(this.__version | type);
   this.writeString(methodName);
   this.writeI32(seqid);

};


polina.hbase.thrift.BineryProtocol.prototype.writeMessageEnd = function () {
  this.writeByte(0);
  return this.__output;
};
polina.hbase.thrift.BineryProtocol.prototype.writeStructBegin = function(name){};
polina.hbase.thrift.BineryProtocol.prototype.writeStructEnd = function(){};
polina.hbase.thrift.BineryProtocol.prototype.writeFieldBegin = function(name, type, id){};
polina.hbase.thrift.BineryProtocol.prototype.writeFieldEnd = function(){};
polina.hbase.thrift.BineryProtocol.prototype.writeFieldStop = function(){};
polina.hbase.thrift.BineryProtocol.prototype.writeMapBegin = function(ktype, vtype, size){};
polina.hbase.thrift.BineryProtocol.prototype.writeMapEnd = function(){};
polina.hbase.thrift.BineryProtocol.prototype.writeListBegin = function(etype, size){};
polina.hbase.thrift.BineryProtocol.prototype.writeListEnd = function(){};
polina.hbase.thrift.BineryProtocol.prototype.writeSetBegin = function(etype, size){};
polina.hbase.thrift.BineryProtocol.prototype.writeSetEnd = function(){};
polina.hbase.thrift.BineryProtocol.prototype.writeBool = function(bool){};

polina.hbase.thrift.BineryProtocol.prototype.writeByte = function(value){
  this.__output = Buffer.concat([this.__output, new Buffer([value])]);
};
polina.hbase.thrift.BineryProtocol.prototype.writeI16 = function(i16){};

polina.hbase.thrift.BineryProtocol.prototype.writeI32 = function(value){
     var output = new Buffer(4);
    output[3] = value & 0xff;
     value >>= 8;
    output[2] = value & 0xff;
     value >>= 8;
    output[1] = value & 0xff;
     value >>= 8;
    output[0] = value & 0xff;
  this.__output = Buffer.concat([this.__output, output]);

};

polina.hbase.thrift.BineryProtocol.prototype.writeI64 = function(i64){};
polina.hbase.thrift.BineryProtocol.prototype.writeDouble = function(double){};
polina.hbase.thrift.BineryProtocol.prototype.writeString = function(value){
    var output = new Buffer(value, 'utf8');
    this.writeI32(Buffer.byteLength(value,'utf8'));
    this.__output = Buffer.concat([this.__output,output]);
};



polina.hbase.thrift.BineryProtocol.prototype.readMessageBegin = function(){};
//name, type, seq = readMessageBegin()

polina.hbase.thrift.BineryProtocol.prototype.readMessageEnd = function(){};

polina.hbase.thrift.BineryProtocol.prototype.readStructBegin = function(){};
//name = readStructBegin()

polina.hbase.thrift.BineryProtocol.prototype.readStructEnd = function(){};

polina.hbase.thrift.BineryProtocol.prototype.readFieldBegin = function(){};
//name, type, id = readFieldBegin()

polina.hbase.thrift.BineryProtocol.prototype.readFieldEnd = function(){};

polina.hbase.thrift.BineryProtocol.prototype.readMapBegin = function(){};
//k, v, size = readMapBegin()

polina.hbase.thrift.BineryProtocol.prototype.readMapEnd = function(){};
polina.hbase.thrift.BineryProtocol.prototype.readListBegin = function(){};
//etype, size = readListBegin()
polina.hbase.thrift.BineryProtocol.prototype.readListEnd = function(){};
polina.hbase.thrift.BineryProtocol.prototype.readSetBegin = function(){};
//etype, size = readSetBegin()
polina.hbase.thrift.BineryProtocol.prototype.readSetEnd = function(){};

polina.hbase.thrift.BineryProtocol.prototype.readBool = function(){};
//bool = readBool()
polina.hbase.thrift.BineryProtocol.prototype.readByte = function(){};
//byte = readByte()
polina.hbase.thrift.BineryProtocol.prototype.readI16 = function(){};
//i16 = readI16()
polina.hbase.thrift.BineryProtocol.prototype.readI32 = function(){};
//i32 = readI32()
polina.hbase.thrift.BineryProtocol.prototype.readI64 = function(){};
//i64 = readI64()
polina.hbase.thrift.BineryProtocol.prototype.readDouble = function(){};
//double = readDouble()
polina.hbase.thrift.BineryProtocol.prototype.readString = function(){};
//string = readString()
