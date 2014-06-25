


/**
 * @interface
 */
polina.IPacketHandler = function() {};


/**
 * Returns true if a packet was handled.
 *
 * @param {!polina.Cursor} cursor object.
 * @param {!Buffer} chunk Data packet.
 * @return {boolean} Flag of packet handling.
 */
polina.IPacketHandler.prototype.process = function(cursor, chunk) {};


/**
 * Clears a packet for reconnect.
 */
polina.IPacketHandler.prototype.reset = function() {};
