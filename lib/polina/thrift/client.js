


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
 * @param {Array.<polina.thrift.Argument>} args
 * @param {polina.thrift.Types=} returnType
 * @param callback
 * @param clientType
 */
polina.thrift.Client.prototype.writeMethod = function(name, returnType,
                                                      clientType, args,
                                                      callback){
  var header = polina.thrift.writeMessageBegin(name,
      polina.thrift.MessageTypes.CALL, 0);
  console.log(header);
  var i = 0;

  var fields = [];

  while(i < args.length){
    fields.push(polina.thrift.writeFieldBegin(args[i].type, args[i].id));
    fields.push(polina.thrift.writeString(args[i].value));
    polina.thrift.writeFieldEnd();
    i += 1;
  }
  Buffer.concat(fields);
  console.log(fields);

  var stop = polina.thrift.writeFieldStop();

  var out = Buffer.concat([header, Buffer.concat(fields), stop]);



  if(returnType === polina.thrift.Types.VOID){

    this._send(out, null);

  } else {
    console.log(out);
    this._send(out ,new polina.thrift.PacketHandler(callback, callback,
                                                 returnType, clientType));
  }

};
