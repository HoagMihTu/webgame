import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';


export class Fish extends Container {

    private sprite: Sprite;
    public status?: string;

    constructor() {
        super();
        let i = Math.floor(Math.random() * 4) + 1;
        this.sprite = new Sprite(Texture.from(`./game3/png/fish_${i}.png`))
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.set(0.45)

        this.addChild(this.sprite);
    }


    public async show(animated = true) {
        this.status = 'show'
        gsap.killTweensOf(this.sprite.scale);
        this.visible = true;
        if (animated) {
            this.sprite.scale.set(0);
            await gsap.to(this.sprite.scale, { x: 0.45, y: 0.45, duration: 0.3, ease: 'back.out' });
        } else {
            this.sprite.scale.set(0.45);
        }
    }

    public async hide(animated = true, time: number) {
        this.status = 'hide'
        gsap.killTweensOf(this.sprite.scale);
        if (animated) {
            await gsap.to(this.sprite.scale, { x: 0, y: 0, duration: time, ease: 'back.in' });
        } else {
            this.sprite.scale.set(0);
        }
        this.visible = false;
    }

}
