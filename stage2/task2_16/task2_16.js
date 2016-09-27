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
};

function removeEvent(type,target, func){ 
    if (target.removeEventListener) 
        target.removeEventListener(type, func, false); 
    else if (target.detachEvent) 
        target.detachEvent("on" + type, func); 
    else target["on" + type] = null; 
};  

function getTime(){
  var date = new Date();
  var year = ("0000" + date.getFullYear()).substr(-4),
      month = ("00" + (date.getMonth() + 1)).substr(-2);
      day = ("00" + date.getDate()).substr(-2),
      hour = ("00" + date.getHours()).substr(-2),
      minute = ("00" + date.getMinutes()).substr(-2),
      second = ("00" + date.getSeconds()).substr(-2);
  return year + "-" + month + "-" + day + " " + hour + ":" + minute 
        + ":" + second;
};

var terminal = document.querySelector(".terminal");
var cmdAirshipArr = [{}, {}, {}, {}];
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
//存放动力系统的值
var powerArr = [[1, 5], [2, 7], [3, 9]];
//存放能源系统的值
var energyArr = [2, 3, 4];


var planet = {

    energyType : ['前进号','奔腾号','超越号'],
    dynamicalType : ['劲量型','光能型','永久型'],
    status : ['创建','飞行','停止','销毁'],
    
  drawSelf:function(){
    context.beginPath();
    context.arc(500,200,40,0,Math.PI*2,true);
    context.fillStyle = 'green';
    context.fill();  
    context.closePath();

  },
  drawOrbit:function(){
      for( var i=0;i<4;i++){
        context.beginPath();
        context.arc(500,200,70+i*40,0,Math.PI*2,true);
        context.strokeStyle = 'green';
        context.closePath();
        context.stroke();
      } 
  },

  send: function(user){

      if (user.order == 'create') {
         var station = document.querySelector("tbody");
         spaceshiplist[user.id] = new spaceship(user);
         terminal.innerHTML += "<p>"+getTime()+" "+(user.id+1)+"号飞船创建成功</p>";
         var children = station.children;

        for( var count=0;count<children.length;count++){
            if( children[count].firstElementChild.innerHTML===parseInt(parseInt(user.id)+1)+'号'){
                children[count].children[1].innerHTML = planet.energyType[ user.energyType ],
                children[count].children[2].innerHTML = planet.dynamicalType[ user.dynamicalType ],
                children[count].children[3].innerHTML = '创建',
                children[count].children[4].innerHTML = '100%';
            }
        }
         return;
     }

     var result = encode(user);
     Bus.sendorder(result);
    },

  receive:function(str){
    var station = document.querySelector("tbody");
    var arr = [];
    var temp = '';
    if( str.length<16&&str.substr(6,2)!=='11'){
      return;
    }
    for( var i=0;i<4;i++){
      temp = str.substr(i*2,2);
        switch(temp){
          case '00':arr.push('0');break;
          case '01':arr.push('1');break;
          case '10':arr.push('2');break;
          case '11':arr.push('3');break;
        }
    }
    
    arr.push(two2ten(str.substr(8)));

    var childrenlist = station.children;

      for( var count=0;count<childrenlist.length;count++){
        if( childrenlist[count].firstElementChild.innerHTML === parseInt(parseInt(arr[0])+1)+'号'){
          if ( !isNaN(arr[4]) ){
                childrenlist[count].children[1].innerHTML = planet.energyType[arr[1]],
                childrenlist[count].children[2].innerHTML = planet.dynamicalType[arr[2]],
                childrenlist[count].children[3].innerHTML = planet.status[arr[3]],
                childrenlist[count].children[4].innerHTML = arr[4]+'%';
              }else{
                childrenlist[count].children[1].innerHTML = '未知',
                childrenlist[count].children[2].innerHTML = '未知',
                childrenlist[count].children[3].innerHTML = '未知',
                childrenlist[count].children[4].innerHTML = '未知';
              }
        }
      }
    }
    
};

function two2ten(str){
   var arr = str.split('');
    var num = 0;
    //按权求和
    for (var i = 0; i < 8; i ++) {
        arr[7 - i] = parseInt(arr[7 - i]) * Math.pow(2, i);
        num += arr[7-i];
    }
    return num;
}

