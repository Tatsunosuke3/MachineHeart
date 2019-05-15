import Scene from "../../Drgn/Framework/Scene.js";
import Keyboard from "../../Drgn/Input/Keyboard.js";
import Mouse from "../../Drgn/Input/Mouse.js";
import GameObjects from "../../Drgn/GameObject/GameObjects.js";
import DraggableCamera from "../../Drgn/GameObject/DraggableCamera.js";
import SortableCanvasContext from "../../Drgn/Canvas/SortableCanvasContext.js";
import Grid from "../../Drgn/GameObject/Grid.js";
export default class StageEditorScene extends Scene {
    constructor(application) {
        super(application);
        this.drgnContext = new SortableCanvasContext(this.application.context);
        //
        this.keyboard = new Keyboard();
        this.mouse = new Mouse(this.application.context.canvas);
        //
        this.gameObjects = new GameObjects();
        //
        this.camera = new DraggableCamera(this.application.context.canvas.width, this.application.context.canvas.height);
        this.camera.mouse = this.mouse;
        this.gameObjects.push(this.camera);
        this.grid = new Grid(32, this.camera);
        this.gameObjects.push(this.grid);
        this.gameObjects.initialize();
    }
    main() {
        this.gameObjects.update();
        this.gameObjects.draw(this.drgnContext);
        this.drgnContext.fillToCanvas("rgb(25,25,25)");
        this.drgnContext.drawToCanvas(this.camera.matrix);
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
//# sourceMappingURL=StageEditorScene.js.map