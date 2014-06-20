

// CREATE TABLE t1(id INT PRIMARY KEY, c0 INT);

var polina = require('../bin/index.js');

var client = new polina.hs.Client(9998, 9999);
var index = new polina.hs.Index('test', 't1', ['id', 'c0']);
//console.log('id:', index.getId());

//client.openIndex(index, function() {
//  console.log('INDEX OK');
//  client.insert([8, 8, 6], function(result) {
//    console.log('INSERT OK', result);
//    client.find(polina.hs.OperationType.EQUALS, 2, function(result) {
//      console.log('FIND OK', result);
//      client.delete(polina.hs.OperationType.EQUALS, 2, function(result) {
//        console.log('DELETE OK', result);
//      }, function(error, code) {
//        console.log('DELETE ERROR:', error, code);
//      }, new polina.hs.LIMIT(10, 0));
//    }, function(error, code) {
//      console.log('FIND ERROR:', error, code);
//    }, new polina.hs.LIMIT(10, 0));
//  }, function(error, code) {
//    console.log('INSERT ERROR:', error, code);
//  });
//}, function(error, code) {
//  console.log('INDEX ERROR:', error, code);
//});

client.openIndex(index, function() {
  console.log('INDEX OK');
  client.insert([5, 8], function(result) {
    console.log('INSERT OK', result);
  }, function(error, code) {
    console.log('INSERT ERROR:', error, code);
  });
}, function(error, code) {
  console.log('INDEX ERROR:', error, code);
});

