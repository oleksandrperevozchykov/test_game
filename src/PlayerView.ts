import * as PIXI from "pixi.js";
import PlayerModel from "./PlayerModel";

export default class PlayerView {
    public sprite: PIXI.Graphics;
    public container: PIXI.Container;

    constructor(private app: PIXI.Application, private player: PlayerModel) {
        this.container = new PIXI.Container();
        this.sprite = new PIXI.Graphics();
        this.sprite.lineStyle(0, 0xffffff)
            .beginFill(0xFF0000, 1)
            .drawCircle(-24, -24, 12)
            .endFill();
        this.sprite.pivot.set(0.5);
        this.container.position.set(this.player.x, this.player.y)
        this.sprite.position.set(0,0);
        this.sprite.name = "player";
        this.container.addChild(this.sprite)
        this.app.stage.addChild(this.container);
    }

    update() {
        this.container.x = this.player.x;
        this.container.y = this.player.y;
    }

    destroy() {
        this.app.stage.removeChild(this.sprite);
    }
}