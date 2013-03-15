


/**
 * @constructor
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.Connection = function(port, opt_host) {
  var self = this;

  function reconnect() {
    self.__connect();
  }

  function fallback() {
    self.__fallback();
  }

  /**
   * @type {!Array.<!Arguments>}
   */
  this.__destinations = [arguments];

  /**
   * @type {number}
   */
  this.__destinationIndex = 0;

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
      process.nextTick(fallback);
    } else if (self.__isDisconnecting) {
      self.__isDisconnecting = false;
    } else {
      process.nextTick(reconnect);
    }

    self.__socket.removeAllListeners();
    self.__socket.destroy();
  };

  process.nextTick(reconnect);
};


/**
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.Connection.prototype.registerFallback = function(port, opt_host) {
  this.__destinations.push(arguments);
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


/**
 *
 */
polina.Connection.prototype.__fallback = function() {
  this.__destinationIndex =
      (this.__destinationIndex + 1) % this.__destinations.length;

  this.__connect();
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
 *
 */
polina.Connection.prototype.__connect = function() {
  this.__socket.addListener('connect', this.__handleConnection);
  this.__socket.addListener('data', this.__handleData);
  this.__socket.addListener('close', this.__handleClose);
  this.__socket.addListener('error', console.error);

  this.__socket.connect.apply(this.__socket,
      this.__destinations[this.__destinationIndex]);
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
