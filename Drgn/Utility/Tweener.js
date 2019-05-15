export default class Tweener {
    constructor(target, nestLevel = 2) {
        this.tweenSets = new TweenSets();
        this._time = 0;
        this.target = target;
        this.nestLevel = nestLevel;
        const refVals = this._getRefAndValue(this.target, this.target, nestLevel);
        const tweenSet = new TweenSet();
        refVals.forEach((refVal) => {
            tweenSet.push(new Tween(refVal.ref, refVal.val, refVal.val, 0, (x) => { return 1; }));
        });
        this.tweenSets.push(tweenSet);
    }
    get timeLength() {
        return this.tweenSets.timeLength;
    }
    get isLoop() {
        return this.tweenSets.isLoop;
    }
    set isLoop(value) {
        this.tweenSets.isLoop = value;
    }
    to(prop, time, easing) {
        if (easing === undefined) {
            easing = EasingFunctions.getEasingFunction("swing");
        }
        else if (typeof easing == "string") {
            easing = EasingFunctions.getEasingFunction(easing);
        }
        const refVals = this._getRefAndValue(this.target, prop, this.nestLevel);
        const newTweenSet = new TweenSet();
        this.tweenSets.last().forEach((lastTween) => {
            const rv = refVals.find((refVal) => {
                return refVal.ref.equal(lastTween.ref);
            });
            if (rv === undefined) {
                newTweenSet.push(new Tween(lastTween.ref, lastTween.max, lastTween.max, time, easing));
            }
            else {
                newTweenSet.push(new Tween(rv.ref, lastTween.max, rv.val, time, easing));
            }
        });
        this.tweenSets.push(newTweenSet);
        return this;
    }
    by(prop, time, easing) {
        if (easing === undefined) {
            easing = EasingFunctions.getEasingFunction("swing");
        }
        else if (typeof easing == "string") {
            easing = EasingFunctions.getEasingFunction(easing);
        }
        const refVals = this._getRefAndValue(this.target, prop, this.nestLevel);
        const newTweenSet = new TweenSet();
        this.tweenSets.last().forEach((lastTween) => {
            const rv = refVals.find((refVal) => {
                return refVal.ref.equal(lastTween.ref);
            });
            if (rv === undefined) {
                newTweenSet.push(new Tween(lastTween.ref, lastTween.max, lastTween.max, time, easing));
            }
            else {
                newTweenSet.push(new Tween(rv.ref, lastTween.max, lastTween.max + rv.val, time, easing));
            }
        });
        this.tweenSets.push(newTweenSet);
        return this;
    }
    moveTime(t) {
        this.tweenSets.moveTime(t);
    }
    setTime(t) {
        this.tweenSets.setTime(t);
    }
    _getRefAndValue(target, prop, nestLevel) {
        const array = [];
        Object.keys(prop).forEach((key) => {
            if (target[key] === undefined)
                return;
            const val = prop[key];
            if (typeof val == "number") {
                array.push({ ref: new Reference(target, key), val });
            }
            else if (typeof val == "object") {
                if (nestLevel > 0) {
                    array.push(...this._getRefAndValue(target[key], prop[key], nestLevel - 1));
                }
            }
        });
        return array;
    }
}
class TweenSets {
    constructor() {
        this.time = 0;
        this._items = [];
        this.isLoop = false;
        this._isEnd = false;
    }
    get timeLength() {
        let len = 0;
        this._items.forEach((tweenSet) => {
            len += tweenSet.timeLength;
        });
        return len;
    }
    get isEnd() {
        return this._isEnd;
    }
    push(...tweenSets) {
        this._items.push(...tweenSets);
    }
    first() {
        return this._items[0];
    }
    last() {
        return this._items[this._items.length - 1];
    }
    forEach(callback, thisArg) {
        this._items.forEach(callback, thisArg);
    }
    setTime(t) {
        this.time = t;
        if (this.time > this.timeLength && (!this.isLoop)) {
            this.time = this.timeLength;
            this._isEnd = true;
        }
        else {
            this._isEnd = false;
        }
        const it = this._calcTime(this.time);
        this._items[it.index].setTime(it.time);
    }
    moveTime(t) {
        this.time += t;
        if (this.time > this.timeLength && (!this.isLoop)) {
            this.time = this.timeLength;
            this._isEnd = true;
        }
        else {
            this._isEnd = false;
        }
        const it = this._calcTime(this.time);
        this._items[it.index].setTime(it.time);
    }
    _calcTime(t) {
        let result = { index: 0, time: t };
        result.time = result.time % this.timeLength;
        if (result.time < 0)
            result.time = this.timeLength - result.time;
        this._items.some((tweenSet, i) => {
            result.index = i;
            if (result.time < tweenSet.timeLength) {
                return true;
            }
            result.time -= tweenSet.timeLength;
            return false;
        });
        return result;
    }
}
class TweenSet {
    constructor() {
        this.time = 0;
        this.timeLength = undefined;
        this._items = [];
    }
    push(...tweens) {
        tweens.forEach((tween) => {
            if (this.timeLength === undefined) {
                this.timeLength = tween.timeLength;
            }
            if (this.timeLength != tween.timeLength) {
                throw Error("TweenSetには、時間の長さの違うTweenを収めることはできません。");
            }
            this._items.push(tween);
        });
    }
    forEach(callback, thisArg) {
        this._items.forEach(callback, thisArg);
    }
    setTime(t) {
        this.time = t;
        this._items.forEach((tween) => {
            tween.setTime(t);
        });
    }
    moveTime(t) {
        this.time = t;
        this._items.forEach((tween) => {
            tween.moveTime(t);
        });
    }
}
class Tween {
    constructor(ref, min, max, timeLength, eading) {
        this.time = 0;
        this.ref = ref;
        this.min = min;
        this.max = max;
        this.timeLength = timeLength;
        if (eading === undefined) {
            this.easing = EasingFunctions.easeOutQuad;
        }
        else {
            this.easing = eading;
        }
    }
    get value() {
        const t = this.time / this.timeLength;
        const val = this.min + this.easing(t) * (this.max - this.min);
        return val;
    }
    setTime(t) {
        this.time = t;
        this.ref.value = this.value;
    }
    moveTime(t) {
        this.time += t;
        this.ref.value = this.value;
    }
}
class EasingFunctions {
    static get c1() {
        return 1.70158;
    }
    static get c2() {
        return this.c1 * 1.525;
    }
    static get c3() {
        return this.c1 + 1;
    }
    static get c4() {
        return (2 * Math.PI) / 3;
    }
    static get c5() {
        return (2 * Math.PI) / 4.5;
    }
    static getEasingFunction(functionName) {
        return EasingFunctions[functionName];
    }
    static linear(x) {
        return x;
    }
    static easeInQuad(x) {
        return Math.pow(x, 2);
    }
    static easeOutQuad(x) {
        return 1 - Math.pow(1 - x, 2);
    }
    static easeInOutQuad(x) {
        if (x < 0.5) {
            return 2 * x * x;
        }
        else {
            return 1 - Math.pow(-2 * x + 2, 2) / 2;
        }
    }
    static easeInCubic(x) {
        throw new Error("未実装エラー");
    }
    static easeOutCubic(x) {
        throw new Error("未実装エラー");
    }
    static easeInOutCubic(x) {
        throw new Error("未実装エラー");
    }
    static easeInQuart(x) {
        throw new Error("未実装エラー");
    }
    static easeOutQuart(x) {
        throw new Error("未実装エラー");
    }
    static easeInOutQuart(x) {
        throw new Error("未実装エラー");
    }
    static easeInQuint(x) {
        throw new Error("未実装エラー");
    }
    static easeOutQuint(x) {
        throw new Error("未実装エラー");
    }
    static easeInOutQuint(x) {
        throw new Error("未実装エラー");
    }
    static easeInSine(x) {
        throw new Error("未実装エラー");
    }
    static easeOutSine(x) {
        throw new Error("未実装エラー");
    }
    static easeInOutSine(x) {
        throw new Error("未実装エラー");
    }
    static easeInExpo(x) {
        throw new Error("未実装エラー");
    }
    static easeOutExpo(x) {
        throw new Error("未実装エラー");
    }
    static easeInOutExpo(x) {
        throw new Error("未実装エラー");
    }
    static easeInCirc(x) {
        throw new Error("未実装エラー");
    }
    static easeOutCirc(x) {
        throw new Error("未実装エラー");
    }
    static easeInOutCirc(x) {
        throw new Error("未実装エラー");
    }
    static easeInElastic(x) {
        //return x === 0 ? 0 : x === 1 ? 1 :
        //-pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
        if (x === 0) {
            return 0;
        }
        else if (x === 1) {
            return 1;
        }
        else {
            return -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * EasingFunctions.c4);
        }
    }
    static easeOutElastic(x) {
        if (x === 0) {
            return 0;
        }
        else if (x === 1) {
            return 1;
        }
        else {
            return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * EasingFunctions.c4) + 1;
        }
    }
    static easeInOutElastic(x) {
        if (x === 0) {
            return 0;
        }
        else if (x === 1) {
            return 1;
        }
        else if (x < 0.5) {
            const val = -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * EasingFunctions.c5)) / 2;
            return val;
        }
        else {
            return Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * EasingFunctions.c5) / 2 + 1;
        }
    }
    static easeInBack(x) {
        return EasingFunctions.c3 * Math.pow(x, 3) - EasingFunctions.c1 * Math.pow(x, 2);
    }
    static easeOutBack(x) {
        return 1 + EasingFunctions.c3 * Math.pow(x - 1, 3) + EasingFunctions.c1 * Math.pow(x - 1, 2);
    }
    static easeInOutBack(x) {
        if (x < 0.5) {
            return (Math.pow(2 * x, 2) * ((EasingFunctions.c2 + 1) * 2 * x - EasingFunctions.c2)) / 2;
        }
        else {
            return (Math.pow(2 * x - 2, 2) * ((EasingFunctions.c2 + 1) * (x * 2 - 2) + EasingFunctions.c2) + 2) / 2;
        }
    }
    static easeInBounce(x) {
        throw new Error("未実装エラー");
    }
    static easeOutBounce() {
        throw new Error("未実装エラー");
    }
    static easeInOutBounce(x) {
        throw new Error("未実装エラー");
    }
}
EasingFunctions.swing = EasingFunctions.easeInQuad;
class Reference {
    constructor(obj, propName) {
        this.obj = obj;
        this.propName = propName;
    }
    equal(ref) {
        return this.obj === ref.obj && this.propName == ref.propName;
    }
    get value() {
        return this.obj[this.propName];
    }
    set value(val) {
        this.obj[this.propName] = val;
    }
    toString() {
        return this.propName;
    }
}
//# sourceMappingURL=Tweener.js.map