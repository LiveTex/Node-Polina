var polina = require('../bin');

var client = new polina.hbase.Client(9090);

var mutation = new polina.hbase.Mutation('c1','c2','c3');
var columnDescriptor = new polina.hbase.ColumnDescriptor('c1',3,'NONE',false,
                                                          'NONE',0,0,0,-1);
var batch = new polina.hbase.BatchMutation('r1', [mutation]);

//client.createTable('racoon',[new polina.hbase.ColumnDescriptor('c1')],console.log);
client.getTableNames(console.log);
//client.disableTable('racoon', console.log);
//client.isTableEnabled('racoon', console.log);
//client.enableTable('racoon', console.log);
//client.isTableEnabled('racoon', console.log);

//client.mutateRow('racoon','r2',[mutation], {}, console.log);

//client.get('racoon', 'r1', 'c1', {}, console.log);
//client.getColumnDescriptors('racoon', console.log);
//client.getTableRegions('racoon', console.log);
//client.getTableNames(console.log);
//client.disableTable('racoon', console.log);
//client.deleteTable('racoon', console.log);
//client.getTableNames(console.log);
//client.createTable('racoon', [columnDescriptor], console.log);
//client.getVer('racoon','r1','c1',2, {}, console.log);
//client.getVerTs('racoon','r1','c1',1,1,{}, console.log);
//client.getRow('racoon','r1',{}, console.log);
//client.getRowWithColumns('racoon','r1',['c1'],{}, console.log);
//client.getRowTs('racoon','r1',1395835160869,{}, console.log);
//client.getRowWithColumnsTs('racoon','r1',['c1'],1395835160869,{}, console.log);
//client.getRows('racoon',['r1'],{}, function(result){console.log(result[0].columns)});
//client.getRows('racoon',['r1','r2'],{}, console.log);
//client.getRowsWithColumns('racoon',['r1','r2'],['c1'],{}, console.log);
//client.getRowsTs('racoon',['r1','r2'],1395835160869,{}, console.log);
//client.getRowsWithColumnsTs('racoon',['r1','r2'],['c1'],1395835160869,{}, console.log);
//client.mutateRowTs('racoon','r2',[mutation],1,{}, console.log);
//client.mutateRows('racoon',[batch],{}, console.log);




//client.getRegionInfo('', console.log);