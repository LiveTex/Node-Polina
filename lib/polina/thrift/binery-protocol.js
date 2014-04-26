


/**
 * @implements {polina.thrift.IProtocol}
 * @constructor
 *
 * @param {!polina.thrift.IIdl} idl
 */

polina.thrift.BineryProtocol = function(idl) {
  this.__version = -2147418112; // 0x80010000
  this.__versionMask = 0xffff0000;// -65536
  this.__typeMask = 0x000000ff;
  this.__idl = idl;
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeMessageBegin = function(methodName,
                                                                    type,
                                                                    seqid) {
  console.log('writeMessageBegin', methodName, type, seqid);
  return Buffer.concat([this.writeI32(this.__version | type),
                         this.writeString(methodName),
                         this.writeI32(seqid)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.serializeValue =
    function(value, fieldType) {
  var output = new Buffer('');

  if ((typeof value === 'string') &&
      fieldType.getType() === polina.thrift.Types.STRING) {
    output = this.writeString(value);
  } else if (typeof value === 'boolean' &&
      fieldType.getType() === polina.thrift.Types.BOOL) {
    output = this.writeBool(value);
  } else if (typeof value === 'number') {
    if (fieldType.getType() === polina.thrift.Types.BYTE) {
      output = this.writeByte(value);
    } else if (fieldType.getType() === polina.thrift.Types.I16) {
      output = this.writeI16(value);
    } else if (fieldType.getType() === polina.thrift.Types.I32) {
      output = this.writeI32(value);
    } else if (fieldType.getType() === polina.thrift.Types.I64) {
      output = this.writeI64(value);
    } else if (fieldType.getType() === polina.thrift.Types.DOUBLE) {
      output = this.writeDouble(value);
    }
  } else if (typeof value === 'object') {
    if (fieldType.getType() === polina.thrift.Types.MAP) {
      output =
          this.serializeMap(value, fieldType.getKInfo(), fieldType.getVInfo());
    } else if (fieldType.getType() === polina.thrift.Types.SET ||
               fieldType.getType() === polina.thrift.Types.LIST) {
      output = this.serializeArray(value, fieldType.getVInfo());
    } else if (fieldType.getType() === polina.thrift.Types.STRUCT) {
      output = this.serializeStruct(value, fieldType.getStructType());
    }
  }
  return output;
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.serializeStruct =
    function(struct, type) {
  console.log('type', type);
  var structureInfo = this.__idl.getStructureInfo(type);

  var fields = [];
  console.log('_serializeStruct');
  for (var field in struct) {
    if (struct.hasOwnProperty(field) && struct[field] !== undefined) {
      var typeInfo = structureInfo.getTypeByName(field);
      var id = structureInfo.getIdByName(field);
      console.log('__serialize field', field);
      fields.push(this.writeFieldBegin(typeInfo.getType(), id));
      fields.push(this.serializeValue(struct[field], typeInfo));
    }
  }
  fields.push(this.writeFieldStop());
  return Buffer.concat(fields);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.serializeMap =
    function(map, keyInfo, valInfo) {

  var size = Object.keys(map).length;
  console.log('Serialize MAP', keyInfo.getType(), valInfo.getType(), size);

  var output = [this.writeMapBegin(keyInfo.getType(), valInfo.getType(), size)];
  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      output.push(this.serializeValue(key, keyInfo));
      output.push(this.serializeValue(map[key], valInfo));
    }
  }
  return Buffer.concat(output);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.serializeArray =
    function(array, valInfo) {

  console.log('serializeArray', valInfo.getType(), array.length);
  var output = [this.writeListBegin(valInfo.getType(), array.length)];

  for (var i = 0; i < array.length; i++) {
    if (array[i] !== undefined) {
      output.push(this.serializeValue(array[i], valInfo));
    }
  }
  return Buffer.concat(output);

};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeFieldBegin = function(type, id) {
  console.log('Write field begin', type, id);
  return Buffer.concat([this.writeByte(type),
                         this.writeI16(id)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeFieldStop = function() {
  console.log('Write field stop');
  return this.writeByte(0);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeMapBegin = function(ktype, vtype,
                                                                size) {
  return Buffer.concat([this.writeByte(ktype),
                        this.writeByte(vtype),
                        this.writeI32(size)]);
};


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
polina.thrift.BineryProtocol.prototype.writeSetBegin = function(etype, size) {
  return Buffer.concat([this.writeByte(etype),
                        this.writeI32(size)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeBool = function(bool) {
  console.log('writeBool', bool);
  return bool ? this.writeByte(1) : this.writeByte(0);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeByte = function(value) {
  console.log('writeByte', value);
  return new Buffer(String.fromCharCode(value)); // заменить на Buffer([value])
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeI16 = function(value) {
  console.log('writeI16', value);
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
  console.log('writeI32', value);
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
/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeI64 = function(value) {
  return Buffer.concat([this.writeI32(0),
                        this.writeI32(value)]);
};


// НЕ РЕАЛИЗОВАН!!!!!!!!!!!!!!!!!
/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeDouble = function(double) {
  return Buffer.concat([this.writeI32(0),
                        this.writeI32(double)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.writeString = function(value) {
  console.log('Write String: ', value);
  return Buffer.concat([this.writeI32(Buffer.byteLength(value)),
        new Buffer(value, 'utf8')]);
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readMessageHeader = function(cursor,
                                                                   chunk) {
  console.log('readMessageHeader');
  var data = this.readI32(cursor, chunk);

  if (cursor.isParsed()) {

    var version = data & this.__versionMask;
    console.log('version', version);
    var type = data & this.__typeMask;
    console.log('type ', type);
    var name = this.readString(cursor, chunk);
    console.log('name ', name);
    var seqid = this.readI32(cursor, chunk);
    console.log('seqid ', seqid);
  }

  if (cursor.isParsed()) {
    return { 'name' : name, 'type' : type, 'seqid': seqid};
  } else {
    return null;
  }
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readFieldHeader = function(cursor,
                                                                 chunk) {
  console.log('readFieldHeader');
  var name = '';
  var id = 0;
  var type = this.readByte(cursor, chunk);
  console.log('type ', type);
  if (type !== polina.thrift.Types.STOP) {
    id = this.readI16(cursor, chunk);
  }
  console.log('id ', id);
  if (cursor.isParsed()) {
    // TODO #13: Может заебашишь класс филда?
    return {'name' : name,
      'type': type,
      'id' : id
    };
  } else {
    return null;
  }

};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readMapHeader = function(cursor, chunk) {
  console.log('readMapHeader');
  var ktype = this.readByte(cursor, chunk);
  console.log('ktype ', ktype);
  var vtype = this.readByte(cursor, chunk);
  console.log('vtype ', vtype);
  var size = this.readI32(cursor, chunk);
  console.log('size ', size);
  if (cursor.isParsed()) {
    return {ktype: ktype,
      vtype: vtype,
      size: size};
  } else
    return null;
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readListHeader = function(cursor, chunk) {
  console.log('readListHeader');
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


/**
 * TODO #3: Почему begin?
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readSetHeader = function(cursor, chunk) {
  console.log('readSetHeader');
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

/**
 * @inheritDoc
 */

polina.thrift.BineryProtocol.prototype.readBool = function(cursor, chunk) {
  return this.readByte(cursor, chunk);
};


/**
 * @inheritDoc
 */
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


/**
 * @inheritDoc
 */
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


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readI32 = function(cursor, chunk) {
  var value = 0;
  if ((cursor.getPosition() + 3) < chunk.length) {

    value = chunk[cursor.getPosition() + 3];
    value += chunk[cursor.getPosition() + 2] << 8;
    value += chunk[cursor.getPosition() + 1] << 16;
    value += chunk[cursor.getPosition()] << 24;

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


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readI64 = function(cursor, chunk) {
  console.log('READ I64');

  var value = 0;
  if ((cursor.getPosition() + 7) < chunk.length) {
    var negative = chunk[cursor.getPosition()] & 0x80;
    var dop = 1;
    var byte = 0;

    for (var i = 7; i >= 0; i--) {
      byte = chunk[cursor.getPosition() + i];

      if (negative) {
        byte = (byte ^ 0xff) + dop;
        dop = byte >> 8;
        byte = byte & 0xff;
      }
      value += byte * Math.pow(2, 8 * (7 - i));
    }

    cursor.incrPosition(8);
    return (negative ? -value : value) + '';
  } else {
    cursor.breakParsing();
  }
  return value + '';
};


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readDouble = function(cursor, chunk) {
  console.log('READ Double');
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


/**
 * @inheritDoc
 */
polina.thrift.BineryProtocol.prototype.readString = function(cursor, chunk) {
  var len = 0;
  var out = '';

  len = this.readI32(cursor, chunk);

  if (cursor.isParsed() && cursor.getPosition() + len <= chunk.length) {
    out = chunk.toString('utf8', cursor.getPosition(),
        cursor.getPosition() + len);
    cursor.incrPosition(len);
  } else {
    cursor.breakParsing();
  }
  return out;
};

