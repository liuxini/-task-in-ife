var Target = function  () {
    this.x = 0;
    this.y = 0;
} 
Target.prototype.init = function() {
    do {
        this.coordinate = {
            row: Math.floor(Math.random()*2+ main.row-2),
            col: Math.floor(Math.random()*main.col),
        }
    } while( main.map[this.coordinate.row][this.coordinate.col].empty === false );
    this.x = this.coordinate.col * main.cellWidth;
    this.y = this.coordinate.row * main.cellHeight;

}
Target.prototype.draw = function() {
    main.context.save();
    main.context.fillStyle = '#F4AF29';
    main.context.fillRect(this.x, this.y, main.cellWidth, main.cellHeight);
    main.context.restore();
}