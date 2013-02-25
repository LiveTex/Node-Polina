


/**
 * @constructor
 * @extends {polina.redis.PacketHandler}
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.ArrayPacketHandler = function(complete, cancel) {
  polina.redis.PacketHandler.call(this);

  /**
   * @type {function(!Array.<string>)}
   */
  this.__resultHandler = complete;

  /**
   * @type {function(string, number=)}
   */
  this.__errorHandler = cancel;
};

util.inherits(polina.redis.ArrayPacketHandler, polina.redis.PacketHandler);


/**
 * @inheritDoc
 */
polina.redis.ArrayPacketHandler.prototype._complete = function(opt_result) {
  var result = [];
  var self = this;

  if (opt_result !== undefined) {
    if (typeof opt_result === 'string') {
      result.push(opt_result);
    } else {
      result = opt_result;
    }
  }

  process.nextTick(function() {
    self.__resultHandler(result);
  });
};


/**
 * @inheritDoc
 */
polina.redis.ArrayPacketHandler.prototype._cancel = function(error) {
  var self = this;

  process.nextTick(function() {
    self.__errorHandler(error);
  });
};
