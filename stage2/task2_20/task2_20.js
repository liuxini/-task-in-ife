function FormList(name,type,func,rules,success){
  this.label=name;
  this.type=type;
  this.validator=func;
  this.rules=rules;
  this.success=success;
};

var check = (function(){
  var nameArr=["名称不能为空","名称不能包含除中文、英文及数字以外的字符","名称长度过短","名称长度过长","名称可用"]
  var passwordArr=["密码不能为空","密码不能包含除英文及数字以外的字符","密码长度过短","密码长度过长","密码可用"]
  var againArr=["俩次密码不相同","请正确输入第一次密码","密码正确"];
  var emailArr=["名称不能为空","邮箱格式错误","邮箱格式正确"];
  var phoneArr=["手机号码不能为空","手机号码格式错误","手机号码格式正确"];
  var nowPassword="";
  var passwordRight=false;
  function formList(name,func,rule){
      this.label=name;
      this.validator=func;
      this.rules=rule;
  }
  formList.prototype.type="input";
  formList.prototype.success="格式正确";
  formList.prototype.fail="名称不能为空";
  return{
    checkName:function (str){
      var count=0;
      if(str==="")return nameArr[0];
      else if(/[^0-9a-z\u4e00-\u9fa5]/i.test(str))return nameArr[1];
      else {
        for(var i=0;i<str.length;i++){
          if(/[a-z0-9]/i.test(str[i]))count++;
          else count+=2;
        }
        if(count<4)return nameArr[2];
        if(count>18)return nameArr[3];
      }
      return nameArr[4];
    },
    checkPassword:function(str){
      var count=0;
      passwordRight=false;
      if(str==="")return passwordArr[0];
      else if(/[^0-9a-z]/gi.test(str))return passwordArr[1];
      else {
        if(str.length<9)return passwordArr[2];
        else if(str.length>24)return passwordArr[3];
        else {
          passwordRight=true;
          nowPassword=str;
          return passwordArr[4];
        }
      }
    },
    checkAgain:function(str){
      if(passwordRight){
        if(nowPassword===str)return againArr[2];
        else return againArr[0];
      }
      else return againArr[1];
    },
    checkEmail:function(str){
      if(str==="")return emailArr[0];
      else if(/^[\w]+@([a-z0-9]+\.)+[a-z0-9]{2,4}$/i.test(str))return emailArr[2];
      else return emailArr[1];
    },
    checkPhone:function(str){
      if(str==="")return phoneArr[0];
      else if(/^\d{11}$/.test(str))return phoneArr[2];
      else return phoneArr[1];
    }
  }
})()

var nameInput=new FormList("name","text",check.checkName,"必填，长度为4~18个字符，只允许输入中文、英文字母和数字,中文占2字符","名称可用");
var passwordInput=new FormList("password","password",check.checkPassword,"必填，长度为9~24个字符，只允许输入英文字母和数字","密码可用");
var againInput=new FormList("passwordAgain","password",check.checkAgain,"重复输入密码,俩次密码需相同","密码正确");
var emailInput=new FormList("email","text",check.checkEmail,"必填，请输入正确的邮箱地址","邮箱格式正确");
var phoneInput=new FormList("phone","text",check.checkPhone,"必填，请输入正确的手机号码","手机号码格式正确");
var labelObj={    //将英文label转化为中文
  "name":"名称",
  "password":"密码",
  "passwordAgain":"确认密码",
  "email":"电子邮箱",
  "phone":"手机号码"
}

function addString(obj){
  return "<div><label for=\"" + obj.label + "\">" + labelObj[obj.label]
        + "</label><input type=\"" + obj.type + "\" placeholder=\"请输入"
        + labelObj[obj.label] + "\" id=\"" + obj.label + "\" name=\"" + obj.label 
         + "\"><span id=\"" + obj.label + "Warn\"></span></div>";
}

function addEvent( type, element, fun){
  if(element.addEventListener){
    addEvent = function(type, element, fun){
      element.addEventListener(type,fun,true);};
    }
  else if( element.attachEvent){
    addEvent = function(type,element,fun){
      element.attachEvent('on'+type,fun,true);};
  }else{
    addEvent = function(type,element,fun){
      element['on'+type] =fun;};
   }
   return addEvent(type,element,fun);
}

(function(){
  var btn = document.querySelector("button");
  addEvent("click",btn,submmit);
})()

