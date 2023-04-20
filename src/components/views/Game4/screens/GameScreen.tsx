import { Container, Graphics} from 'pixi.js';
import { PausePopup } from '../popups/Pause_Popup';
import { ResultPopup } from '../popups/Result_Popup';
import { navigation } from '../utils/navigation';
import { Monkey } from '../ui/Monkey';
import { Celebration } from '../ui/Celebration';
import { Desk } from '../ui/Desk';
import { Desk_Item1 } from '../ui/Desk_item1';
import { Desk_Item2 } from '../ui/Desk_item2';
import { Btn_back } from '../ui/Btn_back';
import { Btn_tutorial } from '../ui/Btn_tutorial';
import { Game_piece } from '../ui/Game_piece';
// import { sound } from '@pixi/sound';
import { waitFor } from '../utils/asyncUtils';

const data = [
    {sprite: '/game4/png/dog.png', type: 1},{sprite: '/game4/png/dog_place.png', type: 1},
    {sprite: '/game4/png/cat.png', type: 2},{sprite: '/game4/png/cat_place.png', type: 2},
    {sprite: '/game4/png/chicken.png', type: 3},{sprite: '/game4/png/chicken_place.png', type: 3},
    {sprite: '/game4/png/fish.png', type: 4},{sprite: '/game4/png/fish_place.png', type: 4},
    {sprite: '/game4/png/pig.png', type: 5},{sprite: '/game4/png/pig_place.png', type: 5}
]

const place_data = [
        {x: 0.35, y: 0.2},      {x: 0.55, y: 0.2},      {x: 0.75, y: 0.2},
    {x: 0.25, y: 0.42},     {x: 0.45, y: 0.42},     {x: 0.65, y: 0.42},     {x: 0.85, y:0.42},
        {x: 0.35, y: 0.64},      {x: 0.55, y: 0.64},      {x: 0.75, y: 0.64}
]

let check: number = -1
let finished: number = 0
let prevPopup: string

export class GameScreen extends Container {
    // public readonly timer: GameTimer;
    // public readonly score: GameScore;
    private monkey: Monkey;
    private celebation: Celebration
    private desk: Desk;
    private desk_item1: Desk_Item1;
    private desk_item2: Desk_Item2;
    private btn_back: Btn_back;
    private btn_tutorial: Btn_tutorial;
    private game_piece: Game_piece[] = [];
    private line: Graphics[] = []

    constructor() {
        super();

        // sound.add('my-sound', 'http://localhost:4444/game4/audio/example.mp3');
        // sound.play('my-sound');

        this.monkey = new Monkey();
        this.addChild(this.monkey);

        this.desk = new Desk();
        this.addChild(this.desk);

        this.desk_item1 = new Desk_Item1();
        this.addChild(this.desk_item1);

        this.desk_item2 = new Desk_Item2();
        this.addChild(this.desk_item2);

        this.btn_tutorial = new Btn_tutorial();
        this.btn_tutorial.interactive = true
        this.btn_tutorial.on('pointerup', () => {navigation.presentPopup(PausePopup); prevPopup = 'pause'})
        this.addChild(this.btn_tutorial);

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('pointerup', ()=> this.reset())
        this.addChild(this.btn_back);

        this.shuffle()

        for (let i = 0; i<10;i++){
            this.line[i] = new Graphics();
            this.addChild(this.line[i]);
        }

        for (let i = 0; i<10;i++){
            this.game_piece[i] = new Game_piece({sprite: data[i].sprite,type: data[i].type});
            this.game_piece[i].interactive = true;
            this.game_piece[i].on('pointerover', () => this.game_piece[i].scale.set(1.2))
                    .on('pointerout', ()=> this.game_piece[i].scale.set(1))
                    .on('pointerup', ()=> {this.check_value(i)})
                    .on('pointerdown',()=> this.game_piece[i].scale.set(1))
                    .on('pointerup',()=> this.game_piece[i].scale.set(1.2));
            this.addChild(this.game_piece[i])
        }

        this.celebation = new Celebration();
        this.addChild(this.celebation);
    }


    public async pause() {
        this.interactiveChildren = false;
    }

    public async resume() {
        if (prevPopup == 'finish') this.reset()
        this.interactiveChildren = true;
    }

