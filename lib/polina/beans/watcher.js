


/**
 * @constructor
 * @extends {polina.beans.Client}
 * @param {string} tube Труба наблюдения.
 * @param {number} port Порт подключения.
 * @param {string=} opt_host Хост для подключения.
 */
polina.beans.Watcher = function(tube, port, opt_host) {
  polina.beans.Client.call(this, 'watch ' + tube + '\r\n',
      new polina.beans.PacketHandler('WATCHING'), port, opt_host);

  /**
   * @type {string}
   */
  this.__currentJid = polina.beans.Watcher.__EMPTY_JID;

  /**
   * @type {boolean}
   */
  this.__isDestroyed = false;
};

util.inherits(polina.beans.Watcher, polina.beans.Client);


/**
 * @type {string}
 */
polina.beans.Watcher.__EMPTY_JID = '';


/**
 * @param {function(string, string)} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.reserve = function(callback) {
  var self = this;

  this._command('reserve', '', 'RESERVED', function(error, jid, data) {
    if (error !== null) {
      console.log('Beans reserve error: ' + error.message);
    } else {
      self.__currentJid = jid;
      callback(jid, data);
    }
  });
};


/**
 * @param {string} jid Идентификатор задачи.
 * @param {function()} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.delete = function(jid, callback) {
  var self = this;

  this._command('delete', jid, 'DELETED', function(error) {
    if (error !== null) {
      console.log('Beans delete error: ' + error.message);
    } else {
      self.__resetJobId();
      callback();
    }
  });
};


/**
 * @param {string} jid Идентификатор задачи.
 * @param {number} priority Приоритет.
 * @param {number} timeout Таймаут.
 * @param {function()} callback Обработчик результата.
 */
polina.beans.Watcher.prototype.release =
    function(jid, priority, timeout, callback) {
  var self = this;
  var args = jid + ' ' + priority + ' ' + timeout;

  this._command('release', args, 'RELEASED', function(error) {
    if (error === null) {
      self.__resetJobId();
      callback();
    } else {
      self.destroy();
    }
  });
};


/**
 *
 */
polina.beans.Watcher.prototype.__resetJobId = function() {
  this.__currentJid = polina.beans.Watcher.__EMPTY_JID;

  if (this.__isDestroyed) {
    this.destroy();
  }
};


/**
 * @inheritDoc
 */
polina.beans.Watcher.prototype.destroy = function() {
  this.__isDestroyed = true;

  if (this.__currentJid === polina.beans.Watcher.__EMPTY_JID) {
    polina.beans.Client.prototype.destroy.call(this);
  }
};
