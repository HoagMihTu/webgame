import { Container, Graphics, Sprite} from 'pixi.js';
import { PausePopup } from '../popups/Pause_Popup';
import { ResultPopup } from '../popups/Result_Popup';
import { navigation } from '../utils/navigation';
import { Btn_back } from '../ui/Btn_back';
import { Btn_tutorial } from '../ui/Btn_tutorial';
import { Game_piece } from '../ui/Game_piece';
import { Bg_item1, Bg_item2 } from '../ui/Bg_items';
import { Food } from '../ui/Food';
import { Pet } from '../ui/Pet';
import { Pick_color } from '../ui/Pick_color';
import { waitFor } from '../utils/asyncUtils';
import { app_game7 } from '../Game7';

let prevPopup: any;

const windowWidth = window.innerWidth * 0.85;
const windowHeight = window.innerHeight * 0.85;
const minWidth = 600;
const minHeight = 325;

const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
const scale = scaleX > scaleY ? scaleX : scaleY;
const canvasWidth = windowWidth * scale;
const canvasHeight = windowHeight * scale;

let colorToPick = [ {sprite: '/game7/red.png', color: '0xf03e3e', x: 0.15, y: 0.9},
                    {sprite: '/game7/pink.png', color: '0xf57ba0', x: 0.24, y: 0.9},
                    {sprite: '/game7/yellow.png', color: '0xfef30d', x: 0.33, y: 0.9},
                    {sprite: '/game7/green.png', color: '0x73c04b', x: 0.42, y: 0.9},
                    {sprite: '/game7/brown.png', color: '0x7e5130', x: 0.51, y: 0.9},
                    {sprite: '/game7/blue.png', color: '0x0893d6', x: 0.6, y: 0.9},
                    {sprite: '/game7/purple.png', color: '0x866ab9', x: 0.69, y: 0.9},
                    {sprite: '/game7/gray.png', color: '0x838383', x: 0.78, y: 0.9},
                    {sprite: '/game7/black.png', color: '0x070707', x: 0.87, y: 0.9},
                    {sprite: '/game7/orange.png', color: '0xefa313', x: 0.96, y: 0.9},]

let place_data = [                      {x: 0.21,y: 0.25},  {x: 0.3,y: 0.25},   {x: 0.39,y: 0.25},  {x: 0.48,y: 0.25},  {x: 0.57,y: 0.25},  {x: 0.66,y: 0.25},  {x: 0.75,y: 0.25},  {x: 0.84,y: 0.25},  {x: 0.93,y: 0.25},
                                        {x: 0.21,y: 0.4},   {x: 0.3,y: 0.4},    {x: 0.39,y: 0.4},   {x: 0.48,y: 0.4},   {x: 0.57,y: 0.4},   {x: 0.66,y: 0.4},   {x: 0.75,y: 0.4},   {x: 0.84,y: 0.4},   {x: 0.93,y: 0.4},
                    {x: 0.12,y: 0.55},  {x: 0.21,y: 0.55},  {x: 0.3,y: 0.55},   {x: 0.39,y: 0.55},  {x: 0.48,y: 0.55},  {x: 0.57,y: 0.55},  {x: 0.66,y: 0.55},  {x: 0.75,y: 0.55},  {x: 0.84,y: 0.55},  {x: 0.93,y: 0.55},
                    {x: 0.12,y: 0.7},   {x: 0.21,y: 0.7},   {x: 0.3,y: 0.7},    {x: 0.39,y: 0.7},   {x: 0.48,y: 0.7},   {x: 0.57,y: 0.7},   {x: 0.66,y: 0.7},   {x: 0.75,y: 0.7},   {x: 0.84,y: 0.7},
                ]
// let place_data_index = ["    0   1   2   3   4   5   6   7   8",
//                         "    9  10  11  12  13  14  15  16  17",
//                         "18 19  20  21  22  23  24  25  26  27",
//                         "28 29  30  31  32  33  34  35  36"]

let randomAnswer:any = []
let false_diagram:any = []
let true_diagram:any
let answer:any = []
let answer_holder:any = []

let pickedColor: any = '0xffffff';

export class GameScreen extends Container {
    private btn_back: Btn_back;
    private btn_tutorial: Btn_tutorial;
    private bg_item1: Bg_item1;
    private bg_item2: Bg_item2;
    private pet: Pet;
    private food: Food;
    private game_piece: Game_piece[] = [];
    private pick_color: Pick_color[] = [];

