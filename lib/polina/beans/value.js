


/**
 * @constructor
 * @implements {polina.IValue}
 * @param {string} expectedResponse Expected result.
 */
polina.beans.Value = function(expectedResponse) {

  /**
   * @type {!Array.<string>}
   */
  this.__header = [];

  /**
   * @type {string}
   */
  this.__body = '';

  /**
   * @type {string}
   */
  this.__expectedResponse = expectedResponse;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.process = function(cursor, chunk) {
  var valueCursor = cursor.getPosition();

  while (valueCursor < chunk.length) {
    if (chunk[valueCursor] === polina.beans.TERMINAL) {
      this.__header = chunk.toString('utf8', cursor.getPosition(),
          valueCursor - 1).split(' ');
      cursor.incrPosition(valueCursor - cursor.getPosition() + 1);
    }

    var state = this.getState();
    if ((state === 'OK') ||
        (state === 'FOUND') ||
        (state === 'RESERVED')) {
      valueCursor += (parseInt(
          this.__header[this.__header.length - 1], 10) + 2);
      if (valueCursor < chunk.length) {
        this.__body = chunk.slice(cursor.getPosition(),
            valueCursor - 1).toString();
        cursor.incrPosition(valueCursor - cursor.getPosition() + 1);
        this.__isComplete = true;
        break;
      }
    } else if (state) {
      this.__isComplete = true;
      break;
    }

    valueCursor += 1;
  }

};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.isError = function() {
  return this.getState() !== this.__expectedResponse;
};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.get = function() {
  return this.__body;
};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.getString = function() {
  return this.__body;
};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.getInteger = function() {
  return -1;
};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.getArray = function() {
  return [this];
};


/**
 * @return {string}
 */
polina.beans.Value.prototype.getJid = function() {
  if (this.__header.length > 1) {
    return this.__header[1];
  }
  return '';
};


/**
 * @return {string}
 */
polina.beans.Value.prototype.getState = function() {
  if (this.__header.length) {
    return this.__header[0].trim();
  } else {
    return '';
  }
};
