import Matrix3x3 from "../../../Drgn/Math/Matrix3x3.js";
import Vector2 from "../../../Drgn/Math/Vector2.js";
import MachineParameter from "./MachineParameter.js";
import Walls from "../Stage/Walls.js";
import Circle from "../../../Drgn/Math/Shape/Circle.js";
export default class Machine {
    /** コンストラクタ */
    constructor(position, direction) {
        this._matrix = Matrix3x3.identity;
        this._radius = 8;
        /** 速度 */
        this._velocity = new Vector2();
        /** 自分で移動する力 */
        this._movementForce = new Vector2();
        /** 機体に加わる力 */
        this._force = new Vector2();
        /** 角速度 */
        this._angularVelocity = 0;
        /** 自分で回転する力 */
        this._angularMovementForce = 0;
        /** 期待に加わる回転力 */
        this._angularForce = 0;
        /** 機体パラメータ */
        this._parameter = new MachineParameter(0, 0, 0, 0, 0, 0);
        /** */
        this.walls = undefined;
        this._position = position;
        this._direction = direction;
    }
    get position() {
        return this._position.clone();
    }
    get direction() {
        return this._direction;
    }
    get directionVector() {
        return new Vector2(Math.sin(this.direction), -Math.cos(this.direction));
    }
    /** 初期化 */
    initialize() {
        if (this.walls === undefined) {
            this.walls = new Walls();
        }
    }
    /** 更新 */
    update() {
        //速度を更新
        this._decelerate();
        this._angularDecelerate();
        this._accelerate();
        this._angularAccelerate();
        //弾との衝突処理
        //速度を位置・角度に反映
        const test_ws_mc = this.walls.testForMovingCircle(new Circle(this.position, this._radius), this._velocity);
        if (test_ws_mc.isCollision) {
            this._position = test_ws_mc.circlePosition;
            this._velocity = test_ws_mc.afterVector;
        }
        else {
            this._position = this._position.add(this._velocity);
        }
        this._direction += this._angularVelocity;
        this._matrix = Matrix3x3.translate(this._position.x, this._position.y).rotate(this._direction);
        //力を初期化
        this._movementForce = Vector2.zero;
        this._force = Vector2.zero;
        this._angularMovementForce = 0;
        this._angularForce = 0;
    }
    /**
        * 描画
        * @param canvas
        */
    draw(canvas) {
        canvas.setTransform(this._matrix.m[0], this._matrix.m[1], this._matrix.m[3], this._matrix.m[4], this._matrix.m[6], this._matrix.m[7]);
        canvas.lineWidth = 1;
        canvas.fillStyle = "rgba(255,255,255, 0.75)";
        canvas.strokeStyle = "rgb(255,255,255)";
        canvas.beginPath();
        canvas.moveTo(0, -24);
        canvas.lineTo(16, 24);
        canvas.lineTo(0, 12);
        canvas.lineTo(-16, 24);
        canvas.closePath();
        canvas.fill();
        canvas.stroke();
    }
    /**
        * 機体を移動させる。
        * @param v 機体から見た向きベクトル
        */
    move(v) {
        const len = v.length();
        if (len == 0) {
            this._movementForce = Vector2.zero;
            return;
        }
        this._movementForce = new Vector2(v.x / len * this._parameter._acceleration, v.y / len * this._parameter._acceleration).rotate(this._direction);
    }
    /**
        * 機体を急加速する。
        * @param v 機体から見た向きベクトル
        */
    boost(v) {
        const len = v.length();
        if (len == 0) {
            this._movementForce = Vector2.zero;
            return;
        }
        this._force = new Vector2(v.x / len * 10, v.y / len * 10).rotate(this._direction);
    }
    /**
        * 機体を旋回させる。
        * @param rad 機体から見た旋回角度
        */
    turn(rad) {
        const sign = Math.sign(rad);
        const abs = Math.abs(rad);
        if (abs > this._parameter._angularAcceleration) {
            this._angularMovementForce = sign * this._parameter._angularAcceleration;
        }
        else {
            this._angularMovementForce = rad;
        }
    }
    /**
    * 進行方向の向き毎の最高速度を取得する。
    * @param vec 進行方向の向き
    */
    _getMaximumSpeed(vec) {
        const rad = Math.atan2(vec.x, vec.y) * -1 + Math.PI;
        return ((Math.cos(rad) + 2) / 3) * this._parameter._speed;
    }
    /** 減速処理 */
    _decelerate() {
        const len = this._velocity.length();
        if (len < this._parameter._brake) {
            this._velocity = Vector2.zero;
        }
        else {
            this._velocity = this._velocity.normalize().scalar(len - this._parameter._brake);
        }
    }
    /** 角減速処理 */
    _angularDecelerate() {
        const sign = Math.sign(this._angularVelocity);
        const abs = Math.abs(this._angularVelocity);
        if (abs < this._parameter._angularBrake) {
            this._angularVelocity = 0;
        }
        else {
            this._angularVelocity = sign * (abs - this._parameter._angularBrake);
        }
    }
    /** 加速処理 */
    _accelerate() {
        const v1 = this._velocity.clone();
        const l1 = v1.length();
        const v2 = this._velocity.clone().add(this._movementForce);
        const l2 = v2.length();
        const rad = Math.atan2(v2.x, v2.y);
        const max = this._getMaximumSpeed(v2.clone().rotate(-this._direction));
        if (l2 < max) {
            this._velocity = v2;
        }
        else {
            if (l1 < max) {
                this._velocity = v2.normalize().scalar(max);
            }
            else if (l2 > l1) {
                this._velocity = v2.normalize().scalar(l1);
            }
            else {
                this._velocity = v2;
            }
        }
        this._velocity = this._velocity.add(this._force);
    }
    /** 角加速処理 */
    _angularAccelerate() {
        const av1 = this._angularVelocity + this._angularMovementForce;
        const sign = Math.sign(av1);
        const abs = Math.abs(av1);
        if (abs > this._parameter._angularSpeed) {
            this._angularVelocity = sign * this._parameter._angularSpeed;
        }
        else {
            this._angularVelocity = av1;
        }
        this._angularVelocity += this._angularForce;
    }
    /** 壁との衝突処理 */
    _collideWall() {
    }
}
//# sourceMappingURL=Machine.js.map