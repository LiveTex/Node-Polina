/**
 * @constructor
 * @implements {polina.thrift.IProtocol}
 */

polina.thrift.BineryProtocol = function() {
  this.__version = -2147418112; // 0x80010000
  this.__versionMask = 0xffff0000;// -65536
  this.__typeMask = 0x000000ff;
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeMessageBegin = function(methodName,
                                                                    type, seqid ) {
  return Buffer.concat([this.writeI32(this.__version | type),
                         this.writeString(methodName),
                         this.writeI32(seqid)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeMessageEnd = function() {};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeStructBegin = function(name) {};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeStructEnd = function() {};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeFieldBegin = function(type, id) {
  return Buffer.concat([this.writeByte(type),
                         this.writeI16(id)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeFieldEnd = function() {};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeFieldStop = function() {
  return this.writeByte(0);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeMapBegin = function(ktype, vtype, size) {
  return Buffer.concat([this.writeByte(ktype),
                        this.writeByte(vtype),
                        this.writeI32(size)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeMapEnd = function() {};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeListBegin = function(etype, size) {
  return Buffer.concat([this.writeByte(etype),
                        this.writeI32(size)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeListEnd = function() {};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeSetBegin = function(etype, size) {
  return Buffer.concat(this.writeByte(etype),
                       this.writeI32(size));
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeSetEnd = function() {};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeBool = function(bool) {
  return bool ? this.writeByte(1) : this.writeByte(0);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeByte = function(value) {
  return new Buffer([value]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeI16 = function(value) {
  var output = new Buffer(2);
  output[1] = value & 0xff;
  value >>= 8;
  output[0] = value & 0xff;
  return output;
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeI32 = function(value) {

  var output = new Buffer(4);
  output[3] = value & 0xff;
  value >>= 8;
  output[2] = value & 0xff;
  value >>= 8;
  output[1] = value & 0xff;
  value >>= 8;
  output[0] = value & 0xff;
  return output;

};
// НЕ РЕАЛИЗОВАН!!!!!!!!!!!!!!!!!
polina.thrift.BineryProtocol.prototype.writeI64 = function(value) {
  return Buffer.concat([this.writeI32(0),
                        this.writeI32(0)]);
};

// НЕ РЕАЛИЗОВАН!!!!!!!!!!!!!!!!!
polina.thrift.BineryProtocol.prototype.writeDouble = function(double) {
  return Buffer.concat([this.writeI32(0),
                        this.writeI32(0)]);
};

polina.thrift.BineryProtocol.prototype.writeString = function(value) {
  return Buffer.concat([this.writeI32(Buffer.byteLength(value, 'utf8')),
        new Buffer(value, 'utf8')]);
};



polina.thrift.BineryProtocol.prototype.readMessageBegin = function(cursor, chunk) {
  console.log('readMessageBegin');
  var data = this.readI32(cursor, chunk);

  if (cursor.isParsed()) {

    var version = data & this.__versionMask;
    console.log('version', version);
    var type = data & this.__typeMask;
    console.log('type ', type);
    var  name = this.readString(cursor, chunk);
    console.log('name ',name);
    var seqid = this.readI32(cursor, chunk);
    console.log('seqid ',seqid);
  }

  if (cursor.isParsed()) {

    return { 'name' : name,
             'type' : type,
             'seqid': seqid};
  } else {
    return null;
  }
};

polina.thrift.BineryProtocol.prototype.readMessageEnd = function() {};

polina.thrift.BineryProtocol.prototype.readStructBegin = function() {};

polina.thrift.BineryProtocol.prototype.readStructEnd = function() {};

polina.thrift.BineryProtocol.prototype.readFieldBegin = function(cursor, chunk) {
  console.log('readFieldBegin');
  var name = '';
  var id = 0;
  var type = this.readByte(cursor, chunk);
  console.log('type ', type);
  if (type !== polina.thrift.Types.STOP) {
    id = this.readI16(cursor, chunk);
  }
  console.log('id ', id);
  if (cursor.isParsed()) {
    return{'name' : name,
           'type': type,
           'id' : id};
  } else {
    return null;
  }

};

polina.thrift.BineryProtocol.prototype.readFieldEnd = function(cursor, chunk) {
  return this.readByte(cursor, chunk);
};

polina.thrift.BineryProtocol.prototype.readMapBegin = function() {
  console.log('readMapBegin');
  var ktype = this.readByte();
  console.log('ktype ', ktype);
  var vtype = this.readByte();
  console.log('vtype ', vtype);
  var size = this.readI32();
  console.log('size ', size);
  if (cursor.isParsed()) {
    return {ktype: ktype,
            vtype: vtype,
            ksize: size};
  } else
    return null;


};

polina.thrift.BineryProtocol.prototype.readMapEnd = function() {};

polina.thrift.BineryProtocol.prototype.readListBegin = function(cursor, chunk) {
  console.log('readListBegin');
  var type = this.readByte(cursor, chunk);
  console.log('type ', type);
  var size = this.readI32(cursor, chunk);
  console.log('size ', size);
  if (cursor.isParsed()) {
    return{'type': type,
      'size': size };
  } else {
    return null;
  }

};
polina.thrift.BineryProtocol.prototype.readListEnd = function() {};

polina.thrift.BineryProtocol.prototype.readSetBegin = function(cursor, chunk) {
  console.log('readSetBegin');
  var type = this.readByte(cursor, chunk);
  console.log('type ', type);
  var size = this.readI32(cursor, chunk);
  console.log('size ', size);
  if (cursor.isParsed()) {
    return{'type': type,
      'size': size};
  } else {
    return null;
  }


};


polina.thrift.BineryProtocol.prototype.readSetEnd = function() {};

polina.thrift.BineryProtocol.prototype.readBool = function(cursor, chunk) {
  return this.readByte(cursor, chunk) !== 0;
};

polina.thrift.BineryProtocol.prototype.readByte = function(cursor, chunk) {
  var value = 0;
  if (cursor.getPosition() < chunk.length) {
    value = chunk[cursor.getPosition()];
    cursor.incrPosition(1);
  } else {
    cursor.breakParsing();
  }
  return value;
};

//byte = readByte()

polina.thrift.BineryProtocol.prototype.readI16 = function(cursor, chunk) {
  var value = 0;
  if ((cursor.getPosition() + 1) < chunk.length) {
    value = chunk[cursor.getPosition() + 1];
    value += chunk[cursor.getPosition()] << 8;

    // check sign
    if (chunk[cursor.getPosition()] & 128) {
      value -= Math.pow(2, 16);
    }
    cursor.incrPosition(2);
  } else {
    cursor.breakParsing();
  }
  return value;
};

polina.thrift.BineryProtocol.prototype.readI32 = function(cursor, chunk) {
  var value = 0;
  if ((cursor.getPosition() + 3) < chunk.length) {

    value = chunk[cursor.getPosition() + 3];
    value += chunk[cursor.getPosition() + 2] << 8;
    value += chunk[cursor.getPosition() + 1] << 16;
    value += chunk[cursor.getPosition()] * Math.pow(2, 24);

    // check sign
    if (chunk[cursor.getPosition()] & 0x80) {
      value -= Math.pow(2, 32);
    }
    cursor.incrPosition(4);
  } else {
    cursor.breakParsing();
  }

  return value;
};


polina.thrift.BineryProtocol.prototype.readI64 = function(cursor, chunk) {
  var value = 0;
  if ((cursor.getPosition() + 15) < chunk.length) {
    //Тут когда-нибудь будет парсинг i64 =)
    cursor.incrPosition(8);
  } else {
    cursor.breakParsing();
  }

  return value;
};

polina.thrift.BineryProtocol.prototype.readDouble = function(cursor, chunk) {
  var value = 0;
  if ((cursor.getPosition() + 7) < chunk.length) {

    var signed = chunk[cursor.getPosition()] & 0x80;
    var e = (chunk[cursor.getPosition() + 1] & 0xF0) >> 4;
    e += (chunk[cursor.getPosition()] & 0x7F) << 4;

    var m = chunk[cursor.getPosition() + 7];
    m += chunk[cursor.getPosition() + 6] << 8;
    m += chunk[cursor.getPosition() + 5] << 16;
    m += chunk[cursor.getPosition() + 4] * Math.pow(2, 24);
    m += chunk[cursor.getPosition() + 3] * Math.pow(2, 32);
    m += chunk[cursor.getPosition() + 2] * Math.pow(2, 40);
    m += (chunk[cursor.getPosition() + 1] & 0x0F) * Math.pow(2, 48);

    switch (e) {
      case 0:
        e = -1022;
        break;
      case 2047:
        return m ? NaN : (signed ? -Infinity : Infinity);
      default:
        m += Math.pow(2, 52);
        e -= 1023;
    }

    if (signed) {
      m *= -1;
    }

    cursor.incrPosition(8);
  } else {
    cursor.breakParsing();
  }
  return m * Math.pow(2, e - 52);
};

polina.thrift.BineryProtocol.prototype.readString = function(cursor, chunk) {
  var len = 0;
  var out = '';

  len = this.readI32(cursor, chunk);

  if (cursor.isParsed() && cursor.getPosition() + len <= chunk.length) {
    out = chunk.toString('utf8', cursor.getPosition(), cursor.getPosition() + len);
    cursor.incrPosition(len);
  } else {
    cursor.breakParsing();
  }
  return out;
};

