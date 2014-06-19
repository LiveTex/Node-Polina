


/**
 * @param {number} port
 * @param {string=} opt_host
 * @extends {polina.Connection}
 * @implements {polina.hsocket.IChannel}
 * @constructor
 */
polina.hsocket.ReadChannel = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);

  /**
   * @type {polina.hsocket.Index}
   */
  this.__index = null;

};

util.inherits(polina.hsocket.ReadChannel, polina.Connection);


/**
 * @param {!Array.<(string|number)>} args
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hsocket.ReadChannel.prototype.__sendCommand =
    function(args, complete, cancel) {
  var command = polina.hsocket.expandCommand(args);
  this._send(polina.hsocket.encodeCommand(command),
      new polina.hsocket.PacketHandler(complete, cancel));
};


/**
 * @inheritDoc
 */
polina.hsocket.ReadChannel.prototype.openIndex =
    function(index, complete, cancel) {
  this.__index = index;
  var command = ['P', index.getId(), index.getDBName(), index.getTableName(),
        index.getName(), index.getColumns().join(',')];
  var fcolumns = index.getFilterColumns();
  if (fcolumns.length) {
    command.push((fcolumns.join(',')));
  }
  this.__sendCommand(command, complete, cancel);
};


/**
 * @param {polina.hsocket.OperationType} operationType Comparison operation.
 * @param {string} value Values to fetch.
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler
 * @param {!Array.<(string|number)>=} opt_limit Limit condition.
 * @param {!Array.<(string|number)>=} opt_filters Filters for result.
 */
polina.hsocket.ReadChannel.prototype.find =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  if (this.__index instanceof polina.hsocket.Index) {
    var limit = opt_limit || polina.hsocket.LIMIT();
    var filters = opt_filters || [];
    var command = [this.__index.getId(), operationType, 1, value,
          limit, filters];
    this.__sendCommand(command, complete, cancel);
  } else {
    cancel('(polina.hsocket) Index is not set.');
  }
};
