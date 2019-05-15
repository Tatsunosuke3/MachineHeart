import Machine from "./Machine.js";
import { KeyMask } from "../../../Drgn/Input/Keyboard.js";
import Vector2 from "../../../Drgn/Math/Vector2.js";
export class Player extends Machine {
    /**
        *
        * @param keyboard
        * @param mouse
        * @param camera
        */
    constructor(position, direction) {
        super(position, direction);
        /** キーボード入力 */
        this.keyboard = undefined;
        /** マウス入力 */
        this.mouse = undefined;
        /** カメラ */
        this.camera = undefined;
        /** 現在のキー情報 */
        this._keys = 0;
        /** 一つ前のキー情報 */
        this._prevKeys = 0;
        /** 現在のフレームで押されたキー情報 */
        this._triggers = 0;
    }
    initialize() {
        super.initialize();
        if (this.keyboard === undefined) {
            throw new Error("keyboardプロパティの設定は必須です");
        }
        if (this.mouse === undefined) {
            throw new Error("mouseプロパティの設定は必須です");
        }
        if (this.camera === undefined) {
            throw new Error("cameraプロパティの設定は必須です");
        }
    }
    /**  */
    update() {
        //キー情報を更新
        this._prevKeys = this._keys;
        this._keys = this.keyboard.getKeyBits();
        this._triggers = (this._keys ^ this._prevKeys) & this._keys;
        //キー情報をもとに機体を操作
        const mouseVec = new Vector2(this.mouse.offsetX, this.mouse.offsetY).transform(this.camera.matrix.inverse()).sub(this.position);
        const v = new Vector2(this.mouse.offsetX, this.mouse.offsetY).transform(this.camera.matrix.inverse()).sub(this.position).rotate(-this.direction);
        const a = this.directionVector.cross(mouseVec) > 0 ? 1 : -1;
        if (this.mouse.buttons & 0x0001) {
            this.move(v);
            this.turn(a);
        }
        if (this._keys & KeyMask.left) {
            this.move(new Vector2(-1, 0));
        }
        else if (this._keys & KeyMask.up) {
            this.move(new Vector2(0, -1));
        }
        else if (this._keys & KeyMask.right) {
            this.move(new Vector2(1, 0));
        }
        else if (this._keys & KeyMask.down) {
            this.move(new Vector2(0, 1));
        }
        if (this._keys & KeyMask.z) {
            this.turn(-1);
        }
        else if (this._keys & KeyMask.x) {
            this.turn(1);
        }
        if (this._triggers & KeyMask.a) {
            this.boost(v);
        }
        //親クラスのメソッドを呼び出し
        super.update();
        console.log(this.position.toString());
    }
    draw(canvas) {
        super.draw(canvas);
    }
}
//# sourceMappingURL=Player.js.map