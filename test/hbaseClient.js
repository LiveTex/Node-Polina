var polina = require('../bin');

var client = new polina.hbase.Client(9090);



//client.createTable('racoon',[new polina.hbase.ColumnDescriptor('c1')],console.log);
//client.getTableNames(console.log);
//client.disableTable('racoon', console.log);
//client.isTableEnabled('racoon', console.log);
//client.enableTable('racoon', console.log);
//client.isTableEnabled('racoon', console.log);
//var mutation = new polina.hbase.Mutation('c1','123');
//client.mutateRow('racoon','r1',[mutation], {}, console.log);
//client.get('racoon', 'r1', 'c1', {}, console.log);
//client.getColumnDescriptors('racoon', console.log);