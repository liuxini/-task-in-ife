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

(function () {
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext("2d");
  context.beginPath();
  context.arc(200,100,50,0,Math.PI*2,true);
  context.closePath();
  context.fillStyle = 'green';
  context.fill();
})();