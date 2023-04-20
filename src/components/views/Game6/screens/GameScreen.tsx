import { Container} from 'pixi.js';
import { PausePopup } from '../popups/Pause_Popup';
import { ResultPopup } from '../popups/Result_Popup';
import { navigation } from '../utils/navigation';
import { Btn_back } from '../ui/Btn_back';
import { Btn_tutorial } from '../ui/Btn_tutorial';
import { Fridge } from '../ui/Fridge';
import { Basket } from '../ui/Basket';
import { Game_piece } from '../ui/Game_piece';
import { waitFor } from '../utils/asyncUtils';
import { app_game6 } from '../Game6';

const windowWidth = window.innerWidth * 0.85;
const windowHeight = window.innerHeight * 0.85;
const minWidth = 600;
const minHeight = 325;

const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
const scale = scaleX > scaleY ? scaleX : scaleY;
const canvasWidth = windowWidth * scale;
const canvasHeight = windowHeight * scale;

const fridge_area1 = {  start:  {x: 0.285, y:0.075},
                        end:    {x: 0.49, y:0.685}};

const fridge_area2 = {  start:  {x: 0.51, y:0.075},
                        end:    {x: 0.71, y:0.685}};

const fridge_area_big1 = {x: 0.41, y: 0.587}

const fridge_area_big2 = {x: 0.59, y: 0.587}

const fridge_area_small1 = [    {x: 0.350, y: 0.16}, {x: 0.46, y: 0.16},
                                {x: 0.350, y: 0.28}, {x: 0.46, y: 0.28},
                                {x: 0.350, y: 0.41}, {x: 0.46, y: 0.41},
                            {x: 0.41, y: 0.16}, {x: 0.41, y: 0.28}, {x: 0.41, y: 0.41}]

const fridge_area_small2 = [    {x: 0.542, y: 0.16}, {x: 0.65, y: 0.16},
                                {x: 0.542, y: 0.28}, {x: 0.65, y: 0.28},
                                {x: 0.542, y: 0.41}, {x: 0.65, y: 0.41},
                            {x: 0.59, y: 0.16}, {x: 0.59, y: 0.28}, {x: 0.59, y: 0.41}]

const fruit_big = [
    {sprite: '/game6/dua_hau.png', type: 'fruit', size: 'big', scale: 0.2, rotate: 0},
    {sprite: '/game6/dua_gang.png', type: 'fruit', size: 'big', scale: 0.17, rotate: 0},
    {sprite: '/game6/buoi.png', type: 'fruit', size: 'big', scale: 0.1, rotate: 0}
]

const fruit_small = [
    {sprite: '/game6/cherry.png', type: 'fruit', size: 'small', scale: 0.15, rotate: 0},
    {sprite: '/game6/chuoi.png', type: 'fruit', size: 'small', scale: 0.05, rotate: 0},
    {sprite: '/game6/dao.png', type: 'fruit', size: 'small', scale: 0.06, rotate: 0},
    {sprite: '/game6/dau_tay.png', type: 'fruit', size: 'small', scale: 0.2, rotate: 0},
    {sprite: '/game6/kiwi.png', type: 'fruit', size: 'small', scale: 0.2, rotate: 0.7},
    {sprite: '/game6/le.png', type: 'fruit', size: 'small', scale: 0.05, rotate: 1},
    {sprite: '/game6/mang_cau.png', type: 'fruit', size: 'small', scale: 0.05, rotate: 0},
    {sprite: '/game6/nho.png', type: 'fruit', size: 'small', scale: 0.05, rotate: 0.5},
    {sprite: '/game6/oi.png', type: 'fruit', size: 'small', scale: 0.05, rotate: 0.7},
    {sprite: '/game6/tao.png', type: 'fruit', size: 'small', scale: 0.05, rotate: 0},
    {sprite: '/game6/thanh_long.png', type: 'fruit', size: 'small', scale: 0.05, rotate: 0},
    {sprite: '/game6/viet_quat_xanh.png', type: 'fruit', size: 'small', scale: 0.3, rotate: 0},
    {sprite: '/game6/xoai.png', type: 'fruit', size: 'small', scale: 0.15, rotate: 0},
]

const vege_big = [
    {sprite: '/game6/bap_cai.png', type: 'vegetable', size: 'big', scale: 0.11, rotate: 0},
    {sprite: '/game6/bi_ngo.png', type: 'vegetable', size: 'big', scale: 0.1, rotate: 0},
]

