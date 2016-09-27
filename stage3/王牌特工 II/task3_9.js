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
    var block, target, hero,guard,bullets=[] ;
    var map = [], level = 1;
    var time, latetime, loop,checktime;
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
    var coordinate, cell, path=[];

    var init = function() {
        block = new Block();
        target = new Target();
        hero = new Hero();
        guard = new Guard();

        checkTimer();
    }

    var checkTimer = function() {
        checktime = setInterval( function(){
            guard.detect(hero);
        },500);
    }

    var update = function() {
        block.buildMap();
        hero.init();
        target.init();
        guard.init();
        guard.buildMap();
    }

    var handleclick = function(event) {
        var event = event || window.event;
        var box,coordinate;
        if( !isGameStart ) {
            isGameStart = true;
            init();
            update();
            animate();
        } else if ( isGameStart && !isGameOver ) {
            box = canvas.getBoundingClientRect();
            coordinate = {
                row: Math.floor( (event.clientY- box.top*(canvas.height/box.height))/main.cellHeight),
                col: Math.floor( (event.clientX- box.left*(canvas.width/box.width))/main.cellWidth),
            }
            if( map[coordinate.row][coordinate.col].empty && map[coordinate.row][coordinate.col].name !=="guard"){
                move(coordinate.row,coordinate.col);
            }
            if( map[coordinate.row][coordinate.col].name ==="guard" ){
                hero.detectGuard(coordinate.row,coordinate.col);
            }

        } else if ( isGameStart && isGameOver ) {
            isGameOver = false;
            level = 1;
            clearBullets();
            checkTimer();
            update();
            animate();
        }
    }

    var move = function(row,col) {
        var timer, i = 0;;
        if ( path.length !==0 ) {
            return ; 
        }
    
        path = findway(map, map[hero.coordinate.row][hero.coordinate.col], map[row][col]);

        if( path ) {        
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

            },60);
        }
    }

    var updateBullet = function() {
        var bulletRow, bulletCol;
        for( var i=0; i<bullets.length; i++ ) {
            bullets[i].posX += bullets[i].speed * bullets[i].dirX;
            bullets[i].posY += bullets[i].speed * bullets[i].dirY;
            bulletRow = Math.floor(bullets[i].posY / cellHeight);
            bulletCol = Math.floor(bullets[i].posX / cellWidth);
            if( bulletRow<0 || bulletRow> row-1 || bulletCol<0 || bulletCol>col-1|| map[bulletRow][bulletCol].empty===false ) {
                bullets.splice(i,1);
                continue;
            }
            if( bullets[i].shooter.name==='guard' && bulletRow===hero.coordinate.row && bulletCol===hero.coordinate.col ) {
                isGameOver = true;
                return ;
            }

            if( bullets[i].shooter.name==='hero') {
                for( var j=0; j<guard.guards.length;j++ ) {
                    if( guard.guards[j].row === bulletRow && guard.guards[j].col === bulletCol) {
                        bullets.splice(i,1);
                        guard.guards.splice(j,1);
                        break;
                    }
                }
            }
        }
    };

    var drawBullet = function() {
        for( var i=0; i<bullets.length;i++) {
            bullets[i].draw();
        }
    }

    var draw = function() {
        context.clearRect( 0,0,canvas.width,canvas.height);
        block.draw();
        hero.draw();
        target.draw();
        guard.draw();
        updateBullet();
        drawBullet();
    }

    var gameOver = function() {
       clearInterval(checkTimer);
       clearBullets();
       context.clearRect( 0,0,canvas.width,canvas.height);
       context.font = "30px";
       context.textAlign = "center";
       context.fillStyle = "cornflowerblue";
       context.fillText('你在第' + level + '关失败了', canvas.width * 0.5, canvas.height * 0.5 - 70);
       context.fillText('胜败乃兵家常事，大侠请重新来过', canvas.width * 0.5, canvas.height * 0.5 - 30);
       context.fillText('点击屏幕继续游戏', canvas.width * 0.5, canvas.height * 0.5 + 10);
    };

    var animate = function() {
        draw();
        context.font = "5px";
        context.textAlign = "left";
        context.fillStyle = "cornflowerblue";
        context.fillText('第' + level + '关', 50, 20);
        if( !isGameOver ) {
            window.requestAnimationFrame(animate);
        } else {
            gameOver();
        }
    };

    var startgame = function() {
        isGameOver = false;
        isGameStart = false;
        context.font = "50px sans-serif";
        context.textAlign = "center";
        context.fillStyle = "cornflowerblue";
        context.fillText('王牌特工', canvas.width * 0.5, canvas.height * 0.5 - 50);
        context.font = '20px sans-serif';
        context.fillText('点击屏幕开始游戏', canvas.width * 0.5, canvas.height * 0.5 + 60);
        // 添加点击事件
        addEvent('click',canvas,  handleclick);
    };

    var clearBullets = function() {
         while( bullets.length!==0 ) {
             bullets.shift();
         }
        // bullets = [];
    }

    var reset = function() {
       clearBullets();
        level++;
        update();
    }

    return{
        bullets: bullets,
        context: context,
        map: map,
        row: row,
        col: col,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        startgame: startgame,
    }

})();



