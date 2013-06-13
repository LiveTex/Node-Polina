

/**
 * @namespace
 */
var console = {};


/**
 * @deprecated
 * @param {...*} var_msg
 */
console.log = function(var_msg) {};


/**
 * @param {...*} var_msg
 */
console.info = function(var_msg) {};


/**
 * @param {...*} var_msg
 */
console.warn = function(var_msg) {};


/**
 * @param {...*} var_msg
 */
console.error = function(var_msg) {};


console.trace = function() {};


/**
 * @param {string} name
 */
console.time = function(name) {};


/**
 * @param {string} name
 */
console.timeEnd = function(name) {};

/**
 * @namespace
 */
var util = {};


/**
 * @param {function(new:Object, ...)} Class
 * @param {function(new:Object, ...)} Parent
 */
util.inherits = function(Class, Parent) {};




/**
 * @namespace
 */
var events = {};


/**
 * @interface
 */
events.IEventEmitter = function() {};


/**
 * @param {string} type
 * @param {function(...)} listener
 */
events.IEventEmitter.prototype.addListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(...)} listener
 */
events.IEventEmitter.prototype.once = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(...)} listener
 */
events.IEventEmitter.prototype.removeListener = function(type, listener) {};


/**
 * @param {string=} opt_type
 */
events.IEventEmitter.prototype.removeAllListeners = function(opt_type) {};


/**
 * @param {string} type
 * @param {...} var_args
 */
events.IEventEmitter.prototype.emit = function(type, var_args) {};


/**
 * @param {string} type
 * @return {!Array.<function(...)>}
 */
events.IEventEmitter.prototype.listeners = function(type) {};


/**
 * @constructor
 * @implements {events.IEventEmitter}
 */
events.EventEmitter = function() {};


/**
 * @param {string} type
 * @param {function(...)} listener
 */
events.EventEmitter.prototype.addListener = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(...)} listener
 */
events.EventEmitter.prototype.once = function(type, listener) {};


/**
 * @param {string} type
 * @param {function(...)} listener
 */
events.EventEmitter.prototype.removeListener = function(type, listener) {};


/**
 * @param {string=} opt_type
 */
events.EventEmitter.prototype.removeAllListeners = function(opt_type) {};


/**
 * @param {string} type
 * @param {...} var_args
 */
events.EventEmitter.prototype.emit = function(type, var_args) {};


/**
 * @param {string} type
 * @return {!Array.<function(...)>}
 */
events.EventEmitter.prototype.listeners = function(type) {};



/**
 * @interface
 */
var __IAbstractStream = function() {};


__IAbstractStream.prototype.destroy = function() {};



/**
 * @interface
 * @extends {events.IEventEmitter}
 * @extends {__IAbstractStream}
 *
 * @event data
 * @event error
 * @event end - EOF or FIN
 */
var IReadableStream = function() {};


IReadableStream.prototype.pause = function() {};


IReadableStream.prototype.resume = function() {};



/**
 * @interface
 * @extends {events.IEventEmitter}
 * @extends {__IAbstractStream}
 *
 * @event error
 * @event close
 */
var IWritableStream = function() {};


/**
 * @param {!Buffer|string} bufferOrString
 * @param {string=} opt_encoding
 */
IWritableStream.prototype.write = function(bufferOrString, opt_encoding) {};


/**
 * @param {(!Buffer|string)=} opt_bufferOrString
 * @param {string=} opt_encoding
 */
IWritableStream.prototype.end = function(opt_bufferOrString, opt_encoding) {};



/**
 * @interface
 * @extends {IWritableStream}
 * @extends {IReadableStream}
 */
var IStream = function() {};




/**
 * @namespace
 */
var net = {};


/**
 * @return {!net.Server}
 */
net.createServer = function() {};


/**
 * @param {number} port
 * @param {string=} opt_host
 * @return {!net.Socket}
 */
net.createConnection  = function(port, opt_host) {};

