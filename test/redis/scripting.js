

var assert = require('assert');
var polina = require('../../bin/index.js');

//var client = new polina.redis.Client(6379, '192.168.48.14');
var client = new polina.redis.Client(6379);


function testLOADSCRIPT() {
  client.scriptLoad('set_script',
      'return redis.call(\'set\', \'KEYS[1]\', \'test_script_value_1\')');
  client.scriptLoad('get_script',
      'return redis.call(\'get\', \'KEYS[1]\')');
  client.scriptLoad('del_script',
      'return redis.call(\'del\', \'KEYS[1]\')');
}


function testEVALSHA(redisKey) {

  client.evalsha('set_script', [redisKey], function(result) {
    assert.deepEqual(result, 'OK',
        'evalsha: set_script: ' + result);

    client.evalsha('get_script', [redisKey], function(result) {
      assert.deepEqual(result, 'test_script_value_1',
          'evalsha: get_script: ' + result);

      client.evalsha('del_script', [redisKey], function(result) {
        assert.deepEqual(result, 1,
            'evalsha: del_script: ' + result);

      }, console.error);
    }, console.error);
  }, console.error);
}


function testMultiEVALSHA() {
  client.scriptLoad('set_script_multi',
      'return redis.call(\'set\', \'KEYS[0]\', \'KEYS[1]\')');
  var key = 0;
  while (key < 1000) {
    client.evalsha('set_script_multi', [key.toString(), key.toString()],
        function(result) {
          assert.deepEqual(result, 'OK',
              'evalsha: set_script_multi: ' + result);
        }, console.error);
    key += 1;
  }
}


testLOADSCRIPT();
testEVALSHA('2000');
testMultiEVALSHA();
