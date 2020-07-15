import { Engine, Color } from "excalibur";

import Ball from './actors/Ball';
import Paddle from './actors/Paddle';
import Brick from "./actors/Brick";

// Game Engine
const game = new Engine({
  width: 800,
  height: 600
});

// Actors
const paddle = new Paddle(150, game.drawHeight - 40, 200, 20,Color.Chartreuse);

const padding = 20;
const xoffset = 65;
const yoffset = 20;
const columns = 5;
const rows = 3;

const brickColor = [Color.Violet, Color.Orange, Color.Yellow];
const brickWidth = game.drawWidth / columns - padding - padding / columns;
const brickHeight = 30;
const bricks = [];

for (let j = 0; j < rows; j++) {
  for (let k = 0; k < columns; k++) {
    bricks.push(new Brick(
      xoffset + k * (brickWidth + padding) + padding,
      yoffset + j * (brickHeight + padding) + padding,
      brickWidth,
      brickHeight,
      brickColor[j % brickColor.length],
    ));
  }
}

const ball = new Ball(100, 300, 20, 20, Color.Red, game.drawWidth, bricks);

// Paddle Movement
game.input.pointers.primary.on('move', (event) => {
  paddle.pos.x = event.target.lastWorldPos.x;
});

bricks.forEach((brick) => game.add(brick));
game.add(paddle);
game.add(ball);
game.start();
