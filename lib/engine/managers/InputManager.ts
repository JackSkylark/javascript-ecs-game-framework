import { Vector2 } from "~/engine-math";

class KeyboardManager {
    private _pressed: {[keyCode: string]: number} = {};

    constructor() {
        window.addEventListener("keyup", this.onKeyUp, false);
        window.addEventListener("keydown", this.onKeyDown, false);
    }

    isDown = (keyCode: string) => {
        return !!this._pressed[keyCode];
    }

    private onKeyDown = (e: KeyboardEvent) => {
        this._pressed[e.keyCode] = new Date().getTime();
    }

    private onKeyUp = (e: KeyboardEvent) => {
        delete this._pressed[e.keyCode];
    }
}

export default class InputManager {
    private _canvas: HTMLCanvasElement;
    
    IsMouseOnCanvas: boolean = false;
    MouseLocation: Vector2 = {
        x: 0,
        y: 0
    };
    Keyboard: KeyboardManager = new KeyboardManager();

    constructor(canvas: HTMLCanvasElement)
    {
        this._canvas = canvas;
        this.initializeCanvasListeners();
    }

    private initializeCanvasListeners = () => {
        this._canvas.addEventListener("mousemove", this.onMouseMove);
        this._canvas.addEventListener("mouseover", () => { this.IsMouseOnCanvas = true; });
        this._canvas.addEventListener("mouseout", () => { this.IsMouseOnCanvas = false; });
    }

    private onMouseMove = (e: MouseEvent) => {
        const rect = this._canvas.getBoundingClientRect();
        this.MouseLocation = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }
}