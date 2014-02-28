

/**
 * @param {number} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {polina.redis.resp.IValue} Значение.
 */
polina.redis.resp.createValue = function(cursor, chunk) {

  if (chunk[cursor] === polina.redis.resp.RedisType.ERROR) {
    return new polina.redis.resp.SimpleValue(cursor, true);
  }

  if (chunk[cursor] === polina.redis.resp.RedisType.STRING ||
      chunk[cursor] === polina.redis.resp.RedisType.INTEGER) {
    return new polina.redis.resp.SimpleValue(cursor);
  }

  if (chunk[cursor] === polina.redis.resp.RedisType.BULK) {
    return new polina.redis.resp.BulkValue(cursor);
  }

  if (chunk[cursor] === polina.redis.resp.RedisType.ARRAY) {
    return new polina.redis.resp.ArrValue(cursor);
  }

  return null;
};
