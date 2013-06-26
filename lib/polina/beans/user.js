


/**
 * User of a tube.
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {string} tube Observation tube.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.beans.User = function(tube, port, opt_host) {
  polina.beans.Client.call(this, 'use ' + tube + '\r\n',
      new polina.beans.PacketHandler('USING'), port, opt_host);
};

util.inherits(polina.beans.User, polina.beans.Client);


/**
 * Puts data to execution tube.
 *
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {?function(string)=} opt_callback Обработчик результата.
 */
polina.beans.User.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {
  this._command('put', priority + ' ' + timeout + ' ' + execTime, 'INSERTED',
      function(error, jid) {
        if (error !== null) {
          console.error('(polina) Beans put error: ' + error.message);
        } else if (opt_callback !== undefined) {
          opt_callback(jid);
        }
      }, data);
};


/**
 * Picks data, which is ready for task.
 *
 * @param {function(string, string)} complete Result handler.
 */
polina.beans.User.prototype.peekReady = function(complete) {
  this._command('peek-ready', '', 'FOUND', function(error, jid, data) {
    if (error !== null) {
      complete('', '');
    } else {
      complete(jid, data);
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
    if (error !== null) {
      console.error('(polina) Beans delete error: ' + error.message);
    }
    callback();
  });
};
