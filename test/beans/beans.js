

var polina = require('../../bin/index.js');
var assert = require('assert');

var host = '127.0.0.1';
var port = 11300;
var tubeName = 'test_tube';
var sTubeName = host + '/' + port.toString() + '/' + tubeName;
var tube = new polina.beans.Tube(tubeName, port);
var sTube = polina.beans.serializeTube(tube);
var client = new polina.beans.User(tube);
var ttr = 2;


function testSERIALIZE_TUBE() {
  assert.deepEqual(sTube, sTubeName,
      'polina.beans.serializeTube: ' + sTube + ' : ' + sTubeName);
}


function testRECONSTRUCT_TUBE() {
  var rTube = polina.beans.reconstructTube(sTube);

  assert.deepEqual(rTube.getId(), tube.getId(),
      'polina.beans.reconstructTube: ' + rTube.getId() + ' : ' + tube.getId());
}


function testPUT() {
  polina.beans.put(tube, 'test_data', function(jid, data) {
    console.log('polina.beans.put: tube', jid, data);
  }, console.error);
  polina.beans.put(sTube, 'test_data', function(jid, data) {
    console.log('polina.beans.put: string', jid, data);
  }, console.error);
}

testSERIALIZE_TUBE();
testRECONSTRUCT_TUBE();
testPUT();
