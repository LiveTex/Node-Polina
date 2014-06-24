


/**
 * @param {number} port
 * @param {string=} opt_host
 * @extends {polina.Connection}
 * @implements {polina.hs.IChannel}
 * @constructor
 */
polina.hs.ReadChannel = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);

  /**
   * @type {polina.hs.Index}
   */
  this.__index = null;

};

util.inherits(polina.hs.ReadChannel, polina.Connection);


/**
 * @param {!Array.<(string)>} args
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hs.ReadChannel.prototype.__sendCommand =
    function(args, complete, cancel) {
  this._send(args.join('\t') + '\n',
      new polina.hs.PacketHandler(complete, cancel));
};


/**
 * @inheritDoc
 */
polina.hs.ReadChannel.prototype.openIndex =
    function(index, complete, cancel) {
  this.__index = index;
  var command = ['P', index.getId().toString(), index.getDBName(),
        index.getTableName(), index.getName(), index.getColumns().join(',')];
  var fcolumns = index.getFilterColumns();
  if (fcolumns.length) {
    command.push((fcolumns.join(',')));
  }
  this.__sendCommand(command, complete, cancel);
};


/**
 * @param {polina.hs.OperationType} operationType Comparison operation.
 * @param {string} value Values to fetch.
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler
 * @param {!polina.hs.LIMIT=} opt_limit Limit condition.
 * @param {!Array.<!polina.hs.FILTER>=} opt_filters Filters for result.
 */
polina.hs.ReadChannel.prototype.find =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  if (this.__index instanceof polina.hs.Index) {
    var limit = opt_limit || polina.hs.LIMIT();
    var filters = (opt_filters instanceof Array) ? opt_filters.join('\t') :
        (opt_filters || '');
    var command = [this.__index.getId().toString(), operationType, '1', value,
          limit, filters];
    this.__sendCommand(command, complete, cancel);
  } else {
    cancel('(polina.hs) Index is not set.');
  }
};
