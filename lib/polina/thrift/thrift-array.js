


/**
 * @constructor
 */
polina.thrift.TArray = function(value, type) {

  /**
   * @type {object}
   */
  this.value = value;

  /**
   *  @type {number|String}
   */
  this.type = type;
};

polina.thrift.TArray.prototype.get = function(index){
  return this.value[index];
};

polina.thrift.TArray.prototype.getSize = function(){
  return this.value.length;
};
