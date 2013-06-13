


/**
 * Redis packet handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {number} type Response type.
 */
polina.redis.PacketHandler = function(complete, cancel, type) {
  /**
   * @type {number}
   */
  this.__typeCode = -1;

  /**
   * @type {number}
   */
  this.__bulkTypeCode = -1;

  /**
   * @type {boolean}
   */
  this.__isTypeParsed = false;

  /**
   * @type {boolean}
   */
  this.__isBulkTypeParsed = false;

  /**
   * @type {boolean}
   */
  this.__isTypeReady = false;

  /**
   * @type {boolean}
   */
  this.__isBulkTypeReady = false;

  /**
   * @type {number}
   */
  this.__typeValue = 0;

  /**
   * @type {number}
   */
  this.__bulkTypeValue = 0;

  /**
   * @type {boolean}
   */
  this.__isTypeNegative = false;

  /**
   * @type {boolean}
   */
  this.__isBulkTypeNegative = false;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {!Array.<string>}
   */
  this.__arrayResult = [];

  /**
   * @type {string}
   */
  this.__stringResult = '';

  /**
   * @type {number}
   */
  this.__intResult = 0;

  /**
   * @type {function(string, number=)}
   */
  this.__errorHandler = cancel;

  /**
   * @type {!Function}
   */
  this.__resultHandler = complete;

  /**
   * @type {number}
   */
  this.__resultType = type;
};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.reset = function() {
  this.__typeCode = -1;
  this.__bulkTypeCode = -1;
  this.__isTypeParsed = false;
  this.__isBulkTypeParsed = false;
  this.__isTypeReady = false;
  this.__isBulkTypeReady = false;
  this.__typeValue = 0;
  this.__bulkTypeValue = 0;
  this.__isTypeNegative = false;
  this.__isBulkTypeNegative = false;
  this.__isComplete = false;
  this.__arrayResult = [];
  this.__stringResult = '';
  this.__intResult = 0;
};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.isComplete = function() {
  return this.__isComplete;
};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.process = function(cursor, chunk) {
  var initPosition = cursor;

  if (this.__typeCode === -1 && chunk.length > cursor) {
    this.__typeCode = chunk[cursor];
    cursor += 1;
  }

  if (!this.__isTypeParsed) {
    this.__typeValue = 0;
    this.__isTypeNegative = false;

    var i = cursor;

    while (i < chunk.length) {
      if (chunk[i] === 13) {
        this.__isTypeParsed = true;

        i += 1;
        break;
      }

      if (chunk[i] === 45) {
        this.__isTypeNegative = true;
      } else {
        this.__typeValue = (this.__typeValue * 10) + (chunk[i] - 48);
      }

      i += 1;
    }

    if (this.__isTypeParsed) {
      cursor = i;
    }
  }

  if (this.__isTypeParsed && !this.__isTypeReady) {
    if (chunk[cursor] === 10 && chunk.length > cursor) {
      this.__isTypeReady = true;

      cursor += 1;
    }
  }

  if (this.__isTypeReady) {
    switch (this.__typeCode) {
      case polina.redis.ResponseType.OK: {
        this._complete();

        break;
      }

      case polina.redis.ResponseType.ERR: {
        this._cancel(chunk.slice(initPosition + 1, cursor - 2));

        break;
      }

      case polina.redis.ResponseType.INT: {
        this.__intResult = (this.__isTypeNegative ? -1 : 1) * this.__typeValue;
        this._complete();

        break;
      }

      case polina.redis.ResponseType.BULK: {
        cursor = this.__extractBulk(cursor, chunk);

        break;
      }

      case polina.redis.ResponseType.MULTI_BULK: {
        cursor = this.__extractMultiBulk(cursor, chunk);

        break;
      }
    }
  }

  return cursor;
};


/**
 */
polina.redis.PacketHandler.prototype._complete = function() {
  this.__isComplete = true;

  if (this.__resultType === 0) {
    this.__resultHandler(this.__intResult);
  } else if (this.__resultType === 1) {
    this.__resultHandler(this.__stringResult);
  } else if (this.__resultType === 2) {
    this.__resultHandler(this.__arrayResult);
  }
};


