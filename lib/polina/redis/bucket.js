


/**
 * Redis Bucket.
 *
 * @param {number} size Bucket size.
 *
 * @constructor
 * @implements {polina.redis.IClient}
 */
polina.redis.Bucket = function(size) {

  /**
   * @type {number}
   */
  this.__size = size;

  /**
   * @type {!Object.<number, !polina.redis.IClient>}
   */
  this.__bucket = {};

  /**
   * @type {!Object.<string, !polina.redis.IClient>}
   */
  this.__clients = {};

  /**
   * @type {number}
   */
  this.__clientCount = 0;

  /**
   * @type {!Object.<string, !Array.<number>>}
   */
  this.__intervals = {};

};


/**
 * Registers client in a bucket.
 *
 * @param {number} intervalStart A start point of curtain interval.
 * @param {number} intervalEnd An end point of curtain interval.
 * @param {!polina.redis.IClient} client Redis-client.
 * @param {string} id Client identificator.
 */
polina.redis.Bucket.prototype.registerClient =
    function(intervalStart, intervalEnd, client, id) {
  this.terminateClient(id);

  if (intervalStart < 0) {
    intervalStart = 0;
  }

  if (intervalEnd > this.__size) {
    intervalEnd = this.__size;
  }

  var i = intervalStart;
  while (i < intervalEnd) {
    this.__bucket[i] = client;

    i += 1;
  }

  this.__clients[id] = client;
  this.__clientCount += 1;
  this.__intervals[id] = [intervalStart, intervalEnd];
};


/**
 * Terminates client in bucket by id.
 *
 * @param {string} id Client identificator.
 */
polina.redis.Bucket.prototype.terminateClient = function(id) {
  if (this.__clients[id] !== undefined) {
    var interval = this.__intervals[id];

    var i = interval[0];
    while (i < interval[1]) {
      delete this.__bucket[i];
      i += 1;
    }

    this.__clients[id].destroy();
    this.__clientCount -= 1;

    delete this.__intervals[id];
    delete this.__clients[id];
  }
};


/**
 * Selects client.
 *
 * @param {string} key Key stored at client.
 * @param {!function(!polina.redis.IClient)} complete Client handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.redis.Bucket.prototype.__getClient = function(key, complete, cancel) {
  var index = util.hash.murmur(key, polina.redis.__SEED) % this.__size;
  var client = this.__bucket[index];
  if (client !== undefined) {
    complete(client);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


// ---- KEYS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.del = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.del(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.expire =
    function(key, seconds, complete, cancel) {
  this.__getClient(key, function(client) {
    client.expire(key, seconds, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.keys = function(pattern, complete, cancel) {
  var result = [];
  var c = this.__clientCount;

  /**
   * @param {!Array.<string>} keys
   */
  function localComplete(keys) {
    result = result.concat(keys);

    if ((c -= 1) === 0) {
      complete(result);
    }
  }

  for (var id in this.__clients) {
    this.__clients[id].keys(pattern, localComplete, cancel);
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.persist = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.persist(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.scan =
    function(cursor, complete, cancel, opt_options) {
  this.__getClient(cursor, function(client) {
    client.scan(cursor, complete, cancel, opt_options);
  }, cancel);
};


// ---- STRINGS ----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.decr = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.decr(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.get = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.get(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.getset = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.getset(key, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incr = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.incr(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incrby = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.incrby(key, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.mget = function(keys, complete, cancel) {
  if (keys.length) {
    this.__getClient(keys[0], function(client) {
      client.mget(keys, complete, cancel);
    }, cancel);
  } else {
    complete([]);
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.set = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.set(key, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.setex =
    function(key, seconds, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.setex(key, seconds, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.setnx = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.setnx(key, value, complete, cancel);
  }, cancel);
};


// ---- HASHES -----------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hdel = function(key, hkey, complete, cancel) {
  this.__getClient(key, function(client) {
    client.hdel(key, hkey, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hget = function(key, hkey, complete, cancel) {
  this.__getClient(key, function(client) {
    client.hget(key, hkey, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hgetall = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.hgetall(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hset =
    function(key, hkey, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.hset(key, hkey, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hscan =
    function(key, cursor, complete, cancel, opt_options) {
  this.__getClient(key, function(client) {
    client.hscan(key, cursor, complete, cancel, opt_options);
  }, cancel);
};


// ---- LISTS ------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.blpop =
    function(keys, timeout, complete, cancel) {
  if (keys.length) {
    this.__getClient(keys[0], function(client) {
      client.blpop(keys, timeout, complete, cancel);
    }, cancel);
  } else {
    complete([]);
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.brpop =
    function(keys, timeout, complete, cancel) {
  if (keys.length) {
    this.__getClient(keys[0], function(client) {
      client.brpop(keys, timeout, complete, cancel);
    }, cancel);
  } else {
    complete([]);
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {
  this.__getClient(source, function(client) {
    client.brpoplpush(source, destination, timeout, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lindex = function(key, index, complete, cancel) {
  this.__getClient(key, function(client) {
    client.lindex(key, index, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.linsert(key, position, pivot, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.llen = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.llen(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpop = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.lpop(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpush = function(key, values, complete, cancel) {
  this.__getClient(key, function(client) {
    client.lpush(key, values, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpushx = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.lpushx(key, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lrange =
    function(key, start, stop, complete, cancel) {
  this.__getClient(key, function(client) {
    client.lrange(key, start, stop, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lrem =
    function(key, count, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.lrem(key, count, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lset =
    function(key, index, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.lset(key, index, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.ltrim =
    function(key, start, stop, complete, cancel) {
  this.__getClient(key, function(client) {
    client.ltrim(key, start, stop, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpop = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.rpop(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpoplpush =
    function(source, destination, complete, cancel) {
  this.__getClient(source, function(client) {
    client.rpoplpush(source, destination, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpush = function(key, values, complete, cancel) {
  this.__getClient(key, function(client) {
    client.rpush(key, values, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpushx = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.rpushx(key, value, complete, cancel);
  }, cancel);
};


// ---- SETS -------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sadd = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.sadd(key, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.scard = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.scard(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sinter = function(keys, complete, cancel) {
  if (keys.length) {
    this.__getClient(keys[0], function(client) {
      client.sinter(keys, complete, cancel);
    }, cancel);
  }else {
    complete([]);
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sismember =
    function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.sismember(key, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.smembers = function(key, complete, cancel) {
  this.__getClient(key, function(client) {
    client.smembers(key, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.srem = function(key, value, complete, cancel) {
  this.__getClient(key, function(client) {
    client.srem(key, value, complete, cancel);
  }, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sscan =
    function(key, cursor, complete, cancel, opt_options) {
  this.__getClient(key, function(client) {
    client.sscan(key, cursor, complete, cancel, opt_options);
  }, cancel);
};


// ---- SCRIPTING --------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.evalsha = function(name, args, complete, cancel) {
  if (args.length) {
    this.__getClient(args[0], function(client) {
      client.evalsha(name, args, complete, cancel);
    }, cancel);
  } else {
    complete(polina.redis.resp.__NULL);
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.scriptLoad = function(name, script) {
  for (var id in this.__clients) {
    this.__clients[id].scriptLoad(name, script);
  }
};


// -----------------------------------------------------------------------------


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.destroy = function() {
  for (var key in this.__clients) {
    this.__clients[key].destroy();
  }

  this.__bucket = {};
  this.__clients = {};
  this.__intervals = {};
};
