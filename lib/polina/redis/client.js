


/**
 * Redis client.
 *
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 *
 * @constructor
 * @extends {polina.Connection}
 * @implements {polina.redis.IClient}
 */
polina.redis.Client = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);

  /**
   * @type {!Object.<string, !polina.redis.Script>}
   */
  this.__scripts = {};

};

util.inherits(polina.redis.Client, polina.Connection);


/**
 * @inheritDoc
 */
polina.redis.Client.prototype._getDestroyPayload = function() {
  return polina.redis.resp.encodeCommand(['QUIT']);
};


/**
 * Creates command and sends it to Redis.
 *
 * @param {!Array.<string>} args Arguments.
 * @param {Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__command = function(args, complete, cancel) {
  this._send(polina.redis.resp.encodeCommand(args),
      polina.redis.resp.PACKET_HANDLER(complete, cancel));
};


// ---- KEYS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.del = function(key, complete, cancel) {
  this.__command(['DEL'].concat(key), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.expire =
    function(key, seconds, complete, cancel) {
  this.__command(['EXPIRE', key, seconds.toString()], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.keys = function(pattern, complete, cancel) {
  this.__command(['KEYS', pattern], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.persist = function(key, complete, cancel) {
  this.__command(['PERSIST', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scan =
    function(cursor, complete, cancel, opt_options) {
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

  this.__command(args, complete, cancel);
};


// ---- STRINGS ----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.decr = function(key, complete, cancel) {
  this.__command(['DECR', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.get = function(key, complete, cancel) {
  this.__command(['GET', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.getset = function(key, value, complete, cancel) {
  this.__command(['GETSET', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incr = function(key, complete, cancel) {
  this.__command(['INCR', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.incrby = function(key, value, complete, cancel) {
  this.__command(['INCRBY', key, value.toString()], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.mget = function(keys, complete, cancel) {
  this.__command(['MGET'].concat(keys), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.set = function(key, value, complete, cancel) {
  this.__command(['SET', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.setex =
    function(key, seconds, value, complete, cancel) {
  this.__command(['SETEX', key, seconds.toString(), value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.setnx = function(key, value, complete, cancel) {
  this.__command(['SETNX', key, value], complete, cancel);
};


// ---- HASHES -----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hdel = function(key, hkey, complete, cancel) {
  this.__command(['HDEL', key, hkey], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hget = function(key, hkey, complete, cancel) {
  this.__command(['HGET', key, hkey], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hgetall = function(key, complete, cancel) {
  this.__command(['HGETALL', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hset =
    function(key, hkey, value, complete, cancel) {
  this.__command(['HSET', key, hkey, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.hscan =
    function(key, cursor, complete, cancel, opt_options) {
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

  this.__command(args, complete, cancel);
};


// ---- LISTS ------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.blpop =
    function(keys, timeout, complete, cancel) {
  var args = ['BLPOP'].concat(keys).concat(timeout.toString());
  this.__command(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.brpop =
    function(keys, timeout, complete, cancel) {
  var args = ['BRPOP'].concat(keys).concat(timeout.toString());
  this.__command(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {
  var args = ['BRPOPLPUSH', source, destination, timeout.toString()];
  this.__command(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lindex = function(key, index, complete, cancel) {
  this.__command(['LINDEX', key, index.toString()], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {
  this.__command(['LINSERT', key, position, pivot, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.llen = function(key, complete, cancel) {
  this.__command(['LLEN', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpop = function(key, complete, cancel) {
  this.__command(['LPOP', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpush = function(key, values, complete, cancel) {
  var args = ['LPUSH', key].concat(values);
  this.__command(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lpushx = function(key, value, complete, cancel) {
  this.__command(['LPUSHX', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lrange =
    function(key, start, stop, complete, cancel) {
  var args = ['LRANGE', key, start.toString(), stop.toString()];
  this.__command(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lrem =
    function(key, count, value, complete, cancel) {
  this.__command(['LREM', key, count.toString(), value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.lset =
    function(key, index, value, complete, cancel) {
  this.__command(['LSET', key, index.toString(), value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.ltrim =
    function(key, start, stop, complete, cancel) {
  var args = ['LTRIM', key, start.toString(), stop.toString()];
  this.__command(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpop = function(key, complete, cancel) {
  this.__command(['RPOP', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpoplpush =
    function(source, destination, complete, cancel) {
  this.__command(['RPOPLPUSH', source, destination], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpush =
    function(key, values, complete, cancel) {
  var args = ['RPUSH', key].concat(values);
  this.__command(args, complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.rpushx =
    function(key, value, complete, cancel) {
  this.__command(['RPUSHX', key, value], complete, cancel);
};


// ---- SETS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sadd = function(key, values, complete, cancel) {
  this.__command(['SADD', key].concat(values), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.scard = function(key, complete, cancel) {
  this.__command(['SCARD', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sinter = function(keys, complete, cancel) {
  this.__command(['SINTER'].concat(keys), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sismember =
    function(key, value, complete, cancel) {
  this.__command(['SISMEMBER', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.smembers = function(key, complete, cancel) {
  this.__command(['SMEMBERS', key], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.srem = function(key, value, complete, cancel) {
  this.__command(['SREM', key].concat(value), complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sscan =
    function(key, cursor, complete, cancel, opt_options) {
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

  this.__command(args, complete, cancel);
};


// ---- SCRIPTING --------------------------------------------------------------


/**
* @inheritDoc
*/
polina.redis.Client.prototype.evalsha = function(name, args, complete, cancel) {
  var script = this.__scripts[name];
  script.evalsha(args, complete, cancel);
};


/**
* @inheritDoc
*/
polina.redis.Client.prototype.scriptLoad = function(name, script) {
  var self = this;
  this.__scripts[name] = new polina.redis.Script(script,
      function(command, handler) {
        self._send(command, handler);
      });
};


// -----------------------------------------------------------------------------


/**
* @inheritDoc
*/
polina.redis.Client.prototype.destroy = function() {
  polina.Connection.prototype.destroy.call(this);
  this.__scripts = {};
};
