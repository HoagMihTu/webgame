import { Container, Texture, Sprite } from 'pixi.js';
import { Label } from './Label';

const defaultButtonOptions = {
    text: '',
    scale: 1
};

type PauseButtonOptions = typeof defaultButtonOptions;

export class Load_btn extends Container {
    private sprite: Sprite;
    private label: Label;

    constructor(options: Partial<PauseButtonOptions> = {}) {
        const opts = { ...defaultButtonOptions, ...options };
        super();
        this.sprite = new Sprite(
            Texture.from('/game3/png/btn_normal.png'),
        );
        this.sprite.scale.set(0.75 * opts.scale)
        this.sprite.anchor.set(0.5)
        this.addChild(this.sprite);
        this.label = new Label(opts.text, {
            fill: 0xffffff,
            align: 'center',
            fontWeight: 'bold',
        });
        this.label.anchor.set(0.5)
        this.label.y = -5
        this.addChild(this.label);

        this.sprite.interactive = true;
        this.sprite.on('pointerover', () => this.sprite.scale.set(0.8 * opts.scale))
                     .on('pointerout', ()=> this.sprite.scale.set(0.75 * opts.scale))
                     .on('pointerdown',()=> this.sprite.scale.set(0.75 * opts.scale))
                     .on('pointerup',()=> this.sprite.scale.set(0.8 * opts.scale))
        this.label.interactive = true;
        this.label.on('pointerover', () => this.sprite.scale.set(0.8 * opts.scale))
                    .on('pointerout', ()=> this.sprite.scale.set(0.75 * opts.scale))
                    .on('pointerdown',()=> this.sprite.scale.set(0.75 * opts.scale))
                    .on('pointerup',()=> this.sprite.scale.set(0.8 * opts.scale))
    }
}
