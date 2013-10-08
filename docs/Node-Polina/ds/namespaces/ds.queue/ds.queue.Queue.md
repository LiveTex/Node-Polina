## **Class: <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>**

 


### **Constructor:**
####<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>()



**Attributes**
<table>
  <tr>
    <th>Attribute</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    
    <td>this.length</td><td>number</td><td> </td>
    
  </tr>
  
  <tr>
    
    <td>this._activeIterators</td><td>Array.<<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueIterator.md">ds.queue.QueueIterator</a>></td><td> </td>
    
  </tr>
  
</table>



### **Extends:**

* <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a>






### **Methods:**



#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#unshift(data)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>data</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a>|*</td><td>Элемент очереди</td>
  </tr>
  
</table>


<table>
  <tr>
    <th>Returns</th><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#destroy()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#shift()

 




<table>
  <tr>
    <th>Returns</th><td>*</td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#addAfter(item, target)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>item</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
  
  <tr>
    <td>target</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
  
</table>


<table>
  <tr>
    <th>Returns</th><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#remove(item)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>item</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/interfaces/ds.IDataItem.md">ds.IDataItem</a></td><td>Элемент для удаления</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#map(callback)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>callback</td><td>function(*)</td><td>Обработчик элемента очереди</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#getIterator(opt_type)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>opt_type</td><td>(number|string)=</td><td>Тип итератора</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#addActiveIterator(iterator)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>iterator</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueIterator.md">ds.queue.QueueIterator</a></td><td>Итератор</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#getAfter(target)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>target</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
  
</table>


<table>
  <tr>
    <th>Returns</th><td><a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#push(data)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>data</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a>|*</td><td>Элемент очереди</td>
  </tr>
  
</table>


<table>
  <tr>
    <th>Returns</th><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#addBefore(item, target)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>item</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
  
  <tr>
    <td>target</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
  
</table>


<table>
  <tr>
    <th>Returns</th><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#getLast()

 




<table>
  <tr>
    <th>Returns</th><td><a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#get()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#getBefore(target)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>target</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
  
</table>


<table>
  <tr>
    <th>Returns</th><td><a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#removeActiveIterator(iterator)

 



<table>
  <tr>
    <th>Parameter</th><th>Type</th><th>Description</th>
  </tr>
  
  <tr>
    <td>iterator</td><td>!<a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueIterator.md">ds.queue.QueueIterator</a></td><td>Итератор</td>
  </tr>
  
</table>





#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#pop()

 




<table>
  <tr>
    <th>Returns</th><td>*</td><td>Элемент очереди</td>
  </tr>
</table>




#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#clear()

 







#### <a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.Queue.md">ds.queue.Queue</a>#getFirst()

 




<table>
  <tr>
    <th>Returns</th><td><a href="https://github.com/LiveTex/Node-Polina/tree/public/docs/Node-Polina/ds/namespaces/ds.queue/ds.queue.QueueItem.md">ds.queue.QueueItem</a></td><td>Элемент очереди</td>
  </tr>
</table>



