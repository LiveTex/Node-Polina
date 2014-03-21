


/**
 * @constructor
 * @param {!Array.<string>} args Script's arguments.
 * @param {!Function} complete  Result handler.
 * @param {function(string, number=)} cancel Error handler.
 * @param {polina.redis.resp.ValueType} type Тип получаемого значения.
 */
polina.redis.ScriptInvoke = function(args, complete, cancel, type) {

  /**
   * @type {!Array.<string>}
   */
  this.__args = args;

  /**
   * @type {!Function}
   */
  this.__complete = complete;

  /**
   * @type {function(string, number=)}
   */
  this.__cancel = cancel;

  /**
   * @type {polina.redis.resp.ValueType}
   */
  this.__type = type;
};


/**
 * @param {string} sha Контрольная сумма скрипта.
 * @return {string} Данные команды.
 */
polina.redis.ScriptInvoke.prototype.compilePayload = function(sha) {
  return polina.redis.encodeCommand([
    'EVALSHA', sha, this.__args.length.toString()
  ].concat(this.__args));
};


/**
 * @return {!polina.redis.PacketHandler} Обрабтчик результа.
 */
polina.redis.ScriptInvoke.prototype.createHandler = function() {
  return new polina.redis.PacketHandler(
      this.__complete, this.__cancel, this.__type);
};
