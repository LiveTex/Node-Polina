


/**
 * @constructor
 * @implements {polina.thrift.IValue}
 *
 * @param {polina.thrift.Types} type
 * @param {!polina.thrift.FieldType} valueInfo
 * @param {boolean} isError
 * @param {!polina.thrift.IIdl} idl
 */
polina.thrift.StructValue = function(type, valueInfo, isError, idl) {

	polina.thrift.PacketHandler.call(complete, cancel, valueInfo,
			protocol, idl);

	console.log('is ERROR', isError);

  /**
   * @type {!polina.thrift.IIdl}
   */
  this.__idl = idl;

  /**
   * @type {string}
   */
  this.__type = isError ? 'exception' : valueInfo.getStructType();
  console.log('Create StructValue', this.__type);

	/**
	 * @type {polina.thrift.StructureInfo}
	 */
  this.__structInfo = idl.getStructureInfo(this.__type);


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

	this.__compliteMessage = function(){
		this.__output = this.__idl.createStructure(this.__type, this.__args);
	}
};

util.inherits(polina.thrift.StructValue, polina.thrift.PacketHandler)

///**
// * @inheritDoc
// */
//polina.thrift.StructValue.prototype.process = function(cursor, chunk,
//                                                       protocol) {
//
//  while (cursor.isParsed()) {
//    if (this.__element === null) {
//      var fieldHeader = protocol.readFieldHeader(cursor, chunk);
//      if (fieldHeader === null) {
//        break;
//      } else {
//        if (fieldHeader.type === polina.thrift.Types.STOP) {
//          this.__isComplete = true;
//          break;
//        }
//        console.log('Create element of structure');
//        this.__element = polina.thrift.createValue(fieldHeader.type,
//            this.__structInfo.getTypeById(fieldHeader.id), this.__idl);
//      }
//    }
//
//    if (this.__element !== null) {
//      console.log('Process element');
//      if (this.__element.process(cursor, chunk, protocol)) {
//        this.__args[fieldHeader.id - 1] = this.__element.get();
//        this.__element = null;
//      }
//    }
//  }
//
//  if (this.__isComplete && !this.__isException) {
//    this.__output = this.__idl.createStructure(this.__type, this.__args);
//  }
//
//	return this.__isComplete;
//};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getBool = function() {
  return false;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getInt64 = function() {
  return 0;
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.getNumber = function() {
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
polina.thrift.StructValue.prototype.getString = function() {
  return this.__args[0];
};


/**
 * @inheritDoc
 */
polina.thrift.StructValue.prototype.isComplete = function() {
  return this.__isComplete;
};
