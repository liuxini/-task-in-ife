var Hero = function  (main) {
    this.x = 0;
    this.y = 0;
    this.main = main;
}
Hero.prototype.init = function(){
    this.coordinate = {
        row: Math.floor(Math.random()*2),
        col: Math.floor(Math.random()*this.main.col),
    }
    this.x = this.coordinate.col * this.main.cellWidth;
    this.y = this.coordinate.row * this.main.cellHeight;
}
Hero.prototype.draw = function(){
    this.main.context.save();
    this.main.context.fillStyle = '#44B811';
    this.main.context.fillRect(this.x, this.y, this.main.cellWidth, this.main.cellHeight);
    this.main.context.restore();
}
Hero.prototype.move = function(row,col){
    this.x = col * this.main.cellWidth;
    this.y = row * this.main.cellHeight;
    this.coordinate = {
        row: row,
        col: col,
    }
}