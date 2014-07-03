

var assert = require('assert');
var polina = require('../../bin/index.js');

var client = new polina.redis.Client(6379, '192.168.48.14');


function createKeys() {
  var data = 'test_data';
  var i = 0;
  while (i < 100) {
    client.set(i.toString(), data, polina.nop, console.error);
    i += 1;
  }
  console.log('keys created');
}


function testDel() {

}


function testExpire() {

}


function testKeys() {
  client.keys('1*', function(keys) {
    console.log('KEYS:', keys);
  }, console.error);
}


function testPersist() {

}


function testScan() {

}


//polina.redis.IClient.prototype.del
//polina.redis.IClient.prototype.expire
//polina.redis.IClient.prototype.keys
//polina.redis.IClient.prototype.persist
//polina.redis.IClient.prototype.scan
createKeys();
testKeys();