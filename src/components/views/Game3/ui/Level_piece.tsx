import { Container, Sprite, Texture } from 'pixi.js';
import { gsap } from 'gsap';
import { canvasScale, canvasHeight, canvasWidth } from '../Game3';

const defaultLevelPieceOptions = {
    level_num: 0,
    star_num: 0,
};

type LevelPieceOptions = typeof defaultLevelPieceOptions;

export class Level_piece extends Container {
    private sprite: Sprite;
    private level: Sprite;
    private star1: Sprite | undefined;
    private star2: Sprite | undefined;
    private star3: Sprite | undefined;

    public level_num = 0; 
    public star_num = 0; 

    constructor(options: Partial<LevelPieceOptions> = {}) {
        const opts = { ...defaultLevelPieceOptions, ...options };
        super();
        this.sprite = new Sprite(Texture.from('./game3/png/btn_level.png'))
        this.sprite.width = canvasWidth/10
        this.sprite.height = canvasWidth/10
        this.sprite.anchor.set(0.5)
        this.sprite.interactive = true;
        this.sprite.on('pointerover', () => {this.sprite.width = canvasWidth/9; this.sprite.height = canvasWidth/9;this.level.scale.set(0.33 * canvasScale)})
                     .on('pointerout', ()=> {this.sprite.width = canvasWidth/10; this.sprite.height = canvasWidth/10;this.level.scale.set(0.3 * canvasScale)})
                     .on('pointerdown',()=> {this.sprite.width = canvasWidth/10; this.sprite.height = canvasWidth/10;this.level.scale.set(0.3 * canvasScale)})
                     .on('pointerup',()=> {this.sprite.width = canvasWidth/9; this.sprite.height = canvasWidth/9;this.level.scale.set(0.33 * canvasScale)})
        this.addChild(this.sprite);

        this.level = new Sprite(Texture.from(`./game3/png/level_${opts.level_num}.png`))
        this.level.scale.set(0.3 * canvasScale)
        this.level.interactive = true;
        this.level.on('pointerover', () => {this.sprite.width = canvasWidth/9; this.sprite.height = canvasWidth/9;this.level.scale.set(0.33 * canvasScale)})
                     .on('pointerout', ()=> {this.sprite.width = canvasWidth/10; this.sprite.height = canvasWidth/10;this.level.scale.set(0.3 * canvasScale)})
                     .on('pointerdown',()=> {this.sprite.width = canvasWidth/10; this.sprite.height = canvasWidth/10;this.level.scale.set(0.3 * canvasScale)})
                     .on('pointerup',()=> {this.sprite.width = canvasWidth/9; this.sprite.height = canvasWidth/9;this.level.scale.set(0.33 * canvasScale)})
        this.level.anchor.set(0.5)
        this.addChild(this.level);

        this.showStar(opts.star_num)

    }

    public showStar(value: any = 0){
        switch(value){
            case 0:
                break;
            case 1:
                this.star1 = new Sprite(Texture.from(`./common/star_2.png`))
                this.star1.scale.set(0.3 * canvasScale)
                this.star1.anchor.set(0.5)
                this.star1.y = canvasHeight / 13
                this.addChild(this.star1);
                break;
            case 2:
                this.star1 = new Sprite(Texture.from(`./common/star_2.png`))
                this.star1.scale.set(0.3 * canvasScale)
                this.star1.anchor.set(0.5)
                this.star1.x = - canvasWidth/ 56
                this.star1.y = canvasHeight / 13
                this.addChild(this.star1);
                this.star2 = new Sprite(Texture.from(`./common/star_2.png`))
                this.star2.scale.set(0.3 * canvasScale)
                this.star2.anchor.set(0.5)
                this.star2.x = canvasWidth/ 56
                this.star2.y = canvasHeight / 13
                this.addChild(this.star2);
                break;
            case 3:
                this.star1 = new Sprite(Texture.from(`./common/star_2.png`))
                this.star1.scale.set(0.3 * canvasScale)
                this.star1.anchor.set(0.5)
                this.star1.x = - canvasWidth/ 28
                this.star1.y = canvasHeight / 13
                this.addChild(this.star1);
                this.star2 = new Sprite(Texture.from(`./common/star_2.png`))
                this.star2.scale.set(0.3 * canvasScale)
                this.star2.anchor.set(0.5)
                this.star2.y = canvasHeight / 13
                this.addChild(this.star2);
                this.star3 = new Sprite(Texture.from(`./common/star_2.png`))
                this.star3.scale.set(0.3 * canvasScale)
                this.star3.anchor.set(0.5)
                this.star3.x = canvasWidth/ 28
                this.star3.y = canvasHeight / 13
                this.addChild(this.star3);
                break;
        }
    }

    public async show(animated = true) {
        gsap.killTweensOf(this.sprite.scale);
        this.visible = true;
        if (animated) {
            this.sprite.scale.set(0);
            await gsap.to(this.sprite.scale, { x: 1, y: 1, duration: 0.3, ease: 'back.out' });
        } else {
            this.sprite.scale.set(1 * canvasScale);
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

}
