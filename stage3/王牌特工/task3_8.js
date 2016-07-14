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

var main = (function(){
    var block, target, hero ;
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    var canvas = document.querySelector('canvas');
    var context = this.canvas.getContext("2d");
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    var row = 30, col = 25;
    var cellWidth = window.innerWidth/col ;
    var cellHeight = window.innerHeight/row;

    var init = function() {
        block = new Block( Main );
        arget = new Target( Main );
        hero = new Hero( Main );

        addEvent( "click",this.canvas,function(event) {
            var event = event || window.event;
            var 

        });
    }

    var initobj = function() {
        
    }

})();



Main.prototype.startgame = function() {
    this.init();
    this.game();
}