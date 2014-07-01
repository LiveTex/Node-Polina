


/**
 * @type {number}
 */
polina.redis.resp.TERMINAL = 13;



/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {!Array.<string>}
 * @constructor
 */
polina.redis.resp.HEADER_PARSER = function(cursor, chunk) {
  var header = [];
  var headerCursor = cursor.getPosition();
  header.push(chunk.toString('utf8', headerCursor, headerCursor + 1));
  headerCursor += 1;

  if ((header[0] === polina.redis.resp.BULK) ||
      (header[0] === polina.redis.resp.ARRAY)) {
    while (headerCursor < chunk.length) {
      if (chunk[headerCursor] === polina.redis.resp.TERMINAL) {
        header.push(chunk.toString('utf8', cursor.getPosition() + 1,
            headerCursor));
        headerCursor += 1;
        break;
      }
      headerCursor += 1;
    }
  }
  cursor.incrPosition(headerCursor - cursor.getPosition() + 1);
  return header;
};


polina.redis.resp.__parseSimpleValue = function(cursor, chunk) {

};


polina.redis.resp.__parseNestedValue = function(cursor, chunk, length) {

};



/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {string} header
 * @return {(string|!Array.<string>)}
 * @constructor
 */
polina.redis.resp.BODY_PARSER = function(cursor, chunk, header) {
  var body = '';
  var responseType = header[0];

  if ((responseType === polina.redis.resp.ARRAY) ||
      (responseType === polina.redis.resp.BULK)) {
    body = polina.redis.resp.__parseNestedValue(cursor, chunk,
        parseInt(header.slice(1)));
  } else {
    body = polina.redis.resp.__parseSimpleValue(cursor, chunk);
  }
  return body;
};



/**
 * @param {string} response
 * @param {!function(string, string)} complete
 * @param {!function(string, string)} cancel
 * @return {!polina.PacketHandler}
 * @constructor
 */
polina.redis.resp.PACKET_HANDLER = function(response, complete, cancel) {

  return new polina.PacketHandler(polina.beans.protocol.HEADER_PARSER,
      polina.beans.protocol.BODY_PARSER, resultHandler);
};



/**
 * @param {polina.Cursor} cursor Индекс курсора.
 * @param {!Buffer} chunk Пакет данных для извлечения значения.
 * @return {polina.IValue} Значение.
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
    return new polina.redis.resp.ArrValue();
  }
  return null;
};
