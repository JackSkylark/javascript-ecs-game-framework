import Engine, { Scene, Components } from "~/engine";
import InputManager from "~/engine/managers/InputManager";
import {
    Component,
    Entity,
    System,
    Aspect
} from "~/entity-component";

const cursorSystemAspect = new Aspect().all(Components.PositionComponent);
class CursorSystem extends System {
    private _input: InputManager;

    constructor(inputManager: InputManager) {
        super(cursorSystemAspect);
        this._input = inputManager;
    }

    processEntity(delta: number, entity: Entity) {
        var position = entity.getComponent(Components.PositionComponent);
        var box = entity.getComponent(Components.BoxComponent);
        if (this._input.IsMouseOnCanvas) {
            box.visible = true;
            position.x = this._input.MouseLocation.x;
            position.y = this._input.MouseLocation.y;
        } else {
            box.visible = false;
        }
    }
}

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const game = new Engine(canvas);
const cursorEntity = new Entity("cursor", [
    new Components.PositionComponent(0, 0),
    new Components.BoxComponent(20)
]);
const cursorSystem = new CursorSystem(game.input);
const gameScene = new Scene().addEntities([cursorEntity]).addSystems([cursorSystem]);

game.setScene(gameScene);
game.start();
