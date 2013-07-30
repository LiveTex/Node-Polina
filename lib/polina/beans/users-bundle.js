


/**
 * A bundle of beanstalkd users.
 *
 * @constructor
 * @param {!Array.<!polina.beans.Tube>} tubes Connection tubes.
 */
polina.beans.UsersBundle = function(tubes) {
  var self = this;

  /**
   * @type {number}
   */
  this.__robinCounter = 0;

  /**
   * @type {boolean}
   */
  this.__robinRequested = false;

  /**
   * @type {!Array.<!polina.beans.User>}
   */
  this.__users = new Array(tubes.length);

  /**
   *
   */
  this.__incrementRobin = function() {
    self.__robinCounter += 1;
    self.__robinRequested = false;
  };

  var i = 0,
      l = this.__users.length;

  while (i < l) {
    this.__users[i] = new polina.beans.User(tubes[i]);

    i += 1;
  }
};


/**
 * Puts data to execution tube.
 *
 * @param {number} priority Priority of data handling.
 * @param {number} timeout Execution timeout.
 * @param {number} execTime Execution time.
 * @param {string} data Data to handle.
 * @param {function(string)=} opt_callback Result handler.
 */
polina.beans.UsersBundle.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {
  var user = this.__users[this.__robinCounter % this.__users.length];
  if (user !== undefined) {
    user.put(priority, timeout, execTime, data, opt_callback);
  }

  if (!this.__robinRequested) {
    this.__robinRequested = true;
    process.nextTick(this.__incrementRobin);
  }
};


/**
 * Destroys a bundle.
 */
polina.beans.UsersBundle.prototype.destroy = function() {
  while (this.__users.length > 0) {
    this.__users.shift().destroy();
  }
};
