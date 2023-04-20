import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

export class Btn_tutorial extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/common/btn_tutorial.png'),
        );
        this.sprite.scale.set(0.5);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.interactive = true;
        this.sprite.on('pointerover', () => this.sprite.scale.set(0.6))
                     .on('pointerout', ()=> this.sprite.scale.set(0.5))
                     .on('pointerdown',()=> this.sprite.scale.set(0.5))
                     .on('pointerup',()=> this.sprite.scale.set(0.6))
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
        gsap.killTweensOf(this.sprite.position);
        this.visible = true;
        if (animated) {
            this.sprite.position.set(0,-600);
            await gsap.to(this.sprite.position, { x: 0, y: 0, duration: 0.7, ease: 'bounce.out' });
        } else {
            this.sprite.position.set(0);
        }
    }

    public async hide(animated = true) {
        gsap.killTweensOf(this.sprite.position);
        if (animated) {
            await gsap.to(this.sprite.position, { x: 0, y: -600, duration: 0.3, ease: 'back.in' });
        } else {
            this.sprite.position.set(0,-600);
        }
        this.visible = false;
    }
}