function submmit(){
  var arr =[],str="";
  var form = document.getElementById("show");
  var style2 = document.getElementById('two');
  var nameradio = document.getElementById('nameradio');
  var passwordradio = document.getElementById('passwordradio');
  // var repasswordinput = document.getElementById('repassword');
  var emailradio= document.getElementById('emailradio');
  var phoneradio = document.getElementById('phoneradio');
  var inputlist = [ nameradio,passwordradio,emailradio,phoneradio];
  var strObj={
    0:[nameInput],
    1:[passwordInput,againInput],//密码与确认密码绑定
    2:[emailInput],
    3:[phoneInput]
  }
  for( var i=0;i<inputlist.length;i++){
    if( inputlist[i].checked){
      arr.push(strObj[i]);
    }
  }
  for(var j=0;j<arr.length;j++){
      for(var k=0;k<arr[j].length;k++){
        str+=addString(arr[j][k]);
      }
    }
  if(style2.checked){
    str=str.replace(/<input/g,"<input style='width:250px;height:30px;margin-bottom:16px;display:inline-block;margin-right:10px'");
  }
  str+='<div><button id="submit">提交</div>';
  form.innerHTML=str;
   (function(){
      var nameinput = document.getElementById('name');
      var passwordinput = document.getElementById('password');
      // var repasswordinput = document.getElementById('repassword');
      var emailinput = document.getElementById('email');
      var phoneinput = document.getElementById('phone');
      var repasswordinput = document.getElementById("passwordAgain");
      var nameWarn=document.getElementById('nameWarn');
      var passwordWarn=document.getElementById('passwordWarn');
      var againWarn=document.getElementById('passwordAgainWarn');
      var emailWarn=document.getElementById('emailWarn');
      var phoneWarn=document.getElementById('phoneWarn');
      var btns = document.getElementById("submit");
    function focusIn(input,text){
        text.style.color="#aaa";
        input.style.borderColor="#ccc";
      }
      if(nameinput){
        addEvent("focus",nameinput,function(){
        nameWarn.innerHTML="长度为4~18个字符，只允许输入中文、英文字母和数字,中文占2字符";
        focusIn(nameinput,nameWarn);
      });
      addEvent("blur",nameinput,function(){
        nameWarn.innerHTML=check.checkName(nameinput.value);
        if(nameWarn.innerHTML=="名称可用"){
          nameinput.style.borderColor="#5fb844";
          nameWarn.style.color="#5fb844";
        }
        else {
          nameinput.style.borderColor="#de0011";
          nameWarn.style.color="#de0011";
        }
    });
    }

    passwordinput&&addEvent("focus",passwordinput,function(){
        passwordWarn.innerHTML="必填，长度为9~24个字符，只允许输入英文字母和数字"
        focusIn(passwordinput,passwordWarn);
      });
      passwordinput&&addEvent("blur",passwordinput,function(){
        passwordWarn.innerHTML=check.checkPassword(passwordinput.value);
        if(passwordWarn.innerHTML=="密码可用"){
          passwordinput.style.borderColor="#5fb844";
          passwordWarninput.style.color="#5fb844";
        }
        else {
          passwordinput.style.borderColor="#de0011";
          passwordWarn.style.color="#de0011";
        }
      });
      repasswordinput&&addEvent("focus",repasswordinput,function(){
        againWarn.innerHTML="请再次输入密码";
        focusIn(repasswordinput,againWarn);
      });
      repasswordinput&&addEvent("blur",repasswordinput,function(){
        againWarn.innerHTML=check.checkAgain(repasswordinput.value);
        if(againWarn.innerHTML=="密码正确"){
          repasswordinput.style.borderColor="#5fb844";
          againWarn.style.color="#5fb844";
        }
        else {
          repasswordinput.style.borderColor="#de0011";
          againWarn.style.color="#de0011";
        }
      });
      emailinput&&addEvent( "focus",emailinput,function(){
        emailWarn.innerHTML="必填，请输入正确的邮箱地址";
        focusIn(emailinput,emailWarn);
      });
      emailinput&&addEvent("blur",emailinput,function(){
        emailWarn.innerHTML=check.checkEmail(emailinput.value);
        if(emailWarn.innerHTML=="邮箱格式正确"){
          emailinput.style.borderColor="#5fb844";
          emailWarn.style.color="#5fb844";
        }
        else {
          emailinput.style.borderColor="#de0011";
          emailWarn.style.color="#de0011";
        }
      });
      phoneinput&&addEvent("focus",phoneinput,function(){
        phoneWarn.innerHTML="必填，请输入正确的手机号码";
        focusIn(phoneinput,phoneWarn);
      });
      phoneinput&&addEvent("blur",phoneinput,function(){
        phoneWarn.innerHTML=check.checkPhone(phoneinput.value);
        if(phoneWarn.innerHTML=="手机号码格式正确"){
          phoneinput.style.borderColor="#5fb844";
          phoneWarn.style.color="#5fb844";
        }
        else {
          phoneinput.style.borderColor="#de0011";
          phoneWarn.style.color="#de0011";
        }
      });
      addEvent("click",btns,function(){
        if((!nameinput||nameinput.style.borderColor=="rgb(95, 184, 68)")&&(!passwordinput||passwordinput.style.borderColor=="rgb(95, 184, 68)")
          &&(!repasswordinput||repasswordinput.style.borderColor=="rgb(95, 184, 68)")&&(!emailinput||emailinput.style.borderColor=="rgb(95, 184, 68)")
          &&(!phoneinput||phoneinput.style.borderColor=="rgb(95, 184, 68)")){
          alert("提交成功");
        }
        else alert("输入有误");
      })
  })();
}