


/**
 * @constructor
 * @extends {polina.beans.Client}
 * @param {number} tube Труба наблюдения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Watcher = function(tube, port, opt_host) {
  polina.beans.Client.call(this, 'watch ' + tube + '\r\n',
      new polina.beans.PacketHandler('WATCHING'), port, opt_host);
};

util.inherits(polina.beans.Watcher, polina.beans.Client);


/**
 * @param {function(Error, string=, string=)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.reserve = function(callback) {
  this._command('reserve', '', 'RESERVED', callback);
};


/**
 * @param {string} jobId Идентификатор задачи.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.delete = function(jobId, callback) {
  this._command('delete', jobId, 'DELETED', callback);
};


/**
 * @param {string} jobId Идентификатор задачи.
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.release =
    function(jobId, priority, timeout, callback) {
  this._command('release', jobId + ' ' + priority + ' ' + timeout,
      'RELEASED', callback);
};

