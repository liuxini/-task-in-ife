var Bullet = function (i, j, dirX, dirY, shooter) {
    this.posX = i;
    this.posY = j;
    this.dirX = dirX;
    this.dirY = dirY;
    this.speed = 2;
    this.r = 3;
    this.color = '';
    this.shooter = shooter;
}

Bullet.prototype.draw = function() {
    main.context.beginPath();
    main.context.arc(this.posX, this.posY, this.r, 0, Math.PI * 2, true);
    main.context.closePath();
    main.context.fillStyle = this.color;
    main.context.fill();
};