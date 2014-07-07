


/**
 * Header of Beanstalkd response packet.
 *
 * @constructor
 * @extends {polina.Packet}
 */
polina.beans.protocol.Header = function() {
  polina.Packet.call(this);

  /**
   * @type {string}
   */
  this.__status = '';

  /**
   * @type {string}
   */
  this.__id = polina.beans.EMPTY_ID;

  /**
   * @type {string}
   */
  this.__length = '';

};

util.inherits(polina.beans.protocol.Header, polina.Packet);


/**
 * @return {string}
 */
polina.beans.protocol.Header.prototype.getStatus = function() {
  return this.__status;
};


/**
 * @param {string} status
 */
polina.beans.protocol.Header.prototype.setStatus = function(status) {
  this.__status = status;
};


/**
 * @return {string}
 */
polina.beans.protocol.Header.prototype.getId = function() {
  return this.__id;
};


/**
 * @param {string} id
 */
polina.beans.protocol.Header.prototype.setId = function(id) {
  this.__id = id;
};


/**
 * @return {number}
 */
polina.beans.protocol.Header.prototype.getLength = function() {
  return parseInt(this.__length, 10);
};


/**
 * @param {string} length
 */
polina.beans.protocol.Header.prototype.setLength = function(length) {
  this.__length = length;
};
