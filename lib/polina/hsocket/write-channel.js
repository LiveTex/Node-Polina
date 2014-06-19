


/**
 * @param {number} port
 * @param {string=} opt_host
 * @extends {polina.Connection}
 * @implements {polina.hsocket.IChannel}
 * @constructor
 */
polina.hsocket.WriteChannel = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);

  /**
   * @type {polina.hsocket.Index}
   */
  this.__index = null;

};

util.inherits(polina.hsocket.WriteChannel, polina.Connection);


/**
 * @param {!Array.<(string|number)>} args
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hsocket.WriteChannel.prototype.__sendCommand =
    function(args, complete, cancel) {
  var command = polina.hsocket.expandCommand(args);
  this._send(polina.hsocket.encodeCommand(command),
      new polina.hsocket.PacketHandler(complete, cancel));
};


/**
 * @inheritDoc
 */
polina.hsocket.WriteChannel.prototype.openIndex =
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
 * @param {polina.hsocket.ModifyOperationType} mod Condition for modification.
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler
 * @param {!Array.<(string|number)>=} opt_limit Limit condition.
 * @param {!Array.<(string|number)>=} opt_filters Filters for result.
 */
polina.hsocket.WriteChannel.prototype.__findModify =
    function(operationType, value, mod, complete, cancel,
             opt_limit, opt_filters) {
  if (this.__index instanceof polina.hsocket.Index) {
    var limit = opt_limit || polina.hsocket.LIMIT();
    var filters = opt_filters || [];
    var command = [this.__index.getId(), operationType, 1, value,
          limit, filters, mod];
    this.__sendCommand(command, complete, cancel);
  } else {
    cancel('(polina.hsocket) Index is not set.');
  }
};


/**
 * @param {polina.hsocket.OperationType} operationType Comparison operation.
 * @param {string} value Index column values to fetch.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 * @param {!Array.<(string|number)>=} opt_limit Limit condition.
 * @param {!Array.<(string|number)>=} opt_filters Filters for result.
 */
polina.hsocket.WriteChannel.prototype.update =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  this.__findModify(operationType, value,
      polina.hsocket.ModifyOperationType.UPDATE, complete, cancel,
      opt_limit, opt_filters);
};


/**
 * @param {polina.hsocket.OperationType} operationType Comparison operation.
 * @param {string} value Values to fetch.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 * @param {!Array.<(string|number)>=} opt_limit Limit condition.
 * @param {!Array.<(string|number)>=} opt_filters Filters for result.
 */
polina.hsocket.WriteChannel.prototype.delete =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  this.__findModify(operationType, value,
      polina.hsocket.ModifyOperationType.DELETE, complete, cancel,
      opt_limit, opt_filters);
};


/**
 * @param {!Array.<string>} values Index column values to set.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hsocket.WriteChannel.prototype.insert =
    function(values, complete, cancel) {
  if (this.__index instanceof polina.hsocket.Index) {
    if (values.length <= this.__index.getColumns().length) {
      var command = [this.__index.getId(), '+', values.length, values];
      this.__sendCommand(command, complete, cancel);
    } else {
      cancel('(polina.hsocket) Wrong number of values for INSERT.');
    }
  } else {
    cancel('(polina.hsocket) Index is not set.');
  }
};
