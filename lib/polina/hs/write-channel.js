


/**
 * @param {number} port
 * @param {string=} opt_host
 * @extends {polina.Connection}
 * @implements {polina.hs.IChannel}
 * @constructor
 */
polina.hs.WriteChannel = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);

  /**
   * @type {polina.hs.Index}
   */
  this.__index = null;

};

util.inherits(polina.hs.WriteChannel, polina.Connection);


/**
 * @param {!Array.<string>} args
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hs.WriteChannel.prototype.__sendCommand =
    function(args, complete, cancel) {
  this._send(args.join('\t') + '\n',
      new polina.hs.PacketHandler(complete, cancel));
};


/**
 * @inheritDoc
 */
polina.hs.WriteChannel.prototype.openIndex = function(index, complete, cancel) {
  this.__index = index;
  var command = ['P', index.getId().toString(), index.getDBName(),
        index.getTableName(), index.getName(), index.getColumns().join(',')];
  var fcolumns = index.getFilterColumns();
  if (fcolumns.length) {
    command.push(fcolumns.join(','));
  }
  this.__sendCommand(command, complete, cancel);
};


/**
 * @param {polina.hs.OperationType} operationType Comparison operation.
 * @param {string} value Values to fetch.
 * @param {polina.hs.ModifyOperationType} mod Condition for modification.
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler
 * @param {!polina.hs.LIMIT=} opt_limit Limit condition.
 * @param {!Array.<!polina.hs.FILTER>=} opt_filters Filters for result.
 */
polina.hs.WriteChannel.prototype.__findModify =
    function(operationType, value, mod, complete, cancel,
             opt_limit, opt_filters) {
  if (this.__index instanceof polina.hs.Index) {
    var limit = opt_limit || polina.hs.LIMIT();
    var filters = (opt_filters instanceof Array) ? opt_filters.join('\t') :
        (opt_filters || '');
    var command = [this.__index.getId().toString(), operationType, '1', value,
          limit, filters, mod];
    this.__sendCommand(command, complete, cancel);
  } else {
    cancel('(polina.hs) Index is not set.');
  }
};


/**
 * @param {polina.hs.OperationType} operationType Comparison operation.
 * @param {string} value Index column values to fetch.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 * @param {!polina.hs.LIMIT=} opt_limit Limit condition.
 * @param {!Array.<!polina.hs.FILTER>=} opt_filters Filters for result.
 */
polina.hs.WriteChannel.prototype.update =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  this.__findModify(operationType, value, polina.hs.ModifyOperationType.UPDATE,
      complete, cancel, opt_limit, opt_filters);
};


/**
 * @param {polina.hs.OperationType} operationType Comparison operation.
 * @param {string} value Values to fetch.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 * @param {!polina.hs.LIMIT=} opt_limit Limit condition.
 * @param {!Array.<!polina.hs.FILTER>=} opt_filters Filters for result.
 */
polina.hs.WriteChannel.prototype.delete =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  this.__findModify(operationType, value, polina.hs.ModifyOperationType.DELETE,
      complete, cancel, opt_limit, opt_filters);
};


/**
 * @param {!Array.<string>} values Index column values to set.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hs.WriteChannel.prototype.insert =
    function(values, complete, cancel) {
  if (this.__index instanceof polina.hs.Index) {
    if (values.length <= this.__index.getColumns().length) {
      var command = [this.__index.getId().toString(), '+',
            values.length.toString(), values];
      this.__sendCommand(command, complete, cancel);
    } else {
      cancel('(polina.hs) Wrong number of values for INSERT.');
    }
  } else {
    cancel('(polina.hs) Index is not set.');
  }
};
