import { Container, Texture, BaseTexture, Sprite } from 'pixi.js';
import { PausePopup } from '../popups/Pause_Popup';
import { ResultPopup } from '../popups/Result_Popup';
import { FalsePopup } from '../popups/False_Popup';
import { navigation } from '../utils/navigation';
import { Snail } from '../ui/Snail';
import { Btn_back } from '../ui/Btn_back';
import { Btn_tutorial } from '../ui/Btn_tutorial';
import { Label } from '../ui/Label';
import { Food_Type_1 } from '../ui/Food_Type_1';
import { Food_Type_2 } from '../ui/Food_Type_2';
import { Food_Type_3 } from '../ui/Food_Type_3';
import { Food_Type_4 } from '../ui/Food_Type_4';

import { waitFor } from '../utils/asyncUtils';

import { gsap } from 'gsap';
import { canvasScale, canvasHeight, canvasWidth } from '../Game5';

let level = 4
let prevPopup: string

let typeQuestion: any[] = []


const place_data = [
    {x: 0.35, y: 0.5}, {x: 0.55, y: 0.6}, {x: 0.7, y: 0.9}, {x: 0.45, y: 0.75}, {x: 0.3, y: 0.9},
    {x: 0.2, y: 0.55}, {x: 0.05, y: 0.65}, {x: 0.95, y: 0.85}, {x: 0.75, y: 0.6}, {x: 0.2, y: 0.75},
    {x: 0.45, y: 0.6}, {x: 0.9, y: 0.6}, {x: 0.35, y: 0.7}, {x: 0.5, y: 0.9}, {x: 0.75, y: 0.8},
    {x: 0.05, y: 0.5}, {x: 0.8, y: 0.45}, {x: 0.6, y: 0.7}, {x: 0.1, y: 0.9}, {x: 0.55, y: 0.8},
]


export class GameScreen extends Container {
    // public readonly timer: GameTimer;
    // public readonly score: GameScore;
    private snail?: Snail;
    private btn_back: Btn_back;
    private btn_tutorial: Btn_tutorial;
    private back_number?: Label;
    private food_snail: Food_Type_1[] | Food_Type_2[] | Food_Type_3[] | Food_Type_4[] = [];
    private question?: Label;

    private test?: Sprite;


    constructor() {
        super();

        this.setup()

        this.btn_tutorial = new Btn_tutorial();
        this.btn_tutorial.interactive = true
        this.btn_tutorial.on('pointerup', () => {navigation.presentPopup(PausePopup);prevPopup = 'pause'})
        this.addChild(this.btn_tutorial);

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('pointerup', ()=> this.reset())
        this.addChild(this.btn_back);

    }


    public async pause() {
        this.interactiveChildren = false;
    }

    public async resume() {
        if (prevPopup == 'finish') this.reset()
        this.interactiveChildren = true;
    }

