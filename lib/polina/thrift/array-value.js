/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {polina.thrift.FieldInfo} valueInfo
 */
polina.thrift.ArrayValue = function(valueInfo) {

  /**
   * @type {polina.thrift.FieldInfo}
   */
  this.__valueInfo = valueInfo;

  /**
   * @type {number}
   */
  this.__elementsType = 0;

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

};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.process = function(cursor, chunk, protocol) {

  if (this.__header === null) {
    this.__header = protocol.readListBegin(cursor, chunk);
    if (cursor.isParsed()) {
      this.__elementsType = this.__header.type;
    }
  }

  while (!this.__isComplit && cursor.isParsed() && this.__header !== null) {

    if (this.__elementCounter === this.__header.size) {
      this.__isComplit = true;
      break;
    }

    if (this.__element === null) {
      this.__element = polina.thrift.createValue(this.__elementsType,
          this.__valueInfo, false);
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
  return '';
};


/**
 * @inheritDoc
 */
polina.thrift.ArrayValue.prototype.isComplete = function() {
  return this.__isComplit;
};
