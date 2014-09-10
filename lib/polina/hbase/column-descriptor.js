


/**
 * @constructor
 *
 *
 * @param {string} name
 * @param {number} maxVersions
 * @param {string} compression
 * @param {Boolean} inMemory
 * @param {string} bloomFilterType
 * @param {number} bloomFilterVectorSize
 * @param {number} bloomFilterNbHashes
 * @param {Boolean} blockCacheEnabled
 * @param {number} timeToLive
 */

polina.hbase.ColumnDescriptor = function(name, maxVersions, compression,
                                         inMemory, bloomFilterType,
                                         bloomFilterVectorSize,
                                         bloomFilterNbHashes,
                                         blockCacheEnabled, timeToLive) {

  /**
   * @type {string}
   */
  this.name = name;

  /**
   * @type {number}
   */
  this.maxVersions = maxVersions; //3;

  /**
   * @type {string}
   */
  this.compression = compression; //"NONE";

  /**
   * @type {Boolean}
   */
  this.inMemory = inMemory; // 0;

  /**
   * @type {string}
   */
  this.bloomFilterType = bloomFilterType; //"NONE";

  /**
   * @type {number}
   */
  this.bloomFilterVectorSize = bloomFilterVectorSize; //0;

  /**
   * @type {number}
   */
  this.bloomFilterNbHashes = bloomFilterNbHashes; //0;

  /**
   * @type {Boolean}
   */
  this.blockCacheEnabled = blockCacheEnabled; //0;

  /**
   * @type {number}
   */
  this.timeToLive = timeToLive; // -1;
};
