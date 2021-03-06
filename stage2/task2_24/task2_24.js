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
var position = [];
function contains(arr,obj){
  for( var i = 0 ;i<arr.length;i++){
    if( arr[i][0] === obj[0]&&arr[i][1]===obj[1]){
      return true;
    }
  }  
  return false;
}

(function () {
  var str="";
  var table = document.getElementById("tbody");
  var wall = document.getElementById("wall");
  var tbody = document.querySelector("tbody");
  for( var i=1;i<=15;i++){
    str += "<tr><td>"+i+"</td><td></td><td></td><td></td><td></td>"
                    +"<td></td><td></td><td></td><td></td><td></td>"
                    +"<td></td><td></td><td></td><td></td><td></td><td></td>";
  };
  table.innerHTML=str; 
  addEvent("click",wall,function(){
    var x =parseInt(Math.random()*15+1) ;
    var y =parseInt(Math.random()*14) ;
    while( contains(position,[x,y])){
      x = parseInt(Math.random()*15+1) ;
      y = parseInt(Math.random()*14) ;
    }
    position.push([x,y]);
    tbody.childNodes[y].childNodes[x].setAttribute("class","block");   
  });
})();

(function(){
  var mymove = document.getElementById("bottom");
  var input = document.getElementById('input');
  var btn = document.getElementById('button');
  var refress = document.getElementById('refress');
  var line =document.getElementById('line');
  var tbody = document.querySelector("tbody");
   mymove.style.top = "240px";
  mymove.style.left = "240px";
  addEvent("click",refress,function(){
     mymove.style.top = "240px";
     mymove.style.left = "240px";
     input.innerHTML="";
     line.innerHTML="";
  });

  addEvent("click",btn,order);
  addEvent("keyup",input,rownum);
  addEvent("scroll",input,function(){
    var temp = input.scrollTop;
    line.scrollTop =temp;  
  });
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
    build:function(){
      if (this.turn % 4 == 3 || this.turn % 4 == -1){  //left
        if (parseInt(mymove.style.left) > 80) {
          var x = parseInt( (parseInt(mymove.style.left)-80)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 );
          if( contains(position,[x,y])){
            console.log("墙已存在");
          }else{
            position.push([x,y]);
            tbody.childNodes[y].childNodes[x].setAttribute("class","block");
          }
        }else{
          console.log("无足够空间");
        }
      }
      if (this.turn % 4 == 2 || this.turn % 4 == -2) {  //bottom
        if (parseInt(mymove.style.top) < 600) {
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top))/40 );
          if(contains(position,[x,y])){
            console.log("墙已存在");
          }else{
            position.push([x,y]);
            tbody.childNodes[y].childNodes[x].setAttribute("class","block");
          }
        }else{
          console.log("无足够空间");
        }
      }
      if  (this.turn% 4 == 1 || this.turn% 4 == -3) {  //right 
         if (parseInt(mymove.style.left) < 600) {
          var x = parseInt( (parseInt(mymove.style.left))/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 );
          if( contains(position,[x,y])){
            console.log("墙已存在");
          }else{
            position.push([x,y]);
            tbody.childNodes[y].childNodes[x].setAttribute("class","block");
          }
        }else{
          console.log("无足够空间");
        }
      }
      if (this.turn % 4 == 0){   //top
        if (parseInt(mymove.style.top) > 80) {
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-80)/40 );
          if( contains(position,[x,y])){
            console.log("墙已存在");
          }else{
            position.push([x,y]);
            tbody.childNodes[y].childNodes[x].setAttribute("class","block");
          }
        }else{
          console.log("无足够空间");
        }
      }
    },
    color:function(color){
       if (this.turn % 4 == 3 || this.turn % 4 == -1){  //left
          var x = parseInt( (parseInt(mymove.style.left)-80)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 );
          if( contains(position,[x,y])){
            tbody.childNodes[y].childNodes[x].style.backgroundColor=color;
          }else{
            console.log("不存在可染色的墙");
          }
        }
      if (this.turn % 4 == 2 || this.turn % 4 == -2) {  //bottom
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top))/40 );
          if( contains(position,[x,y])){
            tbody.childNodes[y].childNodes[x].style.backgroundColor=color;
          }else{
            console.log("不存在可染色的墙");
          }
      }
      if  (this.turn% 4 == 1 || this.turn% 4 == -3) {  //right  
          var x = parseInt( (parseInt(mymove.style.left))/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 );
          if( contains(position,[x,y])){
            tbody.childNodes[y].childNodes[x].style.backgroundColor=color;
          }else{
            console.log("不存在可染色的墙");
          }
      }
      if (this.turn % 4 == 0){   //top
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-80)/40 );
          if( contains(position,[x,y])){
            tbody.childNodes[y].childNodes[x].style.backgroundColor=color;
          }else{
            console.log("不存在可染色的墙");
          }
        }
    },
    go:function(){
      if (this.turn % 4 == 3 || this.turn % 4 == -1) {
        if (parseInt(mymove.style.left) > 52) {
          var x = parseInt( (parseInt(mymove.style.left)-80)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 ); 
          if( !contains(position,[x,y])){
             mymove.style.left = (parseInt(mymove.style.left) - 40) + 'px';
          }  
        }
      }
      if (this.turn % 4 == 2 || this.turn % 4 == -2) {
        if (parseInt(mymove.style.top) < 600) {
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top))/40 );
          if( !contains(position,[x,y])){
            mymove.style.top = (parseInt(mymove.style.top) + 40) + 'px';
          }
        }
      }
      if (this.turn% 4 == 1 || this.turn% 4 == -3) {
        if (parseInt(mymove.style.left) < 600) {
          var x = parseInt( (parseInt(mymove.style.left))/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 );
          if( !contains(position,[x,y])){
            mymove.style.left = (parseInt(mymove.style.left) + 40) + 'px';
          }
        }
      }
      if (this.turn % 4 == 0) {
        if (parseInt(mymove.style.top) > 42) {
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-80)/40 );
          if( !contains(position,[x,y])){
            mymove.style.top = (parseInt(mymove.style.top) - 40) + 'px';
          }
        }
      }
    },
    goLeft: function() {
      if (parseInt(mymove.style.left) > 52) {
          var x = parseInt( (parseInt(mymove.style.left)-80)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 ); 
          if( !contains(position,[x,y])){
             mymove.style.left = (parseInt(mymove.style.left) - 40) + 'px';
          }  
        }
    },
    goRight: function() {   
      if (parseInt(mymove.style.left) < 600) {
          var x = parseInt( (parseInt(mymove.style.left))/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-40)/40 );
          if( !contains(position,[x,y])){
            mymove.style.left = (parseInt(mymove.style.left) + 40) + 'px';
          }
        }
    },
    goTop: function() {
      if (parseInt(mymove.style.top) > 42) {
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top)-80)/40 );
          if( !contains(position,[x,y])){
            mymove.style.top = (parseInt(mymove.style.top) - 40) + 'px';
          }
        }
    },
    goBack: function() {
      if (parseInt(mymove.style.top) < 600) {
          var x = parseInt( (parseInt(mymove.style.left)-40)/40 )+1;
          var y = parseInt( (parseInt(mymove.style.top))/40 );
          if( !contains(position,[x,y])){
            mymove.style.top = (parseInt(mymove.style.top) + 40) + 'px';
          }
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
    },
    moveto:function(destination){    //astart
      var open =[],closed={};
      var theway = [];
      var begin = {
        x: parseInt( (parseInt(mymove.style.left)-40)/40 )+1,
        y: parseInt( (parseInt(mymove.style.top)-40)/40 ),
      };
      var end ={
        x:parseInt(destination.split(",")[0].substr(1)),
        y:parseInt(destination.split(",")[1].slice(0,-1))-1,
      };
      if( end.x>15||end.y>14||end.x===0||end.y<0||contains(position,[end.x,end.y])){
        alert("不可达区域!");
        return null;
      }

      function node(x,y){
        this.x = x,
        this.y = y;
      };
      var nodes = new Array(16);
      for( let i=1;i<=15;i++){
        nodes[i] = new Array(15);
        for( let j=0;j<15;j++){
          nodes[i][j] =new node(i,j);
        }
      }

      function getneighbors(obj){
        var neighbors=[];
        if( obj.y>=1&& (!contains(position,[obj.x, obj.y-1]))){
          var neighbor = nodes[obj.x][obj.y-1];
          neighbors.push(neighbor);
        }

        if( obj.y<14&&(!contains(position,[obj.x, obj.y+1]))){
          var neighbor = nodes[obj.x][obj.y+1];
          neighbors.push(neighbor);
        }

        if( obj.x>1&& !contains(position,[obj.x-1, obj.y])){
          var neighbor = nodes[obj.x-1][obj.y];
          neighbors.push(neighbor);
        }

        if( obj.x<15&& !contains(position,[obj.x+1, obj.y])){
          var neighbor = nodes[obj.x+1][obj.y];
          neighbors.push(neighbor);
        }

        return neighbors;
      }

      var beginnode = nodes[begin.x][begin.y];
      beginnode.gn = 0,
      beginnode.fn = 0;
      var endnode = nodes[end.x][end.y];
      open.push(beginnode);

      while( open){
        temp = open.shift();        
        if( temp === endnode){
          theway.push([temp.x,temp.y]);
          while(temp.parent !==beginnode ){
            temp = temp.parent;
            theway.push([temp.x,temp.y]);          
          }
          theway.reverse();

          var parenttemp = [begin.x,begin.y];
          var m = 0;
          var timer = setInterval( function(){
            if( theway[m][0]===parenttemp[0] && theway[m][1]+1===parenttemp[1]){
              move.movTop();
            }else if(theway[m][0]+1===parenttemp[0] && theway[m][1]===parenttemp[1]){
              move.movLeft();
            }else if(theway[m][0]===parenttemp[0]+1 && theway[m][1]===parenttemp[1]){
              move.movRight();
            }else if(theway[m][0]===parenttemp[0] && theway[m][1]===parenttemp[1]+1){
              move.movBottom();
            }
            parenttemp = theway[m];
            m++;
            if( m=== theway.length){
              clearInterval(timer);
            }
          },500);
        }
         if( temp){
           closed[temp.x] = temp.y;
         }
       

        neighbors = getneighbors(temp);
        for( var i=0;i<neighbors.length;i++){
          neighbor = neighbors[i];

          if( closed[neighbor.x] === neighbor.y){
            continue;
          }

          var gn = temp.gn+1;
          
          if( !neighbor.opened || gn<neighbor.gn ){
            neighbor.hn = neighbor.hn||Math.abs(neighbor.x-end.x)+Math.abs(neighbor.y-end.y);
            neighbor.gn = gn;
            neighbor.fn = neighbor.gn+neighbor.hn;
            neighbor.parent = temp;

            if( !neighbor.opened){
              neighbor.opened =true;
              open.push(neighbor);             
              open.sort(function(a,b){ return a.fn-b.fn; });

            }else{
              open.sort(function(a,b){ return a.fn-b.fn; });
            }
          }
        }
      }      
    }
  };
  
  function order(){
    var orderlist = input.value.split("\n");
    var temp = orderlist[0].split(" ");
      var lastone = temp[temp.length-1];
        if( !isNaN(lastone)){
          temp.pop();
          orderlist[0] = temp.join(" ");
          run(orderlist[0],lastone,0);
        }else{
          if( lastone.match(/^#[0-9a-fA-F]{6}/)) {
            temp.pop();
            orderlist[0] = temp.join(" ");
            run(orderlist[0],1,0,lastone);
          }else if( lastone.match(/^\(\d*,\d*\)$/) ){
            temp.pop();
            orderlist[0] = temp.join(" ");
            run(orderlist[0],1,0,lastone);
          }
           else  run(orderlist[0],1,0);
        } 

    var i=0;
     var timer = setInterval(function(){
       i++;
       if( i<orderlist.length){
        var temp = orderlist[i].split(" ");
        var lastone = temp[temp.length-1];
          if( !isNaN(lastone)){
            temp.pop();
            orderlist[i] = temp.join(" ");
            run(orderlist[i],lastone,i);
          }
          else if( lastone.match(/^#[0-9a-fA-F]{6}/)) {
              temp.pop();
              orderlist[i] = temp.join(" ");
              run(orderlist[i],1,i,lastone);
          }else if( lastone.match(/^\(\d*,\d*\)$/) ){
            temp.pop();
            orderlist[i] = temp.join(" ");
            run(orderlist[i],1,i,lastone);
          }
          else  run(orderlist[i],1,i);
         }else{
           clearInterval(timer);
         }
     },500);
  }

  function run(str,num,j,temp){
    switch( str.toLowerCase()){
     case 'build':
      move.build();
     break;
     case 'bur':
      move.color(temp);
     break;
     case 'mov to':
        move.moveto(temp);
     break;
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

})();