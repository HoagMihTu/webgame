import { Container, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

const defaultGamePieceOptions = {
    sprite: null,
};

type GamePieceOptions = typeof defaultGamePieceOptions;

export class Game_piece extends Container {
    private sprite: Sprite;

    constructor(options: Partial<GamePieceOptions> = {}) {
        const opts = { ...defaultGamePieceOptions, ...options };
        super();
        this.sprite = new Sprite(opts.sprite!)
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
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

    public setColor(color: string) {
        this.sprite.tint = color
    }

}