const vege_small = [
    {sprite: '/game6/ca_chua.png', type: 'vegetable', size: 'small', scale: 0.2, rotate: 0},
    {sprite: '/game6/ca_rot.png', type: 'vegetable', size: 'small', scale: 0.1, rotate: 1},
    {sprite: '/game6/cai_thao.png', type: 'vegetable', size: 'small', scale: 0.08, rotate: 0.8},
    {sprite: '/game6/cai_xoong.png', type: 'vegetable', size: 'small', scale: 0.05, rotate: 1.3},
    {sprite: '/game6/cu_cai.png', type: 'vegetable', size: 'small', scale: 0.1, rotate: 1},
    {sprite: '/game6/cu_cai_tim.png', type: 'vegetable', size: 'small', scale: 0.04, rotate: 0},
    {sprite: '/game6/dau_ha_lan.png', type: 'vegetable', size: 'small', scale: 0.2, rotate: 0},
    {sprite: '/game6/dua_chuot.png', type: 'vegetable', size: 'small', scale: 0.2, rotate: 0},
    {sprite: '/game6/hanh.png', type: 'vegetable', size: 'small', scale: 0.05, rotate: 1},
    {sprite: '/game6/hanh_ngo.png', type: 'vegetable', size: 'small', scale: 0.05, rotate: -1},
    {sprite: '/game6/hanh_tay.png', type: 'vegetable', size: 'small', scale: 0.1, rotate: 0},
    {sprite: '/game6/khoai_tay.png', type: 'vegetable', size: 'small', scale: 0.15, rotate: 0},
    {sprite: '/game6/mang_tay.png', type: 'vegetable', size: 'small', scale: 0.06, rotate: 0},
    {sprite: '/game6/muop.png', type: 'vegetable', size: 'small', scale: 0.17, rotate: 0},
    {sprite: '/game6/nam_kim_cham.png', type: 'vegetable', size: 'small', scale: 0.1, rotate: 0},
    {sprite: '/game6/nam_to.png', type: 'vegetable', size: 'small', scale: 0.07, rotate: 0},
    {sprite: '/game6/ot.png', type: 'vegetable', size: 'small', scale: 0.05, rotate: -1.6},
    {sprite: '/game6/ot_chuong_vang.png', type: 'vegetable', size: 'small', scale: 0.07, rotate: 0},
    {sprite: '/game6/sup_lo.png', type: 'vegetable', size: 'small', scale: 0.05, rotate: 0},
    {sprite: '/game6/ngo.png', type: 'vegetable', size: 'small', scale: 0.07, rotate: -1},
]

const big_place_data =[{x: 0.15, y: 0.72}, {x: 0.85, y: 0.72}]

const place_data = [
        {x: 0.15, y: 0.74}, {x: 0.85, y: 0.74}, 
        {x: 0.1, y: 0.74}, {x: 0.13, y: 0.74}, {x: 0.17, y: 0.74}, {x: 0.2, y: 0.74}, 
        {x: 0.8, y: 0.74}, {x: 0.83, y: 0.74}, {x: 0.87, y: 0.74}, {x: 0.9, y: 0.74}
]

let target: any = null;
let target_index: any = null;
let prevPopup: any;
let check_fruit: any[] = [];
let check_vege: any[] = [];
let check_fruit_small: any[] = [];
let check_vege_small: any[] = [];

export class GameScreen extends Container {
    // public readonly timer: GameTimer;
    // public readonly score: GameScore;
    private btn_back: Btn_back;
    private btn_tutorial: Btn_tutorial;
    private fridge: Fridge;
    private basket1: Basket;
    private basket2: Basket;
    private game_piece: Game_piece[] = [];

    constructor() {
        super();

        this.interactive = true
        this.on('pointerdown',onDragStart)
        this.on('pointerup', onDragEnd);

        this.btn_tutorial = new Btn_tutorial();
        this.btn_tutorial.interactive = true
        this.btn_tutorial.on('pointerup', () => {navigation.presentPopup(PausePopup);prevPopup = 'pause'})
        this.addChild(this.btn_tutorial);

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('click', ()=> this.reset())
        this.addChild(this.btn_back);

        this.shuffle_place();
        this.shuffle_data(fruit_big);
        this.shuffle_data(vege_big);
        this.shuffle_data(fruit_small);
        this.shuffle_data(vege_small);

        this.fridge = new Fridge();
        this.fridge.scale.set(1.3);
        this.addChild(this.fridge)

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

        this.fridge.x = width * 0.5;
        this.fridge.y = height * 0.5;

        this.basket1.x = width * 0.15;
        this.basket1.y = height * 0.85;

        this.basket2.x = width * 0.85;
        this.basket2.y = height * 0.85;

        this.game_piece[0].x = width * big_place_data[0].x;
        this.game_piece[0].y = height * big_place_data[0].y;
        this.game_piece[1].x = width * big_place_data[1].x;
        this.game_piece[1].y = height * big_place_data[1].y;

        for (let k = 2; k < 10; k++) {
            this.game_piece[k].x = width * place_data[k].x;
            this.game_piece[k].y = height * place_data[k].y;
        }

    }

