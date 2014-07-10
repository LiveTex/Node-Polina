

var polina = require('../../bin/index.js');

var tube = new polina.beans.Tube('test_tube', 11300);
var client = new polina.beans.User(tube);
var ttr = 2;


function fillTube(complete, cancel) {
  var i = 0;
  var count = 100;

  function localComplete() {
    if (i < count) {
      i += 1;
      client.put(1, 0, ttr, 'job2', localComplete, cancel);
    } else {
      complete();
    }
  }

  localComplete();
}


function testSTATS(complete) {
  client.statsTube(function(stats) {
    console.log('STATS:', stats);
    complete(stats);
  });
}


function testPEEK_READY(complete) {
  client.peekReady(function(jid, body) {
    console.log('PEEK READY:', jid, body);
    complete(jid);
  });
}


function testDELETE(jid, complete) {
  client.delete(jid, function() {
    console.log('DELETE OK');
    complete();
  })
}


fillTube(function() {
  console.log('TUBE OK');
  testSTATS(function(stats) {
    testPEEK_READY(function(jid, data) {
      testDELETE(jid, function() {
        console.log('OK');
      })
    });
  });
}, console.error);
