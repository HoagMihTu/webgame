import { Container, Texture, Sprite } from 'pixi.js';
import { gsap } from 'gsap';
import { app_game6 } from '../Game6';
import { earthquake } from '../utils/animation';

export class Fridge extends Container {
    private sprite: Sprite;
    private fruit: Sprite;
    private vegetable: Sprite;
    private fridge_stack1: Sprite; 
    private fridge_stack2: Sprite; 

    constructor() {
        super();
        this.sprite = new Sprite(
            Texture.from('/game6/fridge.png'),
        );
        this.sprite.scale.set(0.5)
        this.sprite.anchor.set(0.5)
        this.addChild(this.sprite);

        this.fruit = new Sprite(
            Texture.from('/game6/fruit.png'),
        );
        this.fruit.anchor.set(0.5)
        this.fruit.x = -180
        this.fruit.y = 275
        this.sprite.addChild(this.fruit);

        this.vegetable = new Sprite(
            Texture.from('/game6/vegetable.png'),
        );
        this.vegetable.anchor.set(0.5)
        this.vegetable.x = 180
        this.vegetable.y = 275
        this.sprite.addChild(this.vegetable);

        this.fridge_stack1 = new Sprite(
            Texture.from('/game6/fridge_stack.png'),
        );
        this.fridge_stack1.anchor.set(0.5)
        this.fridge_stack1.x = -170;
        this.fridge_stack1.y = -100;
        this.sprite.addChild(this.fridge_stack1);

        this.fridge_stack2 = new Sprite(
            Texture.from('/game6/fridge_stack.png'),
        );
        this.fridge_stack2.anchor.set(0.5)
        this.fridge_stack2.x = 170;
        this.fridge_stack2.y = -100;
        this.sprite.addChild(this.fridge_stack2);
    }

    public get width() {
        return this.sprite.width;
    }

    public set width(value: number) {
        this.sprite.width = value;
    }
    
    public get height() {
        return this.sprite.height;
    }

    public set height(value: number) {
        this.sprite.height = value;
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    public async show(animated = true) {
        gsap.killTweensOf(this.sprite.position);
        this.visible = true;
        if (animated) {
            this.sprite.position.set(0,-600);
            await gsap.to(this.sprite.position, { x: 0, y: 0, duration: 0.3, ease: 'power0' });
            earthquake(app_game6.stage.pivot, 16);
        } else {
            this.sprite.position.set(0);
        }
    }

    public async hide(animated = true) {
        gsap.killTweensOf(this.sprite.position);
        if (animated) {
            await gsap.to(this.sprite.position, { x: 0, y: 100, duration: 0.3, ease: 'back.in' });
        } else {
            this.sprite.position.set(0,100);
        }
        this.visible = false;
    }
}
