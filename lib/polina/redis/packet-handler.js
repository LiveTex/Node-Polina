


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 */
polina.redis.PacketHandler = function() {

  /**
   * @type {string}
   */
  this.__type = '';

  /**
   * @type {string}
   */
  this.__typeData = '';

  /**
   * @type {number}
   */
  this.__packetSize = -1;

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {!Array.<string>}
   */
  this.__multiBulkData = [];

  /**
   * @type {string}
   */
  this.__bulkType = '';

  /**
   * @type {string}
   */
  this.__bulkTypeData = '';

  /**
   * @type {number}
   */
  this.__bulkPacketSize = -1;
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
polina.redis.PacketHandler.prototype.process = function(chunk) {
  var result = chunk;

  if (this.__type.length === 0) {
    var eol = result.indexOf('\r');
    if (eol > -1) {
      this.__type = result.charAt(0);
      this.__typeData = result.substring(1, eol);

      result = result.substr(eol + 2);
    }
  }

  if (this.__type.length > 0) {
    switch (this.__type) {
      case polina.redis.ResponseType.INT:
      case polina.redis.ResponseType.OK: {
        this.__isComplete = true;
        this._complete(this.__typeData);
        break;
      }

      case polina.redis.ResponseType.ERR: {
        this.__isComplete = true;
        this._cancel(this.__typeData);
        break;
      }

      case polina.redis.ResponseType.BULK: {
        if (this.__typeData === '-1') {
          this.__isComplete = true;
          this._complete();
        } else {
          this.__extractPacketSize();

          var buffer = new Buffer(result);
          if (buffer.length >= this.__bulkPacketSize + 2) {
            this.__isComplete = true;
            this._complete(buffer.toString('utf8', 0, this.__packetSize));

            result = buffer.toString('utf8', this.__packetSize + 2);
          }
        }

        break;
      }

      case polina.redis.ResponseType.MULTI_BULK: {
        if (this.__typeData === '-1') {
          this.__isComplete = true;
          this._complete();
        } else {
          this.__extractPacketSize();

          while (this.__multiBulkData.length < this.__packetSize) {
            var rest = this.__extractMultiBulkData(result);
            if (rest.length < result.length) {
              result = rest;

            } else {
              break;
            }
          }

          if (this.__multiBulkData.length >= this.__packetSize) {
            this.__isComplete = true;
            this._complete(this.__multiBulkData);
          }
        }

        break;
      }
    }
  }

  return result;
};


/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.destroy = function() {
  this.__type = '';
  this.__typeData = '';
  this.__packetSize = -1;
  this.__multiBulkData.length = 0;
  this.__bulkType = '';
  this.__bulkTypeData = '';
  this.__bulkPacketSize = -1;
};


/**
 * @param {(!Array.<string>|string)=} opt_result Результат.
 */
polina.redis.PacketHandler.prototype._complete = function(opt_result) {};


/**
 * @param {string} error Ошибка.
 */
polina.redis.PacketHandler.prototype._cancel = function(error) {};


/**
 *
 */
polina.redis.PacketHandler.prototype.__extractPacketSize = function() {
  if (this.__packetSize === -1) {
    this.__packetSize = parseInt(this.__typeData, 10) || 0;
  }
};


/**
 *
 */
polina.redis.PacketHandler.prototype.__extractBulkPacketSize = function() {
  if (this.__bulkPacketSize === -1) {
    this.__bulkPacketSize = parseInt(this.__bulkTypeData, 10) || 0;
  }
};


/**
 * @param {string} chunk Пакет данных.
 * @return {string} Не обработанный остаток.
 */
polina.redis.PacketHandler.prototype.__extractMultiBulkData = function(chunk) {
  var result = chunk;

  if (this.__bulkType.length === 0) {
    var eol = result.indexOf('\r');
    if (eol > -1) {
      this.__bulkType = result.charAt(0);
      this.__bulkTypeData = result.substring(1, eol);
      this.__bulkPacketSize = -1;

      result = result.substr(eol + 2);
    }
  }


  if (this.__bulkType.length > 0) {
    switch (this.__bulkType) {
      case polina.redis.ResponseType.INT: {
        this.__addBulk(this.__bulkTypeData);

        break;
      }

      case polina.redis.ResponseType.BULK: {
        if (this.__bulkTypeData === '-1') {
          this.__addBulk('');
        } else {
          this.__extractBulkPacketSize();

          var buffer = new Buffer(result);
          if (buffer.length >= this.__bulkPacketSize + 2) {
            this.__addBulk(buffer.toString('utf8', 0, this.__bulkPacketSize));

            result = buffer.toString('utf8', this.__bulkPacketSize + 2);
          }
        }

        break;
      }
    }
  }

  return result;
};


/**
 * @param {string} data Пакет данных.
 */
polina.redis.PacketHandler.prototype.__addBulk = function(data) {
  this.__multiBulkData.push(data);

  this.__bulkType = '';
  this.__bulkTypeData = '';
};
