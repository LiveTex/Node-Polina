## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>**

 Redis Bucket.  


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>(size)

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>size</td><td>number</td><td>Bucket size</td>
  </tr>
  
</table>









### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#terminateClient(id)

 Terminates client in bucket by id.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>id</td><td>string</td><td>Client identificator</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#sismember(key, value, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#resize(size)

 Changes a size of a bucket.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>size</td><td>number</td><td>Bucket size</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#destroy()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#smembers(key, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#incrby(key, value, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#mget(keys, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#del(keys, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#get(key, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#sadd(key, value, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#setex(key, seconds, value, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#set(key, value, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#expire(key, seconds, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#keys(pattern, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#decr(key, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#incr(key, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#srem(key, value, complete, cancel)

 



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.Bucket.md">polina.redis.Bucket</a>#registerClient(intervalStart, intervalEnd, client, id)

 Registers client in a bucket.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>intervalStart</td><td>number</td><td>A start point of curtain interval</td>
  </tr>
  
  <tr>
    <td>intervalEnd</td><td>number</td><td>An end point of curtain interval</td>
  </tr>
  
  <tr>
    <td>client</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.redis/interfaces/polina.redis.IClient.md">polina.redis.IClient</a></td><td>Redis-client</td>
  </tr>
  
  <tr>
    <td>id</td><td>string</td><td>Client identificator</td>
  </tr>
  
</table>




