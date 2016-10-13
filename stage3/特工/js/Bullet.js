/**
 * 子弹对象定义
 * @param x
 * @param y
 *
 */
var Bullet = function (i, j, dirX, dirY, shooter) {
  this.posX = i;
  this.posY = j;
  this.dirX = dirX;
  this.dirY = dirY;
  this.speed = 2;
  this.radius = 3;
  this.color = 'cornflowerblue';
  this.shooter= shooter;
};
Bullet.prototype.draw = function () {
  main.ctx.beginPath();
  main.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, true);
  main.ctx.closePath();
  main.ctx.fillStyle = this.color;
  main.ctx.fill();
};