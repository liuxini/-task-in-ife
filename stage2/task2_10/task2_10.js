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
 var tree={
 	left
 }


window.onload=function(){
	render();
	var btns = document.querySelectorAll("buttons");
	addEvent("click",btns[0],preorder);
	addEvent("click",btns[1],inorder);
	addEvent("click",btns[2],postorder);
}

function render(){

}

function preorder(){

}

function inorder(){

}

function postorder(){

}