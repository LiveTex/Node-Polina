# Livetex-Polina

Pure JS driver for Redis server and Beanstalk queue daemon.


## Redis examples

### Simple client

    var polina = require('livetex-polina');
    var client = new polina.redis.Client(6397, '127.0.0.1');

    client.set('key', 'value', function() {
      console.log('Complete.');
    }, function(error, opt_code) {
      console.error(error);
    });


### Connection pool

    var polina = require('livetex-polina');
    var client = new polina.redis.Bundle(100, 6397, '127.0.0.1');

    client.set('key', 'value', function() {
      console.log('Complete.');
    }, function(error, opt_code) {
      console.error(error);
    });


### Shard usage

    var polina = require('livetex-polina');
    var bucket = new polina.redis.Bucket(9);

    bucket.registerClient(0, 3,  new polina.redis.Bundle(3, 6397), 'alpha');
    bucket.registerClient(3, 6,  new polina.redis.Bundle(3, 6398), 'beta');
    bucket.registerClient(6, 9,  new polina.redis.Bundle(3, 6399), 'gamma');

    bucket.set('key', 'value', function() {
      console.log('Complete.');
    }, function(error, opt_code) {
      console.error(error);
    });


## Beanstalk examples

### Put data into tube

    var polina = require('livetex-polina');
    var user = new polina.beans.User('tube', 11300);

    user.put(0, 0, 30, 'hello world');


### Infinite watching for data

    var polina = require('livetex-polina');
    var watcher = new polina.beans.Watcher('tube', 11300);

    function reserve() {
      watcher.reserve(function(jobId, data) {
        console.log('New data:', data);

        watcher.delete(jobId, reserve);
      });
    }

    reserve();

## License

Modified BSD License
