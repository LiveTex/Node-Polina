


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
   * @type {string}
   */
  this.__writeQueue = '';

  /**
   * @type {string}
   */
  this.__readQueue = '';

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

    self.__flush();

    if (self.__isDisconnecting) {
      self.__socket.end();
    }
  };


  /**
   * @param {!Buffer} chunk Пакет данных.
   */
  this.__handleData = function(chunk) {
    self.__readQueue += chunk;

    while (self.__requestHandlers.length > 0 && self.__readQueue.length > 0) {
      var handler = self.__requestHandlers.shift();

      self.__readQueue = handler.process(self.__readQueue);

      if (handler.isComplete()) {
        handler.destroy();
      } else {
        self.__requestHandlers.unshift(handler);

        break;
      }
    }
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
polina.Connection.prototype.send = function(payload, handler) {
  this.__writeQueue += payload;
  this.__requestHandlers.push(handler);

  this.__flush();
};


/**
 *
 */
polina.Connection.prototype.__flush = function() {
  if (this.__isConnected && this.__writeQueue.length > 0) {
    this.__socket.write(this.__writeQueue);
    this.__writeQueue = '';
  }
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
