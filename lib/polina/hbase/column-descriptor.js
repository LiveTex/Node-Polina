//getFieldInfo().Type возврощает undefined

/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 */

polina.hbase.ColumnDescriptor = function(name, maxVersions, compression,
                                         inMemory, bloomFilterType,
                                         bloomFilterVectorSize,
                                         bloomFilterNbHashes,
                                         blockCacheEnabled, timeToLive){

  /**
   * @type {String}
   */
  this.name = name;

  /**
   * @type {number}
   */
  this.maxVersions = maxVersions; //3;

  /**
   * @type {String}
   */
  this.compression = compression; //"NONE";

  /**
   * @type {Boolean}
   */
  this.inMemory = inMemory; // 0;

  /**
   * @type {String}
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
polina.hbase.ColumnDescriptor.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
  switch (propertyName) {
    case 'name':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'maxVersions':
      id = 2;
      type = polina.thrift.Types.I32;
      break;
    case 'compression':
      id = 3;
      type = polina.thrift.Types.STRING;
      break;
    case 'inMemory':
      id = 4;
      type = polina.thrift.Types.BOOL;
      break;
    case 'bloomFilterType':
      id = 5;
      type = polina.thrift.Types.STRING;
      break;
    case 'bloomFilterVectorSize':
      id = 6;
      type = polina.thrift.Types.I32;
      break;
    case 'bloomFilterNbHashes':
      id = 7;
      type = polina.thrift.Types.I32;
      break;
    case 'blockCacheEnabled':
      id = 8;
      type = polina.thrift.Types.BOOL;
      break;
    case 'timeToLive':
      id = 9;
      type = polina.thrift.Types.I32;
      break;
    default:
      return null;
  }
  return {'id'  : id,
          'type': type};

};


