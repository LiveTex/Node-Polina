## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Client.md">polina.beans.Client</a>**

 Beanstalkd client.  handshake. 


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Client.md">polina.beans.Client</a>(handshakePayload, handshakeHandler, port, opt_host)

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>handshakePayload</td><td>string</td><td>Initializes packet</td>
  </tr>
  
  <tr>
    <td>handshakeHandler</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.PacketHandler.md">polina.beans.PacketHandler</a></td><td>A handler for a *    handshake</td>
  </tr>
  
  <tr>
    <td>port</td><td>number</td><td>Connection port</td>
  </tr>
  
  <tr>
    <td>opt_host</td><td>string=</td><td>Connection host</td>
  </tr>
  
</table>





### **Extends:**

* <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/classes/polina.Connection.md">polina.Connection</a>






### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Client.md">polina.beans.Client</a>#_getHandshakeHandler()

 




<table>
  <tr>
    <th>Returns</th><td><a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/interfaces/polina.IPacketHandler.md">polina.IPacketHandler</a></td><td>Initializes packet</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Client.md">polina.beans.Client</a>#_command(name, args, response, callback, opt_data)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>name</td><td>string</td><td>Command name</td>
  </tr>
  
  <tr>
    <td>args</td><td>string</td><td>Command arguments</td>
  </tr>
  
  <tr>
    <td>response</td><td>string</td><td>Expected result</td>
  </tr>
  
  <tr>
    <td>callback</td><td>Function</td><td>Result handler</td>
  </tr>
  
  <tr>
    <td>opt_data</td><td>string=</td><td>Data</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Client.md">polina.beans.Client</a>#_getHandshakePayload()

 




<table>
  <tr>
    <th>Returns</th><td>string</td><td>Initializes request</td>
  </tr>
</table>



