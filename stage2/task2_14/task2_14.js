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

function getTime(){
  var date = new Date();
  var year = ("0000" + date.getFullYear()).substr(-4),
      month = ("00" + (date.getMonth() + 1)).substr(-2),
      day = ("00" + date.getDay()).substr(-2),
      hour = ("00" + date.getHours()).substr(-2),
      minute = ("00" + date.getMinutes()).substr(-2),
      second = ("00" + date.getSeconds()).substr(-2),
      millisecond = ("000" + date.getMilliseconds()).substr(-3);
  return year + "-" + month + "-" + day + " " + hour + ":" + minute 
        + ":" + second + "." + millisecond ;
};

var terminal = document.querySelector(".terminal");

(function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext("2d");
 
  context.arc(500,200,40,0,Math.PI*2,true);
  context.fillStyle = 'green';
  context.fill();
  for( var i=0;i<4;i++){
    context.beginPath();
    context.arc(500,200,70+i*30,0,Math.PI*2,true);
    context.strokeStyle = 'green';
    context.stroke();
  } 
  context.closePath();
  var console = document.querySelector(".console");
  addEvent("click",console,function(ev){
    var e = ev||window.event;
    var order = e.target||e.srcElement;
    if(order.className.toLowerCase()=="order"){
      
     }
  });
  
})();

var spaceshiplist=[0,0,0,0];
function spaceship (user) {
    this.orbit = user.id;
    this.dynamical = user.dynamical;
    this.energy = user.energy;
    this.useEnergy = user.useEnergy;

    //总能源
    this.hp = 100;
    this.w = 60;
    this.h = 20;
    //矩形中心点 坐标向左向上移动自身宽高的一半
    this.x = 550 + this.orbit * 50;
    this.r;
    this.deg = 0;
    this.y = 400;

    this.isFlight = false;
    this.isBoom = false;
    this.frameNum = 0;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    this.receive = function(user){
       var isMe = false;
        for (var i = 0, len = spaceshiplist.length; i < len; i++) {
            //遍历判断自己是不是接受者
            if (this == spaceshiplist[user.id]) {
                isMe = true;
            }
            break;
          }
          if (isMe) {

            if (user.command === 'flight') {
                this.fly();
            } else if (user.command === 'stop') {
                this.stop();
            } else if (user.command === 'boom') {
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
        this.r = 70 + this.orbit * 30;
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
        context.font = "15px Microsoft YaHei";
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
            context.font = "15px Microsoft YaHei";
            context.fillStyle = '#fff';
            context.fillText(this.hp + '%', this.x - 15, this.y + 5);

            if (this.hp == 0) {
                this.isFlight = false;
            }
        }
};

animation();

function animation(){

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
}

 var commander={
   status:{
      isfly : [0,0,0,0],
      flightstatus : [0,0,0,0]
   }, 
   send:function(user){
     switch(user.order){
       case "create":
         if( status.flightstatus[user.id]==1){
          terminal.innerHTML += getTime()+"<p class='error'>该飞船已存在</p>";
        }else{
          status.flightstatus[user.id] = 1;
          spaceshiplist[user.id] = new spaceship(user);
          terminal.innerHTML += getTime()+"<p>"+user.id+"号飞船创建成功</p>";
        }
       break;
       case "fly":
       if( status.flightstatus[user.id]==0){
          terminal.innerHTML += getTime()+"<p class='error'>该飞船不存在</p>";
       }else if( status.isfly[user.id]==1){
          terminal.innerHTML += getTime()+"<p class='error'>该飞船已在飞行</p>";
        }else{
          status.isfly[user.id] =1;
        }
       break;
       case "stop":
        if( status.flightstatus[user.id]==0){
          terminal.innerHTML += getTime()+"<p class='error'>该飞船不存在</p>";
       }else if( status.isfly[user.id]==0){
          terminal.innerHTML +=getTime()+"<p class='error'>该飞船已在停止</p>";
        }else{
          status.isfly[user.id]=0;
        }
       break;
       case "destroy":
        if( status.flightstatus[user.id]==0){
          terminal.innerHTML += getTime()+"<p class='error'>该飞船不存在</p>";
        }else{
          status.flightstatus[user.id]=0;
        }
       break;
       default:
         alert("error order");
     }
     mediator(user);
   }
 }

function mediator(user){
  if( Math.random() < 0.3){
    terminal.lastElementChild.setAttribute("class","error");
  }
  setTimeout( function(){
  
      for (var i = 0, len = spaceshiplist.length; i < len; i++) {
          if (typeof spaceshiplist[i] == 'object') {
                spaceshiplist[i].receive(user);
          }
      }
   
  },1000);
}