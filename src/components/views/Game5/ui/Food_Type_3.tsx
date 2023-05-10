import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

const defaultFoodOptions = {
    sprite: '',
    type: '',
    scale: 1
};

type FoodOptions = typeof defaultFoodOptions;

export class Food_Type_3 extends Container {
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
        this.sprite.scale.set(0.5)
        this.visible = true;
        if (animated) {
            if(Math.random() >= 0.5){
                this.sprite.position.set(60,-600);
                await gsap.to(this.sprite.position, { x: 60, y: -10, duration: 0.3, ease: 'back.in' });
                gsap.to(this.sprite.position, { x: 10, y: 0, duration: 0.4, ease: 'slowmo'});
                await gsap.to(this.sprite, { rotation: -1.5, duration: 0.3, ease: 'slowmo' });
                await gsap.to(this.sprite.position, { x: 5, y: 0, duration: 0.1, ease: 'power0'});
                gsap.to(this.sprite.position, { x: 0, y: 0, duration: 0.1, ease: 'power0'});
            } else {
                this.sprite.position.set(-60,-600);
                await gsap.to(this.sprite.position, { x: -60, y: -10, duration: 0.3, ease: 'back.in' });
                gsap.to(this.sprite.position, { x: -10, y: 0, duration: 0.4, ease: 'slowmo'});
                await gsap.to(this.sprite, { rotation: 1.5, duration: 0.3, ease: 'slowmo' });
                await gsap.to(this.sprite.position, { x: -5, y: 0, duration: 0.1, ease: 'power0'});
                gsap.to(this.sprite.position, { x: 0, y: 0, duration: 0.1, ease: 'power0'});
            }
        } else {
            this.sprite.position.set(1);
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