    constructor() {
        super();

        this.btn_tutorial = new Btn_tutorial();
        this.btn_tutorial.interactive = true
        this.btn_tutorial.on('pointerup', () => {navigation.presentPopup(PausePopup);prevPopup = 'pause'})
        this.addChild(this.btn_tutorial);

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('pointerup', ()=> this.reset())
        this.addChild(this.btn_back);

        this.bg_item1 = new Bg_item1();
        this.addChild(this.bg_item1)

        this.bg_item2 = new Bg_item2();
        this.addChild(this.bg_item2)

        this.pet = new Pet();
        this.pet.interactive = true;
        this.pet.on('pointerover', () => this.pet.onFalse())
                .on('pointerdown',()=> this.pet.onTrue());
        this.addChild(this.pet)

        this.food = new Food();
        this.food.interactive = true;
        this.food.on('pointerover', () => this.food.onFalse())
                .on('pointerdown',()=> this.food.onTrue());
        this.addChild(this.food)

        for (let i = 0; i<10;i++){
            this.pick_color[i] = new Pick_color({sprite: colorToPick[i].sprite, color: colorToPick[i].color});
            this.pick_color[i].interactive = true;
            this.pick_color[i].on('pointerup', ()=> {this.pick_color[i].onPick(); this.setColor(i)})
            this.addChild(this.pick_color[i])
        }

        this.setup()
    }


    public async pause() {
        this.interactiveChildren = false;
    }

    public async resume() {
        if (prevPopup == 'finish') this.reset()
        this.interactiveChildren = true;
    }


    public resize(width: number, height: number) {

        this.btn_back.x = width * 0.07;
        this.btn_back.y = height * 0.11;

        this.btn_tutorial.x = width * 0.93;
        this.btn_tutorial.y = height * 0.11;

        this.bg_item1.x = 0;
        this.bg_item1.y = height;
        this.bg_item1.width = width;
        this.bg_item1.height = height * 0.2;

        this.bg_item2.x = width * 0.04;
        this.bg_item2.y = height;

        this.pet.x = width * 0.1;
        this.pet.y = height * 0.3;

        this.food.x = width * 0.93;
        this.food.y = height * 0.7;

        for (let k = 0; k < 10; k++) {
            this.pick_color[k].x = width * colorToPick[k].x;
            this.pick_color[k].y = height * colorToPick[k].y;
        }

        for(let i=0; i<37; i++){
            this.game_piece[i].x = width * place_data[i].x;
            this.game_piece[i].y = height * place_data[i].y
        }

    }

    public async show() {
        for(let i=0; i<37; i++){
            this.game_piece[i].hide(false)
        }

        await waitFor(1)

        for(let i=0; i<37; i++){
            this.game_piece[i].show(true)
        }

    }

    public async hide() {
    }

    public async reset() {
        for(let i=0; i<37; i++){
            this.game_piece[i].hide(true)
        }

        for(let i=0; i<37; i++){
            this.removeChild(this.game_piece[i])
        }
        randomAnswer = []
        false_diagram = []
        answer = []
        answer_holder = []
        true_diagram = null

        this.setup()

        this.resize(canvasWidth,canvasHeight)

        for(let i=0; i<37; i++){
            this.game_piece[i].hide(false)
        }

        for(let i=0; i<37; i++){
            this.game_piece[i].show(true)
        }
    }

    public setColor(i: number){
        for (let k = 0; k<10;k++){
            if (k == i){
                this.pick_color[k].scale.set(1.2)
                pickedColor = colorToPick[k].color
            } else {
                this.pick_color[k].scale.set(1)
            }
        }
    }

    public setup(){
        createPath()

        randomSprite()
        
        for(let i=0; i<37; i++){
            let random_false_diagram = Math.floor(Math.random() * 3);
            if(randomAnswer.includes(i)){
                this.game_piece[i] = new Game_piece({sprite: true_diagram});
                this.game_piece[i].interactive = true;
                this.game_piece[i].on('pointerup', ()=> {this.game_piece[i].setColor(pickedColor); this.check_victory(i,pickedColor)})
                this.addChild(this.game_piece[i])
            } else {
                this.game_piece[i] = new Game_piece({sprite: false_diagram[random_false_diagram]});
                this.game_piece[i].interactive = true;
                this.game_piece[i].on('pointerup', ()=> {this.game_piece[i].setColor(pickedColor); this.check_victory(i,pickedColor)})
                this.addChild(this.game_piece[i])
            }
        }
    }

