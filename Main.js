import DebugBox from "./Drgn/Debug/DebugBox.js";
import MyGame from "./MyGame/MyGame.js";
(() => {
    const debugBox = new DebugBox();
    console.log = (msg) => { debugBox.writeLine(msg); };
    console.clear = () => { debugBox.clear(); };
    const canvasElement = document.getElementById("canvas");
    canvasElement.oncontextmenu = () => { return false; };
    const context = canvasElement.getContext('2d'); //キャンバスコンテキスト
    const myGame = new MyGame(context);
    //myGame.run("SceneA");
    myGame.run("SceneB");
    //myGame.run("StageEditorScene");
})();
//# sourceMappingURL=Main.js.map