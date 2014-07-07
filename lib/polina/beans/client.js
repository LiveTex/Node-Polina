


/**
 * Beanstalkd client.
 *
 * @param {string} destroyPayload Initializes packet.
 * @param {string} handshakePayload Initializes packet.
 * @param {!polina.PacketHandler} handshakeHandler A handler for a
 *   handshake.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 *
 * @constructor
 * @extends {polina.Connection}
 */
polina.beans.Client = function(destroyPayload, handshakePayload,
                               handshakeHandler, port, opt_host) {
  polina.Connection.call(this, port, opt_host);

  /**
   * @type {string}
   */
  this.__destoryPayload = destroyPayload;

  /**
   * @type {string}
   */
  this.__handshakePayload = handshakePayload;

  /**
   * @type {!polina.PacketHandler}
   */
  this.__handshakeHandler = handshakeHandler;

};

util.inherits(polina.beans.Client, polina.Connection);


/**
 * @return {string} Initializes request.
 */
polina.beans.Client.prototype._getHandshakePayload = function() {
  return this.__handshakePayload;
};


/**
 * @return {polina.PacketHandler} Initializes packet.
 */
polina.beans.Client.prototype._getHandshakeHandler = function() {
  return this.__handshakeHandler;
};


/**
 * @inheritDoc
 */
polina.beans.Client.prototype._getDestroyPayload = function() {
  return this.__destoryPayload;
};


/**
 * @param {!Array.<string>} args Command arguments.
 * @param {polina.beans.protocol.Status} response Expected response status.
 * @param {!function(string, string)} complete
 * @param {!function(string, number=)} cancel Error handler.
 * @param {string=} opt_data Data.
 */
polina.beans.Client.prototype._command =
    function(args, response, complete, cancel, opt_data) {
  this._send(polina.beans.protocol.encodeCommand(args, opt_data),
      polina.beans.protocol.PACKET_HANDLER(response, complete, cancel));
};
