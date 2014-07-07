


/**
 *
 * @param {string} lua Lua Script.
 * @param {!function(string, !polina.PacketHandler)} exec Function that
 *  execute commands.
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
  this.__args = new ds.queue.Queue();

  /**
   * @type {!ds.queue.Queue}
   */
  this.__handlers = new ds.queue.Queue();

  /**
   * @type {!function(string, !polina.PacketHandler)}
   */
  this.__invoke = exec;

  this.__load(lua);

};


/**
 * Invokes commands waiting for execution.
 */
polina.redis.Script.prototype.__flush = function() {
  if (this.__sha) {
    while (this.__args.length && this.__handlers.length) {
      var args = this.__args.shift();
      var handler = this.__handlers.shift();
      if (handler instanceof polina.PacketHandler) {
        this.__invoke(polina.redis.resp.encodeCommand([
          'EVALSHA', this.__sha
        ].concat(args)), handler);
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
  this.__invoke(polina.redis.resp.encodeCommand(['SCRIPT', 'LOAD', lua]),
      polina.redis.resp.PACKET_HANDLER(function(sha) {
        self.__sha = sha;
        self.__flush();
      }, console.error));
};


/**
 * Pushes script invokation into the queue.
 *
 * @param {!Array.<string>} args Script's arguments.
 * @param {Function} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 */
polina.redis.Script.prototype.evalsha = function(args, complete, cancel) {
  this.__args.push([args.length.toString()].concat(args));
  this.__handlers.push(polina.redis.resp.PACKET_HANDLER(complete, cancel));
  this.__flush();
};
