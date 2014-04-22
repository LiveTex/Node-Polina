


//Создать value для Boolean, переименовать SimpleValue в StringValue
/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {polina.thrift.Types} type
 * @param {boolean} error
 */
polina.thrift.SimpleValue = function(type, error) {
  console.log('Create SimpleValue');

  /**
   * @type {number}
   */
  this.__type = type;

  /**
   * @type {string}
   */
  this.__output = '';

  /**
   * @type {boolean}
   */
  this.__isComplit = false;

  /**
   * @type {boolean}
   */
  this.__isError = error;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.process = function(cursor, chunk,
                                                       protocol) {

  if (this.__type === polina.thrift.Types.STRING) {
    this.__output = protocol.readString(cursor, chunk);
  } else if (this.__type === polina.thrift.Types.I64) {
    this.__output = protocol.readI64(cursor, chunk);
  }

  if (cursor.isParsed()) {
    this.__isComplit = true;
  }
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getBool = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getDouble = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getInteger = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getArray = function() {
  return [];
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getMap = function() {
  return {};
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.get = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.isError = function() {
  return this.__isError;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getString = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.isComplete = function() {
  return this.__isComplit;
};
