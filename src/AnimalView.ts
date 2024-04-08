import * as PIXI from "pixi.js";
import AnimalModel from "./AnimalModel";
import Utils from "./Utils";
export default class AnimalView {
    private sprite: PIXI.Graphics;

    constructor(private app: PIXI.Application, private coin: AnimalModel) {
        this.sprite = new PIXI.Graphics();
        this.sprite.lineStyle(1, 0xf2ffff)
            .beginFill(0xffffff, 1)
            .drawEllipse(-24, -24, 10, 10)
            .endFill();
        this.sprite.pivot.set(0.5);
        this.sprite.position.set(this.coin.x, this.coin.y);
        this.app.stage.addChild(this.sprite);
    }

    public destroy(newParent: PIXI.Container): void {
        newParent.addChild(this.sprite);
        this.sprite.zIndex = -1;
        this.sprite.position.set(Utils.getRandomIntInclusive(-1, 1) * 15, Utils.getRandomIntInclusive(-1, 1) * 15);
        this.app.stage.removeChild(this.sprite);
    }

}