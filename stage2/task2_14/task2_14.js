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
})();

var spaceship = function(){

}

 var commander=function(){
   var isfly = [0,0,0,0],
  flightstatus = [0,0,0,0];  
   send:function(user){
     switch( user.order ){
       case "create":
         if( flightstatus[user.id]==1){
          terminal.innerHTML = terminal.innerHTML +getTime()+"<p>该飞船已存在</p>";
        }else{
          flightstatus[user.id] = 1;
        }
       break;
       case "fly":
        if( isfly[user.id]==1){
          terminal.innerHTML = terminal.innerHTML +getTime()+"<p>该飞船已在飞行</p>";
        }else{
          isfly[user.id] =1;
        }
       break;
       case "stop":
        if( isfly[user.id]==0){
          terminal.innerHTML = terminal.innerHTML +getTime()+"<p>该飞船已在停止</p>";
        }else{
          isfly[user.id]=0;
        }
       break;
       case "destroy":
        if( flightstatus[user.id]==0){
          terminal.innerHTML = terminal.innerHTML +getTime()+"<p>该飞船不存在</p>";
        }else{
          flightstatus[user.id]=0;
        }
       break;
       default:
         alert("error order");
     }
     mediator(user);
   }
 }

function mediator(user){
  setTimeout( function(){
    if( Math.random()>0.3){
      
  }
},1000);
}