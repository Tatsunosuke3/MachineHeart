export default class MachineParameter {
    constructor(speed, acceleration, brake, turning, energyOutput, energyCapacity) {
        this._speed = 5;
        this._acceleration = 0.4;
        this._brake = 0.2;
        this._angularSpeed = Math.PI / 45;
        this._angularAcceleration = Math.PI / 300;
        this._angularBrake = Math.PI / 600;
    }
    /** 最高速度レベル (1～9) */
    get speedLevel() { return this._speedLevel; }
    set speedLevel(value) {
        this._speed = 12 / 9 * value;
        this._speedLevel = value;
    }
    /** 加速レベル (1～9) */
    get accelerationLevel() { return this._accelerationLevel; }
    set accelerationLevel(value) {
        this._accelerationLevel = value;
    }
    get brakeLevel() { return this._brakeLevel; }
    set brakeLevel(value) {
        this._brakeLevel = value;
    }
    get turningLevel() { return this._turningLevel; }
    set turningLevel(value) {
        this._turningLevel = value;
    }
    get energyOutputLevel() { return this._energyOutputLevel; }
    set energyOutputLevel(value) {
        this._energyOutputLevel = value;
    }
    get energyCapacityLevel() { return this._energyCapacityLevel; }
    set energyCapacityLevel(value) {
        this._energyCapacityLevel = value;
    }
}
//# sourceMappingURL=MachineParameter.js.map