import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

const defaultFoodOptions = {
    sprite: '',
    type: '',
    scale: 1
};

type FoodOptions = typeof defaultFoodOptions;

export class Food_Type_2 extends Container {
    private sprite: Sprite;
    public type: String;

    constructor(options: Partial<FoodOptions> = {}) {
        const opts = { ...defaultFoodOptions, ...options };
        super();
        this.sprite = new Sprite(
            Texture.from(`https://api.stg.qlmn.vn/${opts.sprite}`),
        );
        this.sprite.anchor.set(0.5)
        this.type = opts.type
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
        gsap.killTweensOf(this.sprite.scale);
        this.visible = true;
        if (animated) {
            if(Math.random() >= 0.5){
                this.sprite.scale.set(0.5)
                this.sprite.position.set(-200,-600);
                await gsap.to(this.sprite.position, { x: -150, y: -150, duration: 0.5, ease: 'power0' });
                gsap.to(this.sprite.scale, { x: 0.5, y: 0, duration: 0.1, ease: 'power0' });
                gsap.to(this.sprite.scale, { x: 0.5, y: 0.5, duration: 0.1, ease: 'power0' });
                gsap.to(this.sprite.position, { x: 0, y: 0, duration: 0.25, ease: 'power0' });
            } else {
                this.sprite.scale.set(-0.5)
                this.sprite.position.set(200,-600);
                await gsap.to(this.sprite.position, { x: 150, y: -150, duration: 0.5, ease: 'power0' });
                gsap.to(this.sprite.scale, { x: -0.5, y: 0, duration: 0.1, ease: 'power0' });
                gsap.to(this.sprite.scale, { x: -0.5, y: -0.5, duration: 0.1, ease: 'power0' });
                gsap.to(this.sprite.position, { x: 0, y: 0, duration: 0.25, ease: 'power0' });
            }
        } else {
            this.sprite.scale.set(0.5)
            this.sprite.position.set(0);
        }
    }

    public async hide(animated = true) {
        gsap.killTweensOf(this.sprite.scale);
        if (animated) {
            await gsap.to(this.sprite.scale, { x: 0, y: 0, duration: 0.3, ease: 'back.in' });
        } else {
            this.sprite.scale.set(0);
        }
        this.visible = false;
    }
}
