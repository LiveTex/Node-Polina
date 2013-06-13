

/**
 *
 *
 * @enum {number}
 */
polina.redis.ResponseType = {
  OK: '+'.charCodeAt(0),
  ERR: '-'.charCodeAt(0),
  INT: ':'.charCodeAt(0),
  BULK: '$'.charCodeAt(0),
  MULTI_BULK: '*'.charCodeAt(0)
};
