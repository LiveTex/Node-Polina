

var assert = require('assert');
var polina = require('../../bin/index.js');

//var client = new polina.redis.Client(6379, '192.168.48.14');
var client = new polina.redis.Client(6379);


function createKeys() {
  var data = 'test_data';
  var i = 0;
  while (i < 100) {
    client.set(i.toString(), data, polina.nop, console.error);
    i += 1;
  }
}


function testDEL() {
  client.del('10', polina.nop, console.error);
  client.keys('10', function(keys) {
    assert.deepEqual(keys, [], 'del');
  }, console.error);

}


function testEXPIRE() {
  client.expire('11', 2, function(result) {
    assert.deepEqual(result, 1, 'expire');
    var time = Date.now();
    while (1) {
      if (Date.now() - time > 5000) {
        client.expire('11', 2, function(result) {
          assert.deepEqual(result, 0, 'expire');
        }, console.error);
        break;
      }
    }
  }, console.error);
}


function testKEYS() {
  client.keys('*', function(keys) {
    assert.deepEqual(keys.length, 100, 'keys');
  }, console.error);
}


function testPERSIST() {
  client.persist('10', function(result) {
    assert.deepEqual(result, 0, 'persist');
  }, console.error);
}


function testScan() {
  client.scan('0', console.info, console.error);
}


createKeys();
testKEYS();
testDEL();
testEXPIRE();
testScan();
testPERSIST();