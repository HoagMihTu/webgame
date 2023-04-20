import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';
import { Label } from '../ui/Label';
import { RoundedBox } from '../ui/RoundedBox';
import { Btn_resume } from '../ui/Btn_resume';
import gsap from 'gsap';
import { navigation } from '../utils/navigation';

export class PausePopup extends Container {
    private bg: Sprite;
    private panel: Container;
    private title: Label;
    private btn_resume: Btn_resume;
    private panelBase: RoundedBox;

    constructor() {
        super();

        this.bg = Sprite.from(Texture.WHITE);
        this.bg.tint = 0x0a0025;
        this.bg.interactive = true;
        this.addChild(this.bg);

        this.panel = new Container();
        this.addChild(this.panel);

        this.panelBase = new RoundedBox({ height: 300 });
        this.panel.addChild(this.panelBase);

        this.title = new Label('Tutorial', { fill: 0xffd579, fontSize: 50 });
        this.title.y = -80;
        this.panel.addChild(this.title);

        this.btn_resume = new Btn_resume({ text: 'Resume' });
        this.btn_resume.y = 70;
        this.btn_resume.interactive = true
        this.btn_resume.on('pointerup',() => {this.btn_resume.scale.set(1);navigation.dismissPopup()})
                        .on('pointerover', () => this.btn_resume.scale.set(1.2))
                        .on('pointerout', ()=> this.btn_resume.scale.set(1))
                        .on('pointerdown',()=> this.btn_resume.scale.set(1))
        this.panel.addChild(this.btn_resume);
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
