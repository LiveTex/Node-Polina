

/**
 * @type {number}
 */
polina.beans.protocol.TERMINAL = 10;


/**
 * @type {number}
 */
polina.beans.protocol.PRETERMINAL = 13;


/**
 * @type {!Array.<string>}
 */
polina.beans.protocol.STATUS = ['FOUND', 'OK', 'RESERVED'];



/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {Array.<string>}
 * @constructor
 */
polina.beans.protocol.HEADER_PARSER = function(cursor, chunk) {
  var header = null;
  var headerCursor = cursor.getPosition();

  while (headerCursor < chunk.length) {
    if ((chunk[headerCursor] === polina.beans.protocol.TERMINAL) &&
        (chunk[headerCursor - 1] === polina.beans.protocol.PRETERMINAL)) {
      header = chunk.toString('utf8', cursor.getPosition(),
          headerCursor - 1).split(' ');
      cursor.incrPosition((headerCursor + 1) - cursor.getPosition());
      return header;
    }
    headerCursor += 1;
  }

  return header;
};



/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {!polina.Header} header
 * @return {(string|null)}
 * @constructor
 */
polina.beans.protocol.BODY_PARSER = function(cursor, chunk, header) {
  var body = null;
  var bytes = -1;

  for (var i = 0; i < polina.beans.protocol.STATUS.length; i++) {
    if (header.get()[0] === polina.beans.protocol.STATUS[i]) {
      bytes = parseInt(header.get()[header.get().length - 1], 10);
    }
  }

  if (bytes === -1) {
    body = '';
  } else {
    var start = cursor.getPosition();
    var stop = start + bytes + 2;
    if (bytes && (stop <= chunk.length)) {
      body = chunk.toString('utf8', start, stop - 2);
      cursor.incrPosition(stop - start);
    }
  }

  return body;
};



/**
 * @param {string} response
 * @param {!function(!Array.<string>, string)} complete
 * @param {!function(string, number=)} cancel
 * @return {!polina.PacketHandler}
 * @constructor
 */
polina.beans.protocol.PACKET_HANDLER = function(response, complete, cancel) {

  function resultHandler(header, body) {
    var status = header[0];
    if (status === response) {
      complete(header, body);
    } else {
      cancel(status);
    }
  }

  return new polina.PacketHandler(polina.beans.protocol.HEADER_PARSER,
      polina.beans.protocol.BODY_PARSER, resultHandler);
};
