


/**
 * @interface
 */
polina.IPacketHandler = function() {};


/**
 * Returns true if a packet was handled.
 *
 * @return {boolean} Flag of packet handling.
 */
polina.IPacketHandler.prototype.isComplete = function() {};


/**
 * Shifts cursor and returns its new position.
 *
 * @param {number} cursor Data cursor.
 * @param {!Buffer} chunk Data packet.
 * @return {number} New cursor position.
 */
polina.IPacketHandler.prototype.process = function(cursor, chunk) {};


/**
 * Clears a packet for reconnect.
 */
polina.IPacketHandler.prototype.reset = function() {};
