var tree = document.querySelector(".root");
var stack=[];

function addEvent( type, element, fun){
  if(element.addEventListener){
    addEvent = function(type, element, fun){
      element.addEventListener(type,fun,false);};
    }
  else if( element.attachEvent){
    addEvent = function(type,element,fun){
      element.attachEvent('on'+type,fun,false);};
  }else{
    addEvent = function(type,element,fun){
      element['on'+type] =fun;};
   }
   return addEvent(type,element,fun);
}

function search(node){
  if(!node) 
    return;  
  stack.push(node);
  var input = document.querySelector("input");
  if( input.value===""){
      alert("please input");
      return;
    }
  while(stack.length>0){
    node = stack.shift();
    var children = node.childNodes;
    for( var i=0;i<children.length;i++){
      if( children[i].className==="child"){
        stack.push(children[i]);
      }
    }
    if( node.firstChild.data.trim()===input.value.trim()){
      node.classList.add('find');
      var hide = document.querySelectorAll(".child");
      for( var j=0;j<hide.length;j++){
        hide[j].setAttribute("style","display:block");
      }
      return;
    }   
  }
}

window.onload=function(){
  var list = document.querySelector(".root");
  addEvent("click",list,function(e){
    var e = e || window.event,
     target = e.target || e.srcElement;
     if (target.tagName.toLowerCase() === 'div'){
     if (document.querySelector('.select')) {
        document.querySelector('.select').classList.remove('select');
      }
      e.stopPropagation();
      target.classList.add('select');
      var deleteNode = target.querySelector(".delete");
      var addNode = target.querySelector(".add");
      var close = target.querySelector(".close");
      addEvent("click",deleteNode,deletenode);
      addEvent("click",addNode,add);
      addEvent("click",close,openNode);
     }
  });   
}

function openNode(){
  var select = document.querySelector(".select");
  var children = select.childNodes;
  if(children.length===0){
    alert("没有隐藏层");
  }
  for( var i=0;i<children.length;i++){
    if(children[i].className==="child"){
        children[i].setAttribute("style","display:block");
    } 
  }
}

function deletenode(){
  var select = document.querySelector(".select");
  if (!select){
    alert("please choose a node");
  }else{
    var parent = select.parentNode;
    var children = select.childNodes;
    for( var i=0;i<children.length;i++){
      select.removeChild(children[i]);
    }    
    parent.removeChild(select);
  }

}

function add(){
  var select = document.querySelector(".select");
  var input = prompt("请输入您需要添加的内容");
  if(input===""||input===null){
    alert("please input something");
  }else{
    if (!select){
      alert("please choose a node");
    }else{
      var inputDiv = document.createElement('div');
      var add = document.createElement('span');
      var close = document.createElement('span');
      var close1 = document.createElement('span');
      add.setAttribute("class","add");
      close.setAttribute("class","delete");
      close1.setAttribute("class","close");
      inputDiv.setAttribute("style","border:1px solid #000");
      var text=document.createTextNode(input);
      inputDiv.appendChild(text);
      inputDiv.appendChild(add);
      inputDiv.appendChild(close);
      select.appendChild(inputDiv);
    }
  }
}