 function check(){
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
        input.style.border="1px solid red";
        show.style.color="red";
        show.innerHTML="姓名不能为空";
      }else if(getLength()<4||getLength()>16){
        input.style.border="1px solid red";
        show.style.color="red";
        show.innerHTML="长度为4-16个字符";
      }else{
        input.style.border="1px solid green";
        show.style.color="green";
        show.innerHTML="格式正确";
      }
    }