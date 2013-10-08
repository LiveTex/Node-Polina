## **Interface: <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/interfaces/polina.IPacketHandler.md">polina.IPacketHandler</a>**

 






### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/interfaces/polina.IPacketHandler.md">polina.IPacketHandler</a>#process(cursor, chunk)

 Shifts cursor and returns is's new position.  



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


<table>
  <tr>
    <th>Returns</th><td>number</td><td>New cursor position</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/interfaces/polina.IPacketHandler.md">polina.IPacketHandler</a>#isComplete()

 Returns true if a pachket was handled.  




<table>
  <tr>
    <th>Returns</th><td>boolean</td><td>Flag of packet handling</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/interfaces/polina.IPacketHandler.md">polina.IPacketHandler</a>#reset()

 Clears packet for reconnect. 









