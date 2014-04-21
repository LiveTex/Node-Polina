


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {!polina.thrift.FieldType} keyType
 * @param {!polina.thrift.FieldType} valType
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.MapValue = function(keyType, valType, idl) {


  /**
   * @type {!polina.thrift.IIdl}
   */
  this.__idl = idl;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__keyType = keyType;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__valType = valType;


  console.log('__keyType', this.__keyType.getType());
  console.log('__valType', this.__valType.getType());
  /**
   * @type {!Object}
   */
  this.__output = {};

  /**
   * @type {boolean}
   */
  this.__isComplit = false;

  /**
   * @type {Object}
   */
  this.__header = null;

  /**
   * @type {*}
   */
  this.__element = null;

  /**
   * @type {*}
   */
  this.__key = null;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__currentType = this.__keyType;

  /**
   * @type {number}
   */
  this.__pairCounter = 0;

  /**
   * @type {boolean}
   */
  this.__isError = false;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.process = function(cursor, chunk, protocol) {

  //вместо принимаемого типа используем ожидаемый, можно добавить проверку
  // и в случае несовпадения вываливать эксепшн.
  if (this.__header === null) {
    this.__header = protocol.readMapBegin(cursor, chunk);
    if (this.__header !== null &&
        (this.__header.ktype !== this.__keyType.getType() ||
            this.__header.vtype !== this.__valType.getType())) {
      this.__isError = true;
      this.__isComplit = true;
    }

  }

  while (!this.__isComplit && this.__header !== null && cursor.isParsed()) {
    if (this.__pairCounter === this.__header.size) {
      this.__isComplit = true;
      break;
    }

    if (this.__element === null) {
      console.log('createValue', this.__currentType.getType());
      this.__element = polina.thrift.createValue(this.__currentType.getType(),
          this.__currentType, false, this.__idl);
    }

    if (this.__element !== null) {
      this.__element.process(cursor, chunk, protocol);
      if (this.__element.isComplete()) {
        if (this.__currentType === this.__keyType) {
          this.__key = this.__element;
          this.__currentType = this.__valType;
        } else {
          this.__output[this.__key.get()] = this.__element.get();
          this.__key = null;
          this.__pairCounter += 1;
          this.__currentType = this.__keyType;
        }
        console.log('Finish element:', this.__element.get());
        this.__element = null;
      }
    }
  }
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.getBool = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.getDouble = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.getInteger = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.getArray = function() {
  return [];
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.getMap = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.get = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.isError = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.getString = function() {

  var exception = 'Wrong Return type, ' +
      '\n key type: ' + this.__header.ktype + ' expected: ' + this.__keyType +
      '\n value type: ' + this.__header.vtype + ' expected: ' + this.__valType;

  return this.isError() ? exception : '';
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.isComplete = function() {
  return this.__isComplit;
};
