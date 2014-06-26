


/**
 * User of a tube.
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {!polina.beans.Tube} tube Observation tube.
 */
polina.beans.User = function(tube) {
  polina.beans.Client.call(this, 'quit\r\n', 'use ' + tube.getName() + '\r\n',
      new polina.beans.PacketHandler('USING'), tube.getPort(), tube.getHost());

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
 * @param {function(string)=} opt_callback Result handler.
 */
polina.beans.User.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {
  var callback = opt_callback || polina.nop;
  this._command('put', priority + ' ' + timeout + ' ' + execTime, 'INSERTED',
      function(error, jid) {
        if (!error) {
          callback(jid);
        } else {
          console.error('(polina) Beans put error: ' + error);
        }
      }, data);
};


/**
 * Gets stats information.
 *
 * @param {function(!Object.<string, string>)} complete Result handler.
 */
polina.beans.User.prototype.statsTube = function(complete) {
  this._command('stats-tube', this.__tube, 'OK',
      function(error, jid, data) {
        var result = {};
        var stats = data.split('\n');
        var i = stats.length - 1;

        while (i > 0) {
          var pair = stats[i].split(': ');
          if (pair.length === 2) {
            result[pair[0]] = pair[1];
          }

          i -= 1;
        }

        complete(result);
      });
};


/**
 * Picks data, which is ready for task.
 *
 * @param {function(string, string)} complete Result handler.
 */
polina.beans.User.prototype.peekReady = function(complete) {
  this._command('peek-ready', '', 'FOUND', function(error, jid, data) {
    if (!error) {
      complete(jid, data);
    } else {
      complete('', '');
    }
  });
};


/**
 * Deletes job by id.
 *
 * @param {string} jid Job id.
 * @param {function()} callback Result handler.
 */
polina.beans.User.prototype.delete = function(jid, callback) {
  this._command('delete', jid, 'DELETED', function(error) {
    if (!error) {
      callback();
    } else {
      console.error('(polina) Beans delete error: ' + error);
    }
  });
};
