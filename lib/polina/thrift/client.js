


/**
 * thrift client.
 *
 * @constructor
 * @extends {polina.Connection}
 * @param {number} port Connection port.
 * @param {string=} opt_host Connection host.
 */
polina.thrift.Client = function(port, opt_host) {
  polina.Connection.call(this, port, opt_host);
  this.__seqID = 0;
  this.__protocol = new polina.thrift.BineryProtocol();
  this.__userProtocol = new polina.hbase.HbaseSpec();
};

util.inherits(polina.thrift.Client, polina.Connection);


/**
 * @param {string} name
 * @param {Array.<polina.thrift.Argument>} args
 * @param {polina.thrift.Types=} returnType
 * @param callback
 */
polina.thrift.Client.prototype.writeMethod = function(name, returnType,
                                                      args,
                                                      callback) {

  // write header: [this.__version | type + methodName +  seqid]


  var header = this.__protocol.writeMessageBegin(name,
      polina.thrift.MessageTypes.CALL, 0);
  console.log(header);
  var i = 0;


  // write arguments: [this.__version | type + methodName +  seqid]
  var fields = [];
  while (i < args.length) {
    fields.push(this.__protocol.writeFieldBegin(args[i].type, args[i].id));
    fields.push(this.__protocol.writeString(args[i].value));
    this.__protocol.writeFieldEnd();
    i += 1;
  }
  Buffer.concat(fields);

  //console.log(fields);


  // write stop byte
  var stop = this.__protocol.writeFieldStop();
  var out = Buffer.concat([header, Buffer.concat(fields), stop]);


  // send in socket and create handler
//  if (returnType === polina.thrift.Types.VOID) {
//
//    this._send(out, null);
//
//  } else {
    // console.log(out);
    this._send(out, new polina.thrift.PacketHandler(callback, callback,
                                                 returnType, this.__protocol,
        this.__userProtocol));
//  }

};
