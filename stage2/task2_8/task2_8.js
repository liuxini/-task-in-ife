function addEvent( type, element, fun){
      if(element.addEventListener){
        addEvent = function(type, element, fun){
          element.addEventListener(type,fun,false);
        };
      }
      else if( element.attachEvent){
        addEvent = function(type,element,fun){
          element.attachEvent('on'+type,fun,false);
        };
      }
      else{
        addEvent = function(type,element,fun){
          element['on'+type] =fun;
        };
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
};

function getInput(){
  var input = document.querySelector("textarea");
  var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
  var realinput = input.value.split(reg);
  return realinput;
}

function leftin(){
  var queue = document.querySelector("ul");
  var nextEle = document.querySelector("li");
  var realinput = getInput();

  for (var i = 0; i < realinput.length; i++) {
    var firstEle = document.createElement('li');
     firstEle.innerHTML=realinput[i];
     if(nextEle){
      queue.insertBefore(firstEle, nextEle);
    }else{
      queue.appendChild(firstEle);
    }
  }

}

function rightin(){
  var queue = document.querySelector("ul");
  var realinput = getInput();
  for (var i = 0; i < realinput.length; i++) {
    var firstEle = document.createElement('li');
     firstEle.innerHTML=realinput[i];
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

function deleteEle(event){
  var eventnow = event || window.event;
  var lastEle =  eventnow.target || eventnow.srcElement;
  var  queue  = document.querySelector("ul");
  if( lastEle.nodeName.toLowerCase() == "li"){
    queue.removeChild(lastEle);
  }
}

function render(value){
  var list = document.getElementsByTagName('li');
  for( var i=0;i<list.length;i++){
    // alert( list[i].innerHTML );
    if( list[i].innerHTML.match(value,"g")){
      list[i].setAttribute("class","select");
    }
  }
}

function search(){
  var find = document.querySelector("input");
  var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
  if(find.value.match(reg)){
    alert("请输入一个词");
  }else{
    render(find.value);
  }
}