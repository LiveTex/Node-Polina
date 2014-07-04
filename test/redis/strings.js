

var assert = require('assert');
var polina = require('../../bin/index.js');

//var client = new polina.redis.Client(6379, '192.168.48.14');
var client = new polina.redis.Client(6379);


function createKeys() {
  var i = 0;
  while (i < 99) {
    client.set(i.toString(), i.toString(), polina.nop, console.error);
    i += 1;
  }
  client.set('99', 'test_data', polina.nop, console.error);
}


function testDecr() {
  client.decr('10', function(result) {
    assert.deepEqual(result, '9', 'decr: ' + result);
  }, console.error);
}


function testIncr() {
  client.incr('10', function(result) {
    assert.deepEqual(result, '10', 'incr: ' + result);
  })
}


function testIncrBy() {
  client.incrby('10', 2, function(result) {
    assert.deepEqual(result, '12', 'incrby: ' + result);
  })
}


function testGetSet() {
  client.getset('10', '10', function(result) {
    assert.deepEqual(result, '12', 'getset: ' + result);
    client.get('10', function(result) {
      assert.deepEqual(result, '10', 'getset: ' + result);
    })
  }, console.error);
}


function testMGet() {
  client.del('100', function(result) {
    client.mget(['0', '10', '99', '100'], function(result) {
      assert.deepEqual(result, ['0', '10', 'test_data', 'NULL'],
          'mget: ' + result);
    }, console.error);
  }, console.error);
}


function testSetEx() {
  client.setex('100', 2, '100', function(result) {
    var time = Date.now();
    client.get('100', function(result) {
      assert.deepEqual(result, '100', 'setex: ' + result);
    }, console.error);
    while (1) {
      if (Date.now() - time > 5000) {
        client.get('100', function(result) {
          assert.deepEqual(result, polina.redis.resp.__NULL,
              'setex: ' + result);
        }, console.error);
        break;
      }
    }
  }, console.error);
}


function testSetNX() {
  client.del('100', function(result) {
    client.setnx('100', 'setnx', function(result) {
      assert.deepEqual(result, '1', 'setnx: ' + result);
      client.get('100', function(result) {
        assert.deepEqual(result, 'setnx', 'setnx: ' + result);
      }, console.error);
    }, console.error);
  }, console.error);
}


createKeys();
testDecr();
testIncr();
testIncrBy();
testGetSet();
testMGet();
testSetEx();
testSetNX();

