abstract class Component 
{
    private __id: string;

    constructor(name?: string) {
        this.__id = name || this.constructor.name;
    }

    public get Id() {
        return this.__id;
    }
}

export { Component };
