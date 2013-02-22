


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

