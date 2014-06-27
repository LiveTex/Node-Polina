


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
polina.redis.Client.prototype._getDestroyPayload = function() {
  return polina.redis.encodeCommand(['QUIT']);
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(number)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__intCommand = function(args, complete, cancel) {
  this._send(polina.redis.encodeCommand(args), new polina.redis.PacketHandler(
      complete, cancel, polina.redis.resp.ValueType.INTEGER));
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__strCommand = function(args, complete, cancel) {
  this._send(polina.redis.encodeCommand(args), new polina.redis.PacketHandler(
      complete, cancel, polina.redis.resp.ValueType.STRING));
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {function(!Array.<string>)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__arrCommand = function(args, complete, cancel) {
  this._send(polina.redis.encodeCommand(args), new polina.redis.PacketHandler(
      complete, cancel, polina.redis.resp.ValueType.ARRAY));
};


/**
 * @param {string} name Script.
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
 * @param {string} name Script.
 * @param {!polina.redis.ScriptInvoke} invoke Commands invocation.
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
polina.redis.Client.prototype.setnx = function(key, value, complete, cancel) {
  this.__intCommand(['SETNX', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.getset = function(key, value, complete, cancel) {
  this.__strCommand(['GETSET', key, value], complete, cancel);
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
polina.redis.Client.prototype.persist = function(key, complete, cancel) {
  this.__intCommand(['PERSIST', key], complete, cancel);
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
polina.redis.Client.prototype.sinter = function(keys, complete, cancel) {
  this.__arrCommand(['SINTER'].concat(keys), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scard = function(key, complete, cancel) {
  this.__intCommand(['SCARD', key], complete, cancel);
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
      polina.redis.resp.ValueType.INTEGER));
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execString =
    function(name, args, complete, cancel) {
  this.__invoke(name, new polina.redis.ScriptInvoke(args, complete, cancel,
      polina.redis.resp.ValueType.STRING));
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.execArray =
    function(name, args, complete, cancel) {
  this.__invoke(name, new polina.redis.ScriptInvoke(args, complete, cancel,
      polina.redis.resp.ValueType.ARRAY));
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


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.blpop =
    function(keys, timeout, complete, cancel) {

  var args = ['BLPOP'].concat(keys).concat(String(timeout));
  this.__arrCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.brpop =
    function(keys, timeout, complete, cancel) {

  var args = ['BRPOP'].concat(keys).concat(String(timeout));
  this.__arrCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {

  var args = ['BRPOPLPUSH', source, destination, String(timeout)];
  this.__arrCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lindex = function(key, index, complete, cancel) {
  this.__strCommand(['LINDEX', key, String(index)], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {
  this.__intCommand(['LINSERT', key, position, pivot, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.llen = function(key, complete, cancel) {
  this.__intCommand(['LLEN', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpop = function(key, complete, cancel) {
  this.__strCommand(['LPOP', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpush = function(key, values, complete, cancel) {

  var args = ['LPUSH', key].concat(values);
  this.__intCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpushx = function(key, value, complete, cancel) {
  this.__intCommand(['LPUSHX', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lrange =
    function(key, start, stop, complete, cancel) {

  var args = ['LRANGE', key, String(start), String(stop)];
  this.__arrCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lrem =
    function(key, count, value, complete, cancel) {
  this.__arrCommand(['LREM', key, String(count), value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lset =
    function(key, index, value, complete, cancel) {
  this.__strCommand(['LSET', key, String(index), value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.ltrim =
    function(key, start, stop, complete, cancel) {

  var args = ['LTRIM', key, String(start), String(stop)];
  this.__strCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpop = function(key, complete, cancel) {
  this.__strCommand(['RPOP', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpoplpush =
    function(source, destination, complete, cancel) {
  this.__strCommand(['RPOPLPUSH', source, destination], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpush = function(key, values, complete, cancel) {

  var args = ['RPUSH', key].concat(values);
  this.__intCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpushx = function(key, value, complete, cancel) {
  this.__intCommand(['RPUSHX', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scan = function(cursor, complete, cancel,
                                              opt_options) {

  var args = ['SCAN', cursor];

  if (opt_options !== undefined) {
    if (opt_options['MATCH']) {
      args.push('MATCH');
      args.push(opt_options['MATCH']);
    }

    if (opt_options['COUNT']) {
      args.push('COUNT');
      args.push(opt_options['COUNT']);
    }
  }

  this.__arrCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sscan = function(key, cursor, complete, cancel,
                                              opt_options) {

  var args = ['SSCAN', key, cursor];

  if (opt_options !== undefined) {
    if (opt_options['MATCH']) {
      args.push('MATCH');
      args.push(opt_options['MATCH']);
    }

    if (opt_options['COUNT']) {
      args.push('COUNT');
      args.push(opt_options['COUNT']);
    }
  }

  this.__arrCommand(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hscan = function(key, cursor, complete, cancel,
                                              opt_options) {
  var args = ['HSCAN', key, cursor];

  if (opt_options !== undefined) {
    if (opt_options['MATCH']) {
      args.push('MATCH');
      args.push(opt_options['MATCH']);
    }

    if (opt_options['COUNT']) {

      args.push('COUNT');
      args.push(opt_options['COUNT']);
    }
  }

  this.__arrCommand(args, complete, cancel);
};

