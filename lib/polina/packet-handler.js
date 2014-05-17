


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 */
polina.PacketHandler = function() {

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
polina.PacketHandler.prototype.process = function(cursor, chunk) {

  if (this.__processHeader()){
    this.__processBody();
  }

  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.PacketHandler.prototype.reset = function() {
  this.__result = [];
  this.__value = null;
};


/**
 * @inheritDoc
 */
polina.PacketHandler.prototype.get = function() {
return  this.__result;
};


/**
 *
 */
polina.PacketHandler.prototype.__processHeader = function(cursor, chunk) {

  if (this.__header === null){
    this.__header = this._headerFactory(cursor, chunk);
  }

  return this.__header !== null;
};

/**
 *
 */
polina.PacketHandler.prototype.__processBody = function(cursor, chunk) {

      while (cursor.isParsed()) {

        if (this._stopCondition){
          this._complete();
          this.__isComplete = true;
          break;
        }

        if (this.__currentValue === null) {
          this.__currentValue = this._valueFactory();
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
polina.PacketHandler.prototype._complete = function() {};


/**
 *
 */
polina.PacketHandler.prototype._stopCondition = function() {
  return false;
};


/**
 *
 */
polina.PacketHandler.prototype._valueFactory = function() {
  return null
};


/**
 *
 */
polina.PacketHandler.prototype._headerFactory = function(cursor, chunk) {
  return null;};