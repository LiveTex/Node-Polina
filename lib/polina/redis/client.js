


/**
 * Redis client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @implements {polina.redis.IClient}
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.redis.Client = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);

};

util.inherits(polina.redis.Client, polina.Connection);


/**
 * @inheritDoc
 */
polina.redis.Client.prototype._getDestroyPayload = function() {
  return polina.redis.encodeCommand(['QUIT']);
};


/**
 * @param {!Array.<string>} args Arguments.
 * @param {Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Client.prototype.__command = function(args, complete, cancel) {
  this._send(polina.redis.encodeCommand(args),
      polina.redis.resp.PACKET_HANDLER(complete, cancel));
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.set = function(key, value, complete, cancel) {
  this.__command(['SET', key, value], complete, cancel);
};


/**
 * @inheritDoc
 */
polina.redis.Client.prototype.get = function(key, complete, cancel) {
  this.__command(['GET', key], complete, cancel);
};
