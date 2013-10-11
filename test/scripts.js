var polina = require('../bin');


var client = new polina.redis.Bundle(10, 6379);

client.registerScript('get-array', 'return {1, 2, 3};');
client.registerScript('get-number', 'return 1;');
client.registerScript('get-string', 'return "s";');

client.execArray('get-array', [], console.log, console.error);
client.execInt('get-number', [], console.log, console.error);
client.execString('get-string', [], console.log, console.error);

