import { Container, Sprite, Texture } from 'pixi.js';

const defaultRoundedBoxOptions = {
    color: 0x2c136c,
    width: 350,
    height: 350,
};

export type RoundedBoxOptions = typeof defaultRoundedBoxOptions;

export class Tutorial_Box extends Container {
    private image: Sprite;

    constructor(options: Partial<RoundedBoxOptions> = {}) {
        super();
        const opts = { ...defaultRoundedBoxOptions, ...options };
        this.image = new Sprite(Texture.from('/common/tutorial_popup.png'));
        this.image.width = opts.width;
        this.image.height = opts.height;
        this.image.x = -this.image.width * 0.5;
        this.image.y = -this.image.height * 0.5;
        this.addChild(this.image);
    }

    public get boxWidth() {
        return this.image.width;
    }

    public get boxHeight() {
        return this.image.height;
    }
}
