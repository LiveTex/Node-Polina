


/**
 * A bundle of beanstalkd users.
 *
 * @constructor
 * @param {string} tube Observation tube.
 * @param {!Array.<number>} ports Connection ports.
 * @param {!Array.<string>=} opt_hosts Connection hosts.
 */
polina.beans.UsersBundle = function(tube, ports, opt_hosts) {
  var self = this;
  var hosts = opt_hosts || [];

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
  this.__users = new Array(ports.length);

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
    this.__users[i] = new polina.beans.User(tube, ports[i], hosts[i]);

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
 * @param {?function(Error, string=)=} opt_callback Result handler.
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
