


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {polina.hbase.IUserProtocol} userProtocol
 * @param {string} methodName
 * @param {boolean} isError
 */
polina.thrift.StructValue = function(userProtocol, methodName, isError) {

  /**
   * @type {string}
   */
  this.__methodName = methodName;

  /**
   * @type {string}
   */
  this.__type = userProtocol.getType(methodName).structType;
  console.log('Create StructValue', this.__type);

  /**
   * @type {polina.hbase.IUserProtocol}
   */
  this.__userProtocol = userProtocol;

  /**
   * @type {polina.thrift.IStruct}
   */
  this.__output = null;

  /**
   * @type {Array}
   */
  this.__args = [];

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {polina.thrift.IValue}
   */
  this.__element = null;

  /**
   * @type {boolean}
   */
  this.__isException = isError;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.process = function(cursor, chunk,
                                                       protocol) {

  while (cursor.isParsed()) {
    if (this.__element === null) {
      var field = protocol.readFieldBegin(cursor, chunk);
      if (field === null) {
        break;
      } else {
        if (field.type === polina.thrift.Types.STOP) {
          this.__isComplete = true;
          break;
        }
        console.log('Create element of structure');
        this.__element = polina.thrift.createValue(field.type,
            this.__methodName, this.__userProtocol, false);
      }
    }

    if (this.__element !== null) {
      console.log('Process element');
      this.__element.process(cursor, chunk, protocol);
      if (this.__element.isComplete()) {
        this.__args.push(this.__element.get());
        this.__element = null;
      }
    }
  }

  if (this.__isComplete && !this.__isException) {
    this.__output = this.__userProtocol.createValue(this.__type, this.__args);
  }
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getBool = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getDouble = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getInteger = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getArray = function() {
  return [];
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getMap = function() {
  return null;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.get = function() {
  return this.__output;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.isError = function() {
  return this.__isException;
};


/**
 * @inheritDoc
 */
// Exception - это структура с одним строковым полем.
// Создать конструкторы для exception
// или выводить строку
polina.thrift.StructValue.prototype.getString = function() {
  return this.__args[0];
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.isComplete = function() {
  return this.__isComplete;
};
