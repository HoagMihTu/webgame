import { ICanvas, ITextStyle, Text, TextStyle } from 'pixi.js';

const defaultLabelStyle: Partial<ITextStyle> = {
    fontFamily: 'Arial Rounded MT Bold',
    align: 'center',
};

export type LabelOptions = typeof defaultLabelStyle;

export class Label extends Text {
    constructor(text?: string | number, style?: Partial<ITextStyle> | TextStyle, canvas?: ICanvas) {
        style = { ...defaultLabelStyle, ...style };
        super(text, style, canvas);
        this.anchor.set(0.5);
    }
}
