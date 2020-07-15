import { Actor, Color, CollisionType } from "excalibur";

export default class Paddle extends Actor {
  collisionType: string;

  constructor(x: number, y: number, width: number, height: number, color: Color) {
    super(x, y, width, height, color);
    this.collisionType = CollisionType.Fixed;
  }

  public movePaddle(event): void {
    this.pos.x = event.target.lastWorldPos.x;
  }
}
