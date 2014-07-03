


/**
 *
 * @param {string} lua Lua Script.
 * @param {Function} exec Function that execute commands.
 *
 * @constructor
 */
polina.redis.Script = function(lua, exec) {

  /**
   * @type {string}
   */
  this.__sha = '';

  /**
   * @type {!ds.queue.Queue}
   */
  this.__commands = new ds.queue.Queue();

  /**
   * @type {!ds.queue.Queue}
   */
  this.__handlers = new ds.queue.Queue();

  /**
   * @type {Function}
   */
  this.__invoke = exec;

  this.__load(lua);

};


/**
 * Invokes commands waiting for execution.
 */
polina.redis.Script.prototype.__flush = function() {
  if (this.__sha) {
    while (1) {
      var command = this.__commands.shift();
      var handler = this.__handlers.shift();

      if (!(command && handler)) {
        break;
      } else {
        this.__invoke(command, handler);
      }
    }
  }
};


/**
 * Loads script and saves its sha.
 *
 * @param {string} lua Lua Script.
 */
polina.redis.Script.prototype.__load = function(lua) {
  var self = this;
  this.__invoke(['SCRIPT', 'LOAD', lua], function(sha) {
    self.__sha = sha;
    self.__flush();
  }, console.error);
};


/**
 * Pushes script invokation into the queue.
 *
 * @param {!Array.<string>} args Script's arguments.
 * @param {Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Script.prototype.evalsha = function(args, complete, cancel) {
  this.__commands.push(polina.redis.resp.encodeCommand([
    'EVALSHA', this.__sha, args.length.toString()
  ].concat(args)));
  this.__handlers.push(polina.redis.resp.PACKET_HANDLER(complete, cancel));
  this.__flush();
};
