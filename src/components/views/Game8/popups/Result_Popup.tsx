import { BlurFilter, Container, Sprite, Texture } from 'pixi.js';
import { RoundedBox } from '../ui/RoundedBox';
import { Btn_resume } from '../ui/Btn_resume';
import { ResultStars } from '../ui/ResultStars';
import { HightLight } from '../ui/Hight_light';
import { Banner } from '../ui/Banner';
import { Label } from '../ui/Label';
import gsap from 'gsap';
import { navigation } from '../utils/navigation';
import { GameScreen } from '../screens/GameScreen';
import { canvasScale } from '../Game8';

export class ResultPopup extends Container {
    private bg: Sprite;
    private panel: Container;
    private btn_resume: Btn_resume;
    private panelBase: RoundedBox;
    private result_star: ResultStars;
    private hightlight: HightLight;
    private banner: Banner;
    private title: Label;

    constructor() {
        super();

        const gamescreen = new GameScreen()

        this.bg = Sprite.from(Texture.WHITE);
        this.bg.tint = 0x0a0025;
        this.bg.interactive = true;
        this.addChild(this.bg);

        this.panel = new Container();
        this.addChild(this.panel);

        this.hightlight = new HightLight();
        this.panel.addChild(this.hightlight);

        this.panelBase = new RoundedBox({ height: 360, width: 540 });
        this.panel.addChild(this.panelBase);

        this.banner = new Banner();
        this.banner.y = -150
        this.panel.addChild(this.banner);

        this.title = new Label('Well Done!', { fill: 0xffffff, fontSize: 70 });
        this.title.y = -180;
        this.panel.addChild(this.title);

        this.result_star = new ResultStars();
        this.result_star.y = -40;
        this.panel.addChild(this.result_star);

        this.btn_resume = new Btn_resume({ text: 'Resume' });
        this.btn_resume.y = 190;
        this.btn_resume.interactive = true
        this.btn_resume.on('pointerup',() => {this.btn_resume.scale.set(1);navigation.dismissPopup();gamescreen.reset()})
                        .on('pointerover', () => this.btn_resume.scale.set(1.2))
                        .on('pointerout', ()=> this.btn_resume.scale.set(1))
                        .on('pointerdown',()=> this.btn_resume.scale.set(1))
                        .on('pointerup',()=> this.btn_resume.scale.set(1.2));
        this.panel.addChild(this.btn_resume);

        this.panel.scale.set(canvasScale)
    }

    public prepare() {
        this.result_star.hide(false);
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
        this.visible = true;
        this.bg.alpha = 0;
        this.panel.pivot.y = -400;
        gsap.to(this.bg, { alpha: 0.8, duration: 0.2, ease: 'linear' });
        await gsap.to(this.panel.pivot, { y: 0, duration: 0.3, ease: 'back.out' });
        this.animateGradeStars(3);
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

    private async animateGradeStars(grade: number) {
        await this.result_star.show();
        await this.result_star.playGrade(grade);
    }
}
