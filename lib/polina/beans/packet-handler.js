


/**
 * Beanstalkd packet handler.
 *
 * @param {string} expectedResponse Expected result.
 * @param {function(string, string)} complete Result handler.
 * @param {function(string, number=)} cancel Error handler.
 *
 * @constructor
 * @implements {polina.IPacketHandler}
 */
polina.beans.PacketHandler = function(expectedResponse, complete, cancel) {

  var self = this;

  /**
   * @type {string}
   */
  this.__status = '';

  /**
   * @type {string}
   */
  this.__jid = '';

  /**
   * @type {string}
   */
  this.__length = '';

  /**
   * @type {string}
   */
  this.__body = '';

  /**
   * @type {boolean}
   */
  this.__isHeaderParsed = false;

  /**
   *
   */
  this.__callback = function() {
    if (self.__status === expectedResponse) {
      complete(self.__jid, self.__body);
    } else {
      cancel(self.__status);
    }
  };

};


/**
 * @param {polina.Cursor} cursor object.
 * @param {!Buffer} chunk Data packet.
 * @return {boolean}
 */
polina.beans.PacketHandler.prototype.__parseHeader = function(cursor, chunk) {

  var headerCursor = cursor.getPosition();

  while (headerCursor < chunk.length) {
    if ((chunk[headerCursor] === polina.beans.TERMINAL) &&
        (chunk[headerCursor - 1] === polina.beans.PRETERMINAL)) {
      var header = chunk.toString('utf8', cursor.getPosition(),
          headerCursor - 1).split(' ');
      this.__status = (header.length > 0) ? header[0] : '';

      if ((this.__status === polina.beans.Status.OK) && (header.length > 1)) {
        this.__length = header[1];
      } else {
        this.__jid = (header.length > 1) ? header[1] : '';
        this.__length = (header.length > 2) ? header[2] : '';
      }
      cursor.incrPosition((headerCursor + 1) - cursor.getPosition());
      return true;
    }
    headerCursor += 1;
  }

  return false;
};


/**
 * @param {polina.Cursor} cursor object.
 * @param {!Buffer} chunk Data packet.
 * @return {boolean}
 */
polina.beans.PacketHandler.prototype.__parseBody = function(cursor, chunk) {
  var length = (this.__length !== '') ? parseInt(this.__length, 10) : -1;

  if (length === -1) {
    this.__body = '';
    return true;
  } else {
    var start = cursor.getPosition();
    var stop = start + length + 1;
    if (stop < chunk.length) {
      this.__body = chunk.toString('utf8', start, stop - 1);
      cursor.incrPosition((stop + 1) - start);
      return true;
    }
  }

  return false;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.process = function(cursor, chunk) {

  if (!this.__isHeaderParsed) {
    this.__isHeaderParsed = this.__parseHeader(cursor, chunk);
  }

  if (this.__isHeaderParsed && this.__parseBody(cursor, chunk)) {
    process.nextTick(this.__callback);
    return true;
  }

  cursor.breakParsing();
  return false;
};


/**
 * @inheritDoc
 */
polina.beans.PacketHandler.prototype.reset = function() {
  this.__status = '';
  this.__jid = '';
  this.__length = '';
  this.__body = '';
  this.__isHeaderParsed = false;
};
