import { Actor, Color, CollisionType } from "excalibur";
import Brick from "./Brick";

export default class Ball extends Actor {
  collisionType: string;


  constructor(
    x: number, 
    y: number, 
    width: number, 
    height: number, 
    color: Color, 
    private drawWidth: number,
    private bricks: Brick[]
    ) {
    super(x, y, width, height, color);
    this.collisionType = CollisionType.Passive;
    this.vel.setTo(200, 200);
    this.drawShape();
    this.initializeListeners();
  }

  private initializeListeners(): void {
    this.on('precollision', (event) => {
      if (this.bricks.indexOf(event.other) > -1) {
        event.other.kill();
      }
    
      const intersection = event.intersection.normalize();
    
      if (Math.abs(intersection.x) > Math.abs(intersection.y)) {
        this.vel.x *= -1;
      } else {
        this.vel.y *= -1;
      }
    });
    
    this.on('postupdate', () => {
      if (this.pos.x < this.width / 2) this.vel.x *= -1;
      if (this.pos.x + this.width / 2 > this.drawWidth) this.vel.x *= -1;
      if (this.pos.y < this.height / 2) this.vel.y *= -1;
    });
    
    this.on('exitviewport', () => alert('Game over, friendo.'));
  }

  private drawShape(): void {
    this.draw = function (ctx) {
      ctx.fillStyle = this.color.toString();
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, 10, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }
  }

  public movePaddle(event): void {
    this.pos.x = event.target.lastWorldPos.x;
  }
}
