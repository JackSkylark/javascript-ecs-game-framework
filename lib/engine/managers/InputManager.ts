import { Vector2 } from "~/engine-math";

export default class InputManager {
    private _canvas: HTMLCanvasElement;
    
    IsMouseOnCanvas: boolean = false;
    MouseLocation: Vector2 = {
        x: 0,
        y: 0
    };

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