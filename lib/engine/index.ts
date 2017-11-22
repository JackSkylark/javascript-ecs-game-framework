import { Scene } from "./Scene";
import GameTimer from "./GameTimer";
import InputManager from "./managers/InputManager";
import * as Components from "./components";

// Ensure request animation frame
var vendors = ['webkit', 'moz'];

for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = (window as any)[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = (window as any)[vendors[x] + 'CancelAnimationFrame'] || (window as any)[vendors[x] + 'CancelRequestAnimationFrame'];
}

class GameEngine 
{
    private _canvas: HTMLCanvasElement;
    private _context: CanvasRenderingContext2D;
    private _scene: Scene;
    timer: GameTimer = new GameTimer();
    input: InputManager;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas;
        this._context = canvas.getContext("2d");
        this.input = new InputManager(canvas);
    }

    start = () => {
        window.requestAnimationFrame(this.start);
        this.timer.tick();
        this.update(this.timer.deltaTime);
    }

    setScene = (scene: Scene) => {
        this._scene = scene;
    }

    private update = (delta: number) => {
        if (!this._scene) {
            return;
        }

        this.clear();
        this._context.save();
        this._scene.update(delta);
    }

    private clear = () => {
        this._context.save();
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.fillStyle = "#F5F5F5";
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        this._context.restore();
    }
}

export { Scene, Components }
export default GameEngine;