    public async setup(){
        // const url = "https://api.stg.qlmn.vn/public/images/game5/caynam.png";
        // const image = new Image();
        // image.src = url;
        // image.crossOrigin = ''
        // this.test = Sprite.from(url)
        // this.addChild(this.test)
        // console.log(image )
        await this.shuffle_type()
        for(let i = 0; i<4; i++){
            switch (typeQuestion[i].fall_type){
                case 1:{
                    for (let k = 0; k<5;k++){
                        this.food_snail[k+(i*5)] = new Food_Type_1({sprite: typeQuestion[i].img_url, type: typeQuestion[i].img_name, scale: typeQuestion[i].img_scale});
                        this.food_snail[k+(i*5)] .interactive = true;
                        this.food_snail[k+(i*5)] .on('pointerover', () => this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale))
                                .on('pointerout', ()=> this.food_snail[k+(i*5)] .scale.set(canvasScale))
                                .on('pointerup', ()=> {this.snailAction(this.food_snail[k+(i*5)] )})
                                .on('pointerdown',()=> this.food_snail[k+(i*5)] .scale.set(canvasScale))
                                .on('pointerup',()=> this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale));
                        this.addChild(this.food_snail[k+(i*5)])
                    } 
                    break
                }

                case 2:{
                    for (let k = 0; k<5;k++){
                        this.food_snail[k+(i*5)] = new Food_Type_2({sprite: typeQuestion[i].img_url, type: typeQuestion[i].img_name, scale: typeQuestion[i].img_scale});
                        this.food_snail[k+(i*5)] .interactive = true;
                        this.food_snail[k+(i*5)] .on('pointerover', () => this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale))
                                .on('pointerout', ()=> this.food_snail[k+(i*5)] .scale.set(canvasScale))
                                .on('pointerup', ()=> {this.snailAction(this.food_snail[k+(i*5)] )})
                                .on('pointerdown',()=> this.food_snail[k+(i*5)] .scale.set(canvasScale))
                                .on('pointerup',()=> this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale));
                        this.addChild(this.food_snail[k+(i*5)])
                    } 
                    break
                }

                case 3:{
                    for (let k = 0; k<5;k++){
                        this.food_snail[k+(i*5)] = new Food_Type_3({sprite: typeQuestion[i].img_url, type: typeQuestion[i].img_name, scale: typeQuestion[i].img_scale});
                        this.food_snail[k+(i*5)] .interactive = true;
                        this.food_snail[k+(i*5)] .on('pointerover', () => this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale))
                                .on('pointerout', ()=> this.food_snail[k+(i*5)] .scale.set(canvasScale))
                                .on('pointerup', ()=> {this.snailAction(this.food_snail[k+(i*5)] )})
                                .on('pointerdown',()=> this.food_snail[k+(i*5)] .scale.set(canvasScale))
                                .on('pointerup',()=> this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale));
                        this.addChild(this.food_snail[k+(i*5)])
                    } 
                    break
                }

                case 4:{
                    for (let k = 0; k<5;k++){
                        this.food_snail[k+(i*5)] = new Food_Type_4({sprite: typeQuestion[i].img_url, type: typeQuestion[i].img_name, scale: typeQuestion[i].img_scale});
                        this.food_snail[k+(i*5)] .interactive = true;
                        this.food_snail[k+(i*5)].scale.set(canvasScale * typeQuestion[i].img_scale)
                        this.food_snail[k+(i*5)] .on('pointerover', () => this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale * typeQuestion[i].img_scale))
                                .on('pointerout', ()=> this.food_snail[k+(i*5)] .scale.set(canvasScale * typeQuestion[i].img_scale))
                                .on('pointerup', ()=> {this.snailAction(this.food_snail[k+(i*5)] )})
                                .on('pointerdown',()=> this.food_snail[k+(i*5)] .scale.set(canvasScale * typeQuestion[i].img_scale))
                                .on('pointerup',()=> this.food_snail[k+(i*5)] .scale.set(1.2 * canvasScale * typeQuestion[i].img_scale));
                        this.addChild(this.food_snail[k+(i*5)])
                    } 
                    break
                }
            }
        }
        
        this.snail = new Snail();
        this.snail.scale.set(0.5 * canvasScale)
        this.addChild(this.snail);

        this.back_number = new Label(level.toString(), { fill: 0xffffff, fontSize: 270 }, 200)
        this.back_number.position.set(675,-520)

        this.question = new Label('Bé hãy chỉ đường cho chú ốc sên ăn '+ level.toString() + ' ' + typeQuestion[0].img_name + ' nhé', { fill: 0x000000, fontSize: 20, fontFamily: 'Clear Sans'})
        this.addChild(this.question)

        this.resize(canvasWidth, canvasHeight)
        this.show()

    }


    public resize(width: number, height: number) {
        if (this.question){
            this.question!.x = width * 0.5;
            this.question!.y = height * 0.05;
        }

        if (this.food_snail[0]){
            for (let k = 0; k < 20; k++) {
                this.food_snail[k].x = width * place_data[k].x;
                this.food_snail[k].y = height * place_data[k].y;
            }
        }

        if(this.test){
            this.test!.x = width * 0.5;
            this.test!.y = height * 0.5;
        }

        if(this.snail){
            this.snail!.x = width * 0.5;
            this.snail!.y = height * 0.5;
        }

        if(this.test){
            this.test!.x = width * 0.5;
            this.test!.y = height * 0.5;
        }

        this.btn_back.x = width * 0.07;
        this.btn_back.y = height * 0.11;

        this.btn_tutorial.x = width * 0.93;
        this.btn_tutorial.y = height * 0.11;

    }

    public async show() {
        if (this.snail){
            for (let k = 0; k < 20; k++) {
                this.food_snail[k].hide(false);
            }

            this.snail!.hide(false);

            for (let k = 0; k < 20; k++) {
                this.food_snail[k].show(true);
            }

            await waitFor(0.5)

            this.snail!.show(true);
            this.snail!.addContent(this.back_number!)

            this.snail!.play1();
        }
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
        this.removeChild(this.question!)
        this.snail!.removeContent(this.back_number!)
        this.shuffle_type()
        this.question = new Label('Bé hãy chỉ đường cho chú ốc sên ăn '+ level.toString() + ' ' + typeQuestion[0].img_name + ' nhé', { fill: 0x000000, fontSize: 20, fontFamily: 'Clear Sans'})
        this.question.x = width * 0.5;
        this.question.y = height * 0.05;
        this.addChild(this.question!)
        this.back_number = new Label(level.toString(), { fill: 0xffffff, fontSize: 270 }, 200)
        this.snail!.addContent(this.back_number)
        this.back_number.position.set(675,-520)

        for (let k = 0; k < 20; k++) {
            this.food_snail[k].hide(true);
            this.food_snail[k].rotation=0;
        }


        await waitFor(0.5)
        this.shuffle_place();
        this.resize(width,height)

        if(this.snail!.scale.x < 0) {this.back_number.width = 250;this.back_number.scale.x= -1 * canvasScale} else {this.back_number.scale.x= 1 * canvasScale}

        for (let k = 0; k < 20; k++) {
            this.food_snail[k].show(true);
        }
        
    }

    public async snailAction(food: any){
        let speed = (this.Pitago((this.snail!.position.x - food.position.x),(this.snail!.position.y - food.position.y)) / 200) + 0.5
        if(food.position.x > this.snail!.position.x){
            this.snail!.scale.x= -0.5 * canvasScale
            this.back_number!.scale.x= -1 * canvasScale
            this.back_number!.width = 250;
        } else {
            this.snail!.scale.x= 0.5 * canvasScale
            this.back_number!.scale.x= 1 * canvasScale
            this.back_number!.width = 250;
        }
        this.snail!.play2();
        gsap.killTweensOf(this.snail!.position);
        await gsap.to(this.snail!.position, { x: food.position.x , y: food.position.y, duration: speed});  
        this.snail!.play3();
        await waitFor(1)
        food.hide(true)
        this.snail!.play1();
        if(food.type == typeQuestion[0].img_name){
            this.snail!.removeContent(this.back_number!)
            level--;
            this.back_number = new Label(level.toString(), { fill: 0xffffff, fontSize: 270 }, 200)
            this.snail!.addContent(this.back_number)
            this.back_number.position.set(675,-520)
            if(this.snail!.scale.x < 0) {this.back_number.width = 250;this.back_number.scale.x= -1 * canvasScale}
            if(level == 0){
                await waitFor(1)
                navigation.presentPopup(ResultPopup);prevPopup = 'finish'}
        } else {
            navigation.presentPopup(FalsePopup);prevPopup = 'pause'
        }
    }

    public Pitago(a: any, b: any) {
        if (a<0) {a = a * -1}
        if (b<0) {b = b * -1}
        return (Math.sqrt((a * a) + (b * b)));
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

      public async shuffle_type() {

        typeQuestion = await fetch("https://api.stg.qlmn.vn/api/game/get_answers?game_id=5")
            .then(response => {
                return response.json()
            })
            .then(data => {
                return data
            });
    }

}

