export default class Keyboard {
    constructor() {
        this._keyBuffer = [];
        this._keydownEventListener = (e) => {
            this._keyBuffer[e.keyCode] = true;
        };
        this._keyupEventListener = (e) => {
            this._keyBuffer[e.keyCode] = false;
        };
        this._blurEventListener = (e) => {
            this._keyBuffer = [];
        };
        document.addEventListener("keydown", this._keydownEventListener);
        document.addEventListener("keyup", this._keyupEventListener);
        document.addEventListener("blur", this._blurEventListener);
    }
    getKey(keyCode) {
        if (this._keyBuffer[keyCode])
            return true;
        return false;
    }
    getKeyBits() {
        let bits = 0;
        if (this._keyBuffer[KeyCode.left])
            bits |= KeyMask.left;
        if (this._keyBuffer[KeyCode.up])
            bits |= KeyMask.up;
        if (this._keyBuffer[KeyCode.right])
            bits |= KeyMask.right;
        if (this._keyBuffer[KeyCode.down])
            bits |= KeyMask.down;
        if (this._keyBuffer[KeyCode.enter])
            bits |= KeyMask.enter;
        if (this._keyBuffer[KeyCode.shift])
            bits |= KeyMask.shift;
        if (this._keyBuffer[KeyCode.ctrl])
            bits |= KeyMask.ctrl;
        if (this._keyBuffer[KeyCode.alt])
            bits |= KeyMask.alt;
        if (this._keyBuffer[KeyCode.esc])
            bits |= KeyMask.esc;
        if (this._keyBuffer[KeyCode.space])
            bits |= KeyMask.space;
        if (this._keyBuffer[KeyCode.q])
            bits |= KeyMask.q;
        if (this._keyBuffer[KeyCode.w])
            bits |= KeyMask.w;
        if (this._keyBuffer[KeyCode.e])
            bits |= KeyMask.e;
        if (this._keyBuffer[KeyCode.r])
            bits |= KeyMask.r;
        if (this._keyBuffer[KeyCode.a])
            bits |= KeyMask.a;
        if (this._keyBuffer[KeyCode.s])
            bits |= KeyMask.s;
        if (this._keyBuffer[KeyCode.d])
            bits |= KeyMask.d;
        if (this._keyBuffer[KeyCode.f])
            bits |= KeyMask.f;
        if (this._keyBuffer[KeyCode.z])
            bits |= KeyMask.z;
        if (this._keyBuffer[KeyCode.x])
            bits |= KeyMask.x;
        if (this._keyBuffer[KeyCode.c])
            bits |= KeyMask.c;
        if (this._keyBuffer[KeyCode.v])
            bits |= KeyMask.v;
        return bits;
    }
    dispose() {
        document.removeEventListener("keydown", this._keydownEventListener);
        document.removeEventListener("keyup", this._keyupEventListener);
        document.removeEventListener("blur", this._blurEventListener);
    }
}
export class KeyCode {
    static get fullKey0() { return "48"; }
    static get fullKey1() { return "49"; }
    static get fullKey2() { return "50"; }
    static get fullKey3() { return "51"; }
    static get fullKey4() { return "52"; }
    static get fullKey5() { return "53"; }
    static get fullKey6() { return "54"; }
    static get fullKey7() { return "55"; }
    static get fullKey8() { return "56"; }
    static get fullKey9() { return "57"; }
    static get numericKey0() { return "96"; }
    static get numericKey1() { return "97"; }
    static get numericKey2() { return "98"; }
    static get numericKey3() { return "99"; }
    static get numericKey4() { return "100"; }
    static get numericKey5() { return "101"; }
    static get numericKey6() { return "102"; }
    static get numericKey7() { return "103"; }
    static get numericKey8() { return "104"; }
    static get numericKey9() { return "105"; }
    static get a() { return "65"; }
    static get b() { return "66"; }
    static get c() { return "67"; }
    static get d() { return "68"; }
    static get e() { return "69"; }
    static get f() { return "70"; }
    static get g() { return "71"; }
    static get h() { return "72"; }
    static get i() { return "73"; }
    static get j() { return "74"; }
    static get k() { return "75"; }
    static get l() { return "76"; }
    static get m() { return "77"; }
    static get n() { return "78"; }
    static get o() { return "79"; }
    static get p() { return "80"; }
    static get q() { return "81"; }
    static get r() { return "82"; }
    static get s() { return "83"; }
    static get t() { return "84"; }
    static get u() { return "85"; }
    static get v() { return "86"; }
    static get w() { return "87"; }
    static get x() { return "88"; }
    static get y() { return "89"; }
    static get z() { return "90"; }
    static get enter() { return "13"; }
    static get shift() { return "16"; }
    static get ctrl() { return "17"; }
    static get alt() { return "18"; }
    static get esc() { return "27"; }
    static get space() { return "32"; }
    static get left() { return "37"; }
    static get up() { return "38"; }
    static get right() { return "39"; }
    static get down() { return "40"; }
}
export class KeyMask {
    static get left() { return 0x000001; }
    static get up() { return 0x000002; }
    static get right() { return 0x000004; }
    static get down() { return 0x000008; }
    static get enter() { return 0x000010; }
    static get shift() { return 0x000020; }
    static get ctrl() { return 0x000040; }
    static get alt() { return 0x000080; }
    static get esc() { return 0x000100; }
    static get space() { return 0x000200; }
    static get q() { return 0x000400; }
    static get w() { return 0x000800; }
    static get e() { return 0x001000; }
    static get r() { return 0x002000; }
    static get a() { return 0x004000; }
    static get s() { return 0x008000; }
    static get d() { return 0x010000; }
    static get f() { return 0x020000; }
    static get z() { return 0x040000; }
    static get x() { return 0x080000; }
    static get c() { return 0x100000; }
    static get v() { return 0x200000; }
}
//# sourceMappingURL=Keyboard.js.map