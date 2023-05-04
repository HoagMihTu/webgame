import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

export class Shark extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/game3/png/shark.png'),
        );
        this.sprite.scale.set(0.5)
        this.sprite.anchor.set(0.5)
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

    public async show(animated = true) {
        gsap.killTweensOf(this.sprite.scale);
        this.visible = true;
        if (animated) {
            this.sprite.scale.set(0);
            await gsap.to(this.sprite.scale, { x: 0.5, y: 0.5, duration: 0.7 });
        } else {
            this.sprite.scale.set(0.5);
        }
    }

    public async hide(animated = true) {
        gsap.killTweensOf(this.sprite.scale);
        if (animated) {
            await gsap.to(this.sprite.scale, { x: 0, y: 0, duration: 0.3 });
        } else {
            this.sprite.scale.set(0);
        }
        this.visible = false;
    }
}
