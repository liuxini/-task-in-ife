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

(function () {
  var str="";
  var table = document.getElementById("tbody");

  for( var i=1;i<=10;i++){
    str += "<tr><td>"+i+"</td><td></td><td></td><td></td><td></td>"
                      +"<td></td><td></td><td></td><td></td><td></td><td></td>";
  };
  table.innerHTML=str;
})();

(function(){
  var mymove = document.getElementById("bottom");
  var input = document.getElementById('input');
  var btn = document.getElementById('button');
  mymove.style.top = "210px";
  mymove.style.left = "224px";
  addEvent("click",btn,order);
  var move = {
   turn:0,
    tunlef:function(){
      --this.turn;
      mymove.style.transform = "rotate(" + this.turn * 90 + "deg)";
    },
    tunrig:function(){
      ++this.turn;
      mymove.style.transform = "rotate(" + this.turn * 90 + "deg)";
    },
    tunbac:function(){
      this.turn = this.turn + 2;
      mymove.style.transform = "rotate(" + this.turn * 90 + "deg)";
    },
    go:function(){
      if (this.turn % 4 == 3 || this.turn % 4 == -1) {
        if (parseInt(mymove.style.left) > 52) {
          mymove.style.left = (parseInt(mymove.style.left) - 43) + 'px';
        }
      }
      if (this.turn % 4 == 2 || this.turn % 4 == -2) {
        if (parseInt(mymove.style.top) < 410) {
          mymove.style.top = (parseInt(mymove.style.top) + 40) + 'px';
        }
      }
      if (this.turn% 4 == 1 || this.turn% 4 == -3) {
        if (parseInt(mymove.style.left) < 412) {
          mymove.style.left = (parseInt(mymove.style.left) + 43) + 'px';
        }
      }
      if (this.turn % 4 == 0) {
        if (parseInt(mymove.style.top) > 50) {
          mymove.style.top = (parseInt(mymove.style.top) - 40) + 'px';
        }
      }
    },
    goLeft: function() {
      if (parseInt( mymove.style.left) > 0) {
         mymove.style.left = (parseInt( mymove.style.left) - 43) + 'px';
      }
    },
    goRight: function() {
      if (parseInt( mymove.style.left) < 360) {
         mymove.style.left = (parseInt( mymove.style.left) + 43) + 'px';
      }
    },
    goTop: function() {
      if (parseInt( mymove.style.top) > 0) {
         mymove.style.top = (parseInt( mymove.style.top) - 40) + 'px';
      }
    },
    goBack: function() {
      if (parseInt( mymove.style.top) < 410) {
         mymove.style.top = (parseInt( mymove.style.top) + 40) + 'px';
      }
    },
    movLeft: function() {
       mymove.style.transform = "rotate(-90deg)";
      this.goLeft();
      this.turn = 3;
    },
    movRight: function() {
       mymove.style.transform = "rotate(90deg)";
      this.goRight();
      this.turn = 1;
    },
    movTop: function() {
       mymove.style.transform = "rotate(0deg)";
      this.goTop();
      this.turn = 0;
    },
    movBottom: function() {
       mymove.style.transform = "rotate(180deg)";
      this.goBack();
      this.turn = 2;
    }
  }
  
function order(){
  switch( input.value.trim().toLowerCase()){
    case 'go':
      move.go();
      break;
    case 'tun lef':
      move.tunlef();
      break;
    case 'tun rig':
      move.tunrig();
    break;
    case 'tun bac':
      move.tunbac();
    break;
    case 'tra lef':
      move.goLeft();
    break;
    case 'tra top':
      move.goTop();
    break;
    case 'tra rig':
      move.goRight();
    break;
    case 'tra bot':
      move.goBack();
    break;
    case 'mov lef':
      move.movLeft();
    break;
    case 'mov top':
      move.movTop();
    break;
    case 'mov rig':
      move.movRight();
    break;
    case 'mov bot':
      move.movBottom();
    break;
    default:
      alert("error input");
    }
  }
})();



