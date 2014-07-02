


/**
 * @interface
 */
polina.redis.IClient = function() {};


/**
 * Sets the string value of a key.
 *
 * @param {string} key A key of set value.
 * @param {string} value Value to be set.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.set = function(key, value, complete, cancel) {};


/**
 * Gets the value of a key.
 *
 * @param {string} key A key.
 * @param {function(string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.IClient.prototype.get = function(key, complete, cancel) {};
