var polina = require('../bin');






var redis = new polina.redis.Client(6379);



redis.__strCommand(['SET', 'kononenko', 'ты такой молодец'], console.info, console.error);
redis.__strCommand(['GET', 'kononenko'], console.info, console.error);

redis.__intCommand(['SADD', 'me', 'привет'], console.info, console.error);
redis.__intCommand(['SADD', 'me', 'кононенко'], console.info, console.error);
redis.__intCommand(['SADD', 'me', ','], console.info, console.error);
redis.__intCommand(['SADD', 'me', 'ты'], console.info, console.error);
redis.__intCommand(['SADD', 'me', 'крут'], console.info, console.error);

redis.__arrCommand(['SMEMBERS', 'me'], console.info, console.error);
redis.__intCommand(['SCARD', 'me'], console.info, console.error);
redis.__arrCommand(['SMEMBERS', 'me'], console.info, console.error);
