

/**
 * @param {number} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {polina.redis.resp.IValue} Значение.
 */
polina.redis.resp.createValue = function(cursor, chunk) {

  if (chunk[cursor] == __responseType._err) {
    return new polina.redis.resp.ErrValue(cursor, chunk);

  }

  if (chunk[cursor] == __responseType._str) {
    return new polina.redis.resp.StrValue(cursor, chunk);
  }


  if (chunk[cursor] == __responseType._bulk) {
    return new polina.redis.resp.BulkValue(cursor, chunk);
  }


  if (chunk[cursor] == __responseType._int) {
    return new polina.redis.resp.IntValue(cursor, chunk);
  }

  if (chunk[cursor] == __responseType._arr) {
    return new polina.redis.resp.ArrValue(cursor, chunk);
  }
  return null;
};


var __responseType = {
  _str: '+'.charCodeAt(0),
  _err: '-'.charCodeAt(0),
  _int: ':'.charCodeAt(0),
  _bulk: '$'.charCodeAt(0),
  _arr: '*'.charCodeAt(0),
  _def: -1
};
