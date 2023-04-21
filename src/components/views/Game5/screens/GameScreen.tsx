import { Container} from 'pixi.js';
import { PausePopup } from '../popups/Pause_Popup';
import { ResultPopup } from '../popups/Result_Popup';
import { FalsePopup } from '../popups/False_Popup';
import { navigation } from '../utils/navigation';
import { Snail } from '../ui/Snail';
import { Btn_back } from '../ui/Btn_back';
import { Btn_tutorial } from '../ui/Btn_tutorial';
import { Label } from '../ui/Label';
import { Leaf } from '../ui/Leaf';
import { Apple } from '../ui/Apple';
import { Strawberry } from '../ui/Strawberry';
import { SweetPotato } from '../ui/SweetPotato';

import { waitFor } from '../utils/asyncUtils';

import { gsap } from 'gsap';

let level = 4
let prevPopup: string

const type_question = ['chiếc lá', 'quả dâu tây', 'quả táo', 'củ khoai lang']

const place_data = [
    {x: 0.35, y: 0.5}, {x: 0.55, y: 0.6}, {x: 0.7, y: 0.9}, {x: 0.45, y: 0.75}, {x: 0.3, y: 0.9},
    {x: 0.2, y: 0.55}, {x: 0.05, y: 0.65}, {x: 0.95, y: 0.85}, {x: 0.75, y: 0.6}, {x: 0.2, y: 0.75},
    {x: 0.45, y: 0.6}, {x: 0.9, y: 0.6}, {x: 0.35, y: 0.7}, {x: 0.5, y: 0.9}, {x: 0.75, y: 0.8},
    {x: 0.05, y: 0.5}, {x: 0.8, y: 0.45}, {x: 0.6, y: 0.7}, {x: 0.1, y: 0.9}, {x: 0.55, y: 0.8},
]


export class GameScreen extends Container {
    // public readonly timer: GameTimer;
    // public readonly score: GameScore;
    private snail: Snail;
    private btn_back: Btn_back;
    private btn_tutorial: Btn_tutorial;
    private back_number: Label;
    private leaf: Leaf[] = [];
    private apple: Apple[] = [];
    private strawberry: Strawberry[] = [];
    private sweet_potato: SweetPotato[] = [];
    private question: Label;

    constructor() {
        super();
        this.shuffle_type()
        for (let i = 0; i<5;i++){
            this.leaf[i] = new Leaf();
            this.leaf[i].interactive = true;
            this.leaf[i].on('pointerover', () => this.leaf[i].scale.set(1.2))
                    .on('pointerout', ()=> this.leaf[i].scale.set(1))
                    .on('pointerup', ()=> {this.snailAction(this.leaf[i])})
                    .on('pointerdown',()=> this.leaf[i].scale.set(1))
                    .on('pointerup',()=> this.leaf[i].scale.set(1.2));
            this.addChild(this.leaf[i])
        }
        for (let i = 0; i<5;i++){
            this.apple[i] = new Apple();
            this.apple[i].interactive = true;
            this.apple[i].on('pointerover', () => this.apple[i].scale.set(1.2))
                    .on('pointerout', ()=> this.apple[i].scale.set(1))
                    .on('pointerup', ()=> {this.snailAction(this.apple[i])})
                    .on('pointerdown',()=> this.apple[i].scale.set(1))
                    .on('pointerup',()=> this.apple[i].scale.set(1.2));
            this.addChild(this.apple[i])
        }

        for (let i = 0; i<5;i++){
            this.strawberry[i] = new Strawberry();
            this.strawberry[i].interactive = true;
            this.strawberry[i].on('pointerover', () => this.strawberry[i].scale.set(1.2))
                    .on('pointerout', ()=> this.strawberry[i].scale.set(1))
                    .on('pointerup', ()=> {this.snailAction(this.strawberry[i])})
                    .on('pointerdown',()=> this.strawberry[i].scale.set(1))
                    .on('pointerup',()=> this.strawberry[i].scale.set(1.2));
            this.addChild(this.strawberry[i])
        }

        for (let i = 0; i<5;i++){
            this.sweet_potato[i] = new SweetPotato();
            this.sweet_potato[i].interactive = true;
            this.sweet_potato[i].on('pointerover', () => this.sweet_potato[i].scale.set(1.2))
                    .on('pointerout', ()=> this.sweet_potato[i].scale.set(1))
                    .on('pointerup', ()=> {this.snailAction(this.sweet_potato[i])})
                    .on('pointerdown',()=> this.sweet_potato[i].scale.set(1))
                    .on('pointerup',()=> this.sweet_potato[i].scale.set(1.2));
            this.addChild(this.sweet_potato[i])
        }
        this.btn_tutorial = new Btn_tutorial();
        this.btn_tutorial.interactive = true
        this.btn_tutorial.on('pointerup', () => {navigation.presentPopup(PausePopup);prevPopup = 'pause'})
        this.addChild(this.btn_tutorial);

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('pointerup', ()=> this.reset())
        this.addChild(this.btn_back);

        this.snail = new Snail();
        this.addChild(this.snail);

        this.back_number = new Label(level.toString(), { fill: 0xffffff, fontSize: 270 }, 200)
        this.back_number.position.set(675,-520)

        this.question = new Label('Bé hãy chỉ đường cho chú ốc sên ăn '+ level.toString() + ' ' + type_question[0] + ' nhé', { fill: 0x000000, fontSize: 20, fontFamily: 'Clear Sans'})
        this.addChild(this.question)
    }


    public async pause() {
        this.interactiveChildren = false;
    }

