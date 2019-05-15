var MH;
(function (MH) {
    class TimeMeasurement {
        constructor() {
            this.prevTime = undefined;
            this.frameCount = 0;
            this.fps = 0;
        }
        measure() {
            if (this.prevTime === undefined) {
                this.prevTime = Date.now();
                this.frameCount = 0;
                return 0;
            }
            const nowTime = Date.now();
            this.frameCount++;
            const elapsedTime = nowTime - this.prevTime;
            if (elapsedTime >= 3000) {
                this.fps = this.frameCount / (elapsedTime / 1000);
                this.prevTime = nowTime;
                this.frameCount = 0;
            }
            return this.fps;
        }
    }
    MH.TimeMeasurement = TimeMeasurement;
})(MH || (MH = {}));
//# sourceMappingURL=TimeMeasurement.js.map