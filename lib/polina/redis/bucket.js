


/**
 * Redis Bucket.
 *
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} size Bucket size.
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
 * Changes a size of a bucket.
 *
 * @param {number} size Bucket size.
 */
polina.redis.Bucket.prototype.resize = function(size) {
  this.__size = size;
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
 * @param {string} key Hash key.
 * @return {number} Index.
 */
polina.redis.Bucket.prototype.__getIndex = function(key) {
  return polina.murmur(key) % this.__size;
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.set = function(key, value, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.set(key, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incrby =
    function(key, value, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.incrby(key, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.incr = function(key, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.incr(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.decr = function(key, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.decr(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.setex =
    function(key, seconds, value, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.setex(key, seconds, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.expire =
    function(key, seconds, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.expire(key, seconds, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc.
 */
polina.redis.Bucket.prototype.get = function(key, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.get(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc.
 */
polina.redis.Bucket.prototype.mget = function(keys, complete, cancel) {
  if (keys.length !== 0) {
    var client = this.__bucket[this.__getIndex(keys[0])];
    if (client !== undefined) {
      client.mget(keys, complete, cancel);
    } else {
      cancel('Redis bucket is incomplete.');
    }
  } else {
    complete([]);
  }
};


/**
 * @inheritDoc.
 */
polina.redis.Bucket.prototype.keys = function(pattern, complete, cancel) {
  var result = [];
  var c = this.__clientCount;


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
polina.redis.Bucket.prototype.del = function(key, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.del(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sadd = function(key, value, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.sadd(key, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.srem = function(key, value, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.srem(key, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sismember =
    function(key, value, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.sismember(key, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.smembers = function(key, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.smembers(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hset =
    function(key, hashkey, value, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.hset(key, hashkey, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hget =
    function(key, hashkey, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.hget(key, hashkey, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hdel =
    function(key, hashkey, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.hdel(key, hashkey, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.hgetall =
    function(key, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.hgetall(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.execInt =
    function(name, args, complete, cancel) {
  var client = this.__bucket[this.__getIndex(args[0] || '')];
  if (client !== undefined) {
    client.execInt(name, args, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.execString =
    function(name, args, complete, cancel) {
  var client = this.__bucket[this.__getIndex(args[0] || '')];
  if (client !== undefined) {
    client.execString(name, args, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.execArray =
    function(name, args, complete, cancel) {
  var client = this.__bucket[this.__getIndex(args[0] || '')];
  if (client !== undefined) {
    client.execArray(name, args, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.registerScript = function(name, script) {
  for (var id in this.__clients) {
    this.__clients[id].registerScript(name, script);
  }
};


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


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.blpop =
    function(keys, timeout, complete, cancel) {
  var client = this.__bucket[this.__getIndex(keys[0])];
  if (client !== undefined) {
    client.blpop(keys, timeout, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.brpop =
    function(keys, timeout, complete, cancel) {

  var client = this.__bucket[this.__getIndex(keys[0])];
  if (client !== undefined) {
    client.brpop(keys, timeout, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.brpoplpush =
    function(source, destination, timeout, complete, cancel) {

  var client = this.__bucket[this.__getIndex(source)];
  if (client !== undefined) {
    client.brpoplpush(source, destination, timeout, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lindex = function(key, index, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.lindex(key, index, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.linsert =
    function(key, position, pivot, value, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.linsert(key, position, pivot, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.llen = function(key, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.llen(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpop = function(key, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.lpop(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpush = function(key, values, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.lpush(key, values, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lpushx = function(key, value, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.lpushx(key, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lrange =
    function(key, start, stop, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.lrange(key, start, stop, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lrem =
    function(key, count, value, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.lrem(key, count, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.lset =
    function(key, index, value, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.lset(key, index, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.ltrim =
    function(key, start, stop, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.ltrim(key, start, stop, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpop =
    function(key, complete, cancel) {
  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.rpop(key, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpoplpush =
    function(source, destination, complete, cancel) {

  var client = this.__bucket[this.__getIndex(source)];
  if (client !== undefined) {
    client.rpoplpush(source, destination, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpush = function(key, values, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.rpush(key, values, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.rpushx = function(key, value, complete, cancel) {

  var client = this.__bucket[this.__getIndex(key)];
  if (client !== undefined) {
    client.rpushx(key, value, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};
