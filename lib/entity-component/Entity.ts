import { Component } from "./Component";
type Ctor<T> = {new (...args: any[]):T};

class Entity {
    private readonly _id: string;
    private readonly _components: Component[];

    constructor(id: string, components?: Component[]) {
        this._id = id;
        this._components = [];

        this.addComponents(components);
    }

    public id() { 
        return this._id; 
    }

    public components() { 
        return this._components; 
    }

    public componentTypes() {
        return this._components.map(x => x.getInternalId());
    }

    public add = (component: Component) => {
        return this.addComponents([component]);
    }

    public addComponents = (components?: Component[]) => {
        if(!components) {
            return this;
        }

        Array.prototype.push.apply(this._components, components);

        return this;
    }

    public getComponent = <T extends Component>(ctor : Ctor<T>) => {
        var comp =  this._components
            .filter(x => x instanceof ctor)
            .map(x => <T>x);
        
        return comp.length ? comp[0] : null;
    }
}

export { Entity };