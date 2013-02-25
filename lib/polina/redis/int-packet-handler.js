


/**
 * @constructor
 * @extends {polina.redis.PacketHandler}
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IntPacketHandler = function(complete, cancel) {
  polina.redis.PacketHandler.call(this);

  /**
   * @type {function(number)}
   */
  this.__resultHandler = complete;

  /**
   * @type {function(string, number=)}
   */
  this.__errorHandler = cancel;
};

util.inherits(polina.redis.IntPacketHandler, polina.redis.PacketHandler);


/**
 * @inheritDoc
 */
polina.redis.IntPacketHandler.prototype._complete = function(opt_result) {
  var result = 0;
  var self = this;

  if (opt_result !== undefined) {
    result = parseInt(opt_result, 10) || 0;
  }

  process.nextTick(function() {
    self.__resultHandler(result);
  });
};


/**
 * @inheritDoc
 */
polina.redis.IntPacketHandler.prototype._cancel = function(error) {
  var self = this;

  process.nextTick(function() {
    self.__errorHandler(error);
  });
};
