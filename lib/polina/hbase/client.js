

/**
 * Hbase client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */


polina.hbase.Client = function(port,opt_host){
  polina.Connection.call(this, port, opt_host);

  this.__transportProtocol = new polina.hbase.thrift.BineryProtocol();

};

util.inherits(polina.hbase.Client, polina.Connection);

polina.hbase.Client.prototype.writeMethod = function(name,args){

  this.__transportProtocol.writeMessageBegin(name, 1, 1);

  var out = this.__transportProtocol.writeMessageEnd();
  console.log(out);
  this._send( out ,new polina.hbase.PacketHandler());

};
