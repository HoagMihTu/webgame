import React, { useState } from 'react'
import * as PIXI from 'pixi.js';
import {Spine} from 'pixi-spine';

    

function Game3() {
  const [popUp, setPopUp] = useState(false)
  const duringPopUp = popUp ? " during-popup" : ""

  let w = window.innerWidth * 0.9;
  let h = window.innerHeight * 0.9; 

  // function clamOnClick(an){
  //   an.state.setAnimation(1, 'open2', true)
  // }

  const loadPixi = () =>{
      const app_game3 = new PIXI.Application({ view:  document.getElementById("canvas") as HTMLCanvasElement, backgroundAlpha: 0 , autoResize: true, width: w, height: h});
      app_game3.renderer.resize(window.innerWidth* 0.9, window.innerHeight* 0.9)
      app_game3.stage.interactive = true;
    app_game3.stage.cursor = 'pointer';
      PIXI.Assets.load("./test1/game_1_animation.json").then((resource) => {
          const animation = new Spine(resource.spineData);
          animation.x = app_game3.renderer.width / 2;
          animation.y = app_game3.renderer.height;
          animation.width = 260
          animation.height = 300
          app_game3.stage.addChild(animation)

          animation.state.setAnimation(1, 'nhan vat map may moi', false);
          animation.state.timeScale = 1;
          animation.update(0)
          console.log(animation)

          app_game3.stage.on('pointertap', () => {
            animation.state.timeScale=0;
            });
      });

      PIXI.Assets.load("./test2/effect_balloon.json").then((resource) => {
        const animation = new Spine(resource.spineData);
        animation.x = app_game3.renderer.width / 2;
        animation.y = app_game3.renderer.height;
        animation.width = 1200
        animation.height = 600
        app_game3.stage.addChild(animation)

        animation.state.setAnimation(1, 'animation_1', true);
        animation.state.timeScale = 1;
        animation.update(0)

        app_game3.stage.on('pointertap', () => {
          animation.state.timeScale=0;
          });
    });
  }

  setTimeout(loadPixi, 100);

  return (
      <main className={duringPopUp}>
        <div className='game-container' >
          <canvas id="canvas"></canvas>
        </div>
      </main>
  )
}

export default Game3
