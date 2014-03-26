


/**
 * @constructor
 * @implements {polina.hbase.IStruct}
 */

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
};


polina.hbase.TRegionInfo.prototype.getFieldInfo = function (propertyName) {
  var id = 0;
  var type = 0;
  switch (propertyName) {
    case 'startKey':
      id = 1;
      type = polina.thrift.Types.STRING;
      break;
    case 'endKey':
      id = 2;
      type = polina.thrift.Types.STRING;
      break;
    case 'id':
      id = 3;
      type = polina.thrift.Types.I64;
      break;
    case 'name':
      id = 4;
      type = polina.thrift.Types.STRING;
      break;
    case 'version':
      id = 5;
      type = polina.thrift.Types.BYTE;
      break;
    case 'serverName':
      id = 6;
      type = polina.thrift.Types.STRING;
      break;
    case 'port':
      id = 7;
      type = polina.thrift.Types.I32;
      break;
    default:
      return null;
  }
  return {'id'  : id,
           'type': type};

};
