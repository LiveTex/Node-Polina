


/**
 * thrift client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.thrift.Client = function(port, opt_host){
  polina.Connection.call(this, port, opt_host);
  this.__seqID = 0;

};


util.inherits(polina.thrift.Client, polina.Connection);


/**
 * @param {string} name
 * @param {object} args
 * @param {polina.thrift.Types=} returnType
 * @param callback
 */
polina.thrift.Client.prototype.writeMethod = function(name, returnType, args,
                                                      callback){
  var header = polina.thrift.writeMessageBegin(name,
      polina.thrift.MessageTypes.CALL, this.__seqID++);

  var stop = polina.thrift.writeMessageEnd();

  var out = Buffer.concat([header, stop]);


  if(returnType === polina.thrift.Types.VOID){
  } else {
    this._send( out ,new polina.thrift.PacketHandler(callback,callback,
                                                 returnType));
  }

};
