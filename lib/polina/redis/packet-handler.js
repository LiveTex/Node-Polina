


/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {function(Error, string)=} opt_callback Обработчик результата.
 */
polina.redis.PacketHandler = function(opt_callback) {

  /**
   * @type {string}
   */
  this.__type = '';

  /**
   * @type {string}
   */
  this.__typeData = '';

  /**
   * @type {boolean}
   */
  this.__isComplete = false;

  /**
   * @type {number}
   */
  this.__multiBulkLength = -1;

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
   * @type {!Function}
   */
  this.__callback = opt_callback || polina.nop;
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
  var eol = -1;
  var result = chunk;

  if (this.__type.length === 0) {
    eol = result.indexOf('\r\n');
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
        this.__callback(null, this.__typeData);
        break;
      }

      case polina.redis.ResponseType.ERR: {
        this.__isComplete = true;
        this.__callback(Error(this.__typeData), '');
        break;
      }

      case polina.redis.ResponseType.BULK: {
        if (this.__typeData === '-1') {
          this.__isComplete = true;
          this.__callback(null, '');
        } else {
          eol = result.indexOf('\r\n');

          if (eol > -1) {
            this.__isComplete = true;
            this.__callback(null, result.substring(0, eol));

            result = result.substr(eol + 2);
          }
        }

        break;
      }

      case polina.redis.ResponseType.MULTI_BULK: {
        if (this.__typeData === '-1' || this.__typeData === '0') {
          this.__isComplete = true;
          this.__callback(null, []);
        } else {
          if (this.__multiBulkLength === -1) {
            this.__multiBulkLength = parseInt(this.__typeData, 10) || 0;
          }

          while (this.__multiBulkData.length < this.__multiBulkLength) {
            var rest = this.__extractMultiBulkData(result);

            if (rest.length < result.length) {
              result = rest;
            } else {
              break;
            }
          }

          if (this.__multiBulkData.length >= this.__multiBulkLength) {
            this.__isComplete = true;
            this.__callback(null, this.__multiBulkData);
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
  this.__bulkType = '';
  this.__bulkTypeData = '';
  this.__multiBulkData.length = 0;
  this.__callback = polina.nop;
};


/**
 * @param {string} chunk Пакет данных.
 * @return {string} Не обработанный остаток.
 */
polina.redis.PacketHandler.prototype.__extractMultiBulkData = function(chunk) {
  var eol = -1;
  var result = chunk;

  if (this.__bulkType.length === 0) {
    eol = result.indexOf('\r\n');

    if (eol > -1) {
      this.__bulkType = result.charAt(0);
      this.__bulkTypeData = result.substring(1, eol);

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
          eol = result.indexOf('\r\n');

          if (eol > -1) {
            this.__addBulk(result.substring(0, eol));

            result = result.substr(eol + 2);
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
