


// перенести I64  в SimpleValue
/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {number} type
 * @param {boolean} isError
 */
polina.thrift.SimpleValue = function(type) {
  console.log('Create SimpleValue');

  /**
   * @type {number}
   */
  this.__type = type;

  /**
   * @type {string}
   */
  this.__strResult = '';
	
	/**
   * @type {number}
   */
  this.__numResult = 0;

	/**
   * @type {polina.thrift.Int64}
   */
  this.__bigNumResult = null;

  /**
   * @type {boolean}
   */
  this.__isError = isError;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.process = function(cursor, chunk,
                                                        protocol) {



  if (cursor.isParsed()) {
   return true;
  }
	return false;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getBool = function() {
  return this.__numResult !== 0;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getInt64 = function() {
  return this.__bigNumResult;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getNumber = function() {
  return this.__numResult;
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
  return this.__numResult;
};


/**
 * @inheritDoc
 */
polina.thrift.SimpleValue.prototype.getString = function() {
  return this.__strResult;
};
