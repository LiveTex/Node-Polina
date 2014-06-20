

/**
 * @typedef {!Array.<string>}
 */
polina.hs.Request;


/**
 * @typedef {!Array.<!Array.<string>>}
 */
polina.hs.Response;


/**
 * @type {!polina.hs.Response}
 */
polina.hs.DummyResponse = [['']];


/**
 * @type {number}
 */
polina.hs.SEPARATOR = 0x09;


/**
 * @type {number}
 */
polina.hs.TERMINAL = 0x0a;



/**
 * @param {polina.hs.FilterType} filterType
 * @param {polina.hs.OperationType} operationType
 * @param {number} position
 * @param {string} value
 * @return {!Array.<string>}
 * @constructor
 */
polina.hs.FILTER = function(filterType, operationType, position, value) {
  return [filterType, operationType, position.toString(), value];
};



/**
 * @param {number=} opt_limit
 * @param {number=} opt_offset
 * @return {!Array.<string>}
 * @constructor
 */
polina.hs.LIMIT = function(opt_limit, opt_offset) {
  var limit = opt_limit || 1;
  var offset = opt_offset || 0;
  return [limit.toString(), offset.toString()];
};


/**
 * @param {!Array.<string>} response
 * @param {number} groupLength
 * @return {!polina.hs.Response}
 */
polina.hs.__groupResponse = function(response, groupLength) {
  var groups = [];
  var group = [];
  var j = 0;

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

  return groups;
};


/**
 * @param {!Buffer} response
 * @param {number} groupLength
 * @return {!polina.hs.Response}
 */
polina.hs.decodeResponse = function(response, groupLength) {
  var result = [];
  var data = response.toString();
  var i = 0;
  var start = 0;

  while (i < data.length) {
    if (data.charCodeAt(i) === polina.hs.SEPARATOR) {
      result.push(data.slice(start, i));
      start = i + 1;
    }

    i += 1;
  }

  return polina.hs.__groupResponse(result, groupLength);
};


/**
 * @param {!Array.<*>} tokens
 * @return {!polina.hs.Request}
 */
polina.hs.__prepareRequest = function(tokens) {
  var result = [];
  var i = 0;

  while (i < tokens.length) {
    var token = tokens[i];

    if (token instanceof Array) {
      var expandedToken = polina.hs.__prepareRequest(token);
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
 * @param {!Array.<*>} command
 * @return {string}
 */
polina.hs.encodeCommand = function(command) {
  var result = '';
  var i = 0;
  var request = polina.hs.__prepareRequest(command);

  while (i < request.length - 1) {
    result += request[i] + '\t';
    i += 1;
  }

  return result + request[i] + '\n';
};
