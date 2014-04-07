// не используется


/**
 * Wrapper for array value
 * @constructor
 * @param {!Object} value
 * @param {number} kType
 * @param {number} vType
 */
polina.thrift.Map = function(value, kType, vType) {

  /**
   * @type {!Object}
   */
  this.value = value;

  /**
   *  @type {number}
   */
  this.kType = kType;

  /**
   *  @type {number}
   */
  this.vType = vType;
};


/**
 * @param {*} key
 * @return {string|Object|number|Boolean}
 */
polina.thrift.Map.prototype.get = function(key) {
  return this.value[key];
};


/**
 * @return {number}
 */
polina.thrift.Map.prototype.getSize = function() {
  return Object.keys(this.value).length;
};
