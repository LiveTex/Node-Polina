


/**
 * User of a tube.
 *
 * @param {!polina.beans.Tube} tube Observation tube.
 *
 * @constructor
 * @extends {polina.beans.Client}
 */
polina.beans.User = function(tube) {
  polina.beans.Client.call(this, 'quit\r\n', 'use ' + tube.getName() + '\r\n',
      polina.beans.protocol.PACKET_HANDLER('USING', polina.nop, polina.nop),
      tube.getPort(), tube.getHost());

  /**
   * @type {string}
   */
  this.__tube = tube.getName();
};

util.inherits(polina.beans.User, polina.beans.Client);


/**
 * Puts data to execution tube.
 *
 * @param {number} priority Priority of data execution..
 * @param {number} timeout Time to delay execution.
 * @param {number} execTime Time to execute.
 * @param {string} data Data to put into a tube.
 * @param {!function(string)=} opt_complete Result handler.
 * @param {!function(string, number=)=} opt_cancel Error handler.
 */
polina.beans.User.prototype.put =
    function(priority, timeout, execTime, data, opt_complete, opt_cancel) {
      var complete = opt_complete || polina.nop;
      var cancel = opt_cancel || polina.nop;
      this._command('put', priority + ' ' + timeout + ' ' + execTime, 'INSERTED',
          function(header, body) {
            var jid = header[1];
            complete(jid);
          }, function(error) {
            cancel('(polina) Beans put error: ' + error);
          }, data);
    };


/**
 * Gets stats information.
 *
 * @param {function(!Object.<string, string>)} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.User.prototype.statsTube = function(complete, cancel) {
  this._command('stats-tube', this.__tube, 'OK',
      function(header, body) {
        var result = {};
        var stats = body.split('\n');
        var i = stats.length - 1;

        while (i > 0) {
          var pair = stats[i].split(': ');
          if (pair.length === 2) {
            result[pair[0]] = pair[1];
          }

          i -= 1;
        }
        complete(result);
      }, function(error) {
        cancel('(polina) Beans stats-tube error: ' + error);
      });
};


/**
 * Picks data, which is ready for task.
 *
 * @param {!function(string, string)} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.User.prototype.peekReady = function(complete, cancel) {
  this._command('peek-ready', '', 'FOUND',
      function(header, body) {
        var jid = header[1];
        complete(jid, body);
      }, function(error) {
        cancel('(polina) Beans peek-ready error: ' + error);
      });
};


/**
 * Deletes job by id.
 *
 * @param {string} jid Job id.
 * @param {function()} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.User.prototype.delete = function(jid, complete, cancel) {
  this._command('delete', jid, 'DELETED', complete,
      function(error) {
        cancel('(polina) Beans delete error: ' + error);
      });
};