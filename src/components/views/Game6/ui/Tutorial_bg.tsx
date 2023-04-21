import { Container, Texture, Sprite } from 'pixi.js';

export class Tutorial_bg extends Container {
    private sprite: Sprite;

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/common/tutorial_bg.png'),
        );
        this.sprite.anchor.x = 0.5
        this.sprite.anchor.y = 0.5
        this.addChild(this.sprite);
    }

}
