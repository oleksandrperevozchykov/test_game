import * as PIXI from "pixi.js";
import PlayerModel from "./PlayerModel";
import PlayerView from "./PlayerView";
import AnimalModel from "./AnimalModel";
import AnimalView from "./AnimalView";
import TweenManager from "./TweenManager";
import Utils from "./Utils";

export default class GameController {
    private playerModel: PlayerModel;
    private playerView: PlayerView;
    private tween: TweenManager;
    private animals: AnimalModel[] = [];
    private animalViews: AnimalView[] = [];
    private text: PIXI.Text;
    private totalAnimalCount: number = 0;

    constructor(private app: PIXI.Application) {
        this.drawDestinationField();
        this.playerModel = new PlayerModel(100, 100, 5);
        this.playerView = new PlayerView(app, this.playerModel);
        this.text = new PIXI.Text();
        this.tween = new TweenManager(app.ticker);
        this.spawnAnimals();
        this.setupInput();
        this.setupText();
        this.app.stage.addChild(this.text);
    5}

    private spawnAnimals(): void {
        for (let i = 0; i < 5; i++) {
            const x = Utils.getRandomIntInclusive(50, this.app.screen.width - 50);
            const y = Utils.getRandomIntInclusive(100, this.app.screen.height -50);
            const animalModel = new AnimalModel(x, y);
            this.animals.push(animalModel);
            const animalView = new AnimalView(this.app, animalModel);
            this.animalViews.push(animalView);
        }
    }

    private setupInput(): void {
        window.addEventListener("click", (event) => {
            if (event.clientX > this.app.screen.width || event.clientY > this.app.screen.height) return;
            this.tween.createMoveAnimation(this.playerModel, event.clientX, event.clientY, 1000, () => {
                if (event.clientY < 100 && event.clientX > this.app.screen.width - 100) {
                    this.totalAnimalCount += this.playerView.container.children.length - 1;
                    this.text.text = `Caught animals: ${this.totalAnimalCount}`
                    this.playerView.container.removeChildren(1);
                    this.spawnAnimals();
                }
            })
        });
    }

    public update(): void {
        this.playerView.update();

        // Check for animal collection
        this.animals.forEach((animal, index) => {
            const distance = Math.sqrt(
                Math.pow(this.playerModel.x - animal.x, 2) +
                Math.pow(this.playerModel.y - animal.y, 2)
            );

            if (distance < 30) {
                // Player collected the animal
                this.animals.splice(index, 1);
                const animalView = this.animalViews.splice(index, 1)[0];
                animalView.destroy(this.playerView.container);
            }
        });
    }

    private setupText(): void {
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fill: 0xff0000,
            stroke: '#000000',
            dropShadowDistance: 6,
        });
        this.text.style = style;
        this.text.position.set(20, 20);
        this.text.text = "Caught animals: 0"
    }

    private drawDestinationField(): void {
        const rect = new PIXI.Graphics();
        rect.lineStyle(1, 0xf2ffff)
            .beginFill(0xffff00, 1)
            .drawRect(0, 0, 100, 100)
            .endFill();
        rect.position.set(this.app.screen.width -100, 0)
        rect.zIndex = -10;
        this.app.stage.addChild(rect);
    }
}