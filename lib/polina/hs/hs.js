

/**
 * @namespace
 */
polina.hs.constraints = {};


/**
 *
 */
polina.hs.nop = function() {};


/**
 * @param {!Buffer} response
 * @param {number=} opt_separator
 * @return {!Array.<string>}
 */
polina.hs.decodeResponse =
    function(response, opt_separator) {

  var result = [];
  var data = response.toString();
  var separator = opt_separator || 0x09;
  var i = 0;
  var start = 0;

  while (i < data.length) {
    if (data.charCodeAt(i) === separator) {
      result.push(data.slice(start, i));
      start = i + 1;
    }

    i += 1;
  }

  return result;
};


/**
 * @param {!Array.<string>} response
 * @param {number} groupLength
 * @return {!Array.<(string|!Array.<string>)>}
 */
polina.hs.groupResponse = function(response, groupLength) {

  var groups = [];

  if (groupLength === response.length) {
    return response;
  } else {
    var j = 0;
    var group = [];

    while (j < response.length) {

      if ((j !== 0) && (j % groupLength === 0)) {
        groups.push(group);
        group = [];
      }
      group.push(response[j]);
      j += 1;
    }

    if (group.length) {
      groups.push(group);
    }

  }
  return groups;
};


/**
 * @param {!Array.<*>} tokens
 * @return {!Array.<(string)>}
 */
polina.hs.prepareCommand = function(tokens) {
  var result = [];
  var i = 0;

  while (i < tokens.length) {
    var token = tokens[i];

    if (token instanceof Array) {
      var expandedToken = polina.hs.prepareCommand(token);
      var j = 0;

      while (j < expandedToken.length) {
        result.push(expandedToken[j].toString());
        j += 1;
      }
    } else {
      result.push(token.toString());
    }

    i += 1;
  }

  return result;
};


/**
 * @param {!Array.<string>} command
 * @return {string}
 */
polina.hs.encodeCommand = function(command) {
  var result = '';
  var i = 0;

  while (i < command.length - 1) {
    result += command[i] + '\t';
    i += 1;
  }

  return result + command[i] + '\n';
};



/**
 * @param {polina.hs.FilterType} filterType
 * @param {polina.hs.OperationType} operationType
 * @param {number} position
 * @param {string} value
 * @return {!Array.<(string|number)>}
 * @constructor
 */
polina.hs.FILTER = function(filterType, operationType, position, value) {
  return [filterType, operationType, position, value];
};



/**
 * @param {number=} opt_limit
 * @param {number=} opt_offset
 * @return {!Array.<number>}
 * @constructor
 */
polina.hs.LIMIT = function(opt_limit, opt_offset) {
  var limit = opt_limit || 1;
  var offset = opt_offset || 0;
  return [limit, offset];
};
