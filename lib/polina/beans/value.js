


/**
 * @constructor
 * @implements {polina.IValue}
 * @param {string} expectedState Expected result.
 * @param {!Array.<string>} expectedErrors
 */
polina.beans.Value = function(expectedState, expectedErrors) {

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
  this.__expectedState = expectedState;

  /**
   * @type {!Array.<string>}
   */
  this.__expectedErrors = expectedErrors;

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

      var state = this.getState();
      if ((state === 'OK') ||
          (state === 'FOUND') ||
          (state === 'RESERVED')) {
        var bytes = parseInt(this.__header[this.__header.length - 1], 10);
        this.__body = chunk.slice(cursor.getPosition(),
            cursor.getPosition() + bytes).toString();
        cursor.incrPosition(bytes);
      }

      break;
    }

    valueCursor += 1;
  }

};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.isComplete = function() {
  var state = this.getState();

  if (state === this.__expectedState) {
    return true;
  }

  var i = 0;
  var errors = this.__expectedErrors;
  while (i < errors.length) {
    if (state === errors[i]) {
      return true;
    }
    i += 1;
  }

  return false;
};


/**
 * @inheritDoc
 */
polina.beans.Value.prototype.isError = function() {
  if (this.getState() === this.__expectedState) {
    return false;
  }
  return true;
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
