import { Container} from 'pixi.js';
import { PausePopup } from '../popups/Pause_Popup';
import { ResultPopup } from '../popups/Result_Popup';
import { navigation } from '../utils/navigation';
import { Btn_back } from '../ui/Btn_back';
import { Btn_tutorial } from '../ui/Btn_tutorial';
import { Game_piece } from '../ui/Game_piece';
import { Window } from '../ui/Window';
import { waitFor } from '../utils/asyncUtils';
import { canvasScale, canvasHeight, canvasWidth } from '../Game8';

let prevPopup: any;

let layer_data = [ {sprite: '/game8/bg_layer1.png', type: 0},
                    {sprite: '/game8/bg_layer2.png', type: 0},
                    {sprite: '/game8/bg_layer3.png', type: 0},
                    {sprite: '/game8/bg_layer4.png', type: 0},
                    {sprite: '/game8/bg_layer5.png', type: 0},
                    {sprite: '/game8/bg_layer6.png', type: 1},]

let place_data_layer = [{x: (1/6),y: 0.25},{x: 0.5,y: 0.25},{x: (5/6),y: 0.25},
                        {x: (1/6),y: 0.75},{x: 0.5,y: 0.75},{x: (5/6),y: 0.75},]

let item_data = [ {sprite: '/game8/bookcase.png', type: 0, scale: 0.08, x: 0.15, y: 0.77},
                    {sprite: '/game8/clock.png', type: 1, scale: 0.07, x: 0.83, y: 0.2},
                    {sprite: '/game8/picture_rec_hor.png', type: 0, scale: 0.09, x: 0.27, y: 0.4},
                    {sprite: '/game8/picture_rec_ver.png', type: 0, scale: 0.09, x: 0.17, y: 0.3},
                    {sprite: '/game8/picture_square.png', type: 1, scale: 0.09, x: 0.07, y: 0.3},
                    {sprite: '/game8/vase.png', type: 0, scale: 0.07, x: 0.525, y: 0.7},
                    {sprite: '/game8/wardrobe.png', type: 1, scale: 0.1, x: 0.85, y: 0.7},]
let check = 0;

export class GameScreen extends Container {
    private btn_back: Btn_back | undefined;
    private btn_tutorial: Btn_tutorial | undefined;
    private window: Window[] = []
    private game_piece: Game_piece[] = []

    constructor() {
        super();

        this.shuffle()

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
        for(let i = 0; i<7; i++){
            this.game_piece[i].x = width * item_data[i].x;
            this.game_piece[i].y = height * item_data[i].y;
        }

        for(let i = 0; i<6; i++){
            this.window[i].x = width * place_data_layer[i].x
            this.window[i].y = height * place_data_layer[i].y
            this.window[i].width = width * 1/3
            this.window[i].height = height * 0.5
        }

        this.btn_back!.x = width * 0.07;
        this.btn_back!.y = height * 0.11;

        this.btn_tutorial!.x = width * 0.93;
        this.btn_tutorial!.y = height * 0.11;
    }

    public setup(){
        for(let i = 0; i<7; i++){
            this.game_piece[i] = new Game_piece({sprite: item_data[i].sprite, scale: item_data[i].scale, type: item_data[i].type});
            this.game_piece[i].interactive = true
            this.game_piece[i].on('pointerup', ()=> this.dismiss_item(i))
            this.addChild(this.game_piece[i]);
        }

        for(let i = 0; i<6; i++){
            this.window[i] = new Window({sprite: layer_data[i].sprite, type: layer_data[i].type, width: canvasWidth * 1/3, height: canvasHeight * 0.5});
            this.window[i].interactive = true
            this.window[i].on('pointerup', ()=> this.dismiss_layer(i))
            this.addChild(this.window[i]);
        }

        this.btn_tutorial = new Btn_tutorial();
        this.btn_tutorial.interactive = true
        this.btn_tutorial.on('pointerup', () => {navigation.presentPopup(PausePopup);prevPopup = 'pause'})
        this.addChild(this.btn_tutorial);

        this.btn_back = new Btn_back();
        this.btn_back.interactive = true
        this.btn_back.on('pointerup', ()=> this.reset())
        this.addChild(this.btn_back);
    }

    public async show() {
        for(let i = 0; i<6; i++){
            this.window[i].show(false)
        }
        for(let i = 0; i<7; i++){
            this.game_piece[i].hide(false)
        }
    }

    public async hide() {
    }

    public async reset() {
        check = 0
        this.shuffle()
        for(let i = 0; i<6; i++){
            this.removeChild(this.window[i])
        }
        for(let i = 0; i<7; i++){
            this.game_piece[i].hide(true)
            this.removeChild(this.game_piece[i])
        }
        this.removeChild(this.btn_tutorial!);
        this.removeChild(this.btn_back!);

        this.shuffle()
        this.setup()

        for(let i = 0; i<7; i++){
            this.game_piece[i].hide(false)
        }

        this.resize(canvasWidth,canvasHeight)

    }

    public shuffle(){
        let currentIndex = place_data_layer.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [place_data_layer[currentIndex], place_data_layer[randomIndex]] = [
            place_data_layer[randomIndex], place_data_layer[currentIndex]];
        }
    }

    public async dismiss_layer(index: any) {
        if(this.window[index].type == 1){
            for(let i = 0; i<6; i++){
                this.window[i].interactive = false
                await this.window[i].hide(true)
                this.removeChild(this.window[i])
            }
            for(let i = 0; i<7; i++){
                this.game_piece[i].show(true)
                this.game_piece[i].scale.set(item_data[i].scale * canvasScale /1.5)
            }
        }
    }

    public async dismiss_item(index: any) {
        if(this.game_piece[index].type == 1){
            this.game_piece[index].hide(true)
            check++
            if(check == 3){
                await waitFor(1)
                navigation.presentPopup(ResultPopup);prevPopup = 'finish'
            }
        } else {
            this.game_piece[index].playStamp()
        }
    }

}



