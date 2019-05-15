import Scene from "../../Drgn/Framework/Scene.js";
import SortableCanvasContext from "../../Drgn/Canvas/SortableCanvasContext.js";
import Mouse from "../../Drgn/Input/Mouse.js";
import GameObjects from "../../Drgn/GameObject/GameObjects.js";
import DraggableCamera from "../../Drgn/GameObject/DraggableCamera.js";
import Grid from "../../Drgn/GameObject/Grid.js";
import Vector2 from "../../Drgn/Math/Vector2.js";
import { Player } from "../GameObject/Machine/Player.js";
import Keyboard from "../../Drgn/Input/Keyboard.js";
import AppendableWalls from "../GameObject/Stage/AppendableWalls.js";
export default class SceneB extends Scene {
    constructor(application) {
        super(application);
        this.contextEx = new SortableCanvasContext(this.application.context);
        //
        this.keyboard = new Keyboard();
        this.mouse = new Mouse(this.application.context.canvas);
        //
        this.gameObjects = new GameObjects();
        //
        this.camera = new DraggableCamera(this.application.context.canvas.width, this.application.context.canvas.height);
        this.camera.mouse = this.mouse;
        this.gameObjects.push(this.camera);
        //
        this.grid = new Grid(32, this.camera);
        this.gameObjects.push(this.grid);
        this.walls = new AppendableWalls();
        this.walls.moveTo(0, 0);
        this.walls.lineTo(768, 0);
        this.walls.lineTo(768, 768);
        this.walls.lineTo(0, 768);
        this.walls.lineTo(0, 0);
        this.walls.moveTo(128, 128);
        this.walls.lineTo(256, 128);
        this.walls.lineTo(128, 256);
        this.walls.lineTo(128, 128);
        this.walls.moveTo(512, 128);
        this.walls.lineTo(640, 128);
        this.walls.lineTo(640, 256);
        this.walls.lineTo(512, 128);
        this.walls.moveTo(128, 512);
        this.walls.lineTo(128, 640);
        this.walls.lineTo(256, 640);
        this.walls.lineTo(128, 512);
        this.walls.moveTo(640, 640);
        this.walls.lineTo(512, 640);
        this.walls.lineTo(640, 512);
        this.walls.lineTo(640, 640);
        this.walls.moveTo(384, 320);
        this.walls.lineTo(448, 384);
        this.walls.lineTo(384, 448);
        this.walls.lineTo(320, 384);
        this.walls.lineTo(384, 320);
        this.gameObjects.push(this.walls);
        //
        this.player = new Player(new Vector2(64, 64), Math.PI);
        this.player.walls = this.walls.toReadonly();
        this.player.keyboard = this.keyboard;
        this.player.mouse = this.mouse;
        this.player.camera = this.camera;
        this.gameObjects.push(this.player);
        //
        this.gameObjects.initialize();
    }
    main() {
        console.clear();
        this.gameObjects.update();
        this.contextEx.fillToCanvas("rgb(50,50,50)");
        this.gameObjects.draw(this.contextEx);
        this.contextEx.drawToCanvas(this.camera.matrix);
        return "";
    }
    dispose() {
        this.keyboard.dispose();
        this.keyboard = null;
        this.mouse.dispose();
        this.mouse = null;
        super.dispose();
    }
}
//# sourceMappingURL=SceneB.js.map