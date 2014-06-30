


/**
 * Beanstalkd client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @param {string} destroyPayload Initializes packet.
 * @param {string} handshakePayload Initializes packet.
 * @param {!polina.PacketHandler} handshakeHandler A handler for a
 *   handshake.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
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
 * @param {string} name Command name.
 * @param {string} args Command arguments.
 * @param {string} response Expected result.
 * @param {!function(!Array.<string>, string)} complete
 * @param {!function(string, number=)} cancel Error handler.
 * @param {string=} opt_data Data.
 */
polina.beans.Client.prototype._command =
    function(name, args, response, complete, cancel, opt_data) {

  var payload = name;

  if (args.length > 0) {
    payload += ' ' + args;
  }

  if (opt_data !== undefined) {
    payload += ' ' + Buffer.byteLength(opt_data) + '\r\n' + opt_data + '\r\n';
  }

  this._send(payload,
      polina.beans.protocol.PACKET_HANDLER(response, complete, cancel));
};
