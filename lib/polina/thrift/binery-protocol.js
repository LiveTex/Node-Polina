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

};
polina.thrift.BineryProtocol.prototype.writeStructBegin = function(name){};
polina.thrift.BineryProtocol.prototype.writeStructEnd = function(){};
polina.thrift.BineryProtocol.prototype.writeFieldBegin = function(type, id){

  return  Buffer.concat([this.writeByte(type),
                         this.writeI16(id)]);
};
polina.thrift.BineryProtocol.prototype.writeFieldEnd = function(){};
polina.thrift.BineryProtocol.prototype.writeFieldStop = function(){
  return this.writeByte(0);;
};
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
polina.thrift.BineryProtocol.prototype.writeI16 = function(value){
  var output = new Buffer(2);
  output[1] = value & 0xff;
  value >>= 8;
  output[0] = value & 0xff;
  return output;
};

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



polina.thrift.BineryProtocol.prototype.readMessageBegin = function(cursor, chunk){
  
 var data, version, type, name, seqid;

 if((cursor.getPosition() + 4) <= chunk.length){
   data = this.readI32(cursor,chunk);
   version = data & 0xffff0000;
   type = data & 0x000000ff;
   cursor.incrPosition(4);

 }

  name = this.readString(cursor, chunk);

 if((cursor.getPosition() + 4) <= chunk.length){
   seqid= this.readI32(cursor, chunk);
   cursor.incrPosition(4);
 }

 return {'type':type,
          'name': name,
          'seqid' : seqid}
};

polina.thrift.BineryProtocol.prototype.readMessageEnd = function(){};

polina.thrift.BineryProtocol.prototype.readStructBegin = function(){};

polina.thrift.BineryProtocol.prototype.readStructEnd = function(){};

polina.thrift.BineryProtocol.prototype.readFieldBegin = function(cursor, chunk){

  var name = '';
  var id = 0;
  var type = 0;

  type = this.readByte(cursor, chunk);
  cursor.incrPosition(1);

  if (type !== polina.thrift.Types.STOP){
    id = this.readI16(cursor, chunk);
    cursor.incrPosition(2);
  }

  return{'name' : name,
          'type': type,
          'id' : id}
};

polina.thrift.BineryProtocol.prototype.readFieldEnd = function(cursor, chunk){
  var end = this.readByte(cursor, chunk);
  cursor.incrPosition(1);
  return end;
};

polina.thrift.BineryProtocol.prototype.readMapBegin = function(){};
//k, v, size = readMapBegin()

polina.thrift.BineryProtocol.prototype.readMapEnd = function(){};
polina.thrift.BineryProtocol.prototype.readListBegin = function(cursor, chunk){
  var type, size;
  type = this.readByte(cursor, chunk);
  cursor.incrPosition(1);
  size = this.readI32(cursor, chunk);
  cursor.incrPosition(4);
  return{'type': type,
         'size': size}
};
//etype, size = readListBegin()
polina.thrift.BineryProtocol.prototype.readListEnd = function(){};
polina.thrift.BineryProtocol.prototype.readSetBegin = function(){};
//etype, size = readSetBegin()
polina.thrift.BineryProtocol.prototype.readSetEnd = function(){};

polina.thrift.BineryProtocol.prototype.readBool = function(cursor, chunk){
  var byte = this.readByte(cursor, chunk);
  cursor.incrPosition(1);
  return byte !== 0;

};

polina.thrift.BineryProtocol.prototype.readByte = function(cursor, chunk){
  return chunk[cursor.getPosition()];
};

//byte = readByte()
polina.thrift.BineryProtocol.prototype.readI16 = function(cursor, chunk){
  var i = cursor.getPosition();
  var v = chunk[i + 1];
  v += chunk[i] << 8;
  if (chunk[i] & 128) {
    v -= Math.pow(2,16);
  }
  return v;
};
//i16 = readI16()
polina.thrift.BineryProtocol.prototype.readI32 = function(cursor, chunk){
  var i = cursor.getPosition();
  var v = chunk[i + 3];
  v += chunk[i + 2] << 8;
  v += chunk[i + 1] << 16;
  v += chunk[i] * Math.pow(2,24);
  if (chunk[i] & 0x80) {
    v -=  Math.pow(2,32);
  }
  return v;
};
//i32 = readI32()
polina.thrift.BineryProtocol.prototype.readI64 = function(){};
//i64 = readI64()
polina.thrift.BineryProtocol.prototype.readDouble = function(){};
//double = readDouble()
polina.thrift.BineryProtocol.prototype.readString = function(cursor, chunk){
  var len = 0;
  var out = '';

  if((cursor.getPosition() + 4) <= chunk.length){
    len = this.readI32(cursor, chunk);
    cursor.incrPosition(4);
  }

  if(cursor.getPosition() + len <= chunk.length){
    out = chunk.toString('utf8', cursor.getPosition(), cursor.getPosition() + len);
    cursor.incrPosition(len);
  }
  return out;
};

