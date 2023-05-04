import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';
import { Label } from '../ui/Label';
import gsap from 'gsap';
import { navigation } from '../utils/navigation';
import { waitFor } from '../utils/asyncUtils';
import { canvasScale } from '../Game5';

export class FalsePopup extends Container {
    private bg: Sprite;
    private panel: Container;
    private title: Label;
    private crySnailContainer: Sprite;
    private crySnail: Sprite;

    constructor() {
        super();

        this.bg = Sprite.from(Texture.WHITE);
        this.bg.tint = 0x0a0025;
        this.bg.interactive = true;
        this.addChild(this.bg);

        this.panel = new Container();
        this.addChild(this.panel);

        this.title = new Label('Sai rồi!!!', { fill: 0xffd579, fontSize: 50 });
        this.title.y = -170;
        this.panel.addChild(this.title);

        this.crySnailContainer = new Sprite(Texture.from('/game5/png/container.png'))
        this.crySnailContainer.scale.set(0.5 * canvasScale)
        this.crySnailContainer.anchor.set(0.5)
        this.panel.addChild(this.crySnailContainer);

        this.crySnail = new Sprite(Texture.from('/game5/png/end_snail.png'))
        this.crySnail.scale.set(canvasScale)
        this.crySnail.anchor.set(0.5)
        this.crySnailContainer.addChild(this.crySnail);

    }

    public resize(width: number, height: number) {
        this.bg.width = width;
        this.bg.height = height;
        this.panel.x = width * 0.5;
        this.panel.y = height * 0.5;
    }

    public async show() {
        if (navigation.currentScreen) {
            navigation.currentScreen.filters = [new BlurFilter(5)];
        }
        gsap.killTweensOf(this.bg);
        gsap.killTweensOf(this.panel.pivot);
        this.bg.alpha = 0;
        this.panel.pivot.y = -400;
        gsap.to(this.bg, { alpha: 0.8, duration: 0.2, ease: 'linear' });
        await gsap.to(this.panel.pivot, { y: 0, duration: 0.3, ease: 'back.out' });

        await waitFor(3)
        navigation.dismissPopup()
    }

    public async hide() {
        if (navigation.currentScreen) {
            navigation.currentScreen.filters = null;
        }
        gsap.killTweensOf(this.bg);
        gsap.killTweensOf(this.panel.pivot);
        gsap.to(this.bg, { alpha: 0, duration: 0.2, ease: 'linear' });
        await gsap.to(this.panel.pivot, { y: -500, duration: 0.3, ease: 'back.in' });
    }
}
