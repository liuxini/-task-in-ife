var Hero = function  () {
    this.x = 0;
    this.y = 0;
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
    dirY = (row*main.cellHeight-this.y)/distance;
    

}
Hero.prototype.shoot = function(i, j, dirX, dirY, shooter) {
    var bullet = new Bullet(i,j,dirX,dirY,shooter);
    main.bullets.push(bullet);
}