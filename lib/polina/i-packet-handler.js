


/**
 * @interface
 */
polina.IPacketHandler = function() {};


/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {boolean}
 */
polina.IPacketHandler.prototype.process = function(cursor, chunk) {};

