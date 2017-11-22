import { System, Entity, Aspect } from "~/entity-component";
import InputManager from "~/engine/managers/InputManager";
import { BoxComponent, PositionComponent } from "~/engine/components";
import { CursorComponent } from "../components/CursorComponent";

const cursorSystemAspect = (new Aspect()).all(
    PositionComponent, 
    BoxComponent, 
    CursorComponent);

export class CursorSystem extends System {
    private _input: InputManager;

    constructor(inputManager: InputManager) {
        super(cursorSystemAspect);
        this._input = inputManager;
    }

    processEntity(delta: number, entity: Entity) {
        var position = entity.getComponent(PositionComponent);
        var box = entity.getComponent(BoxComponent);
        if (this._input.IsMouseOnCanvas) {
            box.visible = true;
            position.x = this._input.MouseLocation.x;
            position.y = this._input.MouseLocation.y;
        } else {
            box.visible = false;
        }
    }
}