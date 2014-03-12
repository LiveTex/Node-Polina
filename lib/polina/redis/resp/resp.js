

/**
 * @param {number} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {polina.redis.resp.IValue} Значение.
 */
polina.redis.resp.createValue = function(cursor, chunk) {
  if (chunk[cursor] === polina.redis.resp.RedisType.ERROR) {
    return new polina.redis.resp.SimpleValue(true);
  }

  if (chunk[cursor] === polina.redis.resp.RedisType.STRING ||
      chunk[cursor] === polina.redis.resp.RedisType.INTEGER) {
    return new polina.redis.resp.SimpleValue();
  }

  if (chunk[cursor] === polina.redis.resp.RedisType.BULK) {
    return new polina.redis.resp.BulkValue();
  }

  if (chunk[cursor] === polina.redis.resp.RedisType.ARRAY) {
    return new polina.redis.resp.ArrValue();
  }

  return null;
};
