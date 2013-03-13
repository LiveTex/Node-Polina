


/**
 * @constructor
 * @param {function(!Error)} errorHandler Обработчик ошибок.
 * @param {number} reconnectTimeout Интервал переподключения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.Connection = function(errorHandler, reconnectTimeout, port, opt_host) {
  var self = this;

  function reconnect() {
    self.__connect(port, opt_host);
  }

  /**
   * @type {!net.Socket}
   */
  this.__socket = new net.Socket();

  /**
   * @type {!Array.<!polina.IPacketHandler>|!ds.queue.Queue}
   */
  this.__requestHandlers = new ds.queue.Queue();

  /**
   * @type {!Array.<string>}
   */
  this.__writeQueue = [];

  /**
   * @type {!Buffer}
   */
  this.__readBuffer = new Buffer(0);

  /**
   * @type {boolean}
   */
  this.__isConnected = false;

  /**
   * @type {boolean}
   */
  this.__isDisconnecting = false;

  /**
   * @type {boolean}
   */
  this.__isConnecting = false;


  /**
   * @type {function(!Error)}
   */
  this.__handleError = errorHandler;

  /**
   *
   */
  this.__handleConnection = function() {
    self.__isConnected = true;
    self.__isConnecting = false;

    self.__handshake();

    if (self.__isDisconnecting) {
      self.__socket.end();
    }
  };

  /**
   * @param {!Buffer} chunk Пакет данных.
   */
  this.__handleData = function(chunk) {
    if (self.__readBuffer.length > 0) {
      self.__readBuffer = Buffer.concat([self.__readBuffer, chunk]);
    } else {
      self.__readBuffer = chunk;
    }

    self.__processData();
  };

  /**
   *
   */
  this.__handleClose = function() {
    self.__isConnected = false;

    if (self.__isConnecting) {
      setTimeout(reconnect, reconnectTimeout);
    } else if (self.__isDisconnecting) {
      self.__isDisconnecting = false;
    } else {
      setTimeout(reconnect, reconnectTimeout);
    }

    self.__socket.removeAllListeners();
    self.__socket.destroy();
  };

  this.__connect(port, opt_host);
};


/**
 *
 */
polina.Connection.prototype.destroy = function() {
  this.__socket.removeAllListeners();
  this.__socket.end();
};


/**
 * @param {string} payload Данные.
 * @param {!polina.IPacketHandler} handler Обработчик пакета.
 */
polina.Connection.prototype._send = function(payload, handler) {
  this.__writeQueue.push(payload);
  this.__requestHandlers.push(handler);

  this.__flush();
};


/**
 *
 */
polina.Connection.prototype.__processData = function() {
  var cursor = 0;

  while (this.__requestHandlers.length > 0 && this.__readBuffer.length > 0) {
    var handler = this.__requestHandlers.getFirst().get();
    var prevPosition = cursor;

    cursor = handler.process(cursor, this.__readBuffer);

    if (handler.isComplete()) {
      this.__requestHandlers.shift();
    }

    if (cursor === prevPosition) {
      break;
    }
  }

  this.__readBuffer = this.__readBuffer.slice(cursor);
};


/**
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.Connection.prototype.__connect = function(port, opt_host) {
  this.__socket.addListener('connect', this.__handleConnection);
  this.__socket.addListener('data', this.__handleData);
  this.__socket.addListener('close', this.__handleClose);
  this.__socket.addListener('error', this.__handleError);

  this.__socket.connect(port, opt_host);
};


/**
 *
 */
polina.Connection.prototype.__flush = function() {
  if (this.__isConnected && this.__writeQueue.length > 0) {
    this.__socket.write(this.__writeQueue.join(''));
    this.__writeQueue.length = 0;
  }
};


/**
 *
 */
polina.Connection.prototype.__handshake = function() {
  var handshakePayload = this._getHandshakePayload();
  if (handshakePayload.length > 0) {
    var handshakeHandler = this._getHandshakeHandler();
    if (handshakeHandler !== null) {
      this.__writeQueue.unshift(handshakePayload);
      this.__requestHandlers.unshift(handshakeHandler);
    }
  }

  this.__flush();
};


/**
 * @return {string} Инициирующий запрос.
 */
polina.Connection.prototype._getHandshakePayload = function() {
  return '';
};


/**
 * @return {polina.IPacketHandler} Инициирующий пакет.
 */
polina.Connection.prototype._getHandshakeHandler = function() {
  return null;
};
