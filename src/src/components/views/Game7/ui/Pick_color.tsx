import { Container, Texture, Sprite} from 'pixi.js';
import { gsap } from 'gsap';

const defaultColorOptions = {
    sprite: '',
    color: '0xFFFFFF',
};

type ColorOptions = typeof defaultColorOptions;

export class Pick_color extends Container {
    private sprite: Sprite;
    public color :String;

    constructor(options: Partial<ColorOptions> = {}) {
        const opts = { ...defaultColorOptions, ...options };
        super();
        this.sprite = new Sprite(Texture.from(opts.sprite))
        this.color = opts.color;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.set(0.5)
        this.addChild(this.sprite);
    }


    public async show(animated = true) {
        gsap.killTweensOf(this.sprite.scale);
        this.visible = true;
        if (animated) {
            this.sprite.scale.set(0);
            await gsap.to(this.sprite.scale, { x: 0.5, y: 0.5, duration: 0.3, ease: 'back.out' });
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

    public onPick() {
        console.log(this.color)
    }

}
