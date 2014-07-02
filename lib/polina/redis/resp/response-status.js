

/**
 * @enum {string}
 */
polina.redis.resp.ResponseStatus = {
  'STRING': '+',
  'INTEGER': ':',
  'BULK': '$',
  'ARRAY': '*',
  'ERROR': '-'
};
