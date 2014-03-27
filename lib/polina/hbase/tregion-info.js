

polina.hbase.TRegionInfo = function( startKey, endKey, id, name, version,
                                     serverName, port){

  /**
   * @type {String}
   */
  this.startKey = startKey;

  /**
   * @type {String}
   */
  this.endKey = endKey;

  /**
   * @type {number}
   */
  this.id = id;

  /**
   * @type {String}
   */
  this.name = name;

  /**
   * @type {number}
   */
  this.version = version;

  /**
   * @type {String}
   */
  this.serverName = serverName;

  /**
   * @type {number}
   */
  this.port = port;

  this.timestamp = 0;
};