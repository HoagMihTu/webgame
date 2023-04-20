import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';

const defaultGamePieceOptions = {
    sprite: '',
    type: 0,
};

type GamePieceOptions = typeof defaultGamePieceOptions;

export class Game_piece extends Container {
    private pick_glow: Sprite;
    private true_glow: Sprite;
    private false_glow: Sprite;
    private sprite: Sprite;
    public type = 0;

    constructor(options: Partial<GamePieceOptions> = {}) {
        const opts = { ...defaultGamePieceOptions, ...options };
        super();
        this.sprite = new Sprite(Texture.from(opts.sprite))
        this.pick_glow = new Sprite(Texture.from('/game4/png/pick.png'))
        this.true_glow = new Sprite(Texture.from('/game4/png/true.png'))
        this.false_glow = new Sprite(Texture.from('/game4/png/false.png'))
        this.type = opts.type;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.set(0.45)

        this.pick_glow.anchor.x = 0.5;
        this.pick_glow.anchor.y = 0.5;
        this.pick_glow.scale.set(0);
        this.addChild(this.pick_glow);

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
        this.pick_glow.scale.set(0);
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

    public onPick() {
        this.false_glow.scale.set(0)
        this.pick_glow.scale.set(0.45)
    }

    public onTrue() {
        this.true_glow.scale.set(0.45)
        this.type = 0
    }

    public onFalse() {
        this.pick_glow.scale.set(0)
        this.false_glow.scale.set(0.45)
    }

    public onBlank() {
        this.pick_glow.scale.set(0);
        this.true_glow.scale.set(0);
        this.false_glow.scale.set(0);
    }
}