    public resize(width: number, height: number) {
        this.monkey.width = width * 0.2;
        this.monkey.height = height * 0.5;
        this.monkey.x = width * 0.5;
        this.monkey.y = height;

        this.celebation.width = width;
        this.celebation.height = height;
        this.celebation.x = width * 0.5;
        this.celebation.y = height;

        this.desk.x = 0;
        this.desk.y = height * 0.87;
        this.desk.width = width ;
        this.desk.height = height * 0.15;

        this.desk_item1.x = width * 0.82;
        this.desk_item1.y = height * 0.77;
        this.desk_item1.width = width * 0.08;
        this.desk_item1.height = height * 0.13;

        this.desk_item2.x = width * 0.9;
        this.desk_item2.y = height * 0.55;
        this.desk_item2.width = width * 0.1;
        this.desk_item2.height = height * 0.35;

        this.btn_back.x = width * 0.07;
        this.btn_back.y = height * 0.11;

        this.btn_tutorial.x = width * 0.93;
        this.btn_tutorial.y = height * 0.11;

        for (let k = 0; k < 10; k++) {
            this.game_piece[k].x = width * place_data[k].x;
            this.game_piece[k].y = height * place_data[k].y;
        }

        for (let k = 0; k < 10; k++) {
            this.line[k].position.set(this.game_piece[k].x, this.game_piece[k].y);
        }
    }

    public async show() {
        this.desk.hide(false);
        this.desk_item1.hide(false);
        this.desk_item2.hide(false);
        this.celebation.hide(false);
        for (let k = 0; k < 10; k++) {
            this.game_piece[k].hide(false);
        }

        this.monkey.show(false);
        this.monkey.playTalk();
        await this.desk.show(true);
        this.desk_item1.show(true);
        this.desk_item2.show(true);
        for (let k = 0; k < 10; k++) {
            await this.game_piece[k].show(true);
        }
        // await waitFor(9.5)
        this.monkey.playIdle();

    }

    public async hide() {
    }

    public shuffle() {
        let currentIndex = data.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [data[currentIndex], data[randomIndex]] = [
            data[randomIndex], data[currentIndex]];
        }
    }

    public shuffle_place() {
        let currentIndex = place_data.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [place_data[currentIndex], place_data[randomIndex]] = [
            place_data[randomIndex], place_data[currentIndex]];
        }
      }

    public async reset() {

        const windowWidth = window.innerWidth * 0.85;
        const windowHeight = window.innerHeight * 0.85;
        const minWidth = 600;
        const minHeight = 325;

        const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
        const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
        const scale = scaleX > scaleY ? scaleX : scaleY;
        const width = windowWidth * scale;
        const height = windowHeight * scale;

        for (let k = 0; k < 10; k++) {
            this.game_piece[k].hide(true);
            this.line[k].clear()
        }

        this.shuffle_place();


        for (let k = 0; k < 10; k++) {
            this.game_piece[k].show(true);
            this.game_piece[k].interactive= true;
        }

        this.celebation.hide(false);

        this.resize(width, height)
        
        finished = 0
        check = -1
    }

    public async check_value(current_index: number) {
        if (check === -1){
            check = current_index;
            this.game_piece[current_index].onPick();
            return
        } else if (check === current_index){
            this.game_piece[current_index].onBlank()
            check = -1
        } else {
            for (let k = 0; k < 10; k++) {
                this.game_piece[k].scale.set(1)
                this.game_piece[k].interactive = false;
            }
            if (this.game_piece[check].type == this.game_piece[current_index].type){
                this.line[check].lineStyle(2, 0x000000).moveTo(0,0).lineTo(this.line[current_index].x-this.line[check].x,this.line[current_index].y-this.line[check].y);
                this.game_piece[check].onTrue();
                this.game_piece[current_index].onTrue();
                await waitFor(1);
                this.game_piece[check].onBlank();
                this.game_piece[current_index].onBlank();
                this.game_piece[check].interactive = false;
                this.game_piece[current_index].interactive = false;
                this.game_piece[check].hide(true);
                this.game_piece[current_index].hide(true);
                this.line[check].clear()
                this.finish()
                check = -1
            } else {
                this.game_piece[check].onFalse();
                this.game_piece[current_index].onFalse();
                await waitFor(1);
                this.game_piece[check].onBlank();
                this.game_piece[current_index].onBlank();
                check = -1
            }
            for (let k = 0; k < 10; k++) {
                this.game_piece[k].interactive = true;
            }
        }
    } 

    public async finish() {
        if (finished == 4){
            this.celebation.show(false);
            this.celebation.play();
            await waitFor(3);
            navigation.presentPopup(ResultPopup)
            prevPopup = 'finish'
        } else {
            finished++
        }
    }

    /** Auto pause the game when window go out of focus */
    // public blur() {
    //     if (!navigation.currentPopup && this.match3.isPlaying()) {
    //         navigation.presentPopup(PausePopup);
    //     }
    // }
}
