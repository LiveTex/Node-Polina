


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 */
polina.thrift.PacketHandlerGeneric = function() {

  /**
   * @type {Array}
   */
  this.__result = [];

  /**
   * @type {polina.thrift.Field}
   */
  this.__currentValue = null;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {Object}
   */
  this.__header = null;
};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandlerGeneric.prototype.process = function(cursor, chunk) {

  if (this.__processHeader()){
    this.__processBody();
  }

  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.thrift.PacketHandlerGeneric.prototype.reset = function() {
  this.__result = [];
  this.__value = null;
};


/**
 *
 */
polina.thrift.PacketHandlerGeneric.prototype.__processHeader =
    function(cursor, chunk) {


  if (this.__header === null){
    this.__header = this.__headerFactory(cursor, chunk);
  }

  return this.__header !== null;
};


/**
 *
 */
polina.thrift.PacketHandlerGeneric.prototype.__processBody =
    function(cursor, chunk) {

  while (cursor.isParsed()) {

    if (this.__stopCondition){
      this.__complete();
      this.__isComplete = true;
      break;
    }

    if (this.__currentValue === null) {
      this.__currentValue = this.__valueFactory();
    }


    if (cursor.isParsed() &&  this.__currentValue !== null) {
      if (this.__currentValue.process(cursor, chunk)) {
        this.__result.push(this.__currentValue);
        this.__currentValue = null;
      }
    }
  }
};


/**
 *
 */
polina.thrift.PacketHandlerGeneric.prototype.__complete = function(){};


/**
 *
 */
polina.thrift.PacketHandlerGeneric.prototype.__stopCondition = function(){
  return false;
};


/**
 *
 */
polina.thrift.PacketHandlerGeneric.prototype.__valueFactory = function(){
  return null
};


/**
 *
 */
polina.thrift.PacketHandlerGeneric.prototype.__headerFactory =
    function(cursor, chunk){
  return null;
};