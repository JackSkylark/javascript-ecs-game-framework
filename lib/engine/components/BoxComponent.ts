import { Component } from "~/entity-component";

export class BoxComponent extends Component {
    size: number;
    visible: boolean = true;
    constructor(size: number) {
        super();
        this.size = size;
    }
}
