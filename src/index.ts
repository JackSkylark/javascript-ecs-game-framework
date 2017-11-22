import Engine, { Scene, Components } from "~/engine";
import { Entity } from "~/entity-component";


import { CursorSystem, BoxRenderingSystem } from "./systems";
import { CursorComponent, PlayerComponent } from "./components";
import { PlayerSystem } from "./systems/PlayerSystem";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const game = new Engine(canvas);

// Instantiate Systems
const cursorSystem = new CursorSystem(game.input);
const playerSystem = new PlayerSystem(game.input);
const renderSystem = new BoxRenderingSystem(canvas.getContext("2d"));


// Instantiate Scene
const scene = new Scene();
scene.addSystems([
    cursorSystem,
    playerSystem,
    renderSystem
]);

const cursorEntity = new Entity("cursor")
cursorEntity.addComponents(
    new CursorComponent,
    new Components.PositionComponent(0, 0),
    new Components.BoxComponent(20));

const boxEntity = new Entity("box1");
boxEntity.addComponents(
    new Components.PositionComponent(250, 500),
    new Components.BoxComponent(50)
);

const playerEntity = new Entity("player");
playerEntity.addComponents(
    new Components.PositionComponent(30, 50),
    new Components.BoxComponent(10),
    new PlayerComponent()
);

scene.addEntities([
    cursorEntity,
    boxEntity,
    playerEntity
]);

game.setScene(scene);
game.start();
