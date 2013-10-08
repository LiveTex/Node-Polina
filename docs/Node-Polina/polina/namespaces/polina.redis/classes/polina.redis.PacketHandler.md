## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.PacketHandler.md">polina.redis.PacketHandler</a>**

 Redis packet handler.  


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.PacketHandler.md">polina.redis.PacketHandler</a>(complete, cancel, type)

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>complete</td><td>!Function</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>cancel</td><td>function(string, number=)</td><td>Error handler</td>
  </tr>
  
  <tr>
    <td>type</td><td>number</td><td>Response type</td>
  </tr>
  
</table>









### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.PacketHandler.md">polina.redis.PacketHandler</a>#isComplete()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.PacketHandler.md">polina.redis.PacketHandler</a>#reset()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.PacketHandler.md">polina.redis.PacketHandler</a>#process(cursor, chunk)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>cursor</td><td>number</td><td>Data cursor</td>
  </tr>
  
  <tr>
    <td>chunk</td><td>!Buffer</td><td>Data packet</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.redis/classes/polina.redis.PacketHandler.md">polina.redis.PacketHandler</a>#_cancel(error)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>error</td><td>!Buffer</td><td>Error to be handled</td>
  </tr>
  
</table>




