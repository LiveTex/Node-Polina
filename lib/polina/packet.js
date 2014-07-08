


/**
 * @constructor
 */
polina.Packet = function() {

  /**
   * @type {boolean}
   */
  this.__isCompleted = false;

};


/**
 *
 */
polina.Packet.prototype.complete = function() {
  this.__isCompleted = true;
};


/**
 * @return {boolean}
 */
polina.Packet.prototype.isCompleted = function() {
  return this.__isCompleted;
};
