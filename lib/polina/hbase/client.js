

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

  this.seqID = 0;

  /**
   * @enum {number}
   */
  this.messageTypes = {
    CALL: 1,
    REPLY: 2,
    EXCEPTION: 3,
    ONEWAY: 4
  }

};


util.inherits(polina.hbase.Client, polina.Connection);


/**
 * @param {string} name
 * @param {object} args
 * @param {polina.hbase.thrift.Types=} returnType
 */

polina.hbase.Client.prototype.writeMethod = function(name,args,returnType){

  this.__transportProtocol.writeMessageBegin(name, this.messageTypes.CALL,
                                             this.seqID);


  var out = this.__transportProtocol.writeMessageEnd();

  console.log(out);

  this._send( out ,new polina.hbase.PacketHandler(complete, cancel,
                                                  returnType, name));
  polina.hbase.Client.incrementID();

};




polina.hbase.Client.prototype.incrementID = function(){
  this.seqID += 1;
};
