## **Interface: <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>**

 






### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#setex(key, seconds, value, complete, cancel)

 Sets the value and expiration of a key.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#expire(key, seconds, complete, cancel)

 Sets a timeout on key.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#get(key, complete, cancel)

 Gets the value of a key.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#decr(key, complete, cancel)

 Decrements the integer value of a key by one.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#mget(keys, complete, cancel)

 Gets the values of all the given keys  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#srem(key, value, complete, cancel)

 Removes the specified values from the set stored at key.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#keys(pattern, complete, cancel)

 Finds all keys matching the given pattern.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#del(keys, complete, cancel)

 Deletes kleys.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#smembers(key, complete, cancel)

 Extracts all the values of the set stored at key.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#destroy()

 Destroys a client. 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#sadd(key, value, complete, cancel)

 Adds one or more values to a set.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#incr(key, complete, cancel)

 Increments the integer value of a key by one.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#sismember(key, value, complete, cancel)

 Checks if value is a value of the set stored at key.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#incrby(key, value, complete, cancel)

 Increments the integer value of a key by the given amount.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a>#set(key, value, complete, cancel)

 Sets the string value of a key.  



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







