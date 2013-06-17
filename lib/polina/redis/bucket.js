


/**
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} size Размер бакета.
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
   * @type {!Object.<string, !Array.<number>>}
   */
  this.__intervals = {};
};


/**
 * @param {number} size Размер бакета.
 */
polina.redis.Bucket.prototype.resize = function(size) {
  this.__size = size;
};


/**
 *
 *
 * @param {number} intervalStart Начало выделенного интервала.
 * @param {number} intervalEnd Конец выделенного интервала.
 * @param {!polina.redis.IClient} client Redis-клиент.
 * @param {string} id Идентификатор клиента.
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

  console.log(this.__bucket);

  this.__clients[id] = client;
  this.__intervals[id] = [intervalStart, intervalEnd];
};


/**
 * @param {string} id Идентификатор клиента.
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

    delete this.__intervals[id];
    delete this.__clients[id];
  }
};


/**
 * @param {string} key Ключ.
 * @return {number} Индекс.
 */
polina.redis.Bucket.prototype.__getIndex = function(key) {
  console.log('MURMUR', key, polina.murmur(key) % this.__size);
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
  var client = this.__bucket[this.__getIndex(pattern)];
  if (client !== undefined) {
    client.keys(pattern, complete, cancel);
  } else {
    cancel('Redis bucket is incomplete.');
  }
};


/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.del = function(keys, complete, cancel) {
  if (keys.length !== 0) {
    var client = this.__bucket[this.__getIndex(keys[0])];
    if (client !== undefined) {
      client.del(keys, complete, cancel);
    } else {
      cancel('Redis bucket is incomplete.');
    }
  } else {
    complete([]);
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
polina.redis.Bucket.prototype.destroy = function() {
  for (var key in this.__clients) {
    this.__clients[key].destroy();
  }

  this.__bucket = {};
  this.__clients = {};
  this.__intervals = {};
};
