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

var input=document.getElementById("input");
var table = document.getElementById("tbody");
var direction=["Top","Right","Bottom","Left"];

var blockNow={
  block:{},
  direction:0,
  X:5,
  Y:5,
}

function GetBlock(x,y){
    return table.childNodes.item(y-1).childNodes.item(x);
}

function setBlock(block){
  block.innerHTML="<div></div>";
  block.className = direction[blockNow.direction];
  blockNow.block.className="";
  blockNow.block = block;
}

(function () {
  var str="";
  for( var i=1;i<=10;i++){
    str += "<tr><td>"+i+"</td><td></td><td></td><td></td><td></td>"
                      +"<td></td><td></td><td></td><td></td><td></td><td></td>";
  };
  table.innerHTML=str;
  var btn = document.getElementById('button');
  addEvent("click",btn,order);
  blockNow.block = GetBlock(blockNow.X,blockNow.Y);
  blockNow.block.innerHTML="<div></div>";
  blockNow.block.className =  direction[blockNow.direction];
})()

function  CalDirection(num){
   var d=(blockNow.direction+num>=0?blockNow.direction+num:3)%4;
    blockNow.direction=d;
    blockNow.block.className =  direction[d];
}

function order(){
  switch (input.value.trim().toLowerCase()){
      case "go":
          Go();
          break;
      case "tun lef":
          CalDirection(-1);
          break;
      case "tun rig":
          CalDirection(1);
          break;
      case "tun bac":
          CalDirection(2);
          break;
      default:
          alert("error order");
  }
}

function Go(){
  switch(blockNow.direction){
    case 0:
      if(blockNow.Y>0){
        blockNow.Y--;
        var Block=GetBlock(blockNow.X,blockNow.Y);
        setBlock(Block);
      }
      break;
    case 1:
      if(blockNow.X<10){
        blockNow.X++;
        var Block=GetBlock(blockNow.X,blockNow.Y);
        setBlock(Block);
      }
      break;
    case 2:
      if(blockNow.Y>0){
        blockNow.Y--;
        var Block=GetBlock(blockNow.X,blockNow.Y);
        setBlock(Block);
      }
      break;
    case 3:
      if(blockNow.X>0){
        blockNow.X--;
        var Block=GetBlock(BlockNow.X,BlockNow.Y);
        setBlock(Block);
      }
      break;
  }
}