import { Container, Sprite, Texture} from 'pixi.js';
import { PausePopup } from '../popups/Pause_Popup';
import { ResultPopup } from '../popups/Result_Popup';
import { LevelScreen } from './LevelScreen';
import { navigation } from '../utils/navigation';
import { Clam } from '../ui/Clam';
import { Btn_back } from '../ui/Btn_back';
import { Btn_tutorial } from '../ui/Btn_tutorial';
import { randomRange } from '../utils/random';
import { Fish } from '../ui/Fish';
import { Shark } from '../ui/Shark';

import { waitFor } from '../utils/asyncUtils';

import { gsap } from 'gsap';

const windowWidth = window.innerWidth * 0.85;
const windowHeight = window.innerHeight * 0.85;
const minWidth = 600;
const minHeight = 325;

const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
const scale = scaleX > scaleY ? scaleX : scaleY;
const canvasWidth = windowWidth * scale;
const canvasHeight = windowHeight * scale;

const level_dif = [{min: 0, max: 0},{min: 1, max: 6},{min: 3, max: 8},{min: 5, max: 10},{min: 7, max: 12},{min: 9, max: 14},]
const answer_dif = [[0,1,2],[0,-1,1],[0,-2,-1]]
const place_data = [{x: 0.225, y: 1}, {x: 0.5, y: 1}, {x: 0.775, y: 1},]

let true_answer = 1

let timer = 0

let level = 0;

let round = 3

let point = 0

let prevPopup: string

export class GameScreen extends Container {
    // public readonly timer: GameTimer;
    // public readonly score: GameScore;
    private clam: Clam[] = [];
    private answer: Sprite[] = [];
    private btn_back: Btn_back;
    private btn_tutorial: Btn_tutorial;
    private fish: Fish[] = [];
    private shark?: Shark;

    constructor() {
        super();

        level = Number(localStorage.getItem("level"));

        this.btn_tutorial = new Btn_tutorial();
        this.btn_tutorial.interactive = true
        this.btn_tutorial.on('pointerup', () => {navigation.presentPopup(PausePopup);prevPopup = 'pause'})
        this.addChild(this.btn_tutorial);

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('pointerup', ()=> navigation.showScreen(LevelScreen))
        this.addChild(this.btn_back);

        this.setup()
    }

    public setup(){
        true_answer = Math.floor(randomRange(level_dif[level].min, level_dif[level].max))

        this.shuffle_answer()
        this.shuffle()
        let answers = []
        if(true_answer > 2){
            answers = [true_answer + answer_dif[0][0],true_answer + answer_dif[0][1], true_answer + answer_dif[0][2]]
        } else {
            answers = [true_answer + 0,true_answer + 1, true_answer + 2]
        }
        for(let i = 0; i<3; i++){
            this.clam[i] = new Clam();
            this.clam[i].type = answer_dif[0][i]
            this.clam[i].interactive = true
            this.clam[i].on('pointerup',()=> {this.openAndClose(i)});
            this.addChild(this.clam[i]);
            this.answer[i] = new Sprite(Texture.from(`/game3/png/number_${answers[i]}.png`),);
            this.answer[i].scale.set(0.5)
            this.answer[i].anchor.x = 0.5
            this.answer[i].anchor.y = 1
            this.answer[i].interactive = true
            this.answer[i].on('pointerup',()=> {this.openAndClose(i)});
            this.addChild(this.answer[i]);
        }

        for(let i = 0; i<true_answer; i++){
            this.fish[i] = new Fish();
            this.addChild(this.fish[i]);
        }
        this.shark = new Shark();
        this.addChild(this.shark);
    }


    public async pause() {
        this.interactiveChildren = false;
    }

    public async resume() {
        if (prevPopup == 'finish') {point = 0; round = 4; this.reset();}
        this.interactiveChildren = true;
    }


