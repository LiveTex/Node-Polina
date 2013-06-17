


/**
 * Event watcher
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {string} tube Observation tube.
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
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
 * Reserves ready-task, which can be deleted, buried, released with delay or
 * just released.
 *
 * @param {function(string, string)} callback Result handler.
 */
polina.beans.Watcher.prototype.reserve = function(callback) {
  var self = this;

  this._command('reserve', '', 'RESERVED', function(error, jid, data) {
    if (error !== null) {
      console.error('(polina) Beans reserve error: ' + error.message);
    } else {
      self.__currentJid = jid;
      callback(jid, data);
    }
  });
};


/**
 * Deletes task from tube.
 *
 * @param {string} jid Job id.
 * @param {function()} callback Result handler.
 */
polina.beans.Watcher.prototype.delete = function(jid, callback) {
  var self = this;

  this._command('delete', jid, 'DELETED', function(error) {
    if (error !== null) {
      console.error('(polina) Beans delete error: ' + error.message);
    } else {
      self.__resetJobId();
      callback();
    }
  });
};


/**
 * Releases task. Puts it into ready-tasks tube.
 *
 * @param {string} jid Job id.
 * @param {number} priority Priority of a job.
 * @param {number} timeout Execution timeout.
 * @param {function()} callback Result handler.
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
