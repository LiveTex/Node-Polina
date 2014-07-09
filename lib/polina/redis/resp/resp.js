

/**
 * @type {string}
 */
polina.redis.resp.__NULL = 'NULL';


/**
 * @type {number}
 */
polina.redis.resp.__TERMINAL = 10;


/**
 * @type {number}
 */
polina.redis.resp.__PRETERMINAL = 13;


/**
 * Converts arguments into Redis command.
 *
 * @param {!Array.<string>} args Arguments.
 * @return {string} Command payload.
 */
polina.redis.resp.encodeCommand = function(args) {
  var command = '';

  if (args.length > 0) {
    var i = 0,
        l = args.length;

    command = polina.redis.resp.DataType.ARRAY + l + '\r\n';

    while (i < l) {
      command += polina.redis.resp.DataType.BULK +
          Buffer.byteLength(args[i]) + '\r\n' + args[i] + '\r\n';

      i += 1;
    }
  }

  return command;
};


/**
 * Parsing function for Redis response packet header.
 *
 * @param {!polina.redis.resp.Header} header
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 */
polina.redis.resp.HEADER_PARSER = function(header, cursor, chunk) {

  var headerCursor = cursor.getPosition();
  var status = chunk.toString('utf8', headerCursor, headerCursor + 1);
  header.setStatus(status);

  if ((status === polina.redis.resp.DataType.ARRAY) ||
      (status === polina.redis.resp.DataType.BULK)) {

    while (headerCursor < chunk.length) {
      if ((chunk[headerCursor] === polina.redis.resp.__TERMINAL) &&
          (chunk[headerCursor - 1] === polina.redis.resp.__PRETERMINAL)) {
        header.setLength(chunk.toString('utf8', cursor.getPosition() + 1,
            headerCursor - 1));
        header.complete();
        break;
      }
      headerCursor += 1;
    }

  } else {
    header.complete();
  }

  cursor.incrPosition((headerCursor + 1) - cursor.getPosition());
};


/**
 * Parsing function for Redis string or integer value.
 *
 * @param {!polina.redis.resp.Body} value
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 */
polina.redis.resp.__parseSimpleValue = function(value, cursor, chunk) {
  var valueCursor = cursor.getPosition();

  while (valueCursor < chunk.length) {
    if ((chunk[valueCursor] === polina.redis.resp.__TERMINAL) &&
        (chunk[valueCursor - 1] === polina.redis.resp.__PRETERMINAL)) {
      value.set(chunk.toString('utf8', cursor.getPosition(), valueCursor - 1));
      cursor.incrPosition((valueCursor + 1) - cursor.getPosition());
      value.complete();
      break;
    }
    valueCursor += 1;
  }
};


/**
 * Parsing function for Redis bulk value.
 *
 * @param {!polina.redis.resp.Body} value
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {number} length
 */
polina.redis.resp.__parseBulkValue = function(value, cursor, chunk, length) {
  var start = cursor.getPosition();
  var stop = (length === -1) ? start : (start + length) + 2;

  if (stop < chunk.length) {
    if (length === -1) {
      value.set(polina.redis.resp.__NULL);
    } else {
      value.set(chunk.toString('utf8', start, stop - 2));
    }
    cursor.incrPosition(stop - start);
    value.complete();
  }
};


/**
 * Parsing function for Redis array value.
 *
 * @param {!polina.redis.resp.Body} value
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {number} length
 */
polina.redis.resp.__parseNestedValue = function(value, cursor, chunk, length) {

  if (length === -1) {
    value.set(polina.redis.resp.__NULL);
    value.complete();
  } else {
    var items = value.get(polina.redis.resp.DataType.ARRAY);

    while (!value.isCompleted()) {
      var item = new polina.redis.resp.Packet();
      polina.redis.resp.PACKET_PARSER(item, cursor, chunk);

      if (!item.isCompleted()) {
        break;
      } else {
        items.push(item);
        if (items.length === length) {
          value.set(items);
          value.complete();
        }
      }
    }
  }

};


/**
 * Parsing function for Redis response packet body.
 *
 * @param {!polina.redis.resp.Body} body
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {!polina.redis.resp.Header} header
 * @return {boolean}
 */
polina.redis.resp.BODY_PARSER = function(body, cursor, chunk, header) {

  var status = header.getStatus();
  var length = header.getLength();

  if (status === polina.redis.resp.DataType.ARRAY) {
    polina.redis.resp.__parseNestedValue(body, cursor, chunk, length);
  } else if (status === polina.redis.resp.DataType.BULK) {
    polina.redis.resp.__parseBulkValue(body, cursor, chunk, length);
  } else {
    polina.redis.resp.__parseSimpleValue(body, cursor, chunk);
  }

  return body.isCompleted();
};


/**
 * Parsing function for Redis response packet.
 *
 * @param {!polina.redis.resp.Packet} packet
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {boolean}
 */
polina.redis.resp.PACKET_PARSER = function(packet, cursor, chunk) {
  var header = packet.getHeader();
  var body = packet.getBody();

  if (!header.isCompleted()) {
    polina.redis.resp.HEADER_PARSER(header, cursor, chunk);
  } else {
    if (!body.isCompleted()) {
      polina.redis.resp.BODY_PARSER(body, cursor, chunk, header);
    }
  }

  return packet.isCompleted();
};


/**
 * Handler for packet parsing result.
 *
 * @param {!polina.redis.resp.Packet} packet
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
polina.redis.resp.RESULT_HANDLER = function(packet, complete, cancel) {
  var result = packet.get();
  if (packet.isError()) {
    cancel(result.toString());
  } else {
    complete(result);
  }
};


/**
 * Redis packet handler.
 *
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 * @return {!polina.PacketHandler}
 */
polina.redis.resp.PACKET_HANDLER = function(complete, cancel) {
  var packet = new polina.redis.resp.Packet();
  return new polina.PacketHandler(
      function(cursor, chunk) {
        polina.redis.resp.PACKET_PARSER(packet, cursor, chunk);
      }, function() {
        polina.redis.resp.RESULT_HANDLER(packet, complete, cancel);
      });
};
