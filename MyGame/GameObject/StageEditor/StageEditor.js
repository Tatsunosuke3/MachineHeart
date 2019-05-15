export default class StageEditor {
    constructor() {
        this.circles = [];
        this.mouse = undefined;
        this.camera = undefined;
        this._prevButtons = 0;
        this._buttons = 0;
        this._triggers = 0;
    }
    initialize() {
        if (this.mouse === undefined) {
            throw new Error("mouseプロパティの設定は必須です。");
        }
        if (this.camera === undefined) {
            throw new Error("cameraプロパティの設定は必須です。");
        }
    }
    update() {
        this._prevButtons = this._buttons;
        this._buttons = this.mouse.buttons;
        this._triggers = (this._buttons ^ this._prevButtons) & this._buttons;
        //const invMat = this.camera.matrix.inverse();
        //const worldX
    }
    draw(canvas) {
    }
}
//# sourceMappingURL=StageEditor.js.map