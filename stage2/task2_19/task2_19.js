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
var list=[
["北京大学","清华大学","人民大学"],
["复旦大学","上海交通大学","同济大学"],
["中山大学","华南理工大学","南方科技大学"],
["浙江大学","宁波大学","杭州电子科技大学"]
];
(function(){
  var inschool = document.getElementById('in');
  var notschool = document.getElementById('notin');

  addEvent("click",inschool,function(){
     var school = document.querySelector(".inschool");
     document.querySelector(".select").classList.remove("select");
     school.classList.add('select');
  });
  addEvent("click",notin,function(){
     var notin = document.querySelector(".notin");
     document.querySelector(".select").classList.remove("select");
     notin.classList.add('select');
  });
   var option = document.getElementById('address');
     addEvent("change",option,change);
  
})()
change();
function change(){
  var city = document.getElementById('address');
  var school = document.getElementById('univesity');
  school.innerHTML="";
  for( var i=0;i<city.length;i++){
    if(city[i].selected){
      for( var j=0;j<list[i].length;j++){
        var option = document.createElement("option");    //创建option
        option.innerHTML = list[i][j];        //设置option的值  （i-1 是因为chlidNodes是从1开始的）
        option.value = list[i][j];
        school.appendChild(option);
      }
    }
  }
}