    public async resume() {
        if (prevPopup == 'finish') this.reset()
        this.interactiveChildren = true;
    }


    public resize(width: number, height: number) {
        this.question.x = width * 0.5;
        this.question.y = height * 0.05;

        for (let k = 0; k < 5; k++) {
            this.leaf[k].x = width * place_data[k].x;
            this.leaf[k].y = height * place_data[k].y;
        }

        for (let k = 0; k < 5; k++) {
            this.apple[k].x = width * place_data[k+5].x;
            this.apple[k].y = height * place_data[k+5].y;
        }

        for (let k = 0; k < 5; k++) {
            this.strawberry[k].x = width * place_data[k+10].x;
            this.strawberry[k].y = height * place_data[k+10].y;
        }

        for (let k = 0; k < 5; k++) {
            this.sweet_potato[k].x = width * place_data[k+15].x;
            this.sweet_potato[k].y = height * place_data[k+15].y;
        }

        this.snail.scale.set(0.5)
        this.snail.x = width * 0.5;
        this.snail.y = height * 0.5;

        this.btn_back.x = width * 0.07;
        this.btn_back.y = height * 0.11;

        this.btn_tutorial.x = width * 0.93;
        this.btn_tutorial.y = height * 0.11;

    }

    public async show() {

        for (let k = 0; k < 5; k++) {
            this.leaf[k].hide(false);
        }

        for (let k = 0; k < 5; k++) {
            this.apple[k].hide(false);
        }

        for (let k = 0; k < 5; k++) {
            this.strawberry[k].hide(false);
        }

        for (let k = 0; k < 5; k++) {
            this.sweet_potato[k].hide(false);
        }
        this.snail.hide(false);

        for (let k = 0; k < 5; k++) {
            this.leaf[k].show(true);
        }

        await waitFor(0.5)

        for (let k = 0; k < 5; k++) {
            this.apple[k].show(true);
        }

        await waitFor(0.5)

        for (let k = 0; k < 5; k++) {
            this.strawberry[k].show(true);
        }

        await waitFor(0.5)

        for (let k = 0; k < 5; k++) {
            this.sweet_potato[k].show(true);
        }

        await waitFor(0.5)

        this.snail.show(true);
        this.snail.addContent(this.back_number)

        this.snail.play1();
    }

    public async hide() {
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


        level = 4
        this.removeChild(this.question)
        this.snail.removeContent(this.back_number)
        this.shuffle_type()
        this.question = new Label('Bé hãy chỉ đường cho chú ốc sên ăn '+ level.toString() + ' ' + type_question[0] + ' nhé', { fill: 0x000000, fontSize: 20, fontFamily: 'Clear Sans'})
        this.question.x = width * 0.5;
        this.question.y = height * 0.05;
        this.addChild(this.question)
        this.back_number = new Label(level.toString(), { fill: 0xffffff, fontSize: 270 }, 200)
        this.snail.addContent(this.back_number)
        this.back_number.position.set(675,-520)

        for (let k = 0; k < 5; k++) {
            this.leaf[k].hide(true);
        }

        for (let k = 0; k < 5; k++) {
            this.apple[k].hide(true);
            this.apple[k].rotation=0;
        }

        for (let k = 0; k < 5; k++) {
            this.strawberry[k].hide(true);
            this.strawberry[k].rotation=0;
        }

        for (let k = 0; k < 5; k++) {
            this.sweet_potato[k].hide(true);
        }

        await waitFor(0.5)
        this.shuffle_place();
        this.resize(width,height)

        if(this.snail.scale.x < 0) {this.back_number.width = 250;this.back_number.scale.x= -1} else {this.back_number.scale.x= 1}

        for (let k = 0; k < 5; k++) {
            this.leaf[k].show(true);
        }

        for (let k = 0; k < 5; k++) {
            this.leaf[k].show(true);
        }

        for (let k = 0; k < 5; k++) {
            this.apple[k].show(true);
        }

        for (let k = 0; k < 5; k++) {
            this.strawberry[k].show(true);
        }

        for (let k = 0; k < 5; k++) {
            this.sweet_potato[k].show(true);
        }
        
    }

    public async snailAction(food: any){
        if(food.position.x > this.snail.position.x){
            this.snail.scale.x= -0.5
            this.back_number.scale.x= -1
            this.back_number.width = 250;
        } else {
            this.snail.scale.x= 0.5
            this.back_number.scale.x= 1
            this.back_number.width = 250;
        }
        this.snail.play2();
        gsap.killTweensOf(this.snail.position);
        await gsap.to(this.snail.position, { x: food.position.x , y: food.position.y, duration: 1 });  
        this.snail.play3();
        await waitFor(1)
        food.hide(true)
        this.snail.play1();
        if(food.type == type_question[0]){
            this.snail.removeContent(this.back_number)
            level--;
            if(level == 0){navigation.presentPopup(ResultPopup);prevPopup = 'finish'}
            this.back_number = new Label(level.toString(), { fill: 0xffffff, fontSize: 270 }, 200)
            this.snail.addContent(this.back_number)
            this.back_number.position.set(675,-520)
            if(this.snail.scale.x < 0) {this.back_number.width = 250;this.back_number.scale.x= -1}
        } else {
            navigation.presentPopup(FalsePopup);prevPopup = 'pause'
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

      public shuffle_type() {
        let currentIndex = type_question.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [type_question[currentIndex], type_question[randomIndex]] = [
            type_question[randomIndex], type_question[currentIndex]];
        }
    }
}
