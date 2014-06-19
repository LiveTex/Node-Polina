

/**
 * @namespace
 */
polina.hsocket.constraints = {};


/**
 *
 */
polina.hsocket.nop = function() {};


/**
 * @param {!Buffer} request
 * @param {number=} opt_groupLength
 * @param {number=} opt_separator
 * @return {!Array.<string>}
 */
polina.hsocket.decodeResponse =
    function(request, opt_groupLength, opt_separator) {

  var result = [];
  var separator = opt_separator || 0x09;
  var item = new Buffer(0);
  var i = 0;
  var l = opt_groupLength || result.length;

  while (i <= request.length) {

    if ((i === request.length) || (request[i] === separator)) {
      result.push(item.toString());
      item = new Buffer(0);
    } else {
      item = Buffer.concat([item, new Buffer([request[i]])]);
    }

    i += 1;
  }

  /**
   * @return {!Array.<(string|!Array.<string>)>}
   */
  function group() {
    var groups = [];

    if (l === result.length) {
      return result;
    } else {
      var j = 0;
      var group = [];

      while (j < result.length) {

        if ((j !== 0) && (j % l === 0)) {
          groups.push(group);
          group = [];
        }
        group.push(result[j]);
        j += 1;
      }

      if (group.length) {
        groups.push(group);
      }

    }
    return groups;
  }

  return group();
};


/**
 * @param {*} tokens
 * @return {!Array.<(number|string)>}
 */
polina.hsocket.expandCommand = function(tokens) {
  var result = [];
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token instanceof Array) {
      var expandedToken = polina.hsocket.expandCommand(token);
      for (var j = 0; j < expandedToken.length; j++) {
        result.push(expandedToken[j]);
      }
    } else {
      result.push(token);
    }
  }
  return result;
};


/**
 * @param {!Array.<(string|number)>} command
 * @return {!Buffer}
 */
polina.hsocket.encodeCommand = function(command) {
  var result = new Buffer(0);

  for (var i = 0; i < command.length; i++) {
    result = Buffer.concat([result, polina.hsocket.__encodeToken(command[i])]);
    if (i < command.length - 1) {
      result = Buffer.concat([result, new Buffer([0x09])]);
    }
  }

  return Buffer.concat([result, new Buffer([0x0a])]);
};


/**
 * @param {(string|number)} token
 * @return {Buffer}
 */
polina.hsocket.__encodeToken = function(token) {

  if (token === 'NULL') {
    return new Buffer([0x00]);
  }

  if (token === '') {
    return new Buffer([0x09, 0x09]);
  }

  var result = new Buffer(0);
  var tokenString = token.toString();
  for (var j = 0; j < tokenString.length; j++) {
    result = Buffer.concat([result,
      polina.hsocket.__encodeSign(tokenString[j])]);
  }

  return result;
};


/**
 * @param {(string|number)} sign
 * @return {Buffer}
 */
polina.hsocket.__encodeSign = function(sign) {

  var code = sign.charCodeAt(0);

  if (0 <= code && code < 16) {
    return new Buffer([0x01 | code + 0x40]);
  }

  return new Buffer([code]);
};



/**
 * @param {polina.hsocket.FilterType} filterType
 * @param {polina.hsocket.OperationType} operationType
 * @param {number} position
 * @param {string} value
 * @return {!Array.<(string|number)>}
 * @constructor
 */
polina.hsocket.FILTER = function(filterType, operationType, position, value) {
  return [filterType, operationType, position, value];
};



/**
 * @param {number=} opt_limit
 * @param {number=} opt_offset
 * @return {!Array.<number>}
 * @constructor
 */
polina.hsocket.LIMIT = function(opt_limit, opt_offset) {
  var limit = opt_limit || 1;
  var offset = opt_offset || 0;
  return [limit, offset];
};
