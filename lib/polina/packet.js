


/**
 * @constructor
 */
polina.Packet = function() {

  /**
   * @type {*}
   */
  this.__result = null;

};


/**
 * @return {*}
 */
polina.Packet.prototype.get = function() {
  return this.__result;
};


/**
 * @param {*} result
 */
polina.Packet.prototype.set = function(result) {
  this.__result = result;
};


/**
 *
 */
polina.Packet.prototype.reset = function() {
  this.__result = null;
};
