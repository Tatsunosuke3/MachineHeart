import Line from "../../../Drgn/Math/Shape/Line.js";
import Segment from "../../../Drgn/Math/Shape/Segment.js";
import Capsule from "../../../Drgn/Math/Shape/Capsule.js";
export default class Wall {
    constructor(startPoint, endPoint) {
        this._segment = new Segment(startPoint, endPoint.sub(startPoint));
    }
    get startPoint() {
        return this._segment.anchor.clone();
    }
    get endPoint() {
        return this._segment.endPoint.clone();
    }
    get vector() {
        return this._segment.vector.clone();
    }
    testForMovingCircle(circle, vector) {
        //進む方向が壁に近づかない向きなら、衝突しない
        const test_s_p = this._segment.testForPoint(circle.position);
        const nv = test_s_p.rootPoint.sub(circle.position);
        if (vector.dot(nv) <= 0.0001) {
            const result = new CollisionResultOfWallAndMovingCircle();
            result.isCollision = false;
            return result;
        }
        //カプセル同士が衝突していなければ、衝突しない
        const capsule = new Capsule(circle.position.clone(), vector.clone(), circle.radius);
        const test_c_c = this._segment.testForCapsule(capsule);
        if (!test_c_c.isCollision) {
            const result = new CollisionResultOfWallAndMovingCircle();
            result.isCollision = false;
            return result;
        }
        //お互いが平行だった場合
        if (test_c_c.isParallel) {
            return this._testForMovingCircle_IfParallel(circle, vector);
        }
        //衝突時の円位置が線分と垂直の場合
        const test_l_l = this._segment.toLine().testForLine(capsule.toLine());
        const angle = this._segment.vector.angle(vector);
        const v1 = vector.normalize().scalar(-1).scalar(circle.radius / Math.sin(angle));
        const tentativeCirclePosition = test_l_l.intersectionPoint.add(v1);
        const test_l_p1 = this._segment.toLine().testForPoint(tentativeCirclePosition);
        if (0 <= test_l_p1.t && test_l_p1.t <= 1) {
            const result = new CollisionResultOfWallAndMovingCircle();
            result.isCollision = true;
            result.t1 = test_l_p1.t;
            result.collisionPoint = test_l_p1.rootPoint;
            result.t2 = tentativeCirclePosition.sub(circle.position).length() / vector.length();
            result.circlePosition = tentativeCirclePosition;
            result.normalVector = result.circlePosition.sub(test_l_p1.rootPoint).normalize();
            const projection = result.normalVector.cross(vector.scalar(1 - result.t2));
            result.afterVector = result.normalVector.verticalVector("left").scalar(projection);
            result.afterPosition = result.circlePosition.add(result.afterVector);
            return result;
        }
        //衝突時の円位置が線分と垂直でない場合
        const t_Clamp = test_l_p1.t < 0 ? 0 : test_l_p1.t > 1 ? 1 : test_l_p1.t;
        const endPoint1 = this._segment.anchor.add(this._segment.vector.scalar(t_Clamp));
        const test_l_p2 = capsule.toLine().testForPoint(endPoint1);
        const h = endPoint1.sub(test_l_p2.rootPoint).length();
        const b = Math.sqrt(circle.radius * circle.radius - h * h);
        const v2 = vector.normalize().scalar(-1).scalar(b);
        const circlePosition = test_l_p2.rootPoint.add(v2);
        const result = new CollisionResultOfWallAndMovingCircle();
        result.isCollision = true;
        result.t1 = t_Clamp;
        result.collisionPoint = endPoint1;
        result.t2 = circlePosition.sub(circle.position).length() / vector.length();
        result.circlePosition = circlePosition;
        result.normalVector = result.circlePosition.sub(endPoint1).normalize();
        const projection = result.normalVector.cross(vector.scalar(1 - result.t2));
        result.afterVector = result.normalVector.verticalVector("left").scalar(projection);
        result.afterPosition = result.circlePosition.add(result.afterVector);
        return result;
    }
    _testForMovingCircle_IfParallel(circle, vector) {
        let point, t;
        if (this._segment.anchor.sub(circle.position).lengthSq() < this.endPoint.sub(circle.position).lengthSq()) {
            point = this._segment.anchor;
            t = 0;
        }
        else {
            point = this.endPoint;
            t = 1;
        }
        const test_l_p1 = new Line(circle.position, vector).testForPoint(point);
        if (test_l_p1.distance <= 0.0001) {
            const result = new CollisionResultOfWallAndMovingCircle();
            result.isCollision = true;
            result.t1 = t;
            result.collisionPoint = point;
            result.t2 = test_l_p1.t;
            result.normalVector = vector.normalize().scalar(-1);
            result.circlePosition = point.add(result.normalVector.scalar(circle.radius));
            const projection = result.normalVector.cross(vector.scalar(1 - result.t2));
            result.afterVector = result.normalVector.verticalVector("left").scalar(projection);
            result.afterPosition = result.circlePosition.add(result.afterVector);
            return result;
        }
        const b = Math.sqrt(circle.radius * circle.radius - test_l_p1.distance * test_l_p1.distance);
        const result = new CollisionResultOfWallAndMovingCircle();
        result.isCollision = true;
        result.t1 = t;
        result.collisionPoint = point;
        result.t2 = (b * b) / vector.lengthSq();
        result.circlePosition = test_l_p1.rootPoint.add(vector.normalize().scalar(-1 * b));
        result.normalVector = result.circlePosition.sub(point).normalize();
        const projection = result.normalVector.cross(vector.scalar(1 - result.t2));
        result.afterVector = result.normalVector.verticalVector("left").scalar(projection);
        result.afterPosition = result.circlePosition.add(result.afterVector);
        return result;
    }
    isOverlapped(aabb) {
        return this._segment.isOverlapped(aabb);
    }
    initialize() {
    }
    update() {
    }
    draw(canvas) {
        canvas.strokeStyle = "#fff";
        canvas.lineWidth = 2;
        canvas.beginPath();
        canvas.moveTo(this._segment.anchor.x, this._segment.anchor.y);
        canvas.lineTo(this._segment.endPoint.x, this._segment.endPoint.y);
        canvas.stroke();
    }
}
/** 線分と動く円の衝突判定の結果 */
export class CollisionResultOfWallAndMovingCircle {
    constructor() {
        /** 衝突しているか */
        this.isCollision = undefined;
        /** 衝突点 = 線分始点 + t1 * 線分ベクトル */
        this.t1 = undefined;
        /** 線分と円が衝突した点 */
        this.collisionPoint = undefined;
        /** 衝突時の円の位置 = 円の位置 + t2 * 円のベクトル */
        this.t2 = undefined;
        /** 衝突時の円の位置 */
        this.circlePosition = undefined;
        /** 線分から延びる、衝突した点の法線 */
        this.normalVector = undefined;
        this.afterPosition = undefined;
        this.afterVector = undefined;
    }
}
//# sourceMappingURL=Wall.js.map