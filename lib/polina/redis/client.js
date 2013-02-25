


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
 * @param {function(Error, *)} callback Обработчик результата.
 */
polina.redis.Client.prototype._command = function(args, callback) {
  if (args.length > 0) {
    var i = 0,
        l = args.length;

    var payload = '*' + l + '\r\n';

    while (i < l) {
      payload += Buffer.byteLength(args[i])  + '\r\n' + args[i] + '\r\n';

      i += 1;
    }

    this._send(payload,  new polina.redis.PacketHandler(callback));
  }
};
