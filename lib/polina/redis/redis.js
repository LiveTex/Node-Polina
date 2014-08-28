

/**
 * @typedef {?function(*, number=)}
 */
polina.redis.ErrorHandler;


/**
 * Translates arguments into Redis command.
 *
 * @param {!Array.<string>} args Arguments.
 * @return {string} Command payload.
 */
polina.redis.encodeCommand = function(args) {
  var command = '';

  if (args.length > 0) {
    var i = 0,
        l = args.length;

    command = '*' + l + '\r\n';

    while (i < l) {
      command += '$' + Buffer.byteLength(args[i]) + '\r\n' + args[i] + '\r\n';

      i += 1;
    }
  }

  return command;
};
