//Набор метдов сереализации/десереализации эллементарных типов данных



/**
 * @implements {polina.thrift.IProtocol}
 * @constructor
 * протокол сереализации/десереализации эллементарных типов данных
 */

polina.thrift.BinaryProtocol = function() {

};

/**
 * @inheritDoc
 */
polina.thrift.BinaryProtocol.prototype.writeBool = function(bool) {
  console.log('writeBool', bool);
  return bool ? this.writeByte(1) : this.writeByte(0);
};


/**
 * @inheritDoc
 */
polina.thrift.BinaryProtocol.prototype.writeByte = function(value) {
  console.log('writeByte', value);
  return new Buffer(String.fromCharCode(value)); // заменить на Buffer([value])
};


/**
 * @inheritDoc
 */
polina.thrift.BinaryProtocol.prototype.writeI16 = function(value) {
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
polina.thrift.BinaryProtocol.prototype.writeI32 = function(value) {
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
polina.thrift.BinaryProtocol.prototype.writeI64 = function(value) {
  return value.getBuffer();
};


// НЕ РЕАЛИЗОВАН!!!!!!!!!!!!!!!!!
/**
 * @inheritDoc
 */
polina.thrift.BinaryProtocol.prototype.writeDouble = function(double) {
  return Buffer.concat([this.writeI32(0),
                        this.writeI32(double)]);
};


/**
 * @inheritDoc
 */
polina.thrift.BinaryProtocol.prototype.writeString = function(value) {
  console.log('Write String: ', value);
  return Buffer.concat([this.writeI32(Buffer.byteLength(value)),
        new Buffer(value, 'utf8')]);
};


/**
 * @inheritDoc
 */

polina.thrift.BinaryProtocol.prototype.readBool = function(cursor, chunk) {
  return this.readByte(cursor, chunk);
};


/**
 * @inheritDoc
 */
polina.thrift.BinaryProtocol.prototype.readByte = function(cursor, chunk) {
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
polina.thrift.BinaryProtocol.prototype.readI16 = function(cursor, chunk) {
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
polina.thrift.BinaryProtocol.prototype.readI32 = function(cursor, chunk) {
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
polina.thrift.BinaryProtocol.prototype.readI64 = function(cursor, chunk) {
	var value = nul;
  if ((cursor.getPosition() + 7) < chunk.length){

		console.log('READ I64');

		value = new polina.thrift.Int64(chunk.slice(cursor, cursor + 7));
  }

	return value;

};


/**
 * @inheritDoc
 */
polina.thrift.BinaryProtocol.prototype.readDouble = function(cursor, chunk) {
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
polina.thrift.BinaryProtocol.prototype.readString = function(cursor, chunk) {
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