    public async show() {
        for (let k = 0; k < 10; k++) {
            this.game_piece[k].hide(false);
        }
        this.fridge.hide(false)
        await this.basket1.hide(false)
        await this.basket2.hide(false)

        this.basket1.show(true)
        this.basket2.show(true)

        await waitFor(0.5)

        for (let k = 0; k < 10; k++) {
            await this.game_piece[k].show(true);
        }

        await waitFor(0.5)
        
        this.fridge.show(true)
    }

    public async hide() {
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

    public shuffle_data(array: any) {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    }


    public async reset() {
        for (let k = 0; k < 10; k++) {
            this.game_piece[k].hide(true);
        }

        this.shuffle_place();
        this.shuffle_data(fruit_big);
        this.shuffle_data(vege_big);
        this.shuffle_data(fruit_small);
        this.shuffle_data(vege_small);

        check_fruit = [];
        check_vege = [];
        check_fruit_small = [];
        check_vege_small = [];
        
        await waitFor(0.5)
        this.setup()
        
        for (let k = 0; k < 10; k++) {
            this.game_piece[k].show(true);
            this.game_piece[k].interactive= true;
        }

        this.resize(canvasWidth, canvasHeight)
        
    }

    public setup(){
        this.game_piece[0] = new Game_piece({sprite: fruit_big[0].sprite, type: fruit_big[0].type, size: fruit_big[0].size, scale: fruit_big[0].scale, rotate: fruit_big[0].rotate});
        this.game_piece[0].scale.set(this.game_piece[0].customScale)
        this.game_piece[0].rotation = this.game_piece[0].customRotate
        this.game_piece[0].interactive = true;
        this.game_piece[0].on('pointerover', () => this.game_piece[0].scale.set(this.game_piece[0].customScale*1.2))
                .on('pointerout', ()=> this.game_piece[0].scale.set(this.game_piece[0].customScale))
                .on('pointerdown',()=> {this.game_piece[0].scale.set(this.game_piece[0].customScale); target = this.game_piece[0]; target_index = 0})
                .on('pointerup',()=> this.game_piece[0].scale.set(this.game_piece[0].customScale*1.2));
        this.addChild(this.game_piece[0])

        this.game_piece[1] = new Game_piece({sprite: vege_big[0].sprite, type: vege_big[0].type, size: vege_big[0].size, scale: vege_big[0].scale, rotate: vege_big[0].rotate});
        this.game_piece[1].scale.set(this.game_piece[1].customScale)
        this.game_piece[1].rotation = this.game_piece[1].customRotate
        this.game_piece[1].interactive = true;
        this.game_piece[1].on('pointerover', () => this.game_piece[1].scale.set(this.game_piece[1].customScale*1.2))
                .on('pointerout', ()=> this.game_piece[1].scale.set(this.game_piece[1].customScale))
                .on('pointerdown',()=> {this.game_piece[1].scale.set(this.game_piece[1].customScale); target = this.game_piece[1]; target_index = 1})
                .on('pointerup',()=> this.game_piece[1].scale.set(this.game_piece[1].customScale*1.2));
        this.addChild(this.game_piece[1])

        for(let i = 2; i < 6; i++){
            this.game_piece[i] = new Game_piece({sprite: fruit_small[i].sprite, type: fruit_small[i].type, size: fruit_small[i].size, scale: fruit_small[i].scale, rotate: fruit_small[i].rotate});
            this.game_piece[i].scale.set(this.game_piece[i].customScale)
            this.game_piece[i].rotation = this.game_piece[i].customRotate
            this.game_piece[i].interactive = true;
            this.game_piece[i].on('pointerover', () => this.game_piece[i].scale.set(this.game_piece[i].customScale*1.2))
                    .on('pointerout', ()=> this.game_piece[i].scale.set(this.game_piece[i].customScale))
                    .on('pointerdown',()=> {this.game_piece[i].scale.set(this.game_piece[i].customScale); target = this.game_piece[i]; target_index = i})
                    .on('pointerup',()=> this.game_piece[i].scale.set(this.game_piece[i].customScale*1.2));
            this.addChild(this.game_piece[i])
        }

        for(let i = 6; i < 10; i++){
            this.game_piece[i] = new Game_piece({sprite: vege_small[i].sprite, type: vege_small[i].type, size: vege_small[i].size, scale: vege_small[i].scale, rotate: vege_small[i].rotate});
            this.game_piece[i].scale.set(this.game_piece[i].customScale)
            this.game_piece[i].rotation = this.game_piece[i].customRotate
            this.game_piece[i].interactive = true;
            this.game_piece[i].on('pointerover', () => this.game_piece[i].scale.set(this.game_piece[i].customScale*1.2))
                    .on('pointerout', ()=> this.game_piece[i].scale.set(this.game_piece[i].customScale))
                    .on('pointerdown',()=> {this.game_piece[i].scale.set(this.game_piece[i].customScale); target = this.game_piece[i]; target_index = i})
                    .on('pointerup',()=> this.game_piece[i].scale.set(this.game_piece[i].customScale*1.2));
            this.addChild(this.game_piece[i])
        }
        this.basket1 = new Basket();
        this.basket2 = new Basket();
        this.addChild(this.basket1)
        this.addChild(this.basket2)
    }
}

function onDragMove(event: any) {
    if (target) {
        target.parent.toLocal(event.global, null, target.position);
    }
}

function onDragStart() {
    if (target) {
        let index_fruit = check_fruit.map(x => {return x.id;}).indexOf(target_index);
        let index_vege = check_vege.map(x => {return x.id;}).indexOf(target_index);
        let index_fruit_small = check_fruit_small.map(x => {return x.id;}).indexOf(target_index);
        let index_vege_small = check_vege_small.map(x => {return x.id;}).indexOf(target_index);
        if(index_fruit != -1){
            check_fruit.splice(index_fruit,1)
        }
        if(index_vege != -1){
            check_vege.splice(index_vege,1)
        }
        if(index_fruit_small != -1){
            check_fruit_small.splice(index_fruit_small,1)
        }
        if(index_vege_small != -1){
            check_vege_small.splice(index_vege_small,1)
        }
        target.addEventListener('pointermove',onDragMove);
    }
}

function onDragEnd() {
    if (target) {
        check(target,target_index)
        target = null;
        target_index = null;
    }
    finish()
}

function check(target: any, target_index: any){
    if (fridge_area1.start.x * canvasWidth < target.position.x && target.position.x < fridge_area1.end.x * canvasWidth &&
        fridge_area1.start.y * canvasHeight < target.position.y && target.position.y < fridge_area1.end.y * canvasHeight){
            let check_fruit_big = check_fruit.map(x => {return x.size;}).indexOf('big');
            if(target.size == 'big'){
                if(check_fruit_big == -1){
                    check_fruit.push({id: target_index, type: target.type, size: target.size})
                    target.position.x = fridge_area_big1.x * canvasWidth
                    target.position.y = fridge_area_big1.y * canvasHeight
                } else {
                    target.position.x = place_data[target_index].x * canvasWidth
                    target.position.y = place_data[target_index].y * canvasHeight
                }
            } else {
                check_fruit.push({id: target_index, type: target.type, size: target.size})
                target.position.x = fridge_area_small1[target_index -2].x * canvasWidth
                target.position.y = fridge_area_small1[target_index -2].y * canvasHeight
                check_fruit_small.push({id: target_index, type: target.type, size: target.size})
            }
    } else if (fridge_area2.start.x * canvasWidth < target.position.x && target.position.x  < fridge_area2.end.x * canvasWidth &&
        fridge_area2.start.y * canvasHeight < target.position.y && target.position.y < fridge_area2.end.y * canvasHeight){
            let check_vege_big = check_vege.map(x => {return x.size;}).indexOf('big');
            if(target.size == 'big'){
                if(check_vege_big == -1){
                    check_vege.push({id: target_index, type: target.type, size: target.size})
                    target.position.x = fridge_area_big2.x * canvasWidth
                    target.position.y = fridge_area_big2.y * canvasHeight
                } else {
                    target.position.x = place_data[target_index].x * canvasWidth
                    target.position.y = place_data[target_index].y * canvasHeight
                }
            } else {
                check_vege.push({id: target_index, type: target.type, size: target.size})
                target.position.x = fridge_area_small2[target_index -2].x * canvasWidth
                target.position.y = fridge_area_small2[target_index -2].y * canvasHeight
                check_vege_small.push({id: target_index, type: target.type, size: target.size})
            }
    } else {
        target.position.x = place_data[target_index].x * canvasWidth
        target.position.y = place_data[target_index].y * canvasHeight
    }
}

function finish() {
    if (check_fruit.length + check_vege.length == 10){
        let finish_fruit = check_fruit.every(x => x.type === 'fruit')
        let finish_vege = check_vege.every(x => x.type === 'vegetable')
        if (finish_fruit && finish_vege){
            navigation.presentPopup(ResultPopup)
            prevPopup = 'finish'
        } else {
            navigation.presentPopup(PausePopup)
            prevPopup = 'pause'
        }
    }
}