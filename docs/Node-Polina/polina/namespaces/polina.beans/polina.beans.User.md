## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.User.md">polina.beans.User</a>**

 User of a tube.  


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.User.md">polina.beans.User</a>(tube, port, opt_host)

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>tube</td><td>string</td><td>Observation tube</td>
  </tr>
  
  <tr>
    <td>port</td><td>number</td><td>Connection port</td>
  </tr>
  
  <tr>
    <td>opt_host</td><td>string=</td><td>Connection host</td>
  </tr>
  
</table>





### **Extends:**

* <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Client.md">polina.beans.Client</a>






### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.User.md">polina.beans.User</a>#put(priority, timeout, execTime, data, opt_callback)

 Puts data to execution tube.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>priority</td><td>number</td><td>Priority of data handling</td>
  </tr>
  
  <tr>
    <td>timeout</td><td>number</td><td>Execution timeout</td>
  </tr>
  
  <tr>
    <td>execTime</td><td>number</td><td>Execution time</td>
  </tr>
  
  <tr>
    <td>data</td><td>string</td><td>Data to handle</td>
  </tr>
  
  <tr>
    <td>opt_callback</td><td>?function(Error, string=)=</td><td>Result handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.User.md">polina.beans.User</a>#delete(jid, callback)

 Deletes job by id.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>jid</td><td>string</td><td>Job id</td>
  </tr>
  
  <tr>
    <td>callback</td><td>function()</td><td>Result handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.User.md">polina.beans.User</a>#peekReady(complete)

 Picks data, which is ready for task.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>complete</td><td>function(string, string)</td><td>Result handler</td>
  </tr>
  
</table>




