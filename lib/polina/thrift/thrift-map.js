


/**
 * @constructor
 */
polina.thrift.Map = function(value, kType, vType) {

  /**
   * @type {object}
   */
  this.value = value;

  /**
   *  @type {number}
   */
  this.kType = kType;

  /**
   *  @type {number|String}
   */
  this.vType = vType;
};

polina.thrift.Map.prototype.get = function(key){
  return this.value[key];
}

polina.thrift.Map.prototype.set = function(key,value){
  this.value[key] = value;
}

polina.thrift.Map.prototype.getSize = function(){
  return Object.keys(this.value).length
}
