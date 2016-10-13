var heroObj = function () {//hero类声明
    this.x;
    this.y;
    this.speed = 4;
    this.name = 'hero';
};
heroObj.prototype.init = function () { // 成员函数--初始化
    this.coordinates = {
        row: Math.floor(Math.random() * 2),
        col: Math.floor(Math.random() * main.canCol)
    };
    main.map[this.coordinates.row][this.coordinates.col] = 'hero';
    this.x = this.coordinates.col * main.cellWidth;
    this.y = this.coordinates.row * main.cellHeight;
};
heroObj.prototype.draw = function () { // 成员函数--绘制
    main.ctx.save();
    main.ctx.fillStyle = '#44B811';
    main.ctx.fillRect(this.x, this.y, main.cellWidth, main.cellHeight);
    main.ctx.restore();
};
heroObj.prototype.move = function (row, col) { // 成员函数--更新坐标值
    this.x = col * main.cellWidth;
    this.y = row * main.cellHeight;
    this.coordinates = {
        row: row,
        col: col
    };
};
heroObj.prototype.detectGuard = function (row, col) {
    var distance,
        dirX,
        dirY,
        i,
        j,
        disLine,
        endX,
        endY;
    distance = common.euclidean((col * main.cellWidth - this.x), (row * main.cellHeight - this.y));
    dirX = (col * main.cellWidth - this.x) / distance;
    dirY = (row * main.cellHeight - this.y) / distance;
    i = this.x + main.cellWidth / 2;
    j = this.y + main.cellHeight / 2;
    while (true) {
        disLine = common.euclidean((i - this.x - main.cellWidth / 2), (j - this.y - main.cellHeight / 2));
        if (disLine > distance) {
            break;
        }
        i += dirX;
        j += dirY;
        endX = Math.floor(i / main.cellWidth);
        endY = Math.floor(j / main.cellHeight);
        if (main.map[endY][endX] == 'wall') {
            return;
        }
    }
    this.shoot(this.x + main.cellWidth / 2, this.y + main.cellHeight / 2, dirX, dirY, this);
};
heroObj.prototype.shoot = function (i, j, dirX, dirY, shooter) {
    var bullet = new Bullet(i, j, dirX, dirY, shooter);
    main.bullets.push(bullet);
};