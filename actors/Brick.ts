import { Actor, Color, CollisionType } from "excalibur";

export default class Brick extends Actor {
  collisionType: CollisionType;

  constructor(x: number, y: number, width: number, height: number, color: Color) {
    super(x, y, width, height, color);
    this.collisionType = CollisionType.Active;
  }
}
