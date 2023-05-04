import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';
import { Label } from './Label';

const defaultButtonOptions = {
    text: ''
};

type PauseButtonOptions = typeof defaultButtonOptions;

export class Btn_resume extends Container {
    private sprite: Sprite;
    private label: Label;

    constructor(options: Partial<PauseButtonOptions> = {}) {
        const opts = { ...defaultButtonOptions, ...options };
        super();
        this.sprite = new Sprite(
            Texture.from('/common/button_normal.png'),
        );
        this.sprite.scale.set(0.5);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.addChild(this.sprite);
        this.label = new Label(opts.text, {
            fill: 0x4a4a4a,
            align: 'center',
        });
        this.label.y = -5;
        this.addChild(this.label);
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