(function () {
  var console = document.querySelector(".console");

  addEvent("click",console,function(ev){
    var e = ev||window.event;
    var order = e.target||e.srcElement;
    if( order.className.toLowerCase()=="order" ){
      var command = order.getAttribute("id");
      var parent = order.parentNode;
      var orbittemp = parent.getAttribute("id");
       var orbit ;
      if(orbittemp==='one'){
          orbit = 0;
      }else if( orbittemp==='two'){
          orbit =1;
      }else if ( orbittemp === 'three' ){
          orbit =2;
      }else if( orbittemp === 'four'){
          orbit =3;
      }
      sendfn( orbit,command);
    }
  } );
  
})();

//暂存命令
function sendfn(orbit,command){
  cmdAirshipArr[orbit].id = orbit;

  if( command ==='create' ){
    cmdAirshipArr[orbit].order = 'create';
    var choose = document.querySelector(".choose");
    choose.style.display = "block";
    cmdAirshipArr[orbit].dynamical = 3;
    cmdAirshipArr[orbit].useEnergy = 5 ;
    cmdAirshipArr[orbit].energy = 2;
    cmdAirshipArr[orbit].dynamicalType = 0;
    cmdAirshipArr[orbit].energyType = 0;
    var btns = document.querySelector(".button");

    addEvent("click",btns,create);
    
  } else {

      cmdAirshipArr[orbit].order = command;
      commander.send(cmdAirshipArr[orbit]);
  }

  function create(ev){
      var e = ev||window.event;
      var order = e.target||e.srcElement;

      if( order.id.toLowerCase()==='yes'){
         var powers = document.getElementsByName("vtype");
         var energys = document.getElementsByName('energytype');

          for (var i = 0; i < 3; i ++) {
              if (powers[i].checked) {
                  //设置为选中的动力配置
                  cmdAirshipArr[orbit].dynamical = powerArr[i][0];
                  cmdAirshipArr[orbit].useEnergy = powerArr[i][1];
                  cmdAirshipArr[orbit].dynamicalType = i;
                  cmdAirshipArr[orbit].energyType = i;
              }
              if (energys[i].checked) {
                  //设置为选中的能源配置
                  cmdAirshipArr[orbit].energy = energyArr[i];
              }
          }
           
          commander.send(cmdAirshipArr[orbit]);
        }
          choose.style.display = "none";
          removeEvent("click",btns, create);
  }

}

function ten2two(num) {
    var tempArr = [0, 0, 0, 0, 0, 0, 0, 0];
    var temp = 7;
    while (num > 0) {
        tempArr[temp --] = num % 2;
        num = Math.floor(num / 2);
    }
    return tempArr.join('');
}

var spaceshiplist=[0,0,0,0];
function spaceship (user) {
    this.orbit = user.id;
    this.dynamical = user.dynamical;
    this.energy = user.energy;
    this.useEnergy = user.useEnergy;
    this.energyType = user.energyType;
    this.dynamicalType = user.dynamicalType;

    //总能源
    this.hp = 100;
    this.w = 40;
    this.h = 20;
    //矩形中心点 坐标向左向上移动自身宽高的一半
    this.x = 570 + this.orbit * 40;
    this.r;
    this.deg = 0;
    this.y = 200;

    this.isFlight = false;
    this.isBoom = false;
    this.frameNum = 0;
    var that = this;

    this.adapter={
      sendTime: 0,
      receive:function(str){
         that.dispose(str);
         var isMe = false;
          for (var i = 0, len = spaceshiplist.length; i < len; i++) {
              //遍历判断自己是不是接受者
              if (that == spaceshiplist[user.id]) {
                  isMe = true;
              }
              break;
            }
            if (isMe) {

              if (user.order === 'fly') {
                  that.fly();
              } else if (user.order === 'stop') {
                  that.stop();
              } else if (user.order === 'destroy') {
                  that.destroy();
              }
          }
      },

      send:function(){
        var tempuser = {};
        tempuser.id = that.orbit;
        tempuser.energyType = that.energyType;
        tempuser.dynamicalType = that.dynamicalType;
        tempuser.order = user.order;
        var part = ''; 
       
        if( that.isBoom){
          tempuser.order = 'destroy';
          part = encode(tempuser); 
          part += ten2two( that.hp );
          Bus.sendorder(part);
        }
        this.sendTime ++;

        if(this.sendTime % 500 == 0) {

          if( user.order!=='create' && !that.isFlight){
            tempuser.order = 'stop';
            user.order = 'stop';            
          }
            part = encode(tempuser); 
            part += ten2two( that.hp );
            Bus.sendorder(part);
            this.sendTime = 0;
          }
      }
    };

    this.dispose = function(str){
      switch(str.substr(0,2)){
        case '00':user.id= 0;
        break;

        case '01':user.id= 1;
        break;

        case '10':user.id = 2 ;
        break;

        case '11':user.id = 3;
        break;        
      }

      switch(str.substr(6)){
        case '00':user.order='create';
        break;

        case '01':user.order='fly';
        break;

        case '10':user.order = 'stop';
        break;

        case '11':user.order = 'destroy';
        break;        
      }
    };
  
      this.draw = function(){
        this.frameNum++;
        context.fillStyle = 'green';
        context.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      },
      this.fly = function(){
        this.isFlight = 1;
        this.r = 70 + this.orbit * 40;
        this.deg += this.dynamical;
        this.deg = this.deg%360;
        this.x = 500 + this.r * Math.cos(Math.PI / 180 * this.deg);
        this.y = 200 + this.r * Math.sin(Math.PI / 180 * this.deg);
      },
      this.stop=function(){
        this.isFlight = 0;
      },
      this.destroy=function(){
        spaceshiplist.splice(this.orbit,1,0);
      },
      this.restore=function(){
         if (this.isFlight) {
                return;
          }
         if (this.frameNum % 50 == 0) {
            this.hp += this.energy;
            this.hp = this.hp > 100 ? 100 : this.hp;
        }
        context.font = "12px Microsoft YaHei";
        context.fillStyle = '#fff';
        context.fillText(this.hp + '%', this.x - 15, this.y + 5);

        },
        this.consume = function() {
            if (!this.isFlight) {
                return;
            }
            if (this.frameNum % 50 == 0) {
                this.hp -= this.useEnergy;
                this.hp = this.hp < 0 ? 0 : this.hp;
            }
            context.font = "12px Microsoft YaHei";
            context.fillStyle = '#fff';
            context.fillText(this.hp + '%', this.x - 15, this.y + 5);

            if (this.hp == 0) {
                this.isFlight = false;
            }
        }
};

