


/**
 * @constructor
 * @extends {polina.beans.Client}
 * @param {string} tube Труба наблюдения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.User = function(tube, port, opt_host) {
  polina.beans.Client.call(this, 'use ' + tube + '\r\n',
      new polina.beans.PacketHandler('USING'), port, opt_host);
};

util.inherits(polina.beans.User, polina.beans.Client);


/**
 *
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {?function(Error, string=)=} opt_callback Обработчик результата.
 */
polina.beans.User.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {
  this._command('put', priority + ' ' + timeout + ' ' + execTime, 'INSERTED',
      opt_callback || null, data);
};


/**
 * @param {function(string, string)} complete Обработчик результата.
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
 * @param {string} jid Job id.
 * @param {function()} callback Обработчик результата.
 */
polina.beans.User.prototype.delete = function(jid, callback) {
  this._command('delete', jid, 'DELETED', function(error) {
    if (error !== null) {
      console.error('(polina) Beans delete error: ' + error.message);
    }
    callback();
  });
};
