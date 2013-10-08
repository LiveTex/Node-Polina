## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Watcher.md">polina.beans.Watcher</a>**

 Event watcher  


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Watcher.md">polina.beans.Watcher</a>(tube, port, opt_host)

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

* <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Client.md">polina.beans.Client</a>






### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Watcher.md">polina.beans.Watcher</a>#destroy()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Watcher.md">polina.beans.Watcher</a>#delete(jid, callback)

 Deletes task from tube.  



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





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Watcher.md">polina.beans.Watcher</a>#reserve(callback)

 Reserves ready-task, which can be deleted, buried, released with delay or just released.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>callback</td><td>function(string, string)</td><td>Result handler</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.Watcher.md">polina.beans.Watcher</a>#release(jid, priority, timeout, callback)

 Releases task. Puts it into ready-tasks tube.  



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>jid</td><td>string</td><td>Job id</td>
  </tr>
  
  <tr>
    <td>priority</td><td>number</td><td>Priority of a job</td>
  </tr>
  
  <tr>
    <td>timeout</td><td>number</td><td>Execution timeout</td>
  </tr>
  
  <tr>
    <td>callback</td><td>function()</td><td>Result handler</td>
  </tr>
  
</table>




