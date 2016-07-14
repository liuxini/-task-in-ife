var Block = function(main) {
    this.num = 100;
    this.main = main;
};

Block.prototype.buildMap = function() {
    var i = 0, j = 0;
    var row, col;
    for( i; i < this.main.row; i++ ) {
        this.main.map[i] = [];
        for( j; j < this.main.col; j++ ) {
            this.main.map[i][j] = {
                row: i,
                col: j,
                empty: true,
            }
        }
    }
    i = 0;
    while( i<this.num ) {
        row = Math.floor( Math.random()* (this.main.row-2));
        col = Math.floor(Math.random() * this.main.col);
        if( this.main.map[row][col].empty === true ) {
            this.main.map[row][col].empty = false;
            i++;
        }
    }
};

Block.prototype.draw = function() {
    var i = 0, j = 0 ;
    this.main.context.save();
    this.main.context.fillStyle = '#000000';
    for( i; i < this.main.row; i++ ) {
        for( j; j<this.main.col; j++ ) {
            if( this.main.map[i][j] === false ) {
                this.main.context.fillRect(j*this.main.cellWidth,i*this.main.cellHeight,this.main.cellWidth,this.main.cellHeight);
            }
        }
    }
    this.main.context.restore();
};

