

/**
 * @param {number} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {polina.redis.resp.IValue} Значение.
 */
polina.redis.resp.createValue = function(cursor, chunk) {

  if (chunk[cursor] === polina.redis.resp.RedisType.ERROR) {
    var value = new polina.redis.resp.SimpleValue(cursor);
    value.__isError = true;
    return value;
  }

  if (chunk[cursor] === polina.redis.resp.RedisType.STRING) {
    return new polina.redis.resp.SimpleValue(cursor);
  }


  if (chunk[cursor] === polina.redis.resp.RedisType.INTEGER) {
    return new polina.redis.resp.SimpleValue(cursor);
  }


  if (chunk[cursor] === polina.redis.resp.RedisType.BULK) {
    return new polina.redis.resp.BulkValue(cursor, chunk);
  }


  if (chunk[cursor] === polina.redis.resp.RedisType.ARRAY) {
    return new polina.redis.resp.ArrValue(cursor, chunk);
  }
  return null;
};
