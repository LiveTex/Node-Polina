 

/**
 * @namespace
 */
var polina = {};

/**
 * @type {string}
 */
polina.VERSION = '0.0.1';

/**
 * @namespace
 */
polina.beans = {};

/**
 * @namespace
 */
polina.redis = {};

/**
 * Ничего.
 */
polina.nop = function() {};

/**
 * @interface
 */
polina.IPacketHandler = function() {};

/**
 * @return {boolean} Обработан ли пакет.
 */
polina.IPacketHandler.prototype.isComplete = function() {};

/**
 * @param {number} cursor Курсор.
 * @param {!Buffer} chunk Пакет данных.
 * @return {number} Новое положение курсора.
 */
polina.IPacketHandler.prototype.process = function(cursor, chunk) {};

/**
 * @constructor
 * @param {function(!Error)} errorHandler Обработчик ошибок.
 * @param {number} reconnectTimeout Интервал переподключения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.Connection = function(errorHandler, reconnectTimeout, port, opt_host) {};

/**
 *
 */
polina.Connection.prototype.destroy = function() {};

/**
 * @constructor
 * @extends {polina.Connection}
 * @param {string} handshakePayload Инициирующий пакет.
 * @param {!polina.beans.PacketHandler} handshakeHandler Инициирующий пакет.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Client =
    function(handshakePayload, handshakeHandler, port, opt_host) {};

/**
 * @type {number}
 */
polina.beans.Client.RECONNECT_TIMEOUT = 1000;

/**
 * @constructor
 * @extends {polina.beans.Client}
 * @param {string} tube Труба наблюдения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.User = function(tube, port, opt_host) {};

/**
 *
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {?function(Error, string=)=} opt_callback Обработчик результата.
 */
polina.beans.User.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {};

/**
 * @constructor
 * @extends {polina.beans.Client}
 * @param {number} tube Труба наблюдения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Watcher = function(tube, port, opt_host) {};

/**
 * @param {function(Error, string=, string=)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.reserve = function(callback) {};

/**
 * @param {string} jobId Идентификатор задачи.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.delete = function(jobId, callback) {};

/**
 * @param {string} jobId Идентификатор задачи.
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.release =
    function(jobId, priority, timeout, callback) {};

/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {string} expectedResponse Ожидaемый результат.
 * @param {Function=} opt_callback Обработчик результата.
 */
polina.beans.PacketHandler = function(expectedResponse, opt_callback) {};

/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.isComplete = function() {};

/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(cursor, chunk) {};

/**
 * @constructor
 * @param {string} tube Труба наблюдения.
 * @param {!Array.<number>} ports Порт подключения.
 * @param {!Array.<string>=} opt_hosts Хост для подключения.
 */
polina.beans.UsersBundle = function(tube, ports, opt_hosts) {};

/**
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {?function(Error, string=)=} opt_callback Обработчик результата.
 */
polina.beans.UsersBundle.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {};

/**
 * @enum {number}
 */
polina.redis.ResponseType = {
  OK: '+'.charCodeAt(0),
  ERR: '-'.charCodeAt(0),
  INT: ':'.charCodeAt(0),
  BULK: '$'.charCodeAt(0),
  MULTI_BULK: '*'.charCodeAt(0)
};

/**
 * @constructor
 * @extends {polina.Connection}
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.redis.Client = function(port, opt_host) {};

/**
 * @type {number}
 */
polina.redis.Client.RECONNECT_TIMEOUT = 1000;

/**
 *
 * @param {string} key Ключ.
 * @param {string} value Значение.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.set = function(key, value, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.get = function(key, complete, cancel) {};

/**
 * @param {string|!Array.<string>} key Ключи.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.del = function(key, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {string|!Array.<string>} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.sadd = function(key, value, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {string|!Array.<string>} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.srem = function(key, value, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.Client.prototype.smembers = function(key, complete, cancel) {};

/**
 * @constructor
 * @implements {polina.IPacketHandler}
 * @param {!Function} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 * @param {number} type Тип ответа.
 */
polina.redis.PacketHandler = function(complete, cancel, type) {};

/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.isComplete = function() {};

/**
 * @inheritDoc
 */
polina.redis.PacketHandler.prototype.process = function(cursor, chunk) {};




