var defenderObj = function () { // defenderObj类声明
    this.defenders = [];
};
// 成员函数--初始化
defenderObj.prototype.init = function () { // 成员函数--初始化
    var i,
        row,
        col;
    this.num = Math.floor(Math.random() * 5); // 随机生成0-4个守卫
    this.field = 2 * (main.cellWidth + main.cellHeight); // 侦察半径
    this.defenders = [];
    for (i = 0; i < this.num; i++) {
        row = Math.floor(Math.random() * (main.canRow - 8) + 4);
        col = Math.floor(Math.random() * main.canCol / this.num + i / this.num * main.canCol);
        this.defenders.push({
            name: 'defender',
            row: row,
            col: col,
            x: col * main.cellWidth,
            y: row * main.cellHeight
        });
    }
};
// 成员函数--绘制
defenderObj.prototype.draw = function () {
    for(var i = 0 ; i < this.defenders.length; i++) {
        main.ctx.save();
        // 画本体
        main.ctx.fillStyle = '#F05F48';
        main.ctx.beginPath();
        main.ctx.rect(this.defenders[i].col * main.cellWidth, this.defenders[i].row * main.cellHeight, main.cellWidth, main.cellHeight);
        main.ctx.fill();
        main.ctx.closePath();
        // 画外圈
        main.ctx.strokeStyle = '#F05F48';
        main.ctx.lineWidth = 1;
        main.ctx.beginPath();
        main.ctx.arc((this.defenders[i].col + 0.5) * main.cellWidth, (this.defenders[i].row + 0.5) * main.cellHeight, this.field, 0, Math.PI * 2);
        main.ctx.stroke();
        main.ctx.closePath();
        main.ctx.restore();
    }
};
// 成员函数--修改虚拟地图
defenderObj.prototype.buildMap = function () {
    for(var i = 0 ; i < this.defenders.length; i++) {
        main.map[this.defenders[i].row][this.defenders[i].col] = 'guard';
    }
};
defenderObj.prototype.detectAgent = function (hero) {
    for (var i = 0; i < this.defenders.length; i++) {
        this.check(this.defenders[i], hero);
    }
};
defenderObj.prototype.check = function (defender, hero) {
    var distance,
        dirX,
        dirY,
        i,
        j,
        disLine,
        endX,
        endY;
    distance = common.euclidean((hero.x - defender.x), (hero.y - defender.y));
    if (distance < this.field) {
        dirX = (hero.x - defender.x) / distance;
        dirY = (hero.y - defender.y) / distance;
        i = defender.x + main.cellWidth / 2;
        j = defender.y + main.cellHeight / 2;
        while (true) {
            disLine = common.euclidean((i - defender.x - main.cellWidth / 2), (j - defender.y - main.cellHeight / 2));
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
        this.shoot(defender.x + main.cellWidth / 2, defender.y + main.cellHeight / 2, dirX, dirY, defender);
    } else {
        return;
    }
};
defenderObj.prototype.shoot = function (i, j, dirX, dirY, shooter) {
    var bullet = new Bullet(i, j, dirX, dirY, shooter);
    main.bullets.push(bullet);
};

