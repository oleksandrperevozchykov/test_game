import * as PIXI from "pixi.js";
import GameController from "./GameController";

// Create PIXI Application
const app = new PIXI.Application({
    backgroundColor: 0x00ff00, width: 800, height: 600
});
const view = app.view as HTMLCanvasElement;
document.body.appendChild(view);

// Create GameController
const gameController = new GameController(app);

// Game Loop
app.ticker.add(() => {
    gameController.update();
});
