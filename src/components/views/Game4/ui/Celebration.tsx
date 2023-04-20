import { Assets, Container } from 'pixi.js';
import gsap from 'gsap';
import { Spine } from 'pixi-spine';

export class Celebration extends Container {
    private spine: Spine;
    private container: Container;

    constructor() {
        super();

        this.container = new Container();
        this.addChild(this.container);

        const skeleton = Assets.cache.get('spine_celebra/effect_balloon.json');
        if(!skeleton){window.location.reload()}
        this.spine = new Spine(skeleton.spineData);
        this.spine.autoUpdate = true;
        this.spine.scale.set(1);
        this.container.addChild(this.spine);
    }


    public async play() {
        this.spine.state.setAnimation(0, 'animation_all', true);
    }



    public async show(animated = true) {
        gsap.killTweensOf(this.container.scale);
        this.visible = true;
        if (animated) {
            this.container.scale.set(1);
            await gsap.to(this.container.scale, { x: 1, y: 1, duration: 0.3, ease: 'back.in' });
        } else {
            this.container.scale.set(1);
        }
    }

    public async hide(animated = true) {
        gsap.killTweensOf(this.container.scale);
        if (animated) {
            await gsap.to(this.container.scale, { x: 0, y: 0, duration: 0.3, ease: 'back.in' });
        } else {
            this.container.scale.set(0);
        }
        this.visible = false;
    }
}
