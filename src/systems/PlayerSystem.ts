import { System, Entity, Aspect } from "~/entity-component";
import InputManager from "~/engine/managers/InputManager";
import { BoxComponent, PositionComponent } from "~/engine/components";
import { PlayerComponent } from "../components/PlayerComponent";

const aspect = (new Aspect()).all(
    PositionComponent,
    PlayerComponent
);

export class PlayerSystem extends System {
    private _input: InputManager;
    
    constructor(inputManager: InputManager) {
        super(aspect);
        this._input = inputManager;
    }

    processEntity(delta: number, entity: Entity) {
        var position = entity.getComponent(PositionComponent);
        const input = this.getInput();

        position.x += input.x * 90 * delta;
        position.y += input.y * 90 * delta;
    }

    private getInput = () => {
        return {
            x: this.getXInput(),
            y: this.getYInput()
        }
    }

    private getYInput = () => {
        if (this._input.Keyboard.isDown("40")) {
            return 1;
        }

        if (this._input.Keyboard.isDown("38")) {
            return -1;
        }

        return 0;
    }

    private getXInput = () => {
        if (this._input.Keyboard.isDown("39")) {
            return 1;
        }

        if (this._input.Keyboard.isDown("37")) {
            return -1;
        }

        return 0;
    }
}