    public resize(width: number, height: number) {

        for(let i = 0; i<3; i++){
            this.clam[i].x = width * place_data[i].x
            this.clam[i].y = height * place_data[i].y
            this.answer[i].x = width * place_data[i].x - width * 0.011
            this.answer[i].y = height * place_data[i].y - 120
        }

        for(let i = 0; i<true_answer; i++){
            this.fish[i].x = width * - 0.1
            this.fish[i].y = height * (Math.random() * 0.45 + 0.17)
        }

        this.btn_back.x = width * 0.07;
        this.btn_back.y = height * 0.11;

        this.btn_tutorial.x = width * 0.93;
        this.btn_tutorial.y = height * 0.11;

    }

    public async show() {

        this.shark!.hide(false)

        for(let i = 0; i<true_answer; i++){
            this.fish[i].hide(false, 0)
        }

        for(let i = 0; i<3; i++){
            this.clam[i].play1()
        }

        for(let i = 0; i<true_answer; i++){
            await this.fish[i].show(true)
        }

    }

    public update() {
        timer++
        if (timer > (420 + true_answer * 20)){
            this.reset()
        }
        if (true_answer>0){
            for(let i = 0; i<true_answer; i++){
                if (this.fish[i].status == 'show'){
                    this.fish[i].x += canvasWidth * 0.01 / 3
                }
            }
        }
    }

    public async hide() {
    }

    public async reset() {

        for(let i = 0; i<3; i++){
            this.removeChild(this.clam[i]);
            this.removeChild(this.answer[i]);
        }

        for(let i = 0; i<true_answer; i++){
            this.removeChild(this.fish[i]);
        }

        this.removeChild(this.shark!);

        this.shuffle()
        this.shuffle_answer()
        round--
        if(round > 0){
            this.setup();
            this.resize(canvasWidth, canvasHeight)

            this.shark!.hide(false)

            for(let i = 0; i<true_answer; i++){
                this.fish[i].hide(false, 0)
            }

            for(let i = 0; i<3; i++){
                this.clam[i].play1()
            }

            timer = 0

            for(let i = 0; i<true_answer; i++){
                await this.fish[i].show(true)
            }
        } else {
            localStorage.setItem("point", `${point}`);
            navigation.presentPopup(ResultPopup);prevPopup = 'finish'
        }
    }

    public async openAndClose(index: any) {
        timer = 0
        let last_fish = 0
        let destinationX = canvasWidth * place_data[index].x - canvasWidth * 0.011
        let destinationY = canvasHeight * place_data[index].y - 120
        for(let i = 0; i<3; i++){
            this.removeChild(this.answer[i])
        }
        await this.clam[index].play3();
        await waitFor(0.5)
        if(this.clam[index].type == 0){
            point++;
            for(let i = 0; i<true_answer; i++){
                let speed = (this.Pitago((this.fish[i].position.x - destinationX),(this.fish[i].position.y - destinationY)) / 200)
                if(this.fish[i].position.x > destinationX ){
                    let angleTo = Math.atan2(this.fish[i].position.y - destinationY,this.fish[i].position.x - destinationX);
                    gsap.killTweensOf(this.fish[i].scale);
                    gsap.to(this.fish[i].scale, { x: -1 , duration: 0.3})
                    gsap.killTweensOf(this.fish[i]);
                    gsap.to(this.fish[i], {rotation: angleTo, duration: speed})
                } else {
                    let angleTo = Math.atan2(destinationY - this.fish[i].position.y, destinationX - this.fish[i].position.x);
                    gsap.killTweensOf(this.fish[i]);
                    gsap.to(this.fish[i], {rotation: angleTo, duration: speed})
                }
                if (speed > last_fish){
                    last_fish = speed
                }
                gsap.killTweensOf(this.fish[i].position);
                gsap.to(this.fish[i].position, { x: destinationX , y: destinationY, duration: speed})
                this.fish[i].hide(true,speed)
            }
        } else {
            this.shark!.x = destinationX;
            this.shark!.y = destinationY;
            await this.shark!.show(true)
            let randomFish = Math.floor(Math.random() * true_answer)
            if(this.fish[randomFish].position.x < this.shark!.x){
                let angleTo = Math.atan2(this.shark!.y - this.fish[randomFish].position.y, this.shark!.x- this.fish[randomFish].position.x);
                gsap.killTweensOf(this.shark!.scale);
                gsap.to(this.shark!.scale, { x: -1 , duration: 0.3})
                gsap.killTweensOf(this.shark!);
                gsap.to(this.shark!, {rotation: angleTo, duration: 1})
            } else {
                let angleTo = Math.atan2(this.fish[randomFish].position.y - this.shark!.y,this.fish[randomFish].position.x - this.shark!.x);
                gsap.killTweensOf(this.shark!);
                gsap.to(this.shark!, {rotation: angleTo, duration: 1})
            }
            gsap.killTweensOf(this.shark!.position);
            gsap.to(this.shark!.position, { x: this.fish[randomFish].position.x , y: this.fish[randomFish].position.y, duration: 1})

            for(let i = 0; i<true_answer; i++){
                let runawayX = 0
                let runawayY = this.fish[i].position.y - destinationY
                if(this.fish[i].position.x < destinationX ){
                    runawayX = this.fish[i].position.x - destinationX
                    let angleTo = Math.atan2(destinationY - this.fish[i].position.y, destinationX - this.fish[i].position.x);
                    gsap.killTweensOf(this.fish[i].scale);
                    gsap.to(this.fish[i].scale, { x: -1 , duration: 0.3})
                    gsap.killTweensOf(this.fish[i]);
                    gsap.to(this.fish[i], {rotation: angleTo, duration: 1.5})
                } else {
                    runawayX = this.fish[i].position.x + destinationX
                    let angleTo = Math.atan2(this.fish[i].position.y - destinationY,this.fish[i].position.x - destinationX);
                    gsap.killTweensOf(this.fish[i]);
                    gsap.to(this.fish[i], {rotation: angleTo, duration: 1.5})
                }
                gsap.killTweensOf(this.fish[i].position);
                gsap.to(this.fish[i].position, { x: runawayX , y: runawayY, duration: 3})
                this.fish[i].hide(true,3)
            }
            await waitFor(1)

            if((canvasWidth * 0.5) < this.shark!.x){
                let angleTo = Math.atan2(this.shark!.y - (canvasHeight * 0.4), this.shark!.x - (canvasWidth * 0.5));
                gsap.killTweensOf(this.shark!.scale);
                gsap.to(this.shark!.scale, { x: -1 , duration: 0.3})
                gsap.killTweensOf(this.shark!);
                gsap.to(this.shark!, {rotation: angleTo, duration: 1})
            } else {
                let angleTo = Math.atan2((canvasHeight * 0.4) - this.shark!.y,(canvasWidth * 0.5) - this.shark!.x);
                gsap.killTweensOf(this.shark!.scale);
                gsap.to(this.shark!.scale, { x: 1 , duration: 0.3})
                gsap.killTweensOf(this.shark!);
                gsap.to(this.shark!, {rotation: angleTo, duration: 1})
            }
            gsap.killTweensOf(this.shark!.position);
            gsap.to(this.shark!.position, { x: (canvasWidth * 0.5) , y: (canvasHeight * 0.5), duration: 2})
        }
        await waitFor(last_fish + 0.5)
        await this.clam[index].play2();
        last_fish = 0
        await waitFor(1)
        this.reset()
    }

    public shuffle(){
        let currentIndex = place_data.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [place_data[currentIndex], place_data[randomIndex]] = [
            place_data[randomIndex], place_data[currentIndex]];
        }
    }

    public shuffle_answer(){
        let currentIndex = answer_dif.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [answer_dif[currentIndex], answer_dif[randomIndex]] = [
            answer_dif[randomIndex], answer_dif[currentIndex]];
        }
    }

    public Pitago(a: any, b: any) {
        if (a<0) {a = a * -1}
        if (b<0) {b = b * -1}
        return (Math.sqrt((a * a) + (b * b)));
      }

}
