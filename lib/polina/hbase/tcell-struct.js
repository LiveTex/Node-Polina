

/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 */

polina.hbase.TCell = function(){
  /**
   * @type {String}
   */
  this.value = '';

  /**
   *  @type {number}
   */
  this.timestamp = 0;
}
polina.hbase.TCell.prototype.write = function () {
};

polina.hbase.TCell.prototype.read = function () {
};

polina.hbase.TCell.prototype.init = function (args) {
  this.value     = args[0];
  this.timestamp = args[1];

};