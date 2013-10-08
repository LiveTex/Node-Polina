## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.UsersBundle.md">polina.beans.UsersBundle</a>**

 A bundle of beanstalkd users.  


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.UsersBundle.md">polina.beans.UsersBundle</a>(tube, ports, opt_hosts)

<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>tube</td><td>string</td><td>Observation tube</td>
  </tr>
  
  <tr>
    <td>ports</td><td>!Array.<number></td><td>Connection ports</td>
  </tr>
  
  <tr>
    <td>opt_hosts</td><td>!Array.<string>=</td><td>Connection hosts</td>
  </tr>
  
</table>









### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.UsersBundle.md">polina.beans.UsersBundle</a>#destroy()

 Destroys a bundle. 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/master/docs/Node-Polina/polina/namespaces/polina.beans/polina.beans.UsersBundle.md">polina.beans.UsersBundle</a>#put(priority, timeout, execTime, data, opt_callback)

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




