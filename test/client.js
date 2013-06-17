var redis = require('redis');

var client = redis.createClient(6379);

var i = 0;
var c = 100;

function handleRequest(err, result) {
  console.log(arguments);

  if ((c -= 1) === 0) {
    process.exit();
  }

  sda.adfg = 2;
}

while (i < c) {
  process.nextTick(function() {
    client.get('value', handleRequest);
  });

  i += 1;
}


process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});
