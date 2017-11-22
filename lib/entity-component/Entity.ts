import { Component } from "./Component";
import { Guid } from "~/utilities";

type Ctor<T> = { new(...args: any[]): T };

class Entity {
    private readonly _id: string;
    private readonly _components: { [id: string]: Component } = {};
    private readonly _name: string;
    
    constructor(name?: string) {
        this._id = Guid.createGuid();
        this._name = name || this._id;
    }

    get componentIds() {
        return Object.keys(this._components);
    }

    get components() {
        return this._components;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    addComponents = (...components: Component[]) => {
        const additionalComponents = components.reduce((dict, component) => {
            dict[component.Id] = component;
            return dict;
        }, {} as { [id: string]: Component });

        // mutation
        Object.assign(this._components, additionalComponents);

        return this;
    }

    removeComponents = (...components: Component[]) => {
        // mutation
        components
            .map(x => x.Id)
            .forEach(id => delete this._components[id]);
    }

    getComponent = <T extends Component>(ctor: Ctor<T>) => {
        const componentsArray = Object.keys(this._components).map(x => this._components[x]);

        var comp = componentsArray
            .filter(x => x instanceof ctor)
            .map(x => <T>x);

        return comp.length ? comp[0] : null;
    }
}

export { Entity };