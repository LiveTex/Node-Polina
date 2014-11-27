


/**
 * @constructor
 * @param {!Array.<string>} args Script's arguments.
 * @param {!Function} complete  Result handler.
 * @param {polina.ErrorHandler} cancel Error handler.
 * @param {polina.redis.resp.ValueType} type Response Type.
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
   * @type {polina.ErrorHandler}
   */
  this.__cancel = cancel;

  /**
   * @type {polina.redis.resp.ValueType}
   */
  this.__type = type;
};


/**
 * Evaluates a script cached on the server side by its SHA1 digest.
 *
 * @param {string} sha The Secure Hash Algorithm.
 * @return {string} Data.
 */
polina.redis.ScriptInvoke.prototype.compilePayload = function(sha) {
  return polina.redis.encodeCommand([
    'EVALSHA', sha, this.__args.length.toString()
  ].concat(this.__args));
};


/**
 * Creates packet handler.
 *
 * @return {!polina.redis.PacketHandler} Result handler.
 */
polina.redis.ScriptInvoke.prototype.createHandler = function() {
  return new polina.redis.PacketHandler(
      this.__complete, this.__cancel, this.__type);
};
