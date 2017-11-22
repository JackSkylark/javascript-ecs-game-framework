import { System, Entity, Aspect } from "~/entity-component";
import { BoxComponent, PositionComponent } from "~/engine/components";

const boxRenderingAspect = (new Aspect()).all(
    BoxComponent,
    PositionComponent
);

export class BoxRenderingSystem extends System {
    private _canvasContext: CanvasRenderingContext2D;

    constructor(canvasContext: CanvasRenderingContext2D) {
        super(boxRenderingAspect);
        this._canvasContext = canvasContext;
    }

    processEntity(delta: number, entity: Entity) {
        const position = entity.getComponent(PositionComponent);
        const box = entity.getComponent(BoxComponent);

        if (box.visible) {
            this._canvasContext.fillRect(
                position.x - (box.size / 2), 
                position.y - (box.size / 2),
                box.size,
                box.size
            )
        }
    }
}
