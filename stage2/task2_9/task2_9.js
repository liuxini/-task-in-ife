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
	addEvent("keyup",input,setTag);
	addEvent("click",btn,setHobbies);
	addEvent("mouseover",list,isDelete);
	addEvent("mouseout",list,leave);
	addEvent("click",list,Delete);
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

function setTag(e){
	if(e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188){
		var input= document.querySelector("input");
		var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
		var insertTag = input.value.split(reg);
		var temp={};

		for( var i=0;i<tags.length;i++ ){
			temp[tags[i]] =1;
		}
		for( var i=0;i<insertTag.length;i++){
			if( insertTag[i] ==="")continue;
			if(  temp[insertTag[i]] ===1){
				alert("重复了");
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
}

function setHobbies(){
	var textarea = document.querySelector("textarea");
	var reg = /[^0-9a-zA-Z\u4e00-\u9fa5]+/;
	var insertHobbies = textarea.value.split(reg);
	var temp={};
	for( var i=0;i<hobbies.length;i++ ){
		temp[hobbies[i]] =1;
	}

	for( var i=0;i<insertHobbies.length;i++){
		if( insertHobbies[i] ==="")continue;
		if( temp[insertHobbies[i]] ===1){
			alert("重复了");
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
  if( lastEle.nodeName.toLowerCase() == "li"){
  	lastEle.setAttribute("class","onmouse");
  	lastEle.innerHTML = "是否要删除"+lastEle.innerHTML; 	
  }
}

function leave(){
	var eventnow = event || window.event;
  var lastEle =  eventnow.target || eventnow.srcElement;
  var  queue  = document.querySelector("ul");
  if( lastEle.nodeName.toLowerCase() == "li"){
  	lastEle.setAttribute("class","tags");
  	// alert(lastEle.innerHTML.slice(5,lastEle.innerHTML.length));
  	lastEle.innerHTML = lastEle.innerHTML.slice(5,lastEle.innerHTML.length);
  }
}

function Delete(evevt){
	var eventnow = event || window.event;
  var lastEle =  eventnow.target || eventnow.srcElement;
  var  queue  = document.querySelector("ul");
  if( lastEle.nodeName.toLowerCase() == "li"){
    queue.removeChild(lastEle);
    tags.splice(tags.indexOf(lastEle.innerHTML),1); 
  }
}