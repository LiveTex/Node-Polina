


/**
 * Beanstalkd Tube.
 *
 * @param {string} name Observation tube.
 * @param {number=} opt_port Connection port.
 * @param {string=} opt_host Connection host.
 *
 * @constructor
 */
polina.beans.Tube = function(name, opt_port, opt_host) {

  /**
   * @type {string}
   */
  this.__name = name;

  /**
   * @type {number}
   */
  this.__port = opt_port || 11300;

  /**
   * @type {string}
   */
  this.__host = opt_host || '127.0.0.1';

  /**
   * @type {string}
   */
  this.__id = this.__host + '/' + this.__port + '/' + this.__name;
};


/**
 * @return {string} ID of the tube.
 */
polina.beans.Tube.prototype.getId = function() {
  return this.__id;
};


/**
 * Returns tube's name.
 *
 * @return {string} Name of the tube.
 */
polina.beans.Tube.prototype.getName = function() {
  return this.__name;
};


/**
 * Returns port of tube's connection.
 *
 * @return {number} Connection port.
 */
polina.beans.Tube.prototype.getPort = function() {
  return this.__port;
};


/**
 * Returns host of tube's connection.
 *
 * @return {string} Connection host.
 */
polina.beans.Tube.prototype.getHost = function() {
  return this.__host;
};
