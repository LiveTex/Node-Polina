


/**
 * @constructor
 * @extends {polina.redis.PacketHandler}
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.StringPacketHandler = function(complete, cancel) {
  polina.redis.PacketHandler.call(this);

  /**
   * @type {function(string)}
   */
  this.__resultHandler = complete;

  /**
   * @type {function(string, number=)}
   */
  this.__errorHandler = cancel;
};

util.inherits(polina.redis.StringPacketHandler, polina.redis.PacketHandler);


/**
 * @inheritDoc
 */
polina.redis.StringPacketHandler.prototype._complete = function(opt_result) {
  var result = '';
  var self = this;

  if (opt_result !== undefined) {
    result += opt_result;
  }

  process.nextTick(function() {
    self.__resultHandler(result);
  });
};


/**
 * @inheritDoc
 */
polina.redis.StringPacketHandler.prototype._cancel = function(error) {
  var self = this;

  process.nextTick(function() {
    self.__errorHandler(error);
  });
};
