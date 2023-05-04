import { Container, Texture, Sprite } from 'pixi.js';

export class Banner extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/common/banner.png'),
        );
        this.sprite.anchor.x = 0.5
        this.sprite.anchor.y = 0.5
        this.sprite.scale.set(0.65)
        this.addChild(this.sprite);
    }

}
