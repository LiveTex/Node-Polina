


/**
 * @constructor
 * @extends {polina.Connection}
 * @implements {polina.redis.IClient}
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.redis.Client = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);
};

util.inherits(polina.redis.Client, polina.Connection);


/**
 * @param {!Array.<string>} args Агументы.
 * @return {string} Команда.
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
 * @param {!Array.<string>} args Агументы.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.__intCommand = function(args, complete, cancel) {
  this._send(this.__encodeCommand(args),
      new polina.redis.PacketHandler(complete, cancel, 0));
};


/**
 * @param {!Array.<string>} args Агументы.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.__strCommand = function(args, complete, cancel) {
  this._send(this.__encodeCommand(args),
      new polina.redis.PacketHandler(complete, cancel, 1));
};


/**
 * @param {!Array.<string>} args Агументы.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
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
polina.redis.Client.prototype.setex =
    function(key, seconds, value, complete, cancel) {
  this.__strCommand(['SETEX', key, String(seconds), value], complete, cancel);
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
polina.redis.Client.prototype.smembers = function(key, complete, cancel) {
  this.__arrCommand(['SMEMBERS', key], complete, cancel);
};
