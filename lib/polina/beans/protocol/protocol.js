

/**
 * @type {number}
 */
polina.beans.protocol.TERMINAL = 10;


/**
 * @type {!Array.<string>}
 */
polina.beans.protocol.STATUS = ['FOUND', 'OK', 'RESERVED'];



/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {!Array.<string>}
 * @constructor
 */
polina.beans.protocol.HEADER_PARSER = function(cursor, chunk) {
  var header = [];
  var headerCursor = cursor.getPosition();

  while (headerCursor < chunk.length) {
    if (chunk[headerCursor] === polina.beans.protocol.TERMINAL) {
      header = chunk.toString('utf8', cursor.getPosition(),
          headerCursor - 1).split(' ');
      cursor.incrPosition(headerCursor - cursor.getPosition() + 1);
    }
    headerCursor += 1;
  }

  return header;
};



/**
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {!polina.Header} header
 * @return {string}
 * @constructor
 */
polina.beans.protocol.BODY_PARSER = function(cursor, chunk, header) {
  var body = '';
  var status = header.get()[0];
  var bytes = 0;

  for (var i = 0; i < polina.beans.protocol.STATUS.length; i++) {
    if (status === polina.beans.protocol.STATUS[i]) {
      bytes = parseInt(header.get()[header.get().length - 1], 10);
    }
  }

  var start = cursor.getPosition();
  var stop = start + bytes;

  if (bytes && (chunk.length >= (stop + 2))) {
    body = chunk.toString('utf8', start, stop);
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
polina.beans.protocol.PACKET_HANDLER = function(response, complete, cancel) {

  function resultHandler(header, body) {
    var status = header[0];
    if (status === response) {
      complete(header, body);
    } else {
      cancel(header, body);
    }
  }

  return new polina.PacketHandler(polina.beans.protocol.HEADER_PARSER,
      polina.beans.protocol.BODY_PARSER, resultHandler);
};
