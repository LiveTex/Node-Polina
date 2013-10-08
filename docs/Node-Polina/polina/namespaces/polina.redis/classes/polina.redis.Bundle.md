## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>**

 A bundle of buckets.  


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>(count, port, opt_host)

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>count</td><td>number</td><td>Connection count</td>
  </tr>
  
  <tr>
    <td>port</td><td>number</td><td>Connection port</td>
  </tr>
  
  <tr>
    <td>opt_host</td><td>string=</td><td>Connection host</td>
  </tr>
  
</table>









### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#incrby(key, value, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key of a value to be incremented</td>
  </tr>
  
  <tr>
    <td>value</td><td>number</td><td>Increment value</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#expire(key, seconds, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key</td>
  </tr>
  
  <tr>
    <td>seconds</td><td>number</td><td>Duration of key's life</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#mget(keys, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>keys</td><td>!Array.<string></td><td>Keys of values to be get</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(!Array.<string>)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#registerFallback(port, opt_host)

 Registers a fallback destination.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>port</td><td>number</td><td>Connection port</td>
  </tr>
  
  <tr>
    <td>opt_host</td><td>string=</td><td>Connection host</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#keys(pattern, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>pattern</td><td>string</td><td>Pattern of keys</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(!Array.<string>)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#incr(key, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key of a value to be incremented</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#destroy()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#del(keys, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>keys</td><td>string|!Array.<string></td><td>Keys to be deleted</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#smembers(key, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>Key of a set</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(!Array.<string>)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#decr(key, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key of a value to be decremented</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#srem(key, value, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key of values to be removed</td>
  </tr>
  
  <tr>
    <td>value</td><td>string|!Array.<string></td><td>Values of a key to be removed</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#set(key, value, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key of set value</td>
  </tr>
  
  <tr>
    <td>value</td><td>string</td><td>Value to be set</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(string)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#setex(key, seconds, value, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key of set value</td>
  </tr>
  
  <tr>
    <td>seconds</td><td>number</td><td>Duration of key's life</td>
  </tr>
  
  <tr>
    <td>value</td><td>string</td><td>Value to be set</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(string)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#sismember(key, value, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>Key of a set</td>
  </tr>
  
  <tr>
    <td>value</td><td>string</td><td>Value to check</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#sadd(key, value, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>Key of values</td>
  </tr>
  
  <tr>
    <td>value</td><td>string|!Array.<string></td><td>Values to be set to a key</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(number)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bundle.md">polina.redis.Bundle</a>#get(key, complete, cancel)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>key</td><td>string</td><td>A key</td>
  </tr>
  
  <tr>
    <td>complete</td><td>function(string)</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
</table>




