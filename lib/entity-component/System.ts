import {Aspect} from "./Aspect";
import {Entity} from "./Entity";

export abstract class System {
    aspect: Aspect;

    constructor(aspect: Aspect) {
        this.aspect = aspect;
    }

    
    update(
        delta: number, 
        entities: Array<Entity>) 
    {
        const filteredEntities = entities.filter(x => this.aspect.isInAspect(x));
        filteredEntities.forEach(x => this.processEntity(delta, x));
    }

    abstract processEntity(delta: number, entity: Entity): void;
}
