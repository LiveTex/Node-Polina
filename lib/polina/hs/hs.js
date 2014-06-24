

/**
 * @typedef {!Array.<string>}
 */
polina.hs.Request;


/**
 * @typedef {!Array.<string>}
 */
polina.hs.Response;


/**
 * @typedef {!Array.<Array.<string>>}
 */
polina.hs.Table;


/**
 * @type {!polina.hs.Table}
 */
polina.hs.TABLE = [['']];


/**
 * @type {!polina.hs.Response}
 */
polina.hs.RESPONSE = [''];


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
 * @return {string}
 * @constructor
 */
polina.hs.FILTER = function(filterType, operationType, position, value) {
  return [filterType, operationType, position.toString(), value].join('\t');
};



/**
 * @param {number=} opt_limit
 * @param {number=} opt_offset
 * @return {string}
 * @constructor
 */
polina.hs.LIMIT = function(opt_limit, opt_offset) {
  var limit = opt_limit || 1;
  var offset = opt_offset || 0;
  return [limit.toString(), offset.toString()].join('\t');
};


/**
 * @param {!polina.hs.Response} response
 * @param {number} groupLength
 * @return {!polina.hs.Table}
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
 * @param {!polina.hs.Response} response
 * @return {!polina.hs.Table}
 */
polina.hs.parseTable = function(response) {
  if (response.length > 2) {
    return polina.hs.__groupResponse(response.slice(2), Number(response[1]));
  }
  return polina.hs.TABLE;
};


/**
 * @param {!Buffer} response
 * @return {!polina.hs.Response}
 */
polina.hs.decodeResponse = function(response) {
  var result = [];
  var i = 0;
  var start = 0;

  while (i < response.length + 1) {
    if ((response[i] === polina.hs.SEPARATOR) || (i === response.length)) {
      result.push(response.slice(start, i).toString());
      start = i + 1;
    }

    i += 1;
  }

  return result;
};
