var polina = require('../bin');

var user = new polina.beans.User('tube', 11300);

setInterval(function() {
  user.put(0, 0, 30, '::::::::');
}, 1000);
