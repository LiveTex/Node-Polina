


/**
 * @constructor
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Client = function(port, opt_host) {

  /**
   * @type {!polina.Connection}
   */
  this.__connection = new polina.Connection(
      polina.beans.Client.__handleError,
      polina.beans.Client.RECONNECT_TIMEOUT, port, opt_host);


};


/**
 * @type {number}
 */
polina.beans.Client.RECONNECT_TIMEOUT = 1000;


/**
 * @param {!Error} error Ошибка.
 */
polina.beans.Client.__handleError = function(error) {
  console.info('Polina has beanstalk error: ' + error.message);
};


/**
 * @param {string} tube Труба.
 * @param {function(Error)=} opt_callback Обработчик результата.
 */
polina.beans.Client.prototype.use = function(tube, opt_callback) {
  this.__command('use', tube, 'USING', opt_callback || null);
};


/**
 *
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {number} execTime Время на обработку.
 * @param {string} data Данные.
 * @param {?function(Error, string=)=} opt_callback Обработчик результата.
 */
polina.beans.Client.prototype.put =
    function(priority, timeout, execTime, data, opt_callback) {
  this.__command('put', priority + ' ' + timeout + ' ' + execTime, 'INSERTED',
      opt_callback || null, data);
};


/**
 * @param {string} tube Труба.
 * @param {Function=} opt_callback Обработчик результата.
 */
polina.beans.Client.prototype.watch = function(tube, opt_callback) {
  this.__command('watch', tube, 'WATCHING', opt_callback || null);
};


/**
 * @param {function(Error, string=, string=)} callback Обработчик результата.
 */
polina.beans.Client.prototype.reserve = function(callback) {
  this.__command('reserve', '', 'RESERVED', callback);
};


/**
 * @param {string} jobId Идентификатор задачи.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Client.prototype.delete = function(jobId, callback) {
  this.__command('delete', jobId, 'DELETED', callback);
};


/**
 * @param {string} jobId Идентификатор задачи.
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {function(Error)} callback Обработчик результата.
 */
polina.beans.Client.prototype.release =
    function(jobId, priority, timeout, callback) {
  this.__command('release', jobId + ' ' + priority + ' ' + timeout,
      'RELEASED', callback);
};


/**
 * @param {string} name Имя команды.
 * @param {string} args Аргументы комады.
 * @param {string} response Ожидаемый результат.
 * @param {Function} callback Обработчик результата.
 * @param {string=} opt_data Данные.
 */
polina.beans.Client.prototype.__command =
    function(name, args, response, callback, opt_data) {

  var payload = name;

  if (args.length > 0) {
    payload += ' ' + args;
  }

  if (opt_data !== undefined) {
    payload += ' ' + Buffer.byteLength(opt_data) + '\r\n' + opt_data;
  }

  this.__connection.send(payload + '\r\n',
      new polina.beans.PacketHandler(response, callback));
};
