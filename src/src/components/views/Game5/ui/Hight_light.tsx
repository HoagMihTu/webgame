import { Container, Texture, Sprite } from 'pixi.js';

export class HightLight extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/common/hightlight.png'),
        );
        this.sprite.anchor.x = 0.5
        this.sprite.anchor.y = 0.5
        this.sprite.alpha = 0.4
        this.addChild(this.sprite);
    }

}
