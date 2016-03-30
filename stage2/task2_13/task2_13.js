var tree = document.querySelector(".root");
var stack = [];
var found=false;

function preorder(node){
  while( node|| stack.length>0){ 
    while( node){
      if(node.className=='order') return;
      stack.push(node);
      node = node.firstElementChild;
    }
    node = stack.pop();
    node = node.nextSibling;
    while( node!==null&&node.nodeType!==1){
      node = node.nextSibling;
    } 
 }
}

function search(node){
  if(!node||found) 
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
      if( children[i].nodeType===1){
        stack.push(children[i]);
      }
    }
    if( node.firstChild.data.trim()===input.value.trim()){
      node.classList.add('find');
      return;
    }   
  }
}

window.onload=function(){
  var list = document.querySelector(".root");
  list.addEventListener("click",function(e){
    var e = e || window.event,
     target = e.target || e.srcElement;
     if (target.tagName.toLowerCase() === 'div'){
      if (document.querySelector('.select')) {
          document.querySelector('.select').classList.remove('select');
        }
       e.stopPropagation();
       target.classList.add('select');
     }
  },false);
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
  var input = document.getElementById('add');
  if(input.value==""){
    alert("please input something");
  }else{
    if (!select){
      alert("please choose a node");
    }else{
      var inputDiv = document.createElement('div');
      inputDiv.setAttribute("style","border:1px solid #000")
      var text=document.createTextNode(input.value);
      inputDiv.appendChild(text);
      select.appendChild(inputDiv);
    }
  }
}