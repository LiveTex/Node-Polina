

/**
 * @type {string}
 */
polina.redis.resp.NULL = 'NULL';


/**
 * @type {number}
 */
polina.redis.resp.TERMINAL = 10;


/**
 * @type {number}
 */
polina.redis.resp.PRETERMINAL = 13;


/**
 * @param {!polina.Packet} header
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {boolean}
 */
polina.redis.resp.HEADER_PARSER = function(header, cursor, chunk) {

  if (!(header instanceof polina.redis.resp.Header)) {
    return false;
  }

  var headerCursor = cursor.getPosition();
  var status = chunk.toString('utf8', headerCursor, headerCursor + 1);

  switch (status) {
    case polina.redis.resp.ResponseStatus.ERROR:
    case polina.redis.resp.ResponseStatus.INTEGER:
    case polina.redis.resp.ResponseStatus.STRING: {
      header.set(chunk[headerCursor]);
      cursor.incrPosition((headerCursor + 1) - cursor.getPosition());
      return true;
    }

    case polina.redis.resp.ResponseStatus.ARRAY:
    case polina.redis.resp.ResponseStatus.BULK: {
      headerCursor += 3;
      while (headerCursor < chunk.length) {
        if ((chunk[headerCursor] === polina.redis.resp.TERMINAL) &&
            (chunk[headerCursor - 1] === polina.redis.resp.PRETERMINAL)) {
          header.set(chunk.toString('utf8', cursor.getPosition(),
              headerCursor - 1));
          cursor.incrPosition((headerCursor + 1) - cursor.getPosition());
          return true;
        }
        headerCursor += 1;
      }
    }
  }

  return false;
};


/**
 * @param {!polina.Packet} value
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {number} length
 * @return {boolean}
 */
polina.redis.resp.__parseBulkValue = function(value, cursor, chunk, length) {

  if (!(value instanceof polina.Packet)) {
    return false;
  }

  var start = cursor.getPosition();
  var stop = ((length === -1) ? start : (start + length)) + 2;

  if (stop < chunk.length) {
    return false;
  } else {
    if (length === -1) {
      value.set(polina.redis.resp.NULL);
    } else {
      value.set(chunk.toString('utf8', start, stop - 2));
    }
    cursor.incrPosition(start - stop);
    return true;
  }
};


/**
 * @param {!polina.Packet} value
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {number} length
 * @return {boolean}
 */
polina.redis.resp.__parseSimpleValue = function(value, cursor, chunk, length) {

  if (!(value instanceof polina.Packet)) {
    return false;
  }

  var valueCursor = cursor.getPosition();

  while (valueCursor < chunk.length) {
    if ((chunk[valueCursor] === polina.redis.resp.TERMINAL) &&
        (chunk[valueCursor - 1] === polina.redis.resp.PRETERMINAL)) {
      value.set(chunk.toString('utf8', cursor.getPosition(), valueCursor - 1));
      cursor.incrPosition((valueCursor + 1) - cursor.getPosition());
      return true;
    }
    valueCursor += 1;
  }

  return false;
};


/**
 * @param {!polina.Packet} value
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {number} length
 * @return {boolean}
 */
polina.redis.resp.__parseNestedValue = function(value, cursor, chunk, length) {

  if (!(value instanceof polina.Packet)) {
    return false;
  }

  var items = [];

  while ((cursor.getPosition() < chunk.length) && (items.length < length)) {
    var item = new polina.redis.resp.Packet();
    if (polina.redis.resp.PACKET_PARSER(item, cursor, chunk)) {
      item.complete();
      items.push(item);
    } else {
      return false;
    }
  }

  return (items.length === length);
};


/**
 * @param {!polina.Packet} body
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {!polina.redis.resp.Header} header
 * @return {boolean}
 */
polina.redis.resp.BODY_PARSER = function(body, cursor, chunk, header) {

  if (!(body instanceof polina.Packet)) {
    return false;
  }

  var status = header.getStatus();
  var length = header.getLength();
  var parser = polina.redis.resp.__parseSimpleValue;

  switch (status) {
    case polina.redis.resp.ResponseStatus.ARRAY: {
      parser = polina.redis.resp.__parseNestedValue;
      break;
    }

    case polina.redis.resp.ResponseStatus.BULK: {
      parser = polina.redis.resp.__parseBulkValue;
    }
  }

  if (parser(body, cursor, chunk, length)) {
    body.complete();
  }

  return body.isCompleted();
};


/**
 * @param {!polina.Packet} result
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {!Array.<*>=} opt_args
 * @return {boolean}
 */
polina.redis.resp.PACKET_PARSER = function(result, cursor, chunk, opt_args) {

  if (!(result instanceof polina.redis.resp.Packet)) {
    return false;
  }

  var header = result.getHeader();
  var body = result.getBody();

  if (!header.isCompleted() &&
      (polina.redis.resp.HEADER_PARSER(header, cursor, chunk))) {
    header.complete();
    if (!body.isCompleted() &&
        (polina.redis.resp.BODY_PARSER(header, cursor, chunk, header))) {
      body.complete();
    }
  }

  if (header.isCompleted() && body.isCompleted()) {
    result.complete();
  }

  return result.isCompleted();

};


/**
 * @param {!polina.Packet} packet
 * @param {Function} complete
 * @param {!function(string, number=)} cancel
 */
polina.redis.resp.RESULT_HANDLER = function(packet, complete, cancel) {

  if (!(packet instanceof polina.redis.resp.Packet)) {
    complete('ERROR: unknown packet');
  }

  var status = packet.getHeader().getStatus();

  if (status === polina.redis.resp.ResponseStatus.ERROR) {
    cancel(status);
  } else {
    complete(packet.get());
  }
};


/**
 * @param {Function} complete
 * @param {!function(string, number=)} cancel
 * @return {!polina.PacketHandler}
 */
polina.redis.resp.PACKET_HANDLER = function(complete, cancel) {
  return new polina.PacketHandler(new polina.redis.resp.Packet,
      polina.redis.resp.PACKET_PARSER,
      function(packet) {
        polina.redis.resp.RESULT_HANDLER(packet, complete, cancel);
      });
};
