export default class GameObjects {
    constructor() {
        this._items = [];
    }
    initialize() {
        this._items.forEach((item) => {
            item.initialize();
        });
    }
    update() {
        this._items.forEach((item) => {
            item.update();
        });
    }
    draw(canvas) {
        this._items.forEach((item) => {
            this._resetCanvas(canvas);
            item.draw(canvas);
        });
        this._resetCanvas(canvas);
    }
    push(...items) {
        this._items.push(...items);
    }
    _resetCanvas(canvas) {
        canvas.setTransform(1, 0, 0, 1, 0, 0);
        canvas.fillStyle = "#000000";
        canvas.strokeStyle = "#000000";
        canvas.lineCap = "butt";
        canvas.lineJoin = "miter";
        canvas.lineDashOffset = 0;
        canvas.lineWidth = 1;
        canvas.miterLimit = 10;
        canvas.shadowColor = "rgba(0,0,0,0)";
        canvas.shadowOffsetX = 0;
        canvas.shadowOffsetY = 0;
        canvas.shadowBlur = 0;
        canvas.globalAlpha = 1;
        canvas.globalCompositeOperation = "source-over";
        canvas.font = "normal 10px sans-serif";
        canvas.textAlign = "start";
        canvas.textBaseline = "alphabetic";
        canvas.imageSmoothingEnabled = true;
        canvas.mozImageSmoothingEnabled = true;
        canvas.oImageSmoothingEnabled = true;
        canvas.webkitImageSmoothingEnabled = true;
        canvas.msFillRule = "nonzero";
    }
}
//# sourceMappingURL=GameObjects.js.map