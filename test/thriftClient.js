var polina = require('../bin');

<<<<<<< HEAD
var client = new polina.thrift.Client(9090);


polina.thrift.setProtocol(new polina.thrift.BineryProtocol());


var methodName = 'isTableEnabled';
var returnType = polina.thrift.Types.BOOL;
var clientType = '';

var tableName = new polina.thrift.Argument(polina.thrift.Types.STRING, 'table', 1);
var row = new polina.thrift.Argument(polina.thrift.Types.STRING, 'r1', 2);
var column = new polina.thrift.Argument(polina.thrift.Types.STRING, 'c1', 3);

var args=[tableName];


client.writeMethod(methodName, returnType, clientType, args, console.log);
=======
var client = new polina.hbase.Client(9090);

client.writeMethod('getTableNames');
>>>>>>> 7e072f3215ba36b3c29bd1f0c19b05df5d355950





//var net = require('net');
//var socket = net.createConnection(9090,'localhost');
//var protocol = new Protocol();
//
//socket.addListener('connect',function() {
// // var out  = Buffer.concat([version1,methodLength,method,sequanseID,stopByte]);
//  var out  = protocol.writeMethod('getTableNames');
//  console.log(out);
//  socket.write(out);
//});
//socket.addListener('data', function(resp) {
//  console.log('Hbase Say:');
//  console.log(resp + '');
//
//});
//socket.addListener('close', console.log);
//socket.addListener('error', console.error) ;
//
//protocol = new Protocol();
//protocol.writeMethod('getTableNames');
//
//var version1 = new Buffer([0x80,0x1,0x0,0x1]); //Version and type
//
//var methodLength = new Buffer([0x0,0x0,0x0,0xD]); //13 byteLength of getTableName
//
//var method = new Buffer('getTableNames'); //
//
//var sequanseID = new Buffer([0x0,0x0,0x0,0x5]);
//
//var stopByte = new Buffer([0x0]);
//
//
//
