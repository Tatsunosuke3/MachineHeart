import Vector2 from "../Math/Vector2.js";
export default class Grid {
    constructor(gridSize, camera) {
        this.backgroundColor = "rgb(25,25,25)";
        this.gridColor = "rgb(100,100,100)";
        this.gridSize = gridSize;
        this.camera = camera;
    }
    initialize() {
    }
    update() {
    }
    draw(canvas) {
        const start = new Vector2();
        const end = new Vector2();
        this.calculateDrawingRange(start, end);
        canvas.lineWidth = 1;
        canvas.strokeStyle = this.gridColor;
        canvas.setTransform(1, 0, 0, 1, 0, 0);
        canvas.beginPath();
        for (let x = start.x; x < end.x; x++) {
            canvas.moveTo(x * this.gridSize, start.y * this.gridSize);
            canvas.lineTo(x * this.gridSize, end.y * this.gridSize);
        }
        for (let y = start.y; y < end.y; y++) {
            canvas.moveTo(start.x * this.gridSize, y * this.gridSize);
            canvas.lineTo(end.x * this.gridSize, y * this.gridSize);
        }
        canvas.stroke();
    }
    calculateDrawingRange(outTopLeft, outBottomRight) {
        const vertexes = Array(4);
        vertexes[0] = new Vector2(0, 0);
        vertexes[1] = new Vector2(this.camera.canvasWidth, 0);
        vertexes[2] = new Vector2(this.camera.canvasWidth, this.camera.canvasHeight);
        vertexes[3] = new Vector2(0, this.camera.canvasHeight);
        const mat = this.camera.matrix.inverse();
        const min = vertexes[0].clone();
        const max = vertexes[0].clone();
        vertexes.forEach((vertex) => {
            vertex = vertex.transform(mat);
            if (vertex.x < min.x)
                min.x = vertex.x;
            if (vertex.y < min.y)
                min.y = vertex.y;
            if (vertex.x > max.x)
                max.x = vertex.x;
            if (vertex.y > max.y)
                max.y = vertex.y;
        });
        outTopLeft.x = Math.floor(min.x / this.gridSize);
        outTopLeft.y = Math.floor(min.y / this.gridSize);
        outBottomRight.x = Math.floor(max.x / this.gridSize) + 1;
        outBottomRight.y = Math.floor(max.y / this.gridSize) + 1;
    }
}
//# sourceMappingURL=Grid.js.map