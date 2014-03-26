


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
 * @param callback
 */
polina.thrift.Client.prototype.writeMethod = function(name, args, callback) {

  var returnType = this.__userProtocol.getType(name).type;

  // serialize header: [this.__version | type + methodName +  seqid]
  var header = this.__protocol.writeMessageBegin(name,
      polina.thrift.MessageTypes.CALL, 0);

  // write arguments: []


  var i = 0;
  var fields = [];
  while (i < args.length) {
    fields.push(this.__protocol.writeFieldBegin(args[i].type, args[i].id));
    fields.push(this.__protocol.serializeValue(args[i].data, args[i].type));
    i += 1;
  }

  console.log('FIELDS:');
  console.log(fields);


  // write stop byte
  var stop = this.__protocol.writeFieldStop();
  var out = Buffer.concat([header, Buffer.concat(fields), stop]);

 // console.log(out);

  // нужно создавать PacketHandler для void методов?.
  console.log('______________________________________________________');
  this._send(out, new polina.thrift.PacketHandler(callback, callback,
                                              returnType, this.__protocol,
      this.__userProtocol));

};
