import * as TWEEN from "@tweenjs/tween.js";
import {Container, Ticker} from "pixi.js";

export default class TweenManager {
    protected ticker: Ticker;
    protected tweens: TWEEN.Tween<any>[] = [];

    constructor(ticker: Ticker) {
        this.ticker = ticker;
        this.tweens = []
        this.ticker.add(this.Update, this)
    }
    public createMoveAnimation(object: any, newX: number, newY: number, duration: number, cb?: any) {

        const tween = new TWEEN.Tween(object).to(
            {x: newX, y: newY}, 1000
        ).easing(TWEEN.Easing.Quadratic.InOut).onComplete(
            ()=> {
                if (cb) cb();
            }
        );
        this.tweens.push(tween);
        tween.start()
    }

    protected Update():void {
        const tweensToDelete = this.tweens.filter(tween => !tween.isPlaying());
        tweensToDelete.forEach(tween => {
            tween.onComplete();
        });

        this.tweens = this.tweens.filter(tween => tween.isPlaying());
        this.tweens.forEach(tween => tween.update(this.ticker.lastTime));
    }
}