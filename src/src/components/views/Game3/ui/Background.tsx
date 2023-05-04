import { Container, Texture, Sprite } from 'pixi.js';

export class Background extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/game3/png/bg.png'),
        );
        this.addChild(this.sprite);
    }

    public get width() {
        return this.sprite.width;
    }

    public set width(value: number) {
        this.sprite.width = value;
    }
    
    public get height() {
        return this.sprite.height;
    }

    public set height(value: number) {
        this.sprite.height = value;
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}
