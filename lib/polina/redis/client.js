


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

  /**
   * @type {!Object.<string, !Array.<!Object>|!ds.queue.Queue>}
   */
  this.__scriptInvokes = {};

  /**
   * @type {!Object.<string, string>}
   */
  this.__scriptCodes = {};
};

util.inherits(polina.redis.Client, polina.Connection);


/**
 * @inheritDoc
 */
polina.redis.Client.prototype._getDestoryPayload = function() {
  return polina.redis.encodeCommand(['QUIT']);
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__intCommand = function(args, complete, cancel) {
  this._send(polina.redis.encodeCommand(args), new polina.redis.PacketHandler(
      complete, cancel, polina.redis.ResultType.INT));
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__strCommand = function(args, complete, cancel) {
  this._send(polina.redis.encodeCommand(args), new polina.redis.PacketHandler(
      complete, cancel, polina.redis.ResultType.STR));
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__arrCommand = function(args, complete, cancel) {
  this._send(polina.redis.encodeCommand(args), new polina.redis.PacketHandler(
      complete, cancel, polina.redis.ResultType.ARR));
};


/**
 * @param {string} name Имя скрипта.
 */
polina.redis.Client.prototype.__flushScriptInvokes = function(name) {
  var invokes = this.__scriptInvokes[name];
  var sha = this.__scriptCodes[name];

  if (sha !== undefined && invokes !== undefined) {
    while (invokes.length > 0) {
      var invoke = invokes.shift();
      this._send(invoke.compilePayload(sha), invoke.createHandler());
    }

    delete this.__scriptInvokes[name];
  }
};


/**
 * @param {string} name Имя скрипта.
 * @param {!polina.redis.ScriptInvoke} invoke Вызов комманды.
 */
polina.redis.Client.prototype.__invoke = function(name, invoke) {
  var sha = this.__scriptCodes[name];
  if (sha !== undefined) {
    this._send(invoke.compilePayload(sha), invoke.createHandler());
  } else {
    if (this.__scriptInvokes[name] === undefined) {
      this.__scriptInvokes[name] = new ds.queue.Queue();
    }

    this.__scriptInvokes[name].push(invoke);
  }
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
polina.redis.Client.prototype.hset =
    function(key, hashkey, value, complete, cancel) {
  this.__arrCommand(['HSET', key, hashkey, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hget =
    function(key, hashkey, complete, cancel) {
  this.__arrCommand(['HGET', key, hashkey], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hdel =
    function(key, hashkey, complete, cancel) {
  this.__arrCommand(['HDEL', key, hashkey], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hgetall =
    function(key, complete, cancel) {
  this.__arrCommand(['HGETALL', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execInt =
    function(name, args, complete, cancel) {
  this.__invoke(name, new polina.redis.ScriptInvoke(args, complete, cancel,
      polina.redis.ResultType.INT));
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execString =
    function(name, args, complete, cancel) {
  this.__invoke(name, new polina.redis.ScriptInvoke(args, complete, cancel,
      polina.redis.ResultType.STR));
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execArray =
    function(name, args, complete, cancel) {
  this.__invoke(name, new polina.redis.ScriptInvoke(args, complete, cancel,
      polina.redis.ResultType.ARR));
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.registerScript = function(name, script) {
  var self = this;

  this.__strCommand(['SCRIPT', 'LOAD', script], function(sha) {
    self.__scriptCodes[name] = sha;
    self.__flushScriptInvokes(name);
  }, console.error);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.destroy = function() {
  polina.Connection.prototype.destroy.call(this);

  this.__scriptCodes = {};
  this.__scriptInvokes = {};
};
