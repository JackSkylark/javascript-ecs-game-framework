import Engine, { Scene, Components } from "~/engine";
import InputManager from "~/engine/managers/InputManager";
import {
    Component,
    Entity,
    System,
    Aspect
} from "~/entity-component";

class CursorComponent extends Component {
	
}

const cursorSystemAspect = new Aspect().all(Components.PositionComponent, Components.BoxComponent, CursorComponent);
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
	new CursorComponent,
    new Components.PositionComponent(0, 0),
    new Components.BoxComponent(20)
]);
const boxEntity = new Entity("box1", [
	new Components.PositionComponent(250, 500),
    new Components.BoxComponent(50)
]);
const cursorSystem = new CursorSystem(game.input);
const gameScene = new Scene().addEntities([cursorEntity, boxEntity]).addSystems([cursorSystem]);

game.setScene(gameScene);
game.start();
