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
  str +="<div id=bottom class=bottom></div>"
  table.innerHTML=str; 
})();

(function(){
  var mymove = document.getElementById("bottom");
  var input = document.getElementById('input');
  var btn = document.getElementById('button');
  var refress = document.getElementById('refress');
  var line =document.getElementById('line');
   mymove.style.top = "210px";
  mymove.style.left = "224px";
  addEvent("click",refress,function(){
     mymove.style.top = "210px";
     mymove.style.left = "224px";
     input.innerHTML="";
     line.innerHTML="";
  })

  addEvent("click",btn,order);
  addEvent("keyup",input,rownum);
  addEvent("scroll",input,function(){
    var temp = input.scrollTop;
    line.scrollTop =temp;  
  })
  function rownum(){
    var list = input.value.split("\n");
    var arr = " ";
    for( var i=0;i<list.length;i++){
      arr +="<div class='linenum'>" + (i + 1) + "</div>";
    }
    line.innerHTML = arr;
    var temp = input.scrollTop;
   line.scrollTop =temp;  
  }
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
      if (parseInt( mymove.style.left) > 52) {
         mymove.style.left = (parseInt( mymove.style.left) - 43) + 'px';
      }
    },
    goRight: function() {
      if (parseInt( mymove.style.left) < 412) {
         mymove.style.left = (parseInt( mymove.style.left) + 43) + 'px';
      }
    },
    goTop: function() {
      if (parseInt( mymove.style.top) > 50) {
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
    var orderlist = input.value.trim().split("\n");
    for( var i=0;i<orderlist.length;i++){
      var temp = orderlist[i].split(" ");
      if( !isNaN(temp[temp.length-1])){
        var num = temp[temp.length-1];
        temp.pop();
        orderlist[i] = temp.join(" ");
        run(orderlist[i],num,i);
      }else{
         run(orderlist[i],1,i);
      }
    }
  }

  function run(str,num,j){
    switch( str.toLowerCase()){
    case 'go':
      for(var i=0; i<num; i++){
        move.go();
      }
      break;
    case 'tun lef':
      for(var i=0; i<num; i++){
        move.tunlef();
      }
      break;
    case 'tun rig':
      for(var i=0; i<num; i++){
        move.tunrig();
      }
    break;
    case 'tun bac':
      for(var i=0; i<num; i++){
        move.tunbac();
      }
    break;
    case 'tra lef':
      for(var i=0; i<num; i++){
        move.goLeft();
      }
      break;
    case 'tra top':
      for(var i=0; i<num; i++){
        move.goTop();
      }
      break;
    case 'tra rig':
      for(var i=0; i<num; i++){
        move.goRight();
      }
      break;
    case 'tra bot':
      for(var i=0; i<num; i++){
        move.goBack();
      }
      break;
    case 'mov lef':
      for(var i=0; i<num; i++){
        move.movLeft();
      }
      break;
    case 'mov top':
      for(var i=0; i<num; i++){
        move.movTop();
      }
      break;
    case 'mov rig':
      for(var i=0; i<num; i++){
        move.movRight();
      }
      break;
    case 'mov bot':
      for(var i=0; i<num; i++){
        move.movBottom();
      }
      break;
    default:
      var err = line.getElementsByTagName('div');
      err[j].style.backgroundColor = "red";
    }
  }

})()