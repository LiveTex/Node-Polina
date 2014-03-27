
var polina = require('../bin');

var client = new polina.thrift.Client(9090);

var methodName = 'isTableEnabled';
var returnType = polina.thrift.Types.BOOL;
var clientType = '';
var args=[];

var tableName = new polina.thrift.Argument(polina.thrift.Types.STRING, 't1', 1);
var row = new polina.thrift.Argument(polina.thrift.Types.STRING, 'r1', 2);
var column = new polina.thrift.Argument(polina.thrift.Types.STRING, 'c1', 3);

args=[tableName];


client.writeMethod(methodName, returnType, args, console.log);


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
