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
    var map = [], level = 1;
    var time, latetime, loop;
    window.requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame;
    var canvas = document.querySelector('canvas');
    var context = canvas.getContext("2d");
    canvas.width = document.querySelector('.contant-wrapper').clientWidth;
    canvas.height = document.querySelector('.contant-wrapper').clientHeight;
    var row = 30, col = 25;
    var cellWidth = canvas.width/col ;
    var cellHeight = canvas.height/row;
    var coordinate, cell, path;

    var init = function() {
        block = new Block();
        target = new Target();
        hero = new Hero();
        // initobj();
        addEvent( "click",canvas,function(event) {
            var event = event || window.event;
            var timer;
            var box = canvas.getBoundingClientRect(),
                coordinate = { 
                    x: event.clientX - box.left * (canvas.width / box.width),
                    y: event.clientY - box.top * (canvas.height / box.height)
                },
                cell = {
                    row: Math.floor( coordinate.y/cellHeight),
                    col: Math.floor( coordinate.x/cellWidth),
                };
                path = findway(map, map[hero.coordinate.row][hero.coordinate.col], map[cell.row][cell.col]);
                if( path ) {
                    var i = 0;
                    timer = setInterval( function(){
                        hero.move( path[i].row,path[i].col);
                        if( path[i].row === target.coordinate.row && path[i].col === target.coordinate.col ) {
                            path = [];
                            reset();
                            clearInterval(timer);
                        }
                        i++;
                        if( i>=path.length ) {
                            path = [];
                            clearInterval(timer);
                        }

                    },time);
                }


        });
        initobj();
    }

    var initobj = function() {
        latetime = Date.now();
        time = 0;
        block.buildMap();
        hero.init();
        target.init();
    }

    var game = function() {
        time = Date.now() - latetime;
        latetime = Date.now();
        context.clearRect(0,0,canvas.width,canvas.height);
        block.draw();
        hero.draw();
        target.draw();
        loop = window.requestAnimationFrame(game);
    }

    var startgame = function() {
        init();
        game();
    }
    var reset = function() {
        cancelAnimationFrame(loop);
        level++;
        initobj();
        game();
    }

    return{
        canvas: canvas,
        context: context,
        map: map,
        row: row,
        col: col,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        startgame: startgame,
    }

})();



