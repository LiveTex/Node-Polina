


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
 * @param {number} intervalStart Начало выделенного интервала.
 * @param {number} intervalEnd Конец выделенного интервала.
 * @param {number} connectionCount Сило соединений.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост подключения.
 */
polina.redis.Bucket.prototype.registerClient =
    function(intervalStart, intervalEnd, connectionCount, port, opt_host) {

  this.terminateClient(port, opt_host);

  if (intervalStart < 0) {
    intervalStart = 0;
  }

  if (intervalEnd > this.__size) {
    intervalEnd = this.__size;
  }

  var client = new polina.redis.ConnectionsBundle(
      connectionCount, port, opt_host);

  var clientId = (opt_host || '') + ':' + port;

  var i = intervalStart;
  while (i < intervalEnd) {
    this.__bucket[i] = client;

    i += 1;
  }

  this.__clients[clientId] = client;
  this.__intervals[clientId] = [intervalStart, intervalEnd];
};


/**
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост подключения.
 */
polina.redis.Bucket.prototype.terminateClient = function(port, opt_host) {
  var clientId = (opt_host || '') + ':' + port;

  if (this.__clients[clientId] !== undefined) {
    var interval = this.__intervals[clientId];

    var i = interval[0];
    while (i < interval[1]) {
      delete this.__bucket[i];
      i += 1;
    }

    this.__clients[clientId].destroy();

    delete this.__intervals[clientId];
    delete this.__clients[clientId];
  }
};


/**
 * @param {string} key Ключ.
 * @return {number} Индекс.
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