/**
 * @constructor
 * @extends {events.EventEmitter}
 */
net.Server = function() {};


/**
 * @param {number|string} portOrPath
 * @param {string=} opt_host
 */
net.Server.prototype.listen = function(portOrPath, opt_host) {};


net.Server.prototype.close = function() {};


/**
 * @constructor
 * @implements {IStream}
 * @extends {events.EventEmitter}
 */
net.Socket = function() {};


/**
 * @type {string}
 */
net.Socket.prototype.remoteAddress = '';

/**
 * @type {number}
 */
net.Socket.prototype.remotePort = 0;

/**
 * @param {number|string} portOrPath
 * @param {string=} opt_host
 */
net.Socket.prototype.connect = function(portOrPath, opt_host) {};


/**
 * @param {!Buffer|string} bufferOrString
 * @param {string=} opt_encoding
 */
net.Socket.prototype.write = function(bufferOrString, opt_encoding) {};


/**
 * В отличие от destroy дожидается отправки всех данных в очереди для записи.
 *
 * @param {(!Buffer|string)=} opt_bufferOrString
 * @param {string=} opt_encoding
 */
net.Socket.prototype.end = function(opt_bufferOrString, opt_encoding) {};


net.Socket.prototype.destroy = function() {};


net.Socket.prototype.pause = function() {};


net.Socket.prototype.resume = function() {};


/**
 * @namespace
 */
var process = {};


/**
 * @param {function()} callback
 */
process.nextTick = function(callback) {};


/**
 * @param {!Array.<number>=} opt_prevTime
 * @return {!Array.<number>}
 */
process.hrtime = function(opt_prevTime) {};


/**
 * @param {number} opt_code Код завершения.
 */
process.exit = function(opt_code) {};


/**
 * @param {string} pid Process ID.
 * @param {string} opt_signal Сигнал завершения.
 */
process.kill = function(pid, opt_signal) {};


/**
 * @type {string}
 */
process.pid = '';


/**
 * @return {!process.MemoryUsageInfo}
 */
process.memoryUsage = function() {};


/**
 * @constructor
 */
process.MemoryUsageInfo = function() {

  /**
   * @type {number}
   */
  this.rss = 0;

  /**
   * @type {number}
   */
  this.heapTotal = 0;

  /**
   * @type {number}
   */
  this.heapUsed = 0;
};


/**
 * @type {!IStream}
 */
process.stdin;


/**
 * @type {!IStream}
 */
process.stdout;


/**
 * @type {!Array.<string>}
 */
process.argv;




/**
 * @param {number|string} sizeOrData
 * @param {string=} opt_encoding
 * @constructor
 */
var Buffer = function(sizeOrData, opt_encoding) {};


/**
 * @param {string} string
 * @return {number}
 */
Buffer.byteLength = function(string) {};


/**
 * @type {number}
 */
Buffer.prototype.length = 0;


/**
 * @param {number=} opt_start
 * @param {number=} opt_end
 * @return {!Buffer}
 */
Buffer.prototype.slice = function(opt_start, opt_end) {};


/**
 *
 * @param {string} string
 * @param {number=} opt_offset
 * @param {number=} opt_length
 * @param {string=} opt_encoding
 */
Buffer.prototype.write = function(string, opt_offset, opt_length, opt_encoding) {};


/**
 * @param {!Buffer} target
 * @param {number=} opt_targetStart
 * @param {number=} opt_sourceStart
 * @param {number=} opt_sourceEnd
 */
Buffer.prototype.copy =
    function(target, opt_targetStart, opt_sourceStart, opt_sourceEnd) {};


/**
 * @param {string=} opt_encoding
 * @return {string}
 */
Buffer.prototype.toString = function(opt_encoding) {};


/**
 * @param {!Array.<!Buffer>} list
 * @param {number=} opt_totalLength
 * @return !Buffer
 */
Buffer.concat = function(list, opt_totalLength) {};