animation();

function animation(){
   
   context.clearRect(0, 0, canvas.width, canvas.height);

   planet.drawSelf();
   planet.drawOrbit();

  for (var i = 0; i < spaceshiplist.length; i++) {
        if (spaceshiplist[i] instanceof Object) {
            // console.log(airshipArr[i]);
            spaceshiplist[i].draw();

            spaceshiplist[i].restore();
            spaceshiplist[i].consume();
            spaceshiplist[i].adapter.send();

            if (spaceshiplist[i].isBoom) {
                spaceshiplist[i].destroy();
            }

            if (spaceshiplist[i].isFlight) {
                spaceshiplist[i].fly();
            }
        }
    }
    window.requestAnimationFrame(animation);
}

 var commander={
   // status:{
   //    isfly:[0,0,0,0],
   //    flightstatus:[0,0,0,0]
   // }, 
   send:function(user){

      planet.send(user);
     
   }
 }

 function encode(user){
    var temp = [];
//    temp[user.id]=1;
    switch(user.id){
      case 0: temp.push('00');
      break;

      case 1: temp.push('01');
      break;

      case 2: temp.push('10');
      break;

      case 3: temp.push('11');
      break;
    }

    if(user.energyType % 2 === 0 ){
      user.energyType===0? temp.push('00'):temp.push('10');
    }else{
      temp.push('01');
    }
    if(user.dynamicalType% 2  === 0 ){
      user.dynamicalType===0? temp.push('00'):temp.push('10');
    }else{
      temp.push('01');     
    }
    temp = temp.join('');
    switch(user.order){
      case 'create': temp +='00';
      break;

      case 'fly':temp +='01';
      break;

      case 'stop':temp +='10';
      break;

      case 'destroy':temp +='11';
      break;
    }
    return temp;
  }

//function Bus(user){
var Bus = {
  sendorder:function(str){
    setTimeout( function(){
        if( Math.random() <= 0.1 && str.substr(6)!=="00" ){
           Bus.sendorder(str);
          terminal.innerHTML += "<p class='error'>"+getTime()+" "+"传播失败,再次传播中,指令"
                                +str+"</p>";
         
        }
        else{
          terminal.innerHTML += "<p>"+getTime()+" "+"指令"
                                +str+"传播成功</p>"; 

          for (var i = 0, len = spaceshiplist.length; i < len; i++) {
              if (typeof spaceshiplist[i] == 'object') {
                    spaceshiplist[i].adapter.receive(str);
              }
          }
          planet.receive(str);
       }
      },300);
  }
}