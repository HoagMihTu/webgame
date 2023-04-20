import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

export class Food extends Container {
    private true_glow: Sprite;
    private false_glow: Sprite;
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(Texture.from('/game7/food.png'))
        this.true_glow = new Sprite(Texture.from('/game7/outline_food_true.png'))
        this.false_glow = new Sprite(Texture.from('/game7/outline_food_false.png'))

        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.set(0.45)

        this.true_glow.anchor.x = 0.5;
        this.true_glow.anchor.y = 0.5;
        this.true_glow.scale.set(0);
        this.addChild(this.true_glow);

        this.false_glow.anchor.x = 0.5;
        this.false_glow.anchor.y = 0.5;
        this.false_glow.scale.set(0);
        this.addChild(this.false_glow);

        this.addChild(this.sprite);
    }


    public async show(animated = true) {
        gsap.killTweensOf(this.sprite.scale);
        this.visible = true;
        if (animated) {
            this.sprite.scale.set(0);
            await gsap.to(this.sprite.scale, { x: 0.45, y: 0.45, duration: 0.3, ease: 'back.out' });
        } else {
            this.sprite.scale.set(0.45);
        }
    }

    public async hide(animated = true) {
        this.true_glow.scale.set(0);
        this.false_glow.scale.set(0);
        gsap.killTweensOf(this.sprite.scale);
        if (animated) {
            await gsap.to(this.sprite.scale, { x: 0, y: 0, duration: 0.3, ease: 'back.in' });
        } else {
            this.sprite.scale.set(0);
        }
        this.visible = false;
    }


    public onTrue() {
        this.false_glow.scale.set(0);
        this.true_glow.scale.set(0.45)
    }

    public onFalse() {
        this.true_glow.scale.set(0);
        this.false_glow.scale.set(0.45)
    }

    public onBlank() {
        this.true_glow.scale.set(0);
        this.false_glow.scale.set(0);
    }
}
