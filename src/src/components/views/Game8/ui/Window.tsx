import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

const defaultWindowOptions = {
    sprite: '',
    type: 0,
    width: 100,
    height: 100
};

type WindowOptions = typeof defaultWindowOptions;

export class Window extends Container {
    private sprite: Sprite;
    public type = 0;
    constructor(options: Partial<WindowOptions> = {}) {
        const opts = { ...defaultWindowOptions, ...options };
        super()
        this.sprite = new Sprite(Texture.from(opts.sprite))
        this.type = opts.type;
        this.sprite.width = opts.width
        this.sprite.height = opts.height
        this.sprite.anchor.set(0.5)

        this.addChild(this.sprite);
    }


    public async show(animated = true) {
        gsap.killTweensOf(this.sprite.scale);
        this.visible = true;
        if (animated) {
            this.sprite.scale.set(0);
            await gsap.to(this.sprite.scale, { x: 1, y: 1, duration: 0.3, ease: 'back.out' });
        } else {
            this.sprite.scale.set(1);
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
