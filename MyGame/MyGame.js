import GameApplication from "../Drgn/Framework/GameApplication.js";
import SceneA from "./Scene/SceneA.js";
import SceneB from "./Scene/SceneB.js";
import StageEditorScene from "./Scene/StageEditorScene.js";
export default class MyGame extends GameApplication {
    constructor(context) {
        super(context);
        this.addSceneClass(SceneA);
        this.addSceneClass(SceneB);
        this.addSceneClass(StageEditorScene);
    }
}
//# sourceMappingURL=MyGame.js.map