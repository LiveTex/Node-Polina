


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {polina.hbase.IUserProtocol} userProtocol
 * @param {string} methodName
 */
polina.thrift.MapValue = function(userProtocol, methodName) {

  /**
   * @type {polina.hbase.IUserProtocol}
   */
  this.__userProtocol = userProtocol;

  /**
   * @type {string}
   */
  this.__methodName = methodName;

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
   * @type {number}
   */
  this.__currentElementType = 0;

  /**
   * @type {number}
   */
  this.__pairCounter = 0;
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.process = function(cursor, chunk, protocol) {

  if (this.__header === null) {
    this.__header = protocol.readMapBegin(cursor, chunk);
    if (cursor.isParsed()) {
      this.__currentElementType = this.__header.ktype;
    }
  }

  while (!this.__isComplit && this.__header !== null && cursor.isParsed()) {
    if (this.__pairCounter === this.__header.size) {
      this.__isComplit = true;
      break;
    }

    if (this.__element === null) {
      this.__element = polina.thrift.createValue(this.__currentElementType,
          this.__methodName, this.__userProtocol, false);
    }


    if (this.__element !== null) {
      this.__element.process(cursor, chunk, protocol);
      if (this.__element.isComplete()) {
        if (this.__currentElementType === this.__header.ktype) {
          this.__key = this.__element;
          this.__currentElementType = this.__header.vtype;
        } else {
          this.__output[this.__key.get()] = this.__element.get();
          this.__key = null;
          this.__pairCounter += 1;
          this.__currentElementType = this.__header.ktype;
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
  return '';
};


/**
 * @inheritDoc
 */
polina.thrift.MapValue.prototype.isComplete = function() {
  return this.__isComplit;
};
