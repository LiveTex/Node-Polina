


/**
 * @constructor
 * @implements {polina.thrift.IStruct}
 *
 * @param {string} startKey
 * @param {string} endKey
 * @param {number} id
 * @param {string} name
 * @param {number} version
 * @param {string} serverName
 * @param {number} port
 */
polina.hbase.TRegionInfo = function(startKey, endKey, id, name, version,
    serverName, port) {

  /**
   * @type {string}
   */
  this.startKey = startKey;

  /**
   * @type {string}
   */
  this.endKey = endKey;

  /**
   * @type {number}
   */
  this.id = id;

  /**
   * @type {string}
   */
  this.name = name;

  /**
   * @type {number}
   */
  this.version = version;

  /**
   * @type {string}
   */
  this.serverName = serverName;

  /**
   * @type {number}
   */
  this.port = port;
};
