 

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
 * JS Implementation of MurmurHash3 (r136) (as of May 20, 2011)
 *
 * @param {string} key ASCII only.
 * @return {number} 32-bit positive integer hash.
 */
polina.murmur = function(key) {};

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
 * @param {string} payload Данные.
 * @param {!polina.IPacketHandler} handler Обработчик пакета.
 */
polina.Connection.prototype._send = function(payload, handler) {};

/**
 * @return {string} Инициирующий запрос.
 */
polina.Connection.prototype._getHandshakePayload = function() {};

/**
 * @return {polina.IPacketHandler} Инициирующий пакет.
 */
polina.Connection.prototype._getHandshakeHandler = function() {};

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
 * @return {string} Инициирующий запрос.
 */
polina.beans.Client.prototype._getHandshakePayload = function() {};

/**
 * @return {polina.IPacketHandler} Инициирующий пакет.
 */
polina.beans.Client.prototype._getHandshakeHandler = function() {};

/**
 * @param {string} name Имя команды.
 * @param {string} args Аргументы комады.
 * @param {string} response Ожидаемый результат.
 * @param {Function} callback Обработчик результата.
 * @param {string=} opt_data Данные.
 */
polina.beans.Client.prototype._command =
    function(name, args, response, callback, opt_data) {};

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
 * @param {string} tube Труба наблюдения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Watcher = function(tube, port, opt_host) {};

/**
 * @param {function(string, string)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.reserve = function(callback) {};

/**
 * @param {string} jid Идентификатор задачи.
 * @param {function()} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.delete = function(jid, callback) {};

/**
 * @param {string} jid Идентификатор задачи.
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {function()} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.release =
    function(jid, priority, timeout, callback) {};

/**
 * @inheritDoc
 */
polina.beans.Watcher.prototype.destroy = function() {};

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
 * Разрушение.
 */
polina.beans.UsersBundle.prototype.destroy = function() {};

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
 * @interface
 */
polina.redis.IClient = function() {};

/**
 * @param {string} key Ключ.
 * @param {string} value Значение.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.set =
    function(key, value, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.get = function(key, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.del = function(key, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {string|!Array.<string>} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.sadd =
    function(key, value, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {string|!Array.<string>} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.srem =
    function(key, value, complete, cancel) {};

/**
 * @param {string} key Ключ.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.smembers =
    function(key, complete, cancel) {};

/**
 * Разрушение клиента.
 */
polina.redis.IClient.prototype.destroy = function() {};

/**
 * @constructor
 * @extends {polina.Connection}
 * @implements {polina.redis.IClient}
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.redis.Client = function(port, opt_host) {};

/**
 * @type {number}
 */
polina.redis.Client.RECONNECT_TIMEOUT = 1000;

/**
 * @inheritDoc
 */
polina.redis.Client.prototype.set = function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Client.prototype.get = function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Client.prototype.del = function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Client.prototype.sadd = function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Client.prototype.srem = function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Client.prototype.smembers = function(key, complete, cancel) {};

/**
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} size Размер бакета.
 */
polina.redis.Bucket = function(size) {};

/**
 * @param {number} size Размер бакета.
 */
polina.redis.Bucket.prototype.resize = function(size) {};

/**
 * @param {number} intervalStart Начало выделенного интервала.
 * @param {number} intervalEnd Конец выделенного интервала.
 * @param {number} connectionCount Сило соединений.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост подключения.
 */
polina.redis.Bucket.prototype.registerClient =
    function(intervalStart, intervalEnd, connectionCount, port, opt_host) {};

/**
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост подключения.
 */
polina.redis.Bucket.prototype.terminateClient = function(port, opt_host) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.set = function(key, value, complete, cancel) {};

/**
 * @inheritDoc.
 */
polina.redis.Bucket.prototype.get = function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.del = function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.sadd = function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.srem = function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.smembers = function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.Bucket.prototype.destroy = function() {};

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

/**
 */
polina.redis.PacketHandler.prototype._complete = function() {};

/**
 * @param {!Buffer} error Ошибка.
 */
polina.redis.PacketHandler.prototype._cancel = function(error) {};

/**
 * @constructor
 * @implements {polina.redis.IClient}
 * @param {number} count Количество соединений.
 * @param {number} port Порт.
 * @param {string=} opt_host Хост.
 */
polina.redis.ConnectionsBundle = function(count, port, opt_host) {};

/**
 * @inheritDoc
 */
polina.redis.ConnectionsBundle.prototype.set =
    function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.ConnectionsBundle.prototype.get = function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.ConnectionsBundle.prototype.del = function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.ConnectionsBundle.prototype.sadd =
    function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.ConnectionsBundle.prototype.srem =
    function(key, value, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.ConnectionsBundle.prototype.smembers =
    function(key, complete, cancel) {};

/**
 * @inheritDoc
 */
polina.redis.ConnectionsBundle.prototype.destroy = function() {};


