
import Matrix3x3 from "../Math/Matrix3x3.js";
import Vector2 from "../Math/Vector2.js";
export default class SortableCanvasContext {
    constructor(context) {
        this._drawingObjects = [];
        this._currentPath = new Path2D();
        //-------------------------------------------------------------------------------------------------------------------------------
        // 変形　Transformations
        //-------------------------------------------------------------------------------------------------------------------------------
        this._matrix = Matrix3x3.identity;
        //-------------------------------------------------------------------------------------------------------------------------------
        // 色と背景　Colors and styles
        //-------------------------------------------------------------------------------------------------------------------------------
        this.fillStyle = "#000000";
        this.strokeStyle = "#000000";
        //-------------------------------------------------------------------------------------------------------------------------------
        // 線のスタイル　Line styles
        //-------------------------------------------------------------------------------------------------------------------------------
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.lineDashOffset = 0;
        this.lineWidth = 1;
        this.miterLimit = 10;
        //-------------------------------------------------------------------------------------------------------------------------------
        // 影　Shadows
        //-------------------------------------------------------------------------------------------------------------------------------
        this.shadowColor = "rgba(0,0,0,0)";
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        this.shadowBlur = 0;
        //-------------------------------------------------------------------------------------------------------------------------------
        // 透明度・合成方法　Compositing
        //-------------------------------------------------------------------------------------------------------------------------------
        this.globalAlpha = 1;
        this.globalCompositeOperation = "source-over";
        this.font = "normal 10px sans-serif";
        this.textAlign = "start";
        this.textBaseline = "alphabetic";
        this.imageSmoothingEnabled = true;
        this.mozImageSmoothingEnabled = true;
        this.oImageSmoothingEnabled = true;
        this.webkitImageSmoothingEnabled = true;
        this.msFillRule = "nonzero";
        this._context = context;
    }
    reset() {
        this._matrix = Matrix3x3.identity;
        this.fillStyle = "#000000";
        this.strokeStyle = "#000000";
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.lineDashOffset = 0;
        this.lineWidth = 1;
        this.miterLimit = 10;
        this.shadowColor = "rgba(0,0,0,0)";
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        this.shadowBlur = 0;
        this.globalAlpha = 1;
        this.globalCompositeOperation = "source-over";
        this.font = "normal 10px sans-serif";
        this.textAlign = "start";
        this.textBaseline = "alphabetic";
        this.imageSmoothingEnabled = true;
        this.mozImageSmoothingEnabled = true;
        this.oImageSmoothingEnabled = true;
        this.webkitImageSmoothingEnabled = true;
        this.msFillRule = "nonzero";
    }
    drawToCanvas(matrix = Matrix3x3.identity) {
        this._drawingObjects.forEach((obj) => {
            obj.drawToCanvas(matrix);
        });
        this._drawingObjects = [];
    }
    fillToCanvas(color = "#000000") {
        this._context.setTransform(1, 0, 0, 1, 0, 0);
        this._context.fillStyle = color;
        this._context.shadowColor = "rgba(0,0,0,0)";
        this._context.globalAlpha = 1;
        this._context.globalCompositeOperation = "source-over";
        this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
    }
    strokeCircle(x, y, radius, startAngle = 0, endAngle = Math.PI * 2, anticlockwise) {
        this.beginPath();
        this.arc(x, y, radius, startAngle, endAngle, anticlockwise);
        this.closePath();
        this.stroke();
    }
    strokeLine(x1, y1, x2, y2) {
        let _x1, _y1, _x2, _y2;
        if (x1 instanceof Vector2 && y1 instanceof Vector2) {
            _x1 = x1.x;
            _y1 = x1.y;
            _x2 = y1.x;
            _y2 = y1.y;
        }
        else if (typeof x1 == "number" && typeof y1 == "number" && typeof x2 == "number" && typeof y2 == "number") {
            _x1 = x1;
            _y1 = y1;
            _x2 = x2;
            _y2 = y2;
        }
        else {
            throw new Error("不正なデータ型");
        }
        this.beginPath();
        this.moveTo(_x1, _y1);
        this.lineTo(_x2, _y2);
        this.stroke();
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    // 四角形 Simple shapes
    //-------------------------------------------------------------------------------------------------------------------------------
    clearRect(x, y, w, h) {
        const rect = this._createCanvasRect();
        rect.clearRect(x, y, w, h);
        this._drawingObjects.push(rect);
    }
    fillRect(x, y, w, h) {
        const rect = this._createCanvasRect();
        rect.fillRect(x, y, w, h);
        this._drawingObjects.push(rect);
    }
    strokeRect(x, y, w, h) {
        const rect = this._createCanvasRect();
        rect.strokeRect(x, y, w, h);
        this._drawingObjects.push(rect);
    }
    _createCanvasRect() {
        const obj = new CanvasRect(this._context);
        obj.setTransform(this._matrix);
        obj.globalAlpha = this.globalAlpha;
        obj.globalCompositeOperation = this.globalCompositeOperation;
        obj.shadowBlur = this.shadowBlur;
        obj.shadowColor = this.shadowColor;
        obj.shadowOffsetX = this.shadowOffsetX;
        obj.shadowOffsetY = this.shadowOffsetY;
        obj.lineCap = this.lineCap;
        obj.lineJoin = this.lineJoin;
        obj.lineWidth = this.lineWidth;
        obj.miterLimit = this.miterLimit;
        obj.strokeStyle = this.strokeStyle;
        obj.fillStyle = this.fillStyle;
        return obj;
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    // 直線・曲線・多角形・円 Complex shapes
    //-------------------------------------------------------------------------------------------------------------------------------
    beginPath() {
        this._currentPath = new Path2D();
    }
    moveTo(x, y) {
        this._currentPath.moveTo(x, y);
    }
    closePath() {
        this._currentPath.closePath();
    }
    lineTo(x, y) {
        this._currentPath.lineTo(x, y);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
        this._currentPath.quadraticCurveTo(cpx, cpy, x, y);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this._currentPath.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    arcTo(x1, y1, x2, y2, radiusX, radiusY, rotation) {
        this._currentPath.arcTo(x1, y1, x2, y2, radiusX, radiusY, rotation);
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        this._currentPath.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    }
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
        this._currentPath.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    }
    rect(x, y, w, h) {
        this._currentPath.rect(x, y, w, h);
    }
    fill(path, fillRule) {
        const obj = this._createCanvasPath(path);
        obj.drawMode = "fill";
        this._drawingObjects.push(obj);
    }
    stroke(path) {
        const obj = this._createCanvasPath(path);
        obj.drawMode = "stroke";
        this._drawingObjects.push(obj);
    }
    _createCanvasPath(path) {
        const obj = new CanvasPath(this._context);
        obj.setTransform(this._matrix);
        obj.globalAlpha = this.globalAlpha;
        obj.globalCompositeOperation = this.globalCompositeOperation;
        obj.shadowBlur = this.shadowBlur;
        obj.shadowColor = this.shadowColor;
        obj.shadowOffsetX = this.shadowOffsetX;
        obj.shadowOffsetY = this.shadowOffsetY;
        obj.lineCap = this.lineCap;
        obj.lineJoin = this.lineJoin;
        obj.lineWidth = this.lineWidth;
        obj.miterLimit = this.miterLimit;
        obj.strokeStyle = this.strokeStyle;
        obj.fillStyle = this.fillStyle;
        if (path instanceof Path2D) {
            obj.path = path;
        }
        else {
            obj.path = new Path2D(this._currentPath);
        }
        return obj;
    }
    clip(path, fillRule) {
        throw new Error("Method not implemented.");
    }
    isPointInPath(path, x, y, fillRule) {
        throw new Error("Method not implemented.");
    }
    isPointInStroke(path, x, y, fillRule) {
        throw new Error("Method not implemented.");
    }
    scale(x, y) {
        this._matrix = this._matrix.mul(Matrix3x3.scale(x, y));
    }
    rotate(angle) {
        this._matrix = this._matrix.mul(Matrix3x3.rotate(angle));
    }
    translate(x, y) {
        this._matrix = this._matrix.mul(Matrix3x3.translate(x, y));
    }
    transform(m11, m12, m21, m22, dx, dy) {
        const matrix = new Matrix3x3(m11, m12, 0, m21, m22, 0, dx, dy, 1);
        this._matrix = this._matrix.mul(matrix);
    }
    setTransform(m11, m12, m21, m22, dx, dy) {
        const matrix = new Matrix3x3(m11, m12, 0, m21, m22, 0, dx, dy, 1);
        this._matrix = matrix;
    }
    createLinearGradient(x0, y0, x1, y1) {
        throw new Error("Method not implemented.");
    }
    createRadialGradient(x0, y0, r0, x1, y1, r1) {
        throw new Error("Method not implemented.");
    }
    createPattern(image, repetition) {
        throw new Error("Method not implemented.");
    }
    getLineDash() {
        throw new Error("Method not implemented.");
    }
    setLineDash(segments) {
        throw new Error("Method not implemented.");
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    // テキスト　Text
    //-------------------------------------------------------------------------------------------------------------------------------
    fillText(text, x, y, maxWidth) {
        throw new Error("Method not implemented.");
    }
    strokeText(text, x, y, maxWidth) {
        throw new Error("Method not implemented.");
    }
    measureText(text) {
        throw new Error("Method not implemented.");
    }
    drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
        throw new Error("Method not implemented.");
    }
    createImageData(imageDataOrSw, sh) {
        throw new Error("Method not implemented.");
    }
    getImageData(sx, sy, sw, sh) {
        throw new Error("Method not implemented.");
    }
    putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
        throw new Error("Method not implemented.");
    }
    drawFocusIfNeeded(path, element) {
        throw new Error("Method not implemented.");
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    // 描画状態の保存　The canvas state
    //-------------------------------------------------------------------------------------------------------------------------------
    save() {
        throw new Error("Method not implemented.");
    }
    restore() {
        throw new Error("Method not implemented.");
    }
    //-------------------------------------------------------------------------------------------------------------------------------
    // その他
    //-------------------------------------------------------------------------------------------------------------------------------
    get canvas() {
        return this._context.canvas;
    }
}
class CanvasDrawingBase {
    constructor(context) {
        this.globalAlpha = 1;
        this.globalCompositeOperation = "source-over";
        this.shadowBlur = 0;
        this.shadowColor = "rgba(0,0,0,0)";
        this.shadowOffsetX = 0;
        this.shadowOffsetY = 0;
        this._matrix = Matrix3x3.identity;
        this._context = context;
    }
    scale(x, y) {
        this._matrix = this._matrix.mul(Matrix3x3.scale(x, y));
    }
    rotate(angle) {
        this._matrix = this._matrix.mul(Matrix3x3.rotate(angle));
    }
    translate(x, y) {
        this._matrix = this._matrix.mul(Matrix3x3.translate(x, y));
    }
    transform(a, b, c, d, e, f) {
        if (a instanceof Matrix3x3) {
            this._matrix = this._matrix.mul(a.clone());
        }
        else {
            const matrix = new Matrix3x3(a, b, 0, c, d, 0, e, f, 1);
            this._matrix = this._matrix.mul(matrix);
        }
    }
    setTransform(a, b, c, d, e, f) {
        if (a instanceof Matrix3x3) {
            this._matrix = a.clone();
        }
        else {
            this._matrix = new Matrix3x3(a, b, 0, c, d, 0, e, f, 1);
        }
    }
}
export class CanvasRect extends CanvasDrawingBase {
    constructor() {
        super(...arguments);
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.lineWidth = 1;
        this.miterLimit = 10;
        this.strokeStyle = "rgb(0,0,0)";
        this.fillStyle = "rgb(0,0,0)";
        this.drawMode = "none";
        this._x = 0;
        this._y = 0;
        this._w = 0;
        this._h = 0;
    }
    clearRect(x, y, w, h) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this.drawMode = "clear";
    }
    fillRect(x, y, w, h) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this.drawMode = "fill";
    }
    strokeRect(x, y, w, h) {
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this.drawMode = "stroke";
    }
    drawToCanvas(matrix = Matrix3x3.identity) {
        const m = this._matrix.clone().mul(matrix);
        this._context.setTransform(m.m[0], m.m[1], m.m[3], m.m[4], m.m[6], m.m[7]);
        this._context.globalAlpha = this.globalAlpha;
        this._context.globalCompositeOperation = this.globalCompositeOperation;
        this._context.shadowBlur = this.shadowBlur;
        this._context.shadowColor = this.shadowColor;
        this._context.shadowOffsetX = this.shadowOffsetX;
        this._context.shadowOffsetY = this.shadowOffsetY;
        this._context.lineCap = this.lineCap;
        this._context.lineJoin = this.lineJoin;
        this._context.lineWidth = this.lineWidth;
        this._context.miterLimit = this.miterLimit;
        this._context.strokeStyle = this.strokeStyle;
        this._context.fillStyle = this.fillStyle;
        switch (this.drawMode) {
            case "clear":
                this._context.clearRect(this._x, this._y, this._w, this._h);
                break;
            case "fill":
                this._context.fillRect(this._x, this._y, this._w, this._h);
                break;
            case "stroke":
                this._context.strokeRect(this._x, this._y, this._w, this._h);
                break;
        }
    }
}
export class CanvasPath extends CanvasDrawingBase {
    constructor() {
        super(...arguments);
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.lineWidth = 1;
        this.miterLimit = 10;
        this.strokeStyle = "rgb(0,0,0)";
        this.fillStyle = "rgb(0,0,0)";
        this.path = new Path2D();
        this.drawMode = "none";
    }
    arc(x, y, radius, startAngle, endAngle, anticlockwise) {
        this.path.arc(x, y, radius, startAngle, endAngle, anticlockwise);
    }
    arcTo(x1, y1, x2, y2, radiusX, radiusY, rotation) {
        this.path.arcTo(x1, y1, x2, y2, radiusX, radiusY, rotation);
    }
    bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
        this.path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    closePath() {
        this.path.closePath();
    }
    ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise) {
        this.path.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, anticlockwise);
    }
    lineTo(x, y) {
        this.path.lineTo(x, y);
    }
    moveTo(x, y) {
        this.path.moveTo(x, y);
    }
    quadraticCurveTo(cpx, cpy, x, y) {
        this.path.quadraticCurveTo(cpx, cpy, x, y);
    }
    rect(x, y, w, h) {
        this.path.rect(x, y, w, h);
    }
    drawToCanvas(matrix = Matrix3x3.identity) {
        //const m = this._matrix.clone().mul(matrix);
        const m = matrix.clone().mul(this._matrix);
        this._context.setTransform(m.m[0], m.m[1], m.m[3], m.m[4], m.m[6], m.m[7]);
        this._context.globalAlpha = this.globalAlpha;
        this._context.globalCompositeOperation = this.globalCompositeOperation;
        this._context.shadowBlur = this.shadowBlur;
        this._context.shadowColor = this.shadowColor;
        this._context.shadowOffsetX = this.shadowOffsetX;
        this._context.shadowOffsetY = this.shadowOffsetY;
        this._context.lineCap = this.lineCap;
        this._context.lineJoin = this.lineJoin;
        this._context.lineWidth = this.lineWidth;
        this._context.miterLimit = this.miterLimit;
        this._context.strokeStyle = this.strokeStyle;
        this._context.fillStyle = this.fillStyle;
        if (this.drawMode == "fill") {
            this._context.fill(this.path);
        }
        else if (this.drawMode == "stroke") {
            this._context.stroke(this.path);
        }
    }
}
export class CanvasText extends CanvasDrawingBase {
    constructor() {
        super(...arguments);
        this.lineCap = "butt";
        this.lineJoin = "miter";
        this.lineWidth = 1;
        this.miterLimit = 10;
        this.strokeStyle = "rgb(0,0,0)";
        this.fillStyle = "rgb(0,0,0)";
        this.font = "normal 10px sans-serif";
        this.textAlign = "start";
        this.textBaseline = "alphabetic";
    }
    fillText(text, x, y, maxWidth) {
        throw new Error("Method not implemented.");
    }
    strokeText(text, x, y, maxWidth) {
        throw new Error("Method not implemented.");
    }
    measureText(text) {
        throw new Error("Method not implemented.");
    }
    drawToCanvas(matrix) {
        throw new Error("Method not implemented.");
    }
}
export class CanvasImage extends CanvasDrawingBase {
    drawImage(image, srcX, srcY, srcW, srcH, dstX, dstY, dstW, dstH) {
        throw new Error("Method not implemented.");
    }
    createImageData(imageDataOrSw, sh) {
        throw new Error("Method not implemented.");
    }
    getImageData(sx, sy, sw, sh) {
        throw new Error("Method not implemented.");
    }
    putImageData(imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight) {
        throw new Error("Method not implemented.");
    }
    drawToCanvas(matrix) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=SortableCanvasContext.js.map