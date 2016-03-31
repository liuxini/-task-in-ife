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
(function(e){
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
  
})()