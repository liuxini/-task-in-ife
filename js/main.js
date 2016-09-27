var main = (function () {

    var wrapper, canvas, ctx, // 变量--html结构
        canWidth, canHeight, // 变量--画布宽高，地图单元格大小
        lastTime, // 变量--两次绘制的时间差，动画名
        block, // 变量--blockObj类的对象实例
        hero, // 变量--heroObj类的对象实例
        target, // 变量--targetObj类的对象实例
        defender, // 变量--defenderObj类的对象实例
        map, // 变量--二维数组记录虚拟地图
        bullets, // 子弹池
        path, // 路径
        timer, // 特工运动定时器
        checkAgentTimer, // 特工位置检查定时器
        Level, // 变量--表示第几关
        canRow, // 变量--地图行数
        canCol, // 变量--地图列数
        cellWidth, // 变量--单元格宽度
        isGameOver, // 游戏是否结束
        isGameStart, // 游戏是否开始
        cellHeight; // 变量--单元格高度

    // 各变量初始化
    wrapper = document.getElementById('wrapper');
    canWidth = wrapper.clientWidth;
    canHeight = wrapper.clientHeight;
    canvas = document.createElement('canvas');
    canvas.width = canWidth;
    canvas.height = canHeight;
    canvas.innerHTML = 'Canvas not supported';
    wrapper.appendChild(canvas);
    ctx = canvas.getContext('2d');
    canRow = 30;
    canCol = 25;
    cellWidth = canWidth / canCol;
    cellHeight = canHeight / canRow;
    map = [];
    lastTime = 0;
    bullets = [];
    path = [];
    Level = 1;

    // 游戏初始化
    var init = function () {

        // 创建实例对象
        block = new blockObj();
        hero = new heroObj();
        target = new targetObj();
        defender = new defenderObj();

        // 每隔400ms对特工位置进行检查，看是否处在某个守卫的射击范围之内
        openCheckTimer();

    };

    // 点击事件回调函数
    var handler = function (event) {

        if (!isGameStart) {
            isGameStart = true;
            init();
            update();
            animate();
        } else if (isGameStart && !isGameOver) {
            var bbox,
                coordinates;

            // 获取鼠标点击位置的坐标
            event = event || window.event;
            bbox = canvas.getBoundingClientRect();
            coordinates = {
                row: Math.floor((event.clientY - bbox.top * (canvas.height / bbox.height)) / cellHeight),
                col: Math.floor((event.clientX - bbox.left * (canvas.width / bbox.width)) / cellWidth)
            };

            // 如果鼠标点击的地方是地面或者目标，英雄进行移动
            if (map[coordinates.row][coordinates.col] == 'empty' || map[coordinates.row][coordinates.col] == 'target') {
                heroMove(coordinates.row, coordinates.col);
            }

            // 如果鼠标点击的地方是守卫，则判断英雄能否开枪
            if (map[coordinates.row][coordinates.col] == 'guard') {
                hero.detectGuard(coordinates.row, coordinates.col);
            }

        } else if (isGameStart && isGameOver) {
            isGameOver = false;
            Level = 1;
            openCheckTimer();
            update();
            animate();
        }
    };

    // 开启特工位置检查定时器
    var openCheckTimer = function () {
        // 每隔400ms对特工位置进行检查，看是否处在某个守卫的射击范围之内
        checkAgentTimer = setInterval(function () {
            defender.detectAgent(hero);
        }, 400);
    };

    // 根据路径更新英雄坐标位置
    var heroMove = function (row, col) {
        var temp;
        if (path.length != 0 ) { // 上次移动未完成之前不允许生成新的路径
            return;
        }
        path = aStar([hero.coordinates.col, hero.coordinates.row], [col, row], block.n_path); // 生成路径
        if (path.length != 0) {
            // 每隔50ms更新特工位置
            timer = setInterval(function () {
                temp = path.shift();
                hero.move(temp[1], temp[0]);
                if (temp[0] == target.coordinates.col && temp[1] == target.coordinates.row) {
                    reset();
                    clearInterval(timer);
                }
                if (path.length == 0) {
                    clearInterval(timer);
                }
            }, 50);
        }
    };

    // 生成虚拟地图，初始地面都是empty
    var virsualMap = function () {
        var i,
            j;
        for(i = 0; i < canRow; i++){
            map[i] = [];
            for (j = 0; j < canCol; j++) {
                map[i][j] = 'empty';
            }
        }
    };

    // 事件添加函数
    var addEvent = function (elem, type, handler) {
        if (window.addEventListener) {
            addEvent = function (elem, type, handler) {
                elem.addEventListener(type, handler, false);
            };
        } else if (window.attachEvent) {
            addEvent = function (elem, type, handler) {
                elem.attachEvent('on' + type, handler);
            };
        } else {
            addEvent = function (elem, type, handler) {
                elem['on' + type] = handler;
            };
        }
        addEvent(elem, type, handler);
    };

    // 事件移除函数
    var removeEvent = function (elem, type, handler) {
        if (window.removeEventListener) {
            removeEvent = function (elem, type, handler) {
                elem.removeEventListener(type, handler, false);
            };
        } else if (window.detachEvent) {
            removeEvent = function (elem, type, handler) {
                elem.detachEvent('on' + type, handler);
            };
        } else {
            removeEvent = function (elem, type, handler) {
                elem['on' + type] = null;
            };
        }
        addEvent(elem, type, handler);
    };

    // 更新游戏初始内容
    var update = function () {
        virsualMap();
        hero.init();
        target.init();
        defender.init();
        defender.buildMap();
        block.buildMap();
    };

    // 更新子弹位置并且绘制
    var updateBullet = function () {
        var row,
            col,
            i,
            j;
        for (i = 0; i < bullets.length; i++) {
            bullets[i].posX += bullets[i].speed * bullets[i].dirX;
            bullets[i].posY += bullets[i].speed * bullets[i].dirY;
            row = Math.floor(bullets[i].posY / cellHeight);
            col = Math.floor(bullets[i].posX / cellWidth);
            // 子弹打在墙上或者边界上
            if (row < 0 || row > canRow - 1 || col < 0 || col > canCol - 1 || map[row][col] == 'wall') {
                bullets.splice(i, 1);
                continue;
            }
            // 来自守卫的子弹
            if (bullets[i].shooter.name == 'defender' && row == hero.coordinates.row && col == hero.coordinates.col) {
                isGameOver = true; // 特工中枪
                return;
            }
            // 来自特工的子弹
            if (bullets[i].shooter.name == 'hero') {
                for (j = 0; j < defender.defenders.length; j++) { // 检查特工射击的是哪一个守卫
                    if (defender.defenders[j].row == row && defender.defenders[j].col == col) { // 子弹命中守卫
                        bullets.splice(i, 1); // 清除子弹
                        defender.defenders.splice(j, 1); // 清除守卫
                        break;
                    }
                }
            }
        }
    };

    // 绘制子弹池里存在的所有子弹
    var drawBullet = function () {
        for (var i = 0; i < bullets.length; i++) {
            bullets[i].draw();
        }
    };

    // 绘制
    var draw = function () {
        // 每次绘制之前先清除画布
        ctx.clearRect(0, 0, canWidth, canHeight);
        // 画特工
        hero.draw();
        // 画目标
        target.draw();
        // 画守卫者
        defender.draw();
        // 画障碍物
        block.draw();
        // 更新子弹位置并绘制出来
        updateBullet();
        drawBullet();
    };

    // 游戏结束
    var gameOver = function () {
        clearInterval(checkAgentTimer); // 清除特工位置检查定时器
        clearBullets(); // 清除子弹池
        ctx.clearRect(0, 0, canWidth, canHeight); // 清除画布
        ctx.font = '30px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'cornflowerblue';
        ctx.fillText('你在第' + Level + '关失败了', canWidth * 0.5, canHeight * 0.5 - 70);
        ctx.fillText('胜败乃兵家常事，大侠请重新来过', canWidth * 0.5, canHeight * 0.5 - 30);
        ctx.fillText('点击屏幕继续游戏', canWidth * 0.5, canHeight * 0.5 + 10);
    };

    // 游戏主循环
    var animate = function () { // 画布循环绘制函数
        draw();
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = 'cornflowerblue';
        ctx.fillText(calculateFps().toFixed() + 'fps', 10, 20);
        ctx.fillText('第' + Level + '关', 50, 20);
        if (!isGameOver) { // 如果游戏没结束，继续动画循环
            requestAnimationFrame(animate);
        } else { // 游戏结束
            gameOver();
        }
    };

    // 计算帧率
    var calculateFps = function () {
        var now = (+new Date),
            fps = 1000 / (now - lastTime);
        lastTime = now;
        return fps;
    };

    // 开始游戏入口
    var startGame = function () { // 调用函数
        isGameOver = false;
        isGameStart = false;
        ctx.font = '50px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = 'cornflowerblue';
        ctx.fillText('王牌特工', canWidth * 0.5, canHeight * 0.5 - 50);
        ctx.font = '20px sans-serif';
        ctx.fillText('点击屏幕开始游戏', canWidth * 0.5, canHeight * 0.5 + 60);
        // 添加点击事件
        addEvent(canvas, 'click', handler);
    };

    // 清空子弹池，直接bullets = []有问题
    var clearBullets = function () {
        while (bullets.length != 0) {
            bullets.shift();
        }
    };

    // 下一关重置函数
    var reset = function () { // 重置函数
        clearBullets(); // 清除上一关的子弹池
        Level++; // 关数增加
        update(); // 更新内容
    };

    // 返回接口
    return {
        bullets: bullets,
        ctx: ctx,
        canRow: canRow, 
        canCol: canCol,
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        map: map,
        startGame: startGame
    };

})();