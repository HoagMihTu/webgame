import { Container, Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap';

const defaultGamePieceOptions = {
    sprite: '',
    type: 0,
    scale: 1,
};

type GamePieceOptions = typeof defaultGamePieceOptions;

export class Game_piece extends Container {
    private sprite: Sprite;
    public type = 0; 

    constructor(options: Partial<GamePieceOptions> = {}) {
        const opts = { ...defaultGamePieceOptions, ...options };
        super();
        this.sprite = new Sprite(Texture.from(opts.sprite))
        this.sprite.scale.set(opts.scale)
        this.type = opts.type
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 1;
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

    public async playStamp() {
        gsap.killTweensOf(this.sprite);
        await gsap.to(this.sprite, { rotation: 0.08, duration: 0.1, ease: 'back.out' });
        await gsap.to(this.sprite, { rotation: -0.04, duration: 0.1, ease: 'back.out' });
        await gsap.to(this.sprite, { rotation: 0.02, duration: 0.1, ease: 'back.out' });
        await gsap.to(this.sprite, { rotation: -0.01, duration: 0.1, ease: 'back.out' });
        await gsap.to(this.sprite, { rotation: 0, duration: 0.1, ease: 'back.out' });
    }

}
