import Vector2 from "../../../Drgn/Math/Vector2.js";
import Wall from "./Wall.js";
import Walls from "./Walls.js";
export default class AppendableWalls extends Walls {
    constructor() {
        super(...arguments);
        this._currentPoint = undefined;
    }
    moveTo(x, y) {
        let point;
        if (typeof x == "number" && y !== undefined) {
            point = new Vector2(x, y);
        }
        else if (x instanceof Vector2) {
            point = x;
        }
        else {
            throw new Error("データ型が不正");
        }
        this._currentPoint = point;
    }
    lineTo(x, y) {
        let point;
        if (typeof x == "number" && y !== undefined) {
            point = new Vector2(x, y);
        }
        else if (x instanceof Vector2) {
            point = x;
        }
        else {
            throw new Error("データ型が不正");
        }
        if (this._currentPoint === undefined) {
            this._currentPoint = point;
            return;
        }
        this._items.push(new Wall(this._currentPoint, point));
        this._currentPoint = point;
    }
    push(wall) {
        this._items.push(wall);
    }
    toReadonly() {
        return new Walls(this._items);
    }
}
//# sourceMappingURL=AppendableWalls.js.map