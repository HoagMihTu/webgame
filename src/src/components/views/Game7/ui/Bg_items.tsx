import { Container, Texture, Sprite } from 'pixi.js';

export class Bg_item1 extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/game7/bg_item1.png'),
        );
        this.sprite.anchor.x = 0;
        this.sprite.anchor.y = 1;
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 0.5;
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

export class Bg_item2 extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/game7/bg_item2.png'),
        );
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 1;
        this.sprite.scale.set(0.5)
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
    