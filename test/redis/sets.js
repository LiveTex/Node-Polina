

var assert = require('assert');
var polina = require('../../bin/index.js');

//var client = new polina.redis.Client(6379, '192.168.48.14');
var client = new polina.redis.Client(6379);


function createKeys() {
  var i = 0;
  while (i < 10) {
    var j = 0;
    while (j < 5) {
      client.sadd(i.toString(), j.toString(), polina.nop, console.error);
      j += 1;
    }
    i += 1;
  }
}


function testSCard() {
  client.scard('0', function(result) {
    assert.deepEqual(result, 5, 'scard: ' + result);
  }, console.error);
}


function testSInter() {
  client.sinter(['0', '1', '2'], function(result) {
    assert.deepEqual(result, ['0', '1', '2', '3', '4'], 'sinter: ' + result);
  }, console.error);
}


function testSIsMember() {
  client.sismember('3', '0', function(result) {
    assert.deepEqual(result, 1, 'sismember: ' + result);
  }, console.error);
  client.sismember('3', '5', function(result) {
    assert.deepEqual(result, 0, 'sismember: ' + result);
  }, console.error);
}


function testSMembers() {
  client.smembers('4', function(result) {
    assert.deepEqual(result, ['0', '1', '2', '3', '4'], 'smembers: ' + result);
  }, console.error);
}


function testSRem() {
  client.srem('0', '4', function(result) {
    assert.deepEqual(result, 1, 'srem: ' + result);
  }, console.error);
  client.srem('0', '4', function(result) {
    assert.deepEqual(result, 0, 'srem: ' + result);
  }, console.error);
}


function testSScan() {
  client.sscan('2', '0', function(result) {
    assert.deepEqual(result, [0, ['0', '1', '2', '3', '4']],
        'sscan: ' + result);
  }, console.error)
}


createKeys();
testSCard();
testSInter();
testSIsMember();
testSMembers();
testSRem();
testSScan();
