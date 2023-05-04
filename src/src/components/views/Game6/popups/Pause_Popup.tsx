import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';
import { Label } from '../ui/Label';
import { Tutorial_Box } from '../ui/Tutorial_Box';
import { Tutorial_Resume_Btn } from '../ui/Tutorial_Resume_Btn';
import { Tutorial_bg } from '../ui/Tutorial_bg';
import gsap from 'gsap';
import { navigation } from '../utils/navigation';

export class PausePopup extends Container {
    private bg: Sprite;
    private panel: Container;
    private title: Label;
    private btn_resume: Tutorial_Resume_Btn;
    private panelBase: Tutorial_Box;
    private background: Tutorial_bg;

    constructor() {
        super();

        this.bg = Sprite.from(Texture.WHITE);
        this.bg.tint = 0x0a0025;
        this.bg.interactive = true;
        this.addChild(this.bg);

        this.panel = new Container();
        this.addChild(this.panel);

        this.background = new Tutorial_bg();
        this.panel.addChild(this.background);

        this.panelBase = new Tutorial_Box({ height: 300 });
        this.panel.addChild(this.panelBase);

        this.title = new Label('Hướng dẫn', { fill: 0x070707, fontSize: 50, fontWeight: 'bold' });
        this.title.y = -80;
        this.panel.addChild(this.title);

        this.btn_resume = new Tutorial_Resume_Btn({ text: 'Resume' });
        this.btn_resume.y = 70;
        this.btn_resume.interactive = true
        this.btn_resume.on('pointerup',() => {this.btn_resume.scale.set(1);navigation.dismissPopup()})
                        .on('pointerover', () => this.btn_resume.scale.set(1.2))
                        .on('pointerout', ()=> this.btn_resume.scale.set(1))
                        .on('pointerdown',()=> this.btn_resume.scale.set(1))
                        .on('pointerup',()=> this.btn_resume.scale.set(1.2));
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
