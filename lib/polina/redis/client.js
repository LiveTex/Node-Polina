


/**
 * @constructor
 * @extends {polina.Connection}
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.redis.Client = function(port, opt_host) {
  polina.Connection.call(this,
      polina.redis.Client.__handleError,
      polina.redis.Client.RECONNECT_TIMEOUT, port, opt_host);
};

util.inherits(polina.redis.Client, polina.Connection);


/**
 * @type {number}
 */
polina.redis.Client.RECONNECT_TIMEOUT = 1000;


/**
 * @param {!Error} error Ошибка.
 */
polina.redis.Client.__handleError = function(error) {
  console.info('Polina has redis error: ' + error.message);
};


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
  var payload = this.__encodeCommand(args);

  if (args.length > 0) {
    this._send(payload, new polina.redis.IntPacketHandler(complete, cancel));
  }
};


/**
 * @param {!Array.<string>} args Агументы.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.__strCommand = function(args, complete, cancel) {
  var payload = this.__encodeCommand(args);

  if (args.length > 0) {
    this._send(payload, new polina.redis.StringPacketHandler(complete, cancel));
  }
};


/**
 * @param {!Array.<string>} args Агументы.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.__arrCommand = function(args, complete, cancel) {
  var payload = this.__encodeCommand(args);

  if (args.length > 0) {
    this._send(payload, new polina.redis.ArrayPacketHandler(complete, cancel));
  }
};
