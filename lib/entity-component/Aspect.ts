
import { Component } from "./Component";
import { Entity } from "./Entity";

type Ctor = {new (...args: any[]):Component};

export class Aspect {
    private _all: Array<string> = [];
    private _none: Array<string> = [];
    private _one: Array<string> = [];

    public all = (...components: Array<Ctor>) => {
        components.forEach(comp => this._all.push(comp.prototype.constructor.name));
        return this;
    }

    public one = (...components: Ctor[]) => {
        components.forEach(comp => this._one.push(comp.prototype.constructor.name));
        return this;
    }        

    public none = (...components: Ctor[]) => {
        components.forEach(comp => this._none.push(comp.prototype.constructor.name));
        return this;
    }

    public isInAspect = (entity: Entity) => {
        let components = entity.componentTypes();
        return this._all.every(id => components.indexOf(id) != -1)
            && this._none.every(id => components.indexOf(id) == -1)
            && (this._one.length === 0 || this._one.some(id => components.indexOf(id) != -1));
    }
}
