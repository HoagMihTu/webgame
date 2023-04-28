import { Container} from 'pixi.js';
import { navigation } from '../utils/navigation';
import { Load_bg } from '../ui/Load_bg';
import { Load_btn } from '../ui/Load_btn';
import { LevelScreen } from './LevelScreen';

export class LoadScreen extends Container {
    private load_bg: Load_bg
    private load_btn: Load_btn

    constructor() {
        super();

        this.load_bg = new Load_bg()
        this.addChild(this.load_bg)

        this.load_btn = new Load_btn({ text: 'Bé đã hiểu' })
        this.load_btn.interactive = true
        this.load_btn.on('pointerup', () => {navigation.showScreen(LevelScreen)})
        this.addChild(this.load_btn);
    }



    public resize(width: number, height: number) {
        this.load_bg.x = width * 0.5
        this.load_bg.y = height * 0.5
        this.load_bg.width = width 
        this.load_bg.height = height

        this.load_btn.x = width * 0.7
        this.load_btn.y = height * 0.87
    }

    public async show() {
    }

    public async hide() {
        await this.load_bg.hide(true);
    }

}
