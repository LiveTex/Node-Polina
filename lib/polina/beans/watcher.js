


/**
 * Event watcher
 *
 * @constructor
 * @extends {polina.beans.Client}
 * @param {!polina.beans.Tube} tube Observation tube.
 */
polina.beans.Watcher = function(tube) {
  polina.beans.Client.call(this,
      polina.beans.protocol.encodeCommand(['ignore', tube.getName()]),
      polina.beans.protocol.encodeCommand(['watch', tube.getName()]),
      polina.beans.protocol.PACKET_HANDLER(
          polina.beans.protocol.Status.WATCHING, polina.nop, polina.nop),
      tube.getPort(), tube.getHost());

  /**
   * @type {string}
   */
  this.__currentJid = polina.beans.EMPTY_ID;

  /**
   * @type {boolean}
   */
  this.__isDestroyed = false;
};

util.inherits(polina.beans.Watcher, polina.beans.Client);


/**
 * Reserves ready-task, which can be deleted, buried, released with delay or
 * just released.
 *
 * @param {!function(string, string)} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.Watcher.prototype.reserve = function(complete, cancel) {
  var jobId = polina.beans.EMPTY_ID;
  this._command(['reserve'], polina.beans.protocol.Status.RESERVED,
      function(jid, body) {
        jobId = jid;
        complete(jid, body);
      }, function(error) {
        cancel('(polina) Beans reserve error: ' + error);
      });
  this.__currentJid = jobId;
};


/**
 * Deletes task from tube.
 *
 * @param {string} jid Job id.
 * @param {!function(string, string)} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.Watcher.prototype.delete = function(jid, complete, cancel) {
  var self = this;
  this._command(['delete', jid], polina.beans.protocol.Status.DELETED,
      function(jid, body) {
        self.__resetJobId();
        complete(jid, body);
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
 * @param {!function(string, string)} complete Result handler.
 * @param {!function(string, number=)} cancel Error handler.
 */
polina.beans.Watcher.prototype.release =
    function(jid, priority, timeout, complete, cancel) {
  var self = this;
  this._command(['release', jid, priority.toString(), timeout.toString()],
      polina.beans.protocol.Status.RELEASED,
      function(jid, body) {
        self.__resetJobId();
        complete(jid, body);
      }, function(error) {
        cancel('(polina) Beans release error: ' + error);
      });
};


/**
 *
 */
polina.beans.Watcher.prototype.__resetJobId = function() {
  this.__currentJid = polina.beans.EMPTY_ID;
  if (!this.__isDestroyed) {
    this.destroy();
  }
};


/**
 * @inheritDoc
 */
polina.beans.Watcher.prototype.destroy = function() {
  this.__isDestroyed = true;
  if (this.__currentJid === polina.beans.EMPTY_ID) {
    polina.beans.Client.prototype.destroy.call(this);
  }
};
