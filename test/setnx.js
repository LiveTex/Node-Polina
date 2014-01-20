

var assert = require('assert');
var polina = require('../bin/index.js');


var client = new polina.redis.Client(6379);
var key = Math.random().toString(36).substr(2);

client.setnx(key, 'set one', function(setFlag) {
  assert.strictEqual(1, setFlag, 'setnx first set error');

  client.setnx(key, 'another set', function(setFlag) {
    assert.strictEqual(0, setFlag, 'setnx second set error');

    client.get(key, function(value) {
      assert.strictEqual('set one', value, 'key value is wrong');

      client.destroy();

      console.log('setnx - OK');
    }, console.error);
  }, console.error);
}, console.error);

process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