    public check_victory(index: number, color: any){
        let check_color = answer_holder.map((x: any)=> {return x.id;}).indexOf(index);
        if(check_color > -1 && answer_holder[check_color].color == color){
            color = '0xffffff'
            answer_holder.splice(check_color,1)
            answer_holder.push({id: index, color: color})
            this.game_piece[index].setColor(color)
        } else if (check_color > -1){
            answer_holder.splice(check_color,1)
            answer_holder.push({id: index, color: color})
        } else {
            answer_holder.push({id: index, color: color})
        }
        if (randomAnswer.includes(index)){
            let check_answer = answer.map((x: any)=> {return x.id;}).indexOf(index);
            if(check_answer == -1){
                answer.push({id: index, color: color})
            } else {
                answer.splice(check_answer,1)
                answer.push({id: index, color: color})
            }
        }

        let check_answer_quantity = answer.every((x: any) => {if (x.color === answer[0].color) {return true;}})
        if(check_answer_quantity && answer.length == randomAnswer.length){
            navigation.presentPopup(ResultPopup);prevPopup = 'finish'
        }
    }

}

function drawCircle(){
    var gr = new Graphics();  
        gr.beginFill(0xFFFFFF);
        gr.lineStyle(0);
        gr.drawCircle(0, 0, canvasHeight * 0.055);
        gr.endFill();

    var texture = app_game7.renderer.generateTexture(gr);
    return texture
}

function drawSquare(){
    var gr = new Graphics();  
        gr.beginFill(0xFFFFFF);
        gr.lineStyle(0);
        gr.drawRect(0, 0, canvasHeight * 0.11, canvasHeight * 0.11);
        gr.endFill();

    var texture = app_game7.renderer.generateTexture(gr);
    return texture
}

function drawTriangle(){
    var gr = new Graphics();  
        gr.beginFill(0xFFFFFF);
        gr.lineStyle(0);
        gr.moveTo(canvasHeight * 0.055, 0);
        gr.lineTo(canvasHeight * 0.11, canvasHeight * 0.11); 
        gr.lineTo(0, canvasHeight * 0.11);
        gr.lineTo(canvasHeight * 0.055, 0);
        gr.endFill();
        gr.endFill();

    var texture = app_game7.renderer.generateTexture(gr);
    return texture
}

function drawPentgon(){
    var gr = new Graphics();  
        gr.beginFill(0xFFFFFF);
        gr.lineStyle(0);
        gr.moveTo(0, canvasHeight * 0.04);
        gr.lineTo(canvasHeight * 0.055, 0); 
        gr.lineTo(canvasHeight * 0.11, canvasHeight * 0.04);
        gr.lineTo(canvasHeight * 0.0915, canvasHeight * 0.11);
        gr.lineTo(canvasHeight * 0.0185, canvasHeight * 0.11);
        gr.lineTo(0, canvasHeight * 0.04);
        gr.endFill();
        gr.endFill();

    var texture = app_game7.renderer.generateTexture(gr);
    return texture
}

function createPath(){
    let startPoints = [0,9,18]
    let randomStart = Math.floor(Math.random() * 3);
    let startPoint = startPoints[randomStart]
    let a: number;
    let b: number;
    if (startPoint < 10){
        a = 0;
        b = Number(startPoint)
    } else {
        let fixedStartPoint = startPoint.toString()
        a = Number(fixedStartPoint.charAt(0));
        b = Number(fixedStartPoint.charAt(1))
    }
    randomAnswer.push(startPoint)
    let ab = startPoint;

    while(ab != 27 && ab!=36 && ab <36){
        let randomMove = Math.floor(Math.random() * 2);
        if (randomMove == 0){
            if (ab == 28){
                b++
            }

            if (ab <10 && b < 8){
                b++
            }

            if (ab<30 && ab >10 && b < 7){
                b++
            }

            if (ab >=30 && b < 6){
                b++
            }

            if (ab == 9 || ab == 19 || ab == 29){
                a++
                b = 0
            }

        } else {
            if (ab < 9 && ab > 0){
                a++;
                b--
            }

            if (ab < 9 && ab == 0){
                b = 9
            }

            if (ab > 9 && ab < 27 && a < 3){
                a++
            }
        }
        let check_duplicate: number
        if (a == 0){
            check_duplicate = Number(b.toString())
        } else {
            check_duplicate = Number(a.toString() + b.toString())
        }
        if (check_duplicate != ab){
            ab = check_duplicate
            randomAnswer.push(ab)
        }
    }
}

function randomSprite(){
    let circle = drawCircle()
    let square = drawSquare()
    let triangle = drawTriangle()
    let pentagon = drawPentgon()
    false_diagram = [triangle, square, circle, pentagon]
    let random_diagram = Math.floor(Math.random() * 4);
    true_diagram = false_diagram[random_diagram]
    false_diagram.splice(random_diagram,1)
}


