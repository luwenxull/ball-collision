class Ball {
  constructor(x, y, radius, speed, angle, velocityX, velocityY, mass, loss) {
    this.x = x
    this.y = y
    this.radius = radius
    this.speed = speed
    this.angle = angle
    this.velocityX = velocityX
    this.velocityY = velocityY
    this.mass = mass
    this.nextX = x
    this.nextY = y
    this.loss = loss
  }

  update() {
    this.velocityX = this.velocityX * this.loss
    this.velocityY = this.velocityY * this.loss
    this.nextX = (this.x += this.velocityX);
    this.nextY = (this.y += this.velocityY);
  }

  hasCollide(otherBall) {
    let result = false;
    let dx = this.nextX - otherBall.nextX;
    let dy = this.nextY - otherBall.nextY;
    let distance = (dx * dx + dy * dy);
    if (distance <= (this.radius + otherBall.radius) * (this.radius + otherBall.radius)) {
      return true
    }
    return result;
  }

  testWall(width, height) {
    if (this.nextX + this.radius > width) {
      this.velocityX = this.velocityX * -1;
      this.nextX = width - this.radius;
    } else if (this.nextX - this.radius < 0) {
      this.velocityX = this.velocityX * -1;
      this.nextX = this.radius;
    } else if (this.nextY + this.radius > height) {
      this.velocityY = this.velocityY * -1;
      this.nextY = height - this.radius;
    } else if (this.nextY - this.radius < 0) {
      this.velocityY = this.velocityY * -1;
      this.nextY = this.radius;
    }
  }

  collide(ballCollide) {
    let dx = this.nextX - ballCollide.nextX;
    let dy = this.nextY - ballCollide.nextY;
    let collisionAngle = Math.atan2(dy, dx);
    let speed1 = Math.sqrt(this.velocityX * this.velocityX + this.velocityY * this.velocityY);
    let speed2 = Math.sqrt(ballCollide.velocityX * ballCollide.velocityX + ballCollide.velocityY * ballCollide.velocityY);
    let direction1 = Math.atan2(this.velocityY, this.velocityX);
    let direction2 = Math.atan2(ballCollide.velocityY, ballCollide.velocityX);
    let velocityX_1 = speed1 * Math.cos(direction1 - collisionAngle);
    let velocityY_1 = speed1 * Math.sin(direction1 - collisionAngle);
    let velocityX_2 = speed2 * Math.cos(direction2 - collisionAngle);
    let velocityY_2 = speed2 * Math.sin(direction2 - collisionAngle);
    let final_velocityX_1 = ((this.mass - ballCollide.mass) * velocityX_1 + (ballCollide.mass + ballCollide.mass) * velocityX_2) / (this.mass + ballCollide.mass);
    let final_velocityX_2 = ((this.mass + this.mass) * velocityX_1 + (ballCollide.mass - this.mass) * velocityX_2) / (this.mass + ballCollide.mass);
    let final_velocityY_1 = velocityY_1;
    let final_velocityY_2 = velocityY_2;
    this.velocityX = Math.cos(collisionAngle) * final_velocityX_1 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityY_1;
    this.velocityY = Math.sin(collisionAngle) * final_velocityX_1 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityY_1;
    ballCollide.velocityX = Math.cos(collisionAngle) * final_velocityX_2 + Math.cos(collisionAngle + Math.PI / 2) * final_velocityY_2;
    ballCollide.velocityY = Math.sin(collisionAngle) * final_velocityX_2 + Math.sin(collisionAngle + Math.PI / 2) * final_velocityY_2;
    this.nextX = (this.nextX += this.velocityX);
    this.nextY = (this.nextY += this.velocityY);
    ballCollide.nextX = (ballCollide.nextX += ballCollide.velocityX);
    ballCollide.nextY = (ballCollide.nextY += ballCollide.velocityY);
  }
}