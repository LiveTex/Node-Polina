


/**
 * @param {number} readPort
 * @param {number} writePort
 * @param {string=} opt_host
 * @implements {polina.hsocket.IChannel}
 * @constructor
 */
polina.hsocket.Client = function(readPort, writePort, opt_host) {

  /**
   * @type {!polina.hsocket.WriteChannel}
   */
  this.__writeChannel = new polina.hsocket.WriteChannel(writePort, opt_host);

  /**
   * @type {!polina.hsocket.ReadChannel}
   */
  this.__readChannel = new polina.hsocket.ReadChannel(readPort, opt_host);

};


/**
 * @inheritDoc
 */
polina.hsocket.Client.prototype.openIndex = function(index, complete, cancel) {
  var self = this;
  this.__writeChannel.openIndex(index, function() {
    self.__readChannel.openIndex(index, complete, cancel);
  }, cancel);
};


/**
 * @param {polina.hsocket.OperationType} operationType Comparison operation.
 * @param {string} value Values to fetch.
 * @param {!Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler
 * @param {!Array.<(string|number)>=} opt_limit Limit condition.
 * @param {!Array.<(string|number)>=} opt_filters Filters for result.
 */
polina.hsocket.Client.prototype.find =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  this.__readChannel.find(operationType, value, complete, cancel,
      opt_limit, opt_filters);
};


/**
 * @param {polina.hsocket.OperationType} operationType Comparison operation.
 * @param {string} value Index column values to fetch.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 * @param {!Array.<(string|number)>=} opt_limit Limit condition.
 * @param {!Array.<(string|number)>=} opt_filters Filters for result.
 */
polina.hsocket.Client.prototype.update =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  this.__writeChannel.update(operationType, value, complete, cancel,
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
polina.hsocket.Client.prototype.delete =
    function(operationType, value, complete, cancel, opt_limit, opt_filters) {
  this.__writeChannel.delete(operationType, value, complete, cancel,
      opt_limit, opt_filters);
};


/**
 * @param {!Array.<string>} values Index column values to set.
 * @param {!Function} complete Result handler
 * @param {function(string, number=)} cancel Error handler
 */
polina.hsocket.Client.prototype.insert = function(values, complete, cancel) {
  this.__writeChannel.insert(values, complete, cancel);
};
