function addEvent( type, element, fun){
      if(element.addEventListener){
        addEvent = function(type, element, fun){
          element.addEventListener(type,fun,false);
        }
      }
      else if( element.attachEvent){
        addEvent = function(type,element,fun){
          element.attachEvent('on'+type,fun,false);
        }
      }
      else{
        addEvent = function(type,element,fun){
          element['on'+type] =fun;
        }
      }
      return addEvent(type,element,fun);
    }

window.onload=function () {
	// body...
 var btns = document.querySelectorAll("button");
 var queue =  document.querySelector("ul");
 addEvent("click",btns[0],leftin);
      // addEvent("click",lin,leftin);
 addEvent("click",btns[1],rightin);
 addEvent("click",btns[2],leftout);
 addEvent("click",btns[3],rightout);
 addEvent("click",btns[4],search);
 addEvent("click",queue,deleteEle);
}

function leftin(){
  var queue = document.querySelector("ul");
  var input = document.querySelector("textarea");
  var firstEle = document.createElement('li');
  var nextEle = document.querySelector("li");
  alert(input.value);
  var reg = / /;
  input.value.split();
  if( input.value===undefined || input.value.match(/[^0-9]/)){
      alert("请输入数字");
  }else{
    firstEle.innerHTML=parseInt(input.value);
    if(nextEle){
      queue.insertBefore(firstEle, nextEle);
    }else{
      queue.appendChild(firstEle);
    }
  }
}

function rightin(){
  var queue = document.querySelector("ul");
  var input = document.querySelector("textarea");
  var firstEle = document.createElement('li');
  if( input.value===undefined ||input.value.match(/[^0-9]/)){
    alert("请输入数字");
  }else{
    firstEle.innerHTML=parseInt(input.value);   
    queue.appendChild(firstEle);
  }
}

function leftout(){
  var queue = document.querySelector("ul");
  var nextEle = queue.querySelector("li");
  if(nextEle){
    alert(nextEle.innerHTML);
    queue.removeChild(nextEle);
  }else{
    alert("队列为空");
  }
}

function rightout(){
  var queue = document.querySelector("ul");
  var nextEle = queue.lastElementChild;
  if(nextEle){
    alert(nextEle.innerHTML);
    queue.removeChild(nextEle);
  }else{
    alert("队列为空");
  }
}

function deleteEle(){
  var  queue  = document.querySelector("ul");
  if( queue.target&&queue.target.nodeName == "LI"){
    queue.removeChild(lastEle);
  }
}

function search(){

}