import React from "react"
import 'pixi-spine';

import { Application } from 'pixi.js';
import { navigation } from './utils/navigation';
import { initAssets } from './utils/assets';
import { GameScreen } from "./screens/GameScreen";
import { LoadScreen } from "./screens/LoadScreen";
import { LevelScreen } from "./screens/LevelScreen";
import { Background } from './ui/Background';
import { waitFor } from "./utils/asyncUtils";
import { getUrlParam } from './utils/getUrlParams';



function Game3() {
    setTimeout(init, 0);
    return (
        <main>
          <div id='game-container' >
          </div>
        </main>
    )
}
  
export default Game3

const windowWidth = window.innerWidth * 0.85;
const windowHeight = window.innerHeight * 0.85;
const minWidth = 600;
const minHeight = 325;

const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
const scale = scaleX > scaleY ? scaleX : scaleY;
export const canvasWidth = windowWidth * scale
export const canvasHeight = windowHeight * scale;
export const canvasScale = canvasHeight/540

export const app_game3 = new Application<HTMLCanvasElement>({
    resolution: Math.max(window.devicePixelRatio, 2),
    backgroundColor: 0xffffff,
});

function resize() {
    const windowWidth = window.innerWidth * 0.85;
    const windowHeight = window.innerHeight * 0.85;
    const minWidth = 600;
    const minHeight = 325;

    const scaleX = windowWidth < minWidth ? minWidth / windowWidth : 1;
    const scaleY = windowHeight < minHeight ? minHeight / windowHeight : 1;
    const scale = scaleX > scaleY ? scaleX : scaleY;
    const width = windowWidth * scale;
    const height = windowHeight * scale;

    app_game3.renderer.view.style.width = `${windowWidth}px`;
    app_game3.renderer.view.style.height = `${windowHeight}px`;
    window.scrollTo(0, 0);

    app_game3.renderer.resize(width, height);
    navigation.resize(width, height);
}

function visibilityChange() {
    if (document.hidden) {
        // sound.pauseAll();
        navigation.blur();
    } else {
        // sound.resumeAll();
        navigation.focus();
    }
}

async function init() {
    var main = document.getElementById("game-container")!;
    main.appendChild(app_game3.view);

    window.addEventListener('resize', resize);

    resize();

    document.addEventListener('visibilitychange', visibilityChange);

    await initAssets();

    await waitFor(0.5);

    navigation.setBackground(Background);

    await navigation.showScreen(LoadScreen);

    if (getUrlParam('game') !== null) {
        await navigation.showScreen(GameScreen);
    } else if (getUrlParam('load') !== null) {
        await navigation.showScreen(LoadScreen);
    } else if (getUrlParam('level') !== null) {
        await navigation.showScreen(LevelScreen);
    }

}
