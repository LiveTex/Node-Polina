

/**
 * @param {polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {polina.redis.resp.IValue} Значение.
 */
polina.redis.resp.createValue = function(cursor, chunk) {
  if (chunk[cursor.getPosition()] === polina.redis.resp.RedisType.ERROR) {
    return new polina.redis.resp.SimpleValue(true);
  }

  if (chunk[cursor.getPosition()] === polina.redis.resp.RedisType.STRING ||
      chunk[cursor.getPosition()] === polina.redis.resp.RedisType.INTEGER) {
    return new polina.redis.resp.SimpleValue();
  }

  if (chunk[cursor.getPosition()] === polina.redis.resp.RedisType.BULK) {
    return new polina.redis.resp.BulkValue();
  }

  if (chunk[cursor.getPosition()] === polina.redis.resp.RedisType.ARRAY) {
   // console.log('Create ARRAY');
    return new polina.redis.resp.ArrValue();
  }
 //console.log('!!!!!!!!' + chunk[cursor.getPosition()]);
 //console.log('Create value ERROR in ' + cursor.getPosition());
  return null;
};
