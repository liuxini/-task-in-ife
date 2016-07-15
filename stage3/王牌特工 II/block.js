var Block = function() {
    this.num = 100;
};

Block.prototype.buildMap = function() {
    var i, j;
    var row, col;
    for( i = 0; i < main.row; i++ ) {
        main.map[i] = [];
        for( j = 0; j < main.col; j++ ) {
            main.map[i][j] = {
                row: i,
                col: j,
                empty: true,
            }
        }
    }
    i = 0;
    while( i<this.num ) {
        row = Math.floor( Math.random()* (main.row-2));
        col = Math.floor(Math.random() * main.col);
        if( main.map[row][col].empty === true ) {
            main.map[row][col].empty = false;
            i++;
        }
    }

};

Block.prototype.draw = function() {
    var i , j ;
    main.context.save();
    main.context.fillStyle = '#000000';
    for( i = 0; i < main.row; i++ ) {
        for( j = 0; j<main.col; j++ ) {
            if( main.map[i][j].empty === false ) {
                main.context.fillRect(j*main.cellWidth,i*main.cellHeight,main.cellWidth,main.cellHeight);
            }
        }
    }
    main.context.restore();
};

