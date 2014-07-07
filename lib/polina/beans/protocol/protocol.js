

/**
 * @type {number}
 */
polina.beans.protocol.__TERMINAL = 10;


/**
 * @type {number}
 */
polina.beans.protocol.__PRETERMINAL = 13;


/**
 * @param {!Array.<string>} args
 * @param {string=} opt_data
 * @return {string}
 */
polina.beans.protocol.encodeCommand = function(args, opt_data) {
  var payload = '';

  while (args.length !== 0) {
    payload += (' ' + args.shift());
  }

  if (opt_data !== undefined) {
    payload += ' ' + Buffer.byteLength(opt_data) + '\r\n' + opt_data;
  }

  payload += '\r\n';

  console.log('PAYLOAD:', payload);

  return payload;
};


/**
 * Parsing function for Beanstalkd response packet header.
 *
 * @param {!polina.Packet} header
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @return {boolean}
 */
polina.beans.protocol.HEADER_PARSER = function(header, cursor, chunk) {

  if (!(header instanceof polina.beans.protocol.Header)) {
    return false;
  }

  var headerCursor = cursor.getPosition();

  while (headerCursor < chunk.length) {
    if ((chunk[headerCursor] === polina.beans.protocol.__TERMINAL) &&
        (chunk[headerCursor - 1] === polina.beans.protocol.__PRETERMINAL)) {
      var headerData = chunk.toString('utf8', cursor.getPosition(),
          headerCursor - 1).split(' ');

      var status = (headerData.length > 0) ? headerData[0] : '';
      var id = polina.beans.EMPTY_ID;
      var length = '';

      if (status === polina.beans.protocol.Status.OK) {
        length = (headerData.length > 1) ? headerData[1] : '';
      } else {
        id = (headerData.length > 1) ? headerData[1] : polina.beans.EMPTY_ID;
        length = (headerData.length > 2) ? headerData[2] : '';
      }

      header.setStatus(status);
      header.setId(id);
      header.setLength(length);
      cursor.incrPosition((headerCursor + 1) - cursor.getPosition());
      return true;
    }
    headerCursor += 1;
  }

  return false;
};


/**
 * Parsing function for Beanstalkd response packet body.
 *
 * @param {!polina.Packet} body
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {!polina.beans.protocol.Header} header
 * @return {boolean}
 */
polina.beans.protocol.BODY_PARSER = function(body, cursor, chunk, header) {

  if (!(body instanceof polina.Packet)) {
    return false;
  }

  var length = header.getLength();

  if (length > 0) {
    var bodyCursor = cursor.getPosition();

    while (bodyCursor < chunk.length) {
      if ((chunk[bodyCursor] === polina.beans.protocol.__TERMINAL) &&
          (chunk[bodyCursor - 1] === polina.beans.protocol.__PRETERMINAL)) {
        body.set(chunk.toString('utf8', cursor.getPosition(), bodyCursor - 1));
        cursor.incrPosition((bodyCursor + 1) - cursor.getPosition());
        return true;
      }

      bodyCursor += 1;
    }
  }

  return false;
};


/**
 * Parsing function for Beanstalkd response packet.
 *
 * @param {!polina.Packet} packet
 * @param {!polina.Cursor} cursor
 * @param {!Buffer} chunk
 * @param {!Array.<*>=} opt_args
 * @return {boolean}
 */
polina.beans.protocol.PACKET_PARSER =
    function(packet, cursor, chunk, opt_args) {

  if (!(packet instanceof polina.beans.protocol.Packet)) {
    return false;
  }

  var header = packet.getHeader();
  var body = packet.getBody();

  if (!header.isCompleted() &&
      polina.beans.protocol.HEADER_PARSER(header, cursor, chunk)) {
    header.complete();
  }

  if (header.isCompleted() &&
      !body.isCompleted() &&
      (polina.beans.protocol.BODY_PARSER(body, cursor, chunk, header))) {
    body.complete();
  }


  if (header.isCompleted() && body.isCompleted()) {
    packet.complete();
  }

  return packet.isCompleted();
};


/**
 * Handler for packet parsing result.
 *
 * @param {!polina.Packet} packet
 * @param {!function(string, string)} complete
 * @param {!function(string, number=)} cancel
 */
polina.beans.protocol.RESULT_HANDLER = function(packet, complete, cancel) {

  if (!(packet instanceof polina.beans.protocol.Packet)) {
    cancel('ERROR: unknown packet');
  }

  if (packet.isError()) {
    cancel(packet.getHeader().getStatus());
  } else {
    complete(packet.getHeader().getId(), packet.getBody().getString());
  }
};


/**
 * Beanstalkd packet handler.
 *
 * @param {polina.beans.protocol.Status} expectedResponse
 * @param {!function(string, string)} complete
 * @param {!function(string, number=)} cancel
 * @return {!polina.PacketHandler}
 */
polina.beans.protocol.PACKET_HANDLER =
    function(expectedResponse, complete, cancel) {
  return new polina.PacketHandler(
      new polina.beans.protocol.Packet(expectedResponse),
      polina.beans.protocol.PACKET_PARSER,
      function(packet) {
        polina.beans.protocol.RESULT_HANDLER(packet, complete, cancel);
      });
};
