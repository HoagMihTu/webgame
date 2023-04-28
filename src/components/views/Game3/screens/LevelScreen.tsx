import { Container} from 'pixi.js';
import { navigation } from '../utils/navigation';
import { Btn_back } from '../ui/Btn_back';
import { LoadScreen } from './LoadScreen';
import { GameScreen } from './GameScreen';
import { Level_piece } from '../ui/Level_piece';


const place_data = [{x: 0.1, y: 0.5},{x: 0.3, y: 0.5},{x: 0.5, y: 0.5},{x: 0.7, y: 0.5},{x: 0.9, y: 0.5},]

export class LevelScreen extends Container {
    private btn_back: Btn_back;
    private level_piece: Level_piece[] = []

    constructor() {
        super();

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('pointerup', ()=> {navigation.showScreen(LoadScreen)})
        this.addChild(this.btn_back);

        for(let i = 0; i<5; i++){
            let random = Math.floor(Math.random() * 4)
            this.level_piece[i]= new Level_piece({level_num: i+1, star_num: random});
            this.level_piece[i].interactive = true
            this.level_piece[i].on('pointerup', ()=> {localStorage.setItem("level", `${i+1}`);navigation.showScreen(GameScreen)})
            this.addChild(this.level_piece[i]);
        }
        
    }



    public resize(width: number, height: number) {
        this.btn_back.x = width * 0.07;
        this.btn_back.y = height * 0.11;

        for(let i = 0; i<5; i++){
            this.level_piece[i].x = width * place_data[i].x;
            this.level_piece[i].y = height * place_data[i].y;
        }
    }

    public async show() {
    }

    public async hide() {
    }

}
