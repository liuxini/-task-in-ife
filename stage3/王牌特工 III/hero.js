var Hero = function  () {
    this.x = 0;
    this.y = 0;
    this.speed = 4;
    this.name = 'hero';
}
Hero.prototype.init = function(){
    do{
        this.coordinate = {
            row: Math.floor(Math.random()*2),
            col: Math.floor(Math.random()*main.col),
        }
     } while( main.map[this.coordinate.row][this.coordinate.col].empty === false );
    this.x = this.coordinate.col * main.cellWidth;
    this.y = this.coordinate.row * main.cellHeight;

}
Hero.prototype.draw = function(){
    main.context.save();
    main.context.fillStyle = '#44B811';
    main.context.fillRect(this.x, this.y, main.cellWidth, main.cellHeight);
    main.context.restore();
}
Hero.prototype.move = function(row,col){
    this.x = col * main.cellWidth;
    this.y = row * main.cellHeight;
    this.coordinate = {
        row: row,
        col: col,
    }
}
Hero.prototype.detectGuard = function( row,col ) {
    var distance, dirX, dirY, line, endx, endy, i, j;
    distance = Math.sqrt(Math.pow( (col * main.cellWidth - this.x),2)+Math.pow((row*main.cellHeight-this.y),2));
    dirX = (col * main.cellWidth - this.x)/distance;
    dirY = (row * main.cellHeight-this.y)/distance;
    i = this.x + main.cellWidth/2;
    j = this.y + main.cellHeight/2;
    while(true) {
        line =  Math.sqrt(Math.pow( (i-this.x - main.cellWidth/2 ),2)+Math.pow((j-this.y-main.cellHeight/2),2));
        if( line> distance ) {
            break;
        }
        i += dirX;
        j += dirY;
        endx = Math.floor(i/main.cellWidth);
        endy = Math.floor(j/main.cellHeight);;
        if( main.map[endy][endx].empty === false ) {
            return;
        }
    }
    this.shoot( this.x+main.cellWidth/2, this.y+main.cellHeight/2, dirX, dirY, this);
}
Hero.prototype.shoot = function(i, j, dirX, dirY, shooter) {
    var bullet = new Bullet(i,j,dirX,dirY,shooter);
    main.bullets.push(bullet);
};
Hero.prototype.reset = function() {
    this.coordinate.row -= Math.floor(main.row/2);
    this.y = this.coordinate.row * main.cellHeight; 
};
