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
  }

};

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

var spaceshiplist=[0,0,0,0];
function spaceship (user) {
    this.orbit = user.id;
    this.dynamical = user.dynamical;
    this.energy = user.energy;
    this.useEnergy = user.useEnergy;

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

    this.dispose = function(user){
      if( user.order.indexOf('1')>3){
        alert("some error happened");
      }else{
        user.id = user.order.indexOf('1',0);
        switch(user.order.substr(4)){
          case '00':user.order='create';
          break;

          case '01':user.order='fly';
          break;

          case '10':user.order = 'stop';
          break;

          case '11':user.order = 'destroy';
          break;
        }
      }

    }
  
    this.receive = function(user){
      this.dispose(user);
       var isMe = false;
        for (var i = 0, len = spaceshiplist.length; i < len; i++) {
            //遍历判断自己是不是接受者
            if (this == spaceshiplist[user.id]) {
                isMe = true;
            }
            break;
          }
          if (isMe) {

            if (user.order === 'fly') {
                this.fly();
            } else if (user.order === 'stop') {
                this.stop();
            } else if (user.order === 'destroy') {
                this.destroy();
            }
        }
      },
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

            if (spaceshiplist[i].isFlight) {
                spaceshiplist[i].fly();
            }
        }
    }
    window.requestAnimationFrame(animation);
}

 var commander={
   status:{
      isfly:[0,0,0,0],
      flightstatus:[0,0,0,0]
   }, 
   send:function(user){
     switch(user.order){
       case "create":
         if( this.status.flightstatus[user.id]===1 ){
          terminal.innerHTML += "<p class='error'>"+getTime()+"  该飞船已存在</p>";
        }else{
          this.status.flightstatus[user.id] = 1;
          spaceshiplist[user.id] = new spaceship(user);
          terminal.innerHTML += "<p>"+getTime()+" "+(user.id+1)+"号飞船创建成功</p>";
        }
       break;

       case "fly":
       if( this.status.flightstatus[user.id]=== 0){
          terminal.innerHTML += "<p class='error'>"+getTime()+" 该飞船不存在</p>";
       }else{
          this.status.isfly[user.id] =1;
          terminal.innerHTML += "<p>"+getTime()+" "+(user.id+1)+"号飞船开始飞行</p>";
        }        
       break;

       case "stop":
        if( this.status.flightstatus[user.id]=== 0){
          terminal.innerHTML += "<p class='error'>"+getTime()+" 该飞船不存在</p>";
       }else{
          this.status.isfly[user.id]=0;
          terminal.innerHTML += "<p>"+getTime()+" "+(user.id+1)+"号飞船停止</p>";
        }
       break;
       case "destroy":
        if( this.status.flightstatus[user.id]==0){
          terminal.innerHTML += "<p class='error'>"+getTime()+" 该飞船不存在</p>";
        }else{
          this.status.flightstatus[user.id]=0;
          terminal.innerHTML += "<p>"+getTime()+" "+(user.id+1)+" 号飞船已自毁</p>";
        }
       break;
       default:
         alert("error order");
     }

     if( user.order!=="create"){
         Bus.change(user);    
         Bus.sendorder(user);
     }
   }
 }

//function Bus(user){
var Bus = {
  change:function(user){
    var temp = [0,0,0,0];
    temp[user.id]=1;
    temp = temp.join('');
    switch(user.order){
      case 'create': user.order = temp+'00';
      break;

      case 'fly':user.order = temp+'01';
      break;

      case 'stop':user.order = temp+'10';
      break;

      case 'destroy':user.order = temp+'11';
      break;
    }
  },

  sendorder:function(user){
    setTimeout( function(){
        if( Math.random() <= 0.9 && user.order.substr(4)!=="00" ){
           Bus.sendorder(user);
          terminal.innerHTML += "<p class='error'>"+getTime()+" "+"传播失败,再次传播中,指令"
                                +user.order+"</p>";
         
        }
        else{
          for (var i = 0, len = spaceshiplist.length; i < len; i++) {
              if (typeof spaceshiplist[i] == 'object') {
                    spaceshiplist[i].receive(user);
                    Bus.change(user); 
              }
          }
       }
      },300);
  }
}