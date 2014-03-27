


/**
 * Wrapper for array value
 * @constructor
 * @param {Object} value
 * @param {number} type
 */
polina.thrift.TArray = function(value, type) {

  /**
   * @type {Object}
   */
  this.value = value;

  /**
   *  @type {number}
   */
  this.type = type;
};


/**
 * @param {number} index
 * @return {polina.thrift.IValue}
 */
polina.thrift.TArray.prototype.get = function(index) {
  return this.value[index];
};


/**
 * @return {number}
 */
polina.thrift.TArray.prototype.getSize = function() {
  return this.value.length;
};
