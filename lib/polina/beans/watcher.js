


/**
 * Event watcher
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {!polina.beans.Tube} tube Observation tube.
 */
polina.beans.Watcher = function(tube) {
  polina.beans.Client.call(this,
      'ignore ' + tube.getName() + '\r\n',
      'watch ' + tube.getName() + '\r\n',
      polina.beans.protocol.PACKET_HANDLER('WATCHING', polina.nop, polina.nop),
      tube.getPort(), tube.getHost());

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
 * @param {!function(string, string)} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.Watcher.prototype.reserve = function(complete, cancel) {
  var jid = polina.beans.Watcher.__EMPTY_JID;
  this._command('reserve', '', 'RESERVED',
      function(header, body) {
        jid = header[1];
        complete(jid, body);
      }, function(error) {
        cancel('(polina) Beans reserve error: ' + error);
      });
  this.__currentJid = jid;
};


/**
 * Deletes task from tube.
 *
 * @param {string} jid Job id.
 * @param {!function()} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.Watcher.prototype.delete = function(jid, complete, cancel) {
  var self = this;
  this._command('delete', jid, 'DELETED',
      function(header, body) {
        self.__resetJobId();
        complete();
      }, function(error) {
        cancel('(polina) Beans delete error: ' + error);
      });
};


/**
 * Releases task. Puts it into ready-tasks tube.
 *
 * @param {string} jid Job id.
 * @param {number} priority Priority of a job.
 * @param {number} timeout Execution timeout.
 * @param {!function()} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.Watcher.prototype.release =
    function(jid, priority, timeout, complete, cancel) {
  var self = this;
  this._command('release', jid + ' ' + priority + ' ' + timeout, 'RELEASED',
      function(header, body) {
        self.__resetJobId();
        complete();
      }, function(error) {
        cancel('(polina) Beans release error: ' + error);
      });
};


/**
 *
 */
polina.beans.Watcher.prototype.__resetJobId = function() {
  this.__currentJid = polina.beans.Watcher.__EMPTY_JID;
  if (!this.__isDestroyed) {
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
