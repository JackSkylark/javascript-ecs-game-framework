import { Component } from "~/entity-component";

export class PositionComponent extends Component {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
    }
}
