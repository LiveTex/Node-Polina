


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
 * @param {number} seconds Количество секунд жизни ключа.
 * @param {string} value Значение.
 * @param {function(string)} complete Обработчик результата.
 * @param {function(string, number=)} cancel Обработчик ошибки.
 */
polina.redis.IClient.prototype.setex =
    function(key, seconds, value, complete, cancel) {};


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