


/**
 * @constructor
 *
 * @param {!Buffer|string} chunk
 */

polina.thrift.Int64 = function(value) {

	/**
	 * @type {!Buffer}
	 */
	this.__bytes = new Buffer(value);


	/**
	 * @type {string}
	 */
	this.__string = value;


	/**
	 * @type {number|null}
	 */
	this.__number = binToDec(this.__bytes);

	/**
	 * @param {!Buffer} chunk
	 * @returns {number}
	 */
	function binToDec(chunk){
		var negative = chunk[0] & 0x80;
    var dop = 1;
    var byte = 0;

    for (var i = 7; i >= 0; i--) {
      byte = chunk[i];

      if (negative) {
        byte = (byte ^ 0xff) + dop;
        dop = byte >> 8;
        byte = byte & 0xff;
      }
      value += byte * Math.pow(2, 8 * (7 - i));
    }
    return (negative ? -value : value);
	}
};


/**
 *
 */
polina.thrift.Int64.prototype.toString = function() {
	return this.__string;
};


/**
 *
 */
polina.thrift.Int64.prototype.toBuffer = function() {
 return this.__bytes;
};



/**
 *
 */
polina.thrift.Int64.prototype.toNumber = function() {
 return this.__number;
};

