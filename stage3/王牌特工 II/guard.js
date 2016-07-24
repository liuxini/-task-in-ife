var Guard = function(){
    this.guards = [];
    // this.num = 1;
}

Guard.prototype.init = function() {
    var i, row, col;
    this.guards = [];
    this.num = Math.floor(Math.random()*5);
    this.field = 2*( main.cellWidth+main.cellHeight);
    for ( i=0; i<this.num;i++ ) {
        do {
            row = Math.floor( Math.random()*(main.row-6)+3 );
            col = Math.floor( (Math.random()+i )*main.col/this.num );
        } while( main.map[row][col].empty===false );
       
        this.guards.push({
            name:'guard',
            row: row,
            col: col,
            x: col * main.cellWidth,
            y: row * main.cellHeight,
        });
    }
}

Guard.prototype.draw = function() {
    for( var i=0; i<this.guards.length; i++ ) {
        main.context.save();

        main.context.fillStyle ="#f05f48" ;
        main.context.beginPath();
        main.context.rect(this.guards[i].col * main.cellWidth, this.guards[i].row * main.cellHeight, main.cellWidth, main.cellHeight);
        main.context.fill();
        main.context.closePath();

        main.context.strokeStyle = "#F05F48";
        main.context.lineWidth = 1;
        main.context.beginPath();
        main.context.arc( this.guards[i].x+main.cellWidth/2,this.guards[i].y+main.cellHeight/2,this.field,0,Math.PI*2);
        main.context.stroke();
        main.context.closePath();
        main.context.restore();
    }
}

Guard.prototype.buildMap = function() {
    for( var i=0; i<this.guards.length; i++ ) {
        main.map[this.guards[i].row][this.guards[i].col].name = "guard";
    }
}

Guard.prototype.detect = function(hero) {
    for( var i=0; i<this.guards.length; i++ ) {
        this.check( this.guards[i],hero);
    }
}

Guard.prototype.check = function(guard,hero) {
    var distance,dirX,dirY,line,endx,endy;
    var i, j;
    distance = Math.sqrt( Math.pow( hero.x-guard.x,2)+Math.pow(hero.y-guard.y,2));
    
    if( distance<this.field) {
        dirX = (hero.x-guard.x)/distance;
        dirY = (hero.y-guard.y)/distance;
        i = guard.x + main.cellWidth/2;
        j = guard.y + main.cellHeight/2;    

        while( true ) {
            line = Math.sqrt( Math.pow( i-guard.x-main.cellWidth/2,2)+Math.pow( j-guard.y-main.cellHeight/2,2));
            if( line>distance ) {
                break;
            }
            i += dirX;
            j += dirY;
            endx = Math.floor( i/main.cellWidth);
            endy = Math.floor( j/main.cellHeight);
            if( main.map[endy][endx].empty === false ) {
                return ;
            }
        }
        this.shoot( guard.x + main.cellWidth/2, guard.y+main.cellHeight/2, dirX, dirY, guard);
    } else {
        return ;
    }

}

Guard.prototype.shoot = function(i,j,dirX,dirY,shooter) {
    var bullet = new Bullet(i,j,dirX,dirY,shooter);
    main.bullets.push(bullet);
}