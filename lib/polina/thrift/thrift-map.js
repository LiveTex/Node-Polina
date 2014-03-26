


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

polina.hbase.Map.prototype.get = function(key){
  return this.value.get(key);
}

polina.hbase.Map.prototype.set = function(key,value){
  this.value[key] = value;
}