/**
 * @param {!Buffer} error Error to be handled.
 */
polina.redis.PacketHandler.prototype._cancel = function(error) {
  this.__isComplete = true;

  this.__errorHandler(error.toString());
};


/**
 * @param {number} cursor Data cursor.
 * @param {!Buffer} chunk Data packet.
 * @return {number} Cursor.
 */
polina.redis.PacketHandler.prototype.__extractBulk = function(cursor, chunk) {
  if (this.__isTypeNegative) {

    this._complete();

  } else if (chunk.length >= cursor + this.__typeValue + 2) {

    this.__stringResult =
        chunk.slice(cursor, cursor + this.__typeValue).toString();

    this._complete();

    return cursor + this.__typeValue + 2;
  }

  return cursor;
};


/**
 * @param {number} cursor Data cursor.
 * @param {!Buffer} chunk Data packet.
 * @return {number} Cursor.
 */
polina.redis.PacketHandler.prototype.__extractMultiBulk =
    function(cursor, chunk) {
  if (this.__isTypeNegative) {

    this._complete();

  } else {

    while (this.__arrayResult.length < this.__typeValue) {
      var prevPosition = cursor;

      cursor = this.__extractMultiBulkItem(cursor, chunk);

      if (prevPosition === cursor) {
        break;
      }
    }

    if (this.__arrayResult.length >= this.__typeValue) {
      this._complete();
    }
  }

  return cursor;
};


/**
 * @param {number} cursor Data cursor.
 * @param {!Buffer} chunk Data packet.
 * @return {number} Cursor.
 */
polina.redis.PacketHandler.prototype.__extractMultiBulkItem =
    function(cursor, chunk) {

  if (this.__bulkTypeCode === -1 && chunk.length > cursor) {
    this.__bulkTypeCode = chunk[cursor];
    cursor += 1;
  }


  if (!this.__isBulkTypeParsed) {
    this.__bulkTypeValue = 0;
    this.__isBulkTypeNegative = false;

    var i = cursor;
    while (i < chunk.length) {

      if (chunk[i] === 13) {
        this.__isBulkTypeParsed = true;

        i += 1;
        break;
      }

      if (chunk[i] === 45) {
        this.__isBulkTypeNegative = true;
      } else {
        this.__bulkTypeValue = (this.__bulkTypeValue * 10) + (chunk[i] - 48);
      }

      i += 1;
    }

    if (this.__isBulkTypeParsed) {
      cursor = i;
    }
  }

  if (this.__isBulkTypeParsed && !this.__isBulkTypeReady) {
    if (chunk[cursor] === 10) {
      this.__isBulkTypeReady = true;

      cursor += 1;
    }
  }

  if (this.__isBulkTypeReady) {
    switch (this.__bulkTypeCode) {
      case polina.redis.ResponseType.INT: {
        this.__addBulk(
            (this.__isBulkTypeNegative ? -1 : 1) * this.__bulkTypeValue);

        break;
      }

      case polina.redis.ResponseType.BULK: {
        if (this.__isBulkTypeNegative) {
          this.__addBulk();
        } else if (chunk.length >= cursor + this.__bulkTypeValue + 2) {

          this.__addBulk(chunk.slice(cursor, cursor + this.__bulkTypeValue));

          cursor += this.__bulkTypeValue + 2;
        }

        break;
      }
    }
  }

  return cursor;
};


/**
 * @param {(!Buffer|number)=} opt_data Data packet.
 */
polina.redis.PacketHandler.prototype.__addBulk = function(opt_data) {
  if (opt_data !== undefined) {
    this.__arrayResult.push(String(opt_data));
  } else {
    this.__arrayResult.push('');
  }

  this.__bulkTypeCode = -1;
  this.__isBulkTypeParsed = false;
  this.__isBulkTypeReady = false;
};
