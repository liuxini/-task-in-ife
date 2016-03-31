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

(function(){
  var inputlist = document.querySelector("form");
  var btn = document.querySelector("button");
  inputlist.addEventListener("focus",function(e){
    var e = e || window.event,
    target = e.target || e.srcElement;
    if (target.tagName.toLowerCase() === 'input'){
      if (document.querySelector('.select')) {
        document.querySelector('.select').classList.remove('select');
      }
      e.stopPropagation();
      var parent = target.parentNode;
      parent.classList.add('select');
     }
  },true);
  inputlist.addEventListener("blur",function(e){
    var e = e || window.event,
    target = e.target || e.srcElement;
    if (target.tagName.toLowerCase() === 'input'){
      blurCheck(target);
    }
  },true);
   addEvent("click",btn,submit);
})()

function submit(){
  if( !checkname()||!checkpassword()||!checkrepassword()||
    !checkemail()||!checkphone()){
    alert("提交失败");
  }
  else{
    alert("提交成功");
  }
}

function blurCheck(target){
  switch (target.name) {
    case "name": 
      checkname();
      break;
    case "password":
      checkpassword();
      break;
    case "repassword":
      checkrepassword();
      break;
    case "email":
      checkemail();
      break;
    case "phone":
      checkphone();
      break;
    default:
      break;
  }
}

function errorinput(input, tips, message){
  input.className = 'errorInput';
  tips.className = 'errorTips';
  tips.innerText = message;
}

function rightinput(input, tips, message){
  input.className = 'rightInput';
  tips.className = 'rightTips';
  tips.innerText = message;
}

 function checkname(){
  var input = document.getElementById('name');
  var show = document.querySelector("p");
  var getLength=function(){
    var count =0;
    for( let i=0;i<input.value.length;i++){
      if(input.value.match(/[0-9a-zA-Z]/)){
        count++;
      }else if(input.value.match(/[\u4e00-\u9fa5]/)){
        count=count+2;
      }
    }
    return count;
  }
  if(input.value===""){ 
    errorinput(input,show,"姓名不能为空");
    return false;
  }
  else if(getLength()<4||getLength()>16){
    errorinput(input,show,"长度为4-16个字符");
    return false;
  }else{
    rightinput(input,show,"格式正确");
    return true;
  }
}

function checkpassword(){
  var input = document.getElementById('password');
  var show = document.querySelectorAll("p")[1];
   if(input.value===""){ 
    errorinput(input,show,"不能为空");
    return false;
  }
  else if(input.value.length<4||input.value.length>16){
    errorinput(input,show,"长度为4-16个字符");
    return false;
  }else{
    rightinput(input,show,"格式正确");
    return true;
  }
}

function checkrepassword(){
  var input = document.getElementById('repassword');
   var password = document.getElementById('password');
  var show = document.querySelectorAll("p")[2];
  if(input.value===""){ 
    errorinput(input,show,"不能为空");
    return false;
  }
  else if( input.value!==password.value ){
    errorinput(input,show,"与输入密码不一致");
    return false;
  }else{
     rightinput(input,show,"格式正确");
     return true;
  }
}

function checkemail(){
  var input = document.getElementById('email');
  var show = document.querySelectorAll("p")[3];
  var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(input.value===""){ 
    errorinput(input,show,"不能为空");
    return false;
  }
  else if(reg.test(input.value)){
    errorinput(input,show,"格式不正确");
    return false;
  }else{
    rightinput(input,show,"格式正确");
    return true;
  }
}

function checkphone(){
  var input = document.getElementById('email');
  var show = document.querySelectorAll("p")[4];
  var reg = /^\d{11}$/;
  if(input.value===""){ 
    errorinput(input,show,"不能为空");
    return false;
  }
  else if(reg.test(input.value)){
    errorinput(input,show,"格式不正确");
    return false;
  }else{
    rightinput(input,show,"格式正确");
    return true;
  }
}