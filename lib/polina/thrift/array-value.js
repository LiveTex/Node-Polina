


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {!polina.thrift.FieldType} valueInfo
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.ArrayValue = function(valueInfo, idl) {
  console.log('Array with elements', valueInfo.getType());

  /**
   * @type {!polina.thrift.IIdl}
   */
  this.__idl = idl;

  /**
   * @type {!polina.thrift.FieldType}
   */
  this.__valueInfo = valueInfo;

  /**
   * @type {!Array}
   */
  this.__output = [];

  /**
   * @type {boolean}
   */
  this.__isComplit = false;

  /**
   * @type {Object}
   */
  this.__header = null;

  /**
   * @type {polina.thrift.IValue}
   */
  this.__element = null;

  /**
   * @type {number}
   */
  this.__elementCounter = 0;

  /**
   * @type {boolean}
   */
  this.__isError = false;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.process = function(cursor, chunk, protocol) {

  if (this.__header === null) {
    this.__header = protocol.readListHeader(cursor, chunk);
    if (this.__header !== null &&
        this.__header.type !== this.__valueInfo.getType()) {
      this.__isError = true;
      this.__isComplit = true;
    }
  }

  while (!this.__isComplit && cursor.isParsed() && this.__header !== null) {

    if (this.__elementCounter === this.__header.size) {
      this.__isComplit = true;
      break;
    }

    if (this.__element === null) {

      this.__element = polina.thrift.createValue(this.__valueInfo.getType(),
          this.__valueInfo, false, this.__idl);
    }

    if (this.__element !== null) {

      this.__element.process(cursor, chunk, protocol);

      if (this.__element.isComplete()) {
        this.__output.push(this.__element.get());
        this.__elementCounter += 1;
        this.__element = null;
      }
    }
  }
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getBool = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getDouble = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getInteger = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getArray = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getMap = function() {
  return {};
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.get = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.isError = function() {
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.getString = function() {
  var exception = 'Wrong Return type, ' + '\n Value type: ' +
      this.__header.type + ' expected: ' + this.__valueInfo.getType();

  return this.isError() ? exception : '';
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.isComplete = function() {
  return this.__isComplit;
};
