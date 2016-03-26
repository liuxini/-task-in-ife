var tags=[];
var hobbies = [];
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

window.onload=function(){
	var input = document.querySelector("input");
	var btn = document.querySelector('button');
	var list = document.querySelector("ul");
	addEvent("change",input,setTag);
	addEvent("click",btn,setHobbies);
	addEvent("onmouseover",ul,isDelete);
};
function render(index){
	if(index === 0){
		var ulist = document.querySelectorAll("ul")[1];
		ulist.innerHTML= hobbies.reduce( function(s,v){
			return s+"<li class='hobbies'>"+v+"</li>";
		},"");
	}else{
		var ulist = document.querySelectorAll("ul")[0];
		ulist.innerHTML= tags.reduce( function(s,v){
			return s+"<li class='tags'>"+v+"</li>";
		},"");
	}
}

function setTag(){
	var input= document.querySelector("input");
	var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
	var insertTag = input.value.split(reg);
	for( var i=0;i<insertTag.length;i++){
		alert(insertTag[i]);
		if( insertTag[i] in tags){
			continue;
		}else{
			tags.push(insertTag[i]);
		}
	}
	while(tags.length>10 ){
		tags.shift();
	}
	render(1);
}

function setHobbies(){
	var textarea = document.querySelector("textarea");
	var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
	var insertHobbies = textarea.value.split(reg);
	for( var i=0;i<insertHobbies.length;i++){
		alert(insertHobbies[i]);
		if( insertHobbies[i] in hobbies){
			continue;
		}else{
			hobbies.push(insertHobbies[i]);
		}
	}
	while(hobbies.length>10 ){
		hobbies.shift();
	}
	render(0);
}

function isDelete(evevt){
	var eventnow = event || window.event;
  var lastEle =  eventnow.target || eventnow.srcElement;
  var  queue  = document.querySelector("ul");

}