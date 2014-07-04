

var assert = require('assert');
var polina = require('../../bin/index.js');

//var client = new polina.redis.Client(6379, '192.168.48.14');
var client = new polina.redis.Client(6379);


function clear(complete) {
  client.del('myList', function(delResult) {
    complete();
  }, console.error);
}


function check(functionName, result, complete) {
  console.log('> ' + functionName + ': ' + result);
  client.lrange('myList', 0, -1, function(lrangeResult) {
    clear(function() {
      assert.deepEqual(lrangeResult, ['a', 'b', 'c']);
      complete();
    });
  }, console.error);
}

function checkCustom(functionName, result, expected, complete) {
  console.log('> ' + functionName + ': ' + result);
  client.lrange('myList', 0, -1, function(lrangeResult) {
    clear(function() {
      assert.deepEqual(result, expected);
      complete();
    });
  }, console.error);
}

//------------------------------------------------------------------------------

function testLSET(complete, cancel) {
  client.rpush('myList', ['b', 'b', 'c'], function(rpushResult) {
    client.lset('myList', 0, 'a', function(result) {
      check('LSET', result, complete);
    }, cancel);
  }, cancel);
}


function testLINSERT(complete, cancel) {
  client.rpush('myList', ['a', 'c'], function(rpushResult) {
    client.linsert('myList', 'AFTER', 'a', 'b', function(result) {
      check('LINSERT', result, complete);
    }, cancel);
  }, cancel);
}


function testLPUSH(complete, cancel) {
  client.rpush('myList', ['c'], function(rpushResult) {
    client.lpush('myList', ['b', 'a'], function(result) {
      check('LPUSH', result, complete);
    }, cancel);
  }, cancel);
}


function testRPUSH(complete, cancel) {
  client.rpush('myList', ['a', 'b', 'c'], function(result) {
    check('RPUSH', result, complete);
  }, cancel);
}


function testLPUSHX(complete, cancel) {
  client.rpush('myList', ['b', 'c'], function(rpushResult) {
    client.lpushx('myList', 'a', function(result) {
      check('LPUSHX', result, complete);
    }, cancel);
  }, cancel);
}


function testRPUSHX(complete, cancel) {
  client.rpush('myList', ['a', 'b'], function(rpushResult) {
    client.rpushx('myList', 'c', function(result) {
      check('RPUSHX', result, complete);
    }, cancel);
  }, cancel);
}


function testLPOP(complete, cancel) {
  client.rpush('myList', ['d', 'a', 'b', 'c'], function(rpushResult) {
    client.lpop('myList', function(result) {
      check('LPOP', result, complete);
    }, cancel);
  }, cancel);
}


function testRPOP(complete, cancel) {
  client.rpush('myList', ['a', 'b', 'c', 'd'], function(rpushResult) {
    client.rpop('myList', function(result) {
      check('RPOP', result, complete);
    }, cancel);
  }, cancel);
}


function testRPOPLPUSH(complete, cancel) {
  client.rpush('myList1', ['a', 'b', 'a'], function(rpushResult1) {
    client.rpush('myList', ['b', 'c'], function(rpushResult) {
      client.rpoplpush('myList1', 'myList', function(result) {
        client.del('myList1', function(delResult) {
          check('RPOPLPUSH', result, complete);
        }, cancel);
      }, cancel);
    }, cancel);
  }, cancel);
}


function testBRPOPLPUSH(complete, cancel) {
  client.rpush('myList1', ['a', 'b', 'a'], function(rpushResult1) {
    client.rpush('myList', ['b', 'c'], function(rpushResult) {
      client.brpoplpush('myList1', 'myList', 0, function(result) {
        client.del('myList1', function(delResult) {
          check('BRPOPLPUSH', result, complete);
        }, cancel);
      }, cancel);
    }, cancel);
  }, cancel);
}

function testBLPOP(complete, cancel) {
  client.rpush('myList', ['d', 'a', 'b', 'c'], function(rpushResult) {
    client.blpop('myList', 0, function(result) {
      check('BLPOP', result, complete);
    }, cancel);
  }, cancel);
}

function testBRPOP(complete, cancel) {
  client.rpush('myList', ['a', 'b', 'c', 'd'], function(rpushResult) {
    client.brpop('myList', 0, function(result) {
      check('BRPOP', result, complete);
    }, cancel);
  }, cancel);
}


function testLLEN(complete, cancel) {
  client.rpush('myList', ['a', 'b', 'c'], function(rpushResult) {
    client.llen('myList', function(result) {
      checkCustom('LLEN', result, 3, complete);
    }, cancel);
  }, cancel);
}


function testLRANGE(complete, cancel) {
  client.rpush('myList', ['a', 'b', 'c'], function(rpushResult) {
    client.llen('myList', function(result) {
      checkCustom('LRANGE', result, 3, complete);
    }, cancel);
  }, cancel);
}


function testLINDEX(complete, cancel) {
  client.rpush('myList', ['a', 'b', 'c'], function(rpushResult) {
    client.lindex('myList', 1, function(result) {
      checkCustom('LINDEX', result, 'b', complete);
    }, cancel);
  }, cancel);
}


function testLREM(complete, cancel) {
  client.rpush('myList', ['a', 'b', 'c', 'd'], function(rpushResult) {
    client.lrem('myList', 1, 'd', function(result) {
      check('LREM', result, complete);
    }, cancel);
  }, cancel);
}


function testLTRIM(complete, cancel) {
  client.rpush('myList', ['d', 'd', 'd', 'a', 'b', 'c', 'd', 'd', 'd'], function(rpushResult) {
    client.ltrim('myList', 3, 5, function(result) {
      check('LTRIM', result, complete);
    }, cancel);
  }, cancel);
}


function finalComplete() {
  process.exit(0);
}


//testLSET(finalComplete, console.error);
//testLINSERT(finalComplete, console.error);
//testLPUSH(finalComplete, console.error);
//testRPUSH(finalComplete, console.error);
//testLPUSHX(finalComplete, console.error);
//testRPUSHX(finalComplete, console.error);
//testLPOP(finalComplete, console.error);
//testRPOP(finalComplete, console.error);
//testRPOPLPUSH(finalComplete, console.error);
//testBRPOPLPUSH(finalComplete, console.error);
//testBLPOP(finalComplete, console.error);
//testBRPOP(finalComplete, console.error);
//testLLEN(finalComplete, console.error);
//testLRANGE(finalComplete, console.error);
//testLINDEX(finalComplete, console.error);
//testLREM(finalComplete, console.error);
//testLTRIM(finalComplete, console.error);