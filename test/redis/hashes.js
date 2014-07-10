

var assert = require('assert');
var polina = require('../../bin/index.js');

var client = new polina.redis.Client(6379);


function createKeys() {
  var i = 0;
  while (i < 10) {
    var j = 0;
    while (j < 5) {
      client.hset(i.toString(), j.toString(), i.toString() + j.toString(),
          polina.nop, console.error);
      j += 1;
    }
    i += 1;
  }
}


function testHDEL() {
  client.hdel('0', '0', function(result) {
    assert.deepEqual(result, 1, 'hdel: ' + result);
  }, console.error);
  client.hdel('0', '5', function(result) {
    assert.deepEqual(result, 0, 'hdel: ' + result);
  }, console.error);
}


function testHGET() {
  client.hget('0', '1', function(result) {
    assert.deepEqual(result, '01', 'hget: ' + result);
  }, console.error);
}


function testHGETALL() {
  client.hgetall('0', function(result) {
    assert.deepEqual(result, ['1', '01', '2', '02', '3', '03', '4', '04'],
        'hgetall: ' + result);
  }, console.error);
}


function testHSCAN() {
  client.hscan('0', '0', function(result) {
    assert.deepEqual(result,
        ['0', ['1', '01', '2', '02', '3', '03', '4', '04']],
        'hscan: ' + result);
  }, console.error);
}


createKeys();
testHDEL();
testHGET();
testHGETALL();
testHSCAN();
