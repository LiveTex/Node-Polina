var polina = require('../bin');

var client = new polina.hbase.Client(9090);

var mutation = new polina.hbase.Mutation('c1','12');
var columnDescriptor = new polina.hbase.ColumnDescriptor('c1',3,'NONE',false,
                                                          'NONE',0,0,0,-1);
var batch = new polina.hbase.BatchMutation('r1', [mutation]);
var tIncrement = new polina.hbase.TIncrement('racoon', 'r1', 'c1', 123);
var scan = new polina.hbase.TScan('r1');

//client.createTable('racoon',[new polina.hbase.ColumnDescriptor('c1')],console.log, console.log);
//client.getTableNames(console.log, console.log);
//client.disableTable('racoon', console.log, console.log);
//client.isTableEnabled('racoon', console.log, console.log);
//client.enableTable('racoon', console.log, console.log);
//client.isTableEnabled('racoon', console.log, console.log);

//client.mutateRow('racoon','r1',[mutation], {}, console.log, console.log);

//client.get('racoon', 'r1', 'c1', {}, console.log, console.log);
//client.getColumnDescriptors('racoon', console.log, console.log);
client.getTableRegions('racoon', console.log, console.log);

//client.getTableNames(console.log, console.log);
//client.disableTable('racoon', console.log, console.log);
//client.deleteTable('racoon', console.log, console.log);
//client.getTableNames(console.log, console.log);
//client.createTable('racoon', [columnDescriptor], console.log, console.log);


//client.getVer('racoon','r1','c1',2, {}, console.log, console.log);
//client.getVerTs('racoon','r1','c1',1,1,{}, console.log, console.log);
//client.getRow('racoon','r1',{}, console.log, console.log);
//client.getRowWithColumns('racoon','r1',['c1'],{}, console.log, console.log);
//client.getRowTs('racoon','r1',1395835160869,{}, console.log, console.log);
//client.getRowWithColumnsTs('racoon','r1',['c1'],1395835160869,{}, console.log, console.log);
//client.getRows('racoon',['r1'],{}, function(result){console.log, console.log(result[0].columns)});
//client.getRows('racoon',['r1','r2'],{}, console.log, console.log);
//client.getRowsWithColumns('racoon',['r1','r2'],['c1'],{}, console.log, console.log);
//client.getRowsTs('racoon',['r1','r2'],1395835160869,{}, console.log, console.log);
//client.getRowsWithColumnsTs('racoon',['r1','r2'],['c1'],1395835160869,{}, console.log, console.log);
//client.mutateRowTs('racoon','r2',[mutation],1,{}, console.log, console.log);
//client.mutateRows('racoon',[batch],{}, console.log, console.log);
//client.atomicIncrement('racoon', 'r1', 'c1', 123, console.log, console.log);
//client.deleteAll('racoon', 'r1', 'c1',{}, console.log, console.log);
//client.deleteAllTs('racoon', 'r1', 'c1',{}, console.log, console.log);
//client.deleteAllRow('racoon', 'r1', {}, console.log, console.log);
//client.increment(tIncrement, console.log, console.log);
//client.incrementRows([tIncrement], console.log, console.log);
//client.deleteAllRowTs('racoon', 'r1', 111, {}, console.log, console.log);
//client.scannerOpenWithScan('racoon', scan,{},console.log, console.log);
//client.scannerOpenWithScan('racoon', 'r1','r2', ['c1'],123,{}, console.log, console.log);


//client.getRegionInfo('*', console.log, console.log);