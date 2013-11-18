


/**
 * @constructor
 * @param {string} name Observation tube.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.beans.Tube = function(name, port, opt_host) {

  /**
   * @type {string}
   */
  this.__name = name;

  /**
   * @type {number}
   */
  this.__port = port;

  /**
   * @type {string}
   */
  this.__host = opt_host || '127.0.0.1';
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
