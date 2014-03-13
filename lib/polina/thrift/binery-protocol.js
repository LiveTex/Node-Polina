/**
 * @constructor
 * @implements {polina.thrift.IProtocol}
 */

polina.thrift.BineryProtocol  = function(){
    this.__version = -2147418112; // 0x80010000
};

polina.thrift.BineryProtocol.prototype.writeMessageBegin = function(methodName,
                                                                    type, seqid ){

  return  Buffer.concat([this.writeI32(this.__version | type),
                         this.writeString(methodName),
                         this.writeI32(seqid)]);

};


polina.thrift.BineryProtocol.prototype.writeMessageEnd = function () {
  return this.writeByte(0);;
};
polina.thrift.BineryProtocol.prototype.writeStructBegin = function(name){};
polina.thrift.BineryProtocol.prototype.writeStructEnd = function(){};
polina.thrift.BineryProtocol.prototype.writeFieldBegin = function(name, type, id){};
polina.thrift.BineryProtocol.prototype.writeFieldEnd = function(){};
polina.thrift.BineryProtocol.prototype.writeFieldStop = function(){};
polina.thrift.BineryProtocol.prototype.writeMapBegin = function(ktype, vtype, size){};
polina.thrift.BineryProtocol.prototype.writeMapEnd = function(){};
polina.thrift.BineryProtocol.prototype.writeListBegin = function(etype, size){};
polina.thrift.BineryProtocol.prototype.writeListEnd = function(){};
polina.thrift.BineryProtocol.prototype.writeSetBegin = function(etype, size){};
polina.thrift.BineryProtocol.prototype.writeSetEnd = function(){};
polina.thrift.BineryProtocol.prototype.writeBool = function(bool){};

polina.thrift.BineryProtocol.prototype.writeByte = function(value){
  return  new Buffer([value]);
};
polina.thrift.BineryProtocol.prototype.writeI16 = function(i16){};

polina.thrift.BineryProtocol.prototype.writeI32 = function(value){
     var output = new Buffer(4);
    output[3] = value & 0xff;
     value >>= 8;
    output[2] = value & 0xff;
     value >>= 8;
    output[1] = value & 0xff;
     value >>= 8;
    output[0] = value & 0xff;
    return  output;

};

polina.thrift.BineryProtocol.prototype.writeI64 = function(i64){};
polina.thrift.BineryProtocol.prototype.writeDouble = function(double){};

polina.thrift.BineryProtocol.prototype.writeString = function(value){
    return Buffer.concat([ this.writeI32(Buffer.byteLength(value,'utf8')),
                           new Buffer(value, 'utf8')]);

};



polina.thrift.BineryProtocol.prototype.readMessageBegin = function(cursor,chunk){

 var data = this.readI32(chunk,cursor);
 var version,type,name,seqid;
 cursor+=4;

 if(data < 0){
    version = data & 0xffff0000;
    type = data & 0x000000ff;
    name = this.readString(chunk,cursor);
    cursor += Buffer.byteLength(name) + 4;
    seqid = this.readI32(chunk,cursor);
 }

 return {'type':type,
          'name': name,
          'seqid' : seqid}
};

polina.thrift.BineryProtocol.prototype.readMessageEnd = function(){};

polina.thrift.BineryProtocol.prototype.readStructBegin = function(){};
//name = readStructBegin()

polina.thrift.BineryProtocol.prototype.readStructEnd = function(){};

polina.thrift.BineryProtocol.prototype.readFieldBegin = function(){};
//name, type, id = readFieldBegin()

polina.thrift.BineryProtocol.prototype.readFieldEnd = function(){};

polina.thrift.BineryProtocol.prototype.readMapBegin = function(){};
//k, v, size = readMapBegin()

polina.thrift.BineryProtocol.prototype.readMapEnd = function(){};
polina.thrift.BineryProtocol.prototype.readListBegin = function(){};
//etype, size = readListBegin()
polina.thrift.BineryProtocol.prototype.readListEnd = function(){};
polina.thrift.BineryProtocol.prototype.readSetBegin = function(){};
//etype, size = readSetBegin()
polina.thrift.BineryProtocol.prototype.readSetEnd = function(){};

polina.thrift.BineryProtocol.prototype.readBool = function(){};
//bool = readBool()
polina.thrift.BineryProtocol.prototype.readByte = function(){};
//byte = readByte()
polina.thrift.BineryProtocol.prototype.readI16 = function(chunk,cursor){
  var v = chunk[cursor + 1];
  v += chunk[cursor] << 8;
  if (chunk[cursor] & 128) {
    v -= Math.pow(2,16);
  }
  return v;
};
//i16 = readI16()
polina.thrift.BineryProtocol.prototype.readI32 = function(chunk,cursor){
  var v = chunk[cursor + 3];
  v += chunk[cursor + 2] << 8;
  v += chunk[cursor + 1] << 16;
  v += chunk[cursor] * Math.pow(2,24);
  if (chunk[cursor] & 0x80) {
    v -=  Math.pow(2,32);
  }
  return v;
};
//i32 = readI32()
polina.thrift.BineryProtocol.prototype.readI64 = function(){};
//i64 = readI64()
polina.thrift.BineryProtocol.prototype.readDouble = function(){};
//double = readDouble()
polina.thrift.BineryProtocol.prototype.readString = function(chunk,cursor){
  var len = this.readI32(chunk,cursor);

   cursor += 4;

  return chunk.toString('utf8', cursor, cursor + len);
};

