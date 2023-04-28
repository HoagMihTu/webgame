import { Assets, Container } from 'pixi.js';
import gsap from 'gsap';
import { Spine } from 'pixi-spine';


export class Clam extends Container {
    private spine: Spine;
    private container: Container;
    public type?: number;

    constructor() {
        super();

        this.container = new Container();
        this.addChild(this.container);

        const skeleton = Assets.cache.get('spine_clam/animation.json');
        if(!skeleton){window.location.reload()}
        this.spine = new Spine(skeleton.spineData);
        this.spine.autoUpdate = true;
        this.container.addChild(this.spine);
        this.container.scale.set(0.3)
    }


    public async play1() {
        this.spine.state.setAnimation(0, 'rung', true);
    }


    public async play2() {
        this.spine.state.setAnimation(0, 'close_2', false);
    }

    public async play3() {
        this.spine.state.setAnimation(0, 'open', false);
    }


    public async show(animated = true) {
        gsap.killTweensOf(this.spine.position);
        this.container.scale.set(1)
        this.visible = true;
        if (animated) {
            this.spine.position.set(-180,-600);
            await gsap.to(this.spine.position, { x: -180, y: 180, duration: 0.7, ease: 'bounce.out' ,rotation: 360});
        } else {
            this.spine.position.set(1);
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
