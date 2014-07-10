

/**
 * @enum {number}
 */
polina.redis.resp.DataType = {
  'STRING': '+'.charCodeAt(0),
  'INTEGER': ':'.charCodeAt(0),
  'BULK': '$'.charCodeAt(0),
  'ARRAY': '*'.charCodeAt(0),
  'ERROR': '-'.charCodeAt(0)
};
