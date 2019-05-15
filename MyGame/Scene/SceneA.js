import Scene from "../../Drgn/Framework/Scene.js";
import SortableCanvasContext from "../../Drgn/Canvas/SortableCanvasContext.js";
import Mouse from "../../Drgn/Input/Mouse.js";
import GameObjects from "../../Drgn/GameObject/GameObjects.js";
import DraggableCamera from "../../Drgn/GameObject/DraggableCamera.js";
import Grid from "../../Drgn/GameObject/Grid.js";
import DraggableCircle from "../GameObject/DraggableShape/DraggableCircle.js";
import Vector2 from "../../Drgn/Math/Vector2.js";
import DraggableSegment from "../GameObject/DraggableShape/DraggableSegment.js";
import DraggableCapsule from "../GameObject/DraggableShape/DraggableCapsule.js";
import DraggableLine from "../GameObject/DraggableShape/DraggableLine.js";
export default class SceneA extends Scene {
    constructor(application) {
        super(application);
        this.contextEx = new SortableCanvasContext(this.application.context);
        this.mouse = new Mouse(this.application.context.canvas);
        this.gameObjects = new GameObjects();
        this.camera = new DraggableCamera(this.application.context.canvas.width, this.application.context.canvas.height);
        this.camera.mouse = this.mouse;
        this.gameObjects.push(this.camera);
        this.grid = new Grid(32, this.camera);
        this.gameObjects.push(this.grid);
        this.circle = new DraggableCircle(new Vector2(320, 240), 32, this.mouse, this.camera);
        this.line = new DraggableLine(new Vector2(100, 50), new Vector2(100, 0), this.mouse, this.camera);
        this.segment1 = new DraggableSegment(new Vector2(100, 100), new Vector2(100, 0), this.mouse, this.camera);
        this.segment2 = new DraggableSegment(new Vector2(300, 100), new Vector2(100, 0), this.mouse, this.camera);
        this.capsule = new DraggableCapsule(new Vector2(100, 200), new Vector2(100, 0), 16, this.mouse, this.camera);
        this.gameObjects.push(this.circle, this.line, this.segment1, this.segment2, this.capsule);
        this.gameObjects.initialize();
    }
    main() {
        console.clear();
        this.gameObjects.update();
        const result = this.segment1.testForSegment(this.segment2);
        this.contextEx.fillToCanvas("rgb(50,50,50)");
        this.gameObjects.draw(this.contextEx);
        this.contextEx.reset();
        this.contextEx.strokeStyle = "#fff";
        if (result.rootPoint1 && result.rootPoint2) {
            this.contextEx.strokeCircle(result.rootPoint1.x, result.rootPoint1.y, 4);
            this.contextEx.strokeCircle(result.rootPoint2.x, result.rootPoint2.y, 4);
            this.contextEx.strokeLine(result.rootPoint1.x, result.rootPoint1.y, result.rootPoint2.x, result.rootPoint2.y);
        }
        this.contextEx.drawToCanvas(this.camera.matrix);
        return "";
    }
}
//# sourceMappingURL=SceneA.js.map