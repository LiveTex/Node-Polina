


/**
 * @constructor
 * @extends {polina.Connection}
 * @param {string} handshakePayload Инициирующий пакет.
 * @param {!polina.beans.PacketHandler} handshakeHandler Инициирующий пакет.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Client =
    function(handshakePayload, handshakeHandler, port, opt_host) {
  polina.Connection.call(this, port, opt_host);

  /**
   * @type {string}
   */
  this.__handshakePayload = handshakePayload;

  /**
   * @type {!polina.beans.PacketHandler}
   */
  this.__handshakeHandler = handshakeHandler;
};

util.inherits(polina.beans.Client, polina.Connection);


/**
 * @return {string} Инициирующий запрос.
 */
polina.beans.Client.prototype._getHandshakePayload = function() {
  return this.__handshakePayload;
};


/**
 * @return {polina.IPacketHandler} Инициирующий пакет.
 */
polina.beans.Client.prototype._getHandshakeHandler = function() {
  return this.__handshakeHandler;
};


/**
 * @param {string} name Имя команды.
 * @param {string} args Аргументы комады.
 * @param {string} response Ожидаемый результат.
 * @param {Function} callback Обработчик результата.
 * @param {string=} opt_data Данные.
 */
polina.beans.Client.prototype._command =
    function(name, args, response, callback, opt_data) {

  var payload = name;

  if (args.length > 0) {
    payload += ' ' + args;
  }

  if (opt_data !== undefined) {
    payload += ' ' + Buffer.byteLength(opt_data) + '\r\n' + opt_data;
  }

  this._send(payload + '\r\n',
      new polina.beans.PacketHandler(response, callback));
};
