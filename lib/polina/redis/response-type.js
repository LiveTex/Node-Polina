

/**
 * @enum {string}
 */
polina.redis.ResponseType = {
  OK: '+',
  ERR: '-',
  INT: ':',
  BULK: '$',
  MULTI_BULK: '*'
};
