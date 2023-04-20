import { Container } from 'pixi.js';
import { app_game6 } from '../Game6';
import { pool } from './pool';


interface AppScreen extends Container {

    show?(): Promise<void>;
    hide?(): Promise<void>;
    pause?(): Promise<void>;
    resume?(): Promise<void>;
    prepare?(): void;
    reset?(): void;
    update?(delta: number): void;
    resize?(width: number, height: number): void;
    blur?(): void;
    focus?(): void;
}


interface AppScreenConstructor {
    new (): AppScreen;
    assetBundles?: string[];
}

class Navigation {
    public container = new Container();

    public width = 0;

    public height = 0;

    public background?: AppScreen;

    public currentScreen?: AppScreen;

    public currentPopup?: AppScreen;

    public setBackground(ctor: AppScreenConstructor) {
        this.background = new ctor();
        this.addAndShowScreen(this.background);
    }

    private async addAndShowScreen(screen: AppScreen) {
        if (!this.container.parent) {
            app_game6.stage.addChild(this.container);
        }

        this.container.addChild(screen);

        if (screen.prepare) {
            screen.prepare();
        }

        if (screen.resize) {
            screen.resize(this.width, this.height);
        }



        if (screen.update) {
            app_game6.ticker.add(screen.update, screen);
        }

        if (screen.show) {
            screen.interactiveChildren = false;
            await screen.show();
            screen.interactiveChildren = true;
        }
    }

    private async hideAndRemoveScreen(screen: AppScreen) {
        screen.interactiveChildren = false;

        if (screen.hide) {
            await screen.hide();
        }

        if (screen.update) {
            app_game6.ticker.remove(screen.update, screen);
        }

        if (screen.parent) {
            screen.parent.removeChild(screen);
        }

        if (screen.reset) {
            screen.reset();
        }
    }


    public async showScreen(ctor: AppScreenConstructor) {
        if (this.currentScreen) {
            this.currentScreen.interactiveChildren = false;
        }

        if (this.currentScreen) {
            await this.hideAndRemoveScreen(this.currentScreen);
        }

        this.currentScreen = pool.get(ctor);
        await this.addAndShowScreen(this.currentScreen!);
    }

    public resize(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.currentScreen?.resize?.(width, height);
        this.currentPopup?.resize?.(width, height);
        this.background?.resize?.(width, height);
    }


    public async presentPopup(ctor: AppScreenConstructor) {
        if (this.currentScreen) {
            this.currentScreen.interactiveChildren = false;
            await this.currentScreen.pause?.();
        }

        if (this.currentPopup) {
            await this.hideAndRemoveScreen(this.currentPopup);
        }

        this.currentPopup = new ctor();
        await this.addAndShowScreen(this.currentPopup);
    }


    public async dismissPopup() {
        if (!this.currentPopup) return;
        const popup = this.currentPopup;
        this.currentPopup = undefined;
        await this.hideAndRemoveScreen(popup);
        if (this.currentScreen) {
            this.currentScreen.interactiveChildren = true;
            this.currentScreen.resume?.();
        }
    }

    public blur() {
        this.currentScreen?.blur?.();
        this.currentPopup?.blur?.();
        this.background?.blur?.();
    }


    public focus() {
        this.currentScreen?.focus?.();
        this.currentPopup?.focus?.();
        this.background?.focus?.();
    }
}

export const navigation = new Navigation();
