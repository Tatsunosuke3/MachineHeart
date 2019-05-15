import AxisAlignedBoundingBox from "../../../Drgn/Math/Shape/AxisAlignedBoundingBox.js";
export default class Walls {
    constructor(walls = []) {
        this._items = [];
        this._items = walls;
    }
    testForMovingCircle(circle, vector) {
        const len = vector.length();
        const left = circle.position.x - len - circle.radius;
        const top = circle.position.y - len - circle.radius;
        const right = circle.position.x + len + circle.radius;
        const bottom = circle.position.y + len + circle.radius;
        const aabb = new AxisAlignedBoundingBox(left, top, right, bottom);
        //AABBで判定をする壁を絞る
        const targetWalls = [];
        this._items.forEach((item) => {
            if (item.isOverlapped(aabb)) {
                targetWalls.push(item);
            }
        });
        //衝突がなくなるまで繰り返し
        let tmpCircle = circle.clone();
        let tmpVector = vector.clone();
        let isCollision = false;
        while (true) {
            let collisionWall = undefined;
            let testResult = undefined;
            targetWalls.forEach((item) => {
                const test_s_mc = item.testForMovingCircle(tmpCircle, tmpVector);
                if (!test_s_mc.isCollision)
                    return;
                if (testResult === undefined || testResult.t2 > test_s_mc.t2) {
                    collisionWall = item;
                    testResult = test_s_mc;
                }
            });
            if (testResult === undefined) {
                break;
            }
            isCollision = true;
            tmpCircle.position = testResult.circlePosition;
            tmpVector = testResult.afterVector;
        }
        const result = new CollisionResultOfWallsAndMovingCircle();
        result.isCollision = isCollision;
        result.circlePosition = tmpCircle.position.add(tmpVector);
        result.afterVector = tmpVector;
        return result;
    }
    forEach(callback, thisArg) {
        this._items.forEach(callback, thisArg);
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
            item.draw(canvas);
        });
    }
}
export class CollisionResultOfWallsAndMovingCircle {
}
//# sourceMappingURL=Walls.js.map