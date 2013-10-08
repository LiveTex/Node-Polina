## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>**

 Connection establisher.  


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>(port, opt_host)

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>port</td><td>number</td><td>Connection port</td>
  </tr>
  
  <tr>
    <td>opt_host</td><td>string=</td><td>Хост Connection host</td>
  </tr>
  
</table>









### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>#_send(payload, handler)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>payload</td><td>string</td><td>Data</td>
  </tr>
  
  <tr>
    <td>handler</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/interfaces/polina.IPacketHandler.md">polina.IPacketHandler</a></td><td>Packet handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>#_getHandshakePayload()

 




<table>
  <tr>
    <th>Returns</th><td>string</td><td>Initializes request</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>#destroy()

 Destroys connection. 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>#registerFallback(port, opt_host)

 Registers a fallback destination.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>port</td><td>number</td><td>Fallback connection port</td>
  </tr>
  
  <tr>
    <td>opt_host</td><td>string=</td><td>Fallback connection host</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>#_getHandshakeHandler()

 




<table>
  <tr>
    <th>Returns</th><td><a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/interfaces/polina.IPacketHandler.md">polina.IPacketHandler</a></td><td>Initializes packet</td>
  </tr>
</table>



