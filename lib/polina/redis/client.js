


/**
 * Redis client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @implements {polina.redis.IClient}
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.redis.Client = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);
};

util.inherits(polina.redis.Client, polina.Connection);


/**
 * @param {!Array.<string>} args Arguments.
 * @return {string} Command.
 */
polina.redis.Client.prototype.__encodeCommand = function(args) {
  var command = '';
  if (args.length > 0) {
    var i = 0,
        l = args.length;

    command = '*' + l + '\r\n';

    while (i < l) {
      command += '$' + Buffer.byteLength(args[i]) + '\r\n' + args[i] + '\r\n';

      i += 1;
    }
  }

  return command;
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__intCommand = function(args, complete, cancel) {
  this._send(this.__encodeCommand(args),
      new polina.redis.PacketHandler(complete, cancel, 0));
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__strCommand = function(args, complete, cancel) {
  this._send(this.__encodeCommand(args),
      new polina.redis.PacketHandler(complete, cancel, 1));
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__arrCommand = function(args, complete, cancel) {
  this._send(this.__encodeCommand(args),
      new polina.redis.PacketHandler(complete, cancel, 2));
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.set = function(key, value, complete, cancel) {
  this.__strCommand(['SET', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incrby =
    function(key, value, complete, cancel) {
  this.__intCommand(['INCRBY', key, String(value)], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incr = function(key, complete, cancel) {
  this.__intCommand(['INCR', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.decr = function(key, complete, cancel) {
  this.__intCommand(['DECR', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.setex =
    function(key, seconds, value, complete, cancel) {
  this.__strCommand(['SETEX', key, String(seconds), value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.expire =
    function(key, seconds, complete, cancel) {
  this.__intCommand(['EXPIRE', key, String(seconds)], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.get = function(key, complete, cancel) {
  this.__strCommand(['GET', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.mget = function(keys, complete, cancel) {
  this.__arrCommand(['MGET'].concat(keys), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.keys = function(pattern, complete, cancel) {
  this.__arrCommand(['KEYS', pattern], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.del = function(key, complete, cancel) {
  this.__intCommand(['DEL'].concat(key), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sadd = function(key, value, complete, cancel) {
  this.__intCommand(['SADD', key].concat(value), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.srem = function(key, value, complete, cancel) {
  this.__intCommand(['SREM', key].concat(value), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sismember =
    function(key, value, complete, cancel) {
  this.__intCommand(['SISMEMBER', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.smembers = function(key, complete, cancel) {
  this.__arrCommand(['SMEMBERS', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scriptLoad = function(lua, complete, cancel) {
  this.__strCommand(['SCRIPT', 'LOAD', lua], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.evalshaInt =
    function(sha, args, complete, cancel) {

  this.__intCommand([
    'EVALSHA', sha
  ].concat(String(args.length)).concat(args), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.evalshaString =
    function(sha, args, complete, cancel) {
  this.__strCommand([
    'EVALSHA', sha
  ].concat(String(args.length)).concat(args), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.evalshaArray =
    function(sha, args, complete, cancel) {
  this.__arrCommand([
    'EVALSHA', sha
  ].concat(String(args.length)).concat(args), complete, cancel);
};
