var Target = function  (main) {
    this.x = 0;
    this.y = 0;
    this.main = main;
} 
Target.prototype.init = function() {
    this.coordinate = {
        row: Math.floor(Math.random()*2+ this.main.row-2),
        col: Math.floor(Math.random()*2+ this.main.col),
    }
    this.x = this.coordinate.col * this.main.cellWidth;
    this.y = this.coordinate.row * this.main.cellHeight;
}
Target.prototype.draw = function() {
    this.main.context.save();
    this.main.context.fillStyle = '#F4AF29';
    this.main.context.fillRect(this.x, this.y, this.main.cellWidth, this.main.cellHeight);
    this.main.context.restore();
}