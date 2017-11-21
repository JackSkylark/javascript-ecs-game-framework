import { Entity, System } from "~/entity-component";
import { Aspect } from "~/entity-component/Aspect";
import { PositionComponent, BoxComponent } from "./components";

type SceneOptions = {
    systems?: Array<System>;
    entities?: Array<Entity>;
}

class Scene {
    private readonly _entities : Array<Entity> = [];
    private readonly _systems : Array<System> = [];

    public addEntities = (entities : Array<Entity>) => {
        if(!entities || !entities.length) {
            return this;
        }
        
        Array.prototype.push.apply(this._entities, entities);

        return this;
    }

    public addSystems = (systems : Array<System>) => {
        if(!systems || !systems.length) {
            return this;
        }
        
        Array.prototype.push.apply(this._systems, systems);

        return this;
    }

    public update = (delta: number) => {
        this._systems.forEach(s => s.update(delta, this._entities));
    }

    public render = (context: CanvasRenderingContext2D) => {
        const entitiesToRenderAspect = new Aspect().all(PositionComponent).all(BoxComponent);
        const entitiesToRender = this._entities.filter(x => entitiesToRenderAspect.isInAspect(x));

        entitiesToRender.forEach(x => {
            // todo: break out rendering logic
            const position = x.getComponent(PositionComponent);
            const box = x.getComponent(BoxComponent);

            if (box.visible) {
                context.fillRect(
                    position.x - (box.size / 2), 
                    position.y - (box.size / 2),
                    box.size,
                    box.size
                );
            }
        });
    }
}

export { Scene };
