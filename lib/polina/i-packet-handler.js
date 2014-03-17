


/**
 * @interface
 */
polina.IPacketHandler = function() {};


/**
 * Returns true if a pachket was handled.
 *
 * @return {boolean} Flag of packet handling.
 */
polina.IPacketHandler.prototype.isComplete = function() {};


/**
 * Shifts cursor and returns is's new position.
 *
 * @param {polina.Cursor} cursor object.
 * @param {!Buffer} chunk Data packet.
 */
polina.IPacketHandler.prototype.process = function(cursor, chunk) {};


/**
 * Clears a packet for reconnect.
 */
polina.IPacketHandler.prototype.reset = function() {};


/**
 * Return current handled size.
 * @return {number} handled size.
 */
polina.IPacketHandler.prototype.getHandledSize = function() {};
