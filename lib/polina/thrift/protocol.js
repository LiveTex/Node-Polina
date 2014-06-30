/**
 * @constructor
 *
 * @param {!polina.thrift.IIdl} idl
 * @param protocol
 */

polina.thrift.Protocol = function(idl, protocol) {
  this.__version = -2147418112; // 0x80010000
  this.__versionMask = 0xffff0000;// -65536
  this.__typeMask = 0x000000ff;
  this.__idl = idl;
  this.__protocol = protocol;
};



/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.serializeValue =
    function(value, fieldType) {
      var output = new Buffer('');

      if ((typeof value === 'string') &&
          fieldType.getType() === polina.thrift.Types.STRING) {
        output = this.__protocol.writeString(value);
      } else if (typeof value === 'boolean' &&
          fieldType.getType() === polina.thrift.Types.BOOL) {
        output = this.__protocol.writeBool(value);
      } else if (typeof value === 'number') {
        if (fieldType.getType() === polina.thrift.Types.BYTE) {
          output = this.__protocol.writeByte(value);
        } else if (fieldType.getType() === polina.thrift.Types.I16) {
          output = this.__protocol.writeI16(value);
        } else if (fieldType.getType() === polina.thrift.Types.I32) {
          output = this.__protocol.writeI32(value);
        } else if (fieldType.getType() === polina.thrift.Types.I64) {
          output = this.__protocol.writeI64(value);
        } else if (fieldType.getType() === polina.thrift.Types.DOUBLE) {
          output = this.__protocol.writeDouble(value);
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
polina.thrift.Protocol.prototype.writeMessageBegin =
    function(methodName, type, seqid) {
  console.log('writeMessageBegin', methodName, type, seqid);
  return Buffer.concat([this.__protocol.writeI32(this.__version | type),
    this.__protocol.writeString(methodName),
    this.__protocol.writeI32(seqid)]);
};

/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.serializeStruct =
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
          fields.push(this.serializeFieldHeader(typeInfo.getType(), id));
          fields.push(this.serializeValue(struct[field], typeInfo));
        }
      }
      fields.push(this.serializeFieldStop());
      return Buffer.concat(fields);
    };


/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.serializeMap =
    function(map, keyInfo, valInfo) {

      var size = Object.keys(map).length;
      console.log('Serialize MAP', keyInfo.getType(), valInfo.getType(), size);

      var output = [this.serializeMapHeader(keyInfo.getType(), valInfo.getType(), size)];
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
polina.thrift.Protocol.prototype.serializeArray =
    function(array, valInfo) {

      console.log('serializeArray', valInfo.getType(), array.length);
      var output = [this.serializeListHeader(valInfo.getType(), array.length)];

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
polina.thrift.Protocol.prototype.serializeFieldHeader = function(type, id) {
  console.log('Write field begin', type, id);
  return Buffer.concat([this.__protocol.writeByte(type),
    this.__protocol.writeI16(id)]);
};


/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.serializeFieldStop = function() {
  console.log('Write field stop');
  return this.__protocol.writeByte(0);
};


/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.serializeMapHeader = function(ktype, vtype,
                                                                size) {
  return Buffer.concat([this.__protocol.writeByte(ktype),
    this.__protocol.writeByte(vtype),
    this.__protocol.writeI32(size)]);
};


/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.serializeListHeader = function(etype, size) {
  return Buffer.concat([this.__protocol.writeByte(etype),
    this.__protocol.writeI32(size)]);
};


/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.writeSetBegin = function(etype, size) {
  return Buffer.concat([this.__protocol.writeByte(etype),
    this.__protocol.writeI32(size)]);
};




/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.readMessageHeader = function(cursor,
                                                                    chunk) {
  console.log('readMessageHeader');
  var data = this.__protocol.readI32(cursor, chunk);

  if (cursor.isParsed()) {

    var version = data & this.__versionMask;
    console.log('version', version);
    var type = data & this.__typeMask;
    console.log('type ', type);
    var name = this.__protocol.readString(cursor, chunk);
    console.log('name ', name);
    var seqid = this.__protocol.readI32(cursor, chunk);
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
polina.thrift.Protocol.prototype.readFieldHeader= function(cursor, chunk) {
  console.log('readFieldHeader');
  var name = '';
  var id = 0;
  var type = this.__protocol.readByte(cursor, chunk);
  console.log('type ', type);
  if (type !== polina.thrift.Types.STOP) {
    id = this.__protocol.readI16(cursor, chunk);
  }
  console.log('id ', id);
  if (cursor.isParsed()) {
    return {'name': name,
            'type': type,
            'id': id,
            'idl': this.__idl,
            'protocol': this};
  } else {
    return null;
  }

};


/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.readMapHeader = function(cursor, chunk) {
  console.log('readMapHeader');
  var ktype = this.__protocol.readByte(cursor, chunk);
  console.log('ktype ', ktype);
  var vtype = this.__protocol.readByte(cursor, chunk);
  console.log('vtype ', vtype);
  var size = this.__protocol.readI32(cursor, chunk);
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
polina.thrift.Protocol.prototype.readListHeader = function(cursor, chunk) {
  console.log('readListHeader');
  var type = this.__protocol.readByte(cursor, chunk);
  console.log('type ', type);
  var size = this.__protocol.readI32(cursor, chunk);
  console.log('size ', size);
  if (cursor.isParsed()) {
    return{'type': type,
      'size': size };
  } else {
    return null;
  }

};


/**
 * @inheritDoc
 */
polina.thrift.Protocol.prototype.readSetHeader = function(cursor, chunk) {
  console.log('readSetHeader');
  var type = this.__protocol.readByte(cursor, chunk);
  console.log('type ', type);
  var size = this.__protocol.readI32(cursor, chunk);
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
polina.thrift.Protocol.prototype.readSimpleValue = function(cursor, chunk) {
  var result = null;

  if (this.__type === polina.thrift.Types.I32) {
    result = this.__protocol.readI32(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.BYTE) {
    result = this.__protocol.readByte(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.I16) {
    result = this.__protocol.readI16(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.DOUBLE) {
    result = this.__protocol.readDouble(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.BOOL) {
    result = this.__protocol.readBool(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.STRING) {
    this.__strResult = this.__protocol.readString(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.I64) {
    this.__bigNumResult = this.__protocol.readI64(cursor, chunk).getString();
  }

  return  result
};