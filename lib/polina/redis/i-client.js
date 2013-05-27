


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
 * @param {number} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.incrby =
    function(key, value, complete, cancel) {};


/**
 * @param {string} key Ключ.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.incr =
    function(key, complete, cancel) {};


/**
 * @param {string} key Ключ.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.decr =
    function(key, complete, cancel) {};


/**
 * @param {string} key Ключ.
 * @param {number} seconds Количество секунд жизни ключа.
 * @param {string} value Значение.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


/**
 * @param {string} key Ключ.
 * @param {number} seconds Количество секунд жизни ключа.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.expire =
    function(key, seconds, complete, cancel) {};


/**
 * @param {string} key Ключ.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.get = function(key, complete, cancel) {};


/**
 * @param {!Array.<string>} keys Ключи.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.mget = function(keys, complete, cancel) {};


/**
 * @param {string} pattern Шаблон.
 * @param {function(!Array.<string>)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.keys = function(pattern, complete, cancel) {};


/**
 * @param {string|!Array.<string>} keys Ключ.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.del = function(keys, complete, cancel) {};


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
 * @param {string} value Значение.
 * @param {function(number)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.sismember =
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
