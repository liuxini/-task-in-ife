var targetObj = function () { // target类声明
    this.x;
    this.y;
};
targetObj.prototype.init = function () {//成员函数--初始化
    this.coordinates = {
        row: Math.floor(Math.random() * 2 + main.canRow - 2),
        col: Math.floor(Math.random() * main.canCol)
    };
    main.map[this.coordinates.row][this.coordinates.col] = 'target';
    this.x = this.coordinates.col * main.cellWidth;
    this.y = this.coordinates.row * main.cellHeight;
};
targetObj.prototype.draw = function () {//成员函数--绘制
    main.ctx.save();
    main.ctx.fillStyle = '#F4AF29';
    main.ctx.fillRect(this.x, this.y, main.cellWidth, main.cellHeight);
    main.ctx.restore();
};