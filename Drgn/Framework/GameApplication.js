export default class GameApplication {
    constructor(context) {
        this.sceneClasses = [];
        this.isEnd = false;
        this.context = context;
    }
    addSceneClass(...sceneClasses) {
        sceneClasses.forEach((sceneClass) => {
            this.sceneClasses.push(sceneClass);
        });
    }
    run(startSceneClass) {
        if (this.sceneClasses.length == 0) {
            throw new Error("シーンクラスがひとつも登録されていません。");
        }
        let sceneClass;
        if (startSceneClass === undefined) {
            sceneClass = this.sceneClasses[0];
        }
        else if (typeof startSceneClass == "string") {
            sceneClass = this.sceneClasses.find((sceneClass) => {
                return sceneClass.name == startSceneClass;
            });
        }
        else {
            sceneClass = this.sceneClasses.find((sceneClass) => {
                return sceneClass === startSceneClass;
            });
        }
        if (sceneClass === undefined) {
            throw new Error("登録されたシーンクラスの中に、開始シーンクラスが見つかりません。");
        }
        this.currentScene = new sceneClass(this);
        window.requestAnimationFrame(this.loop.bind(this));
    }
    shutdown() {
        this.isEnd = true;
    }
    loop() {
        const nextSceneName = this.currentScene.update();
        const nextSceneClass = this.sceneClasses.find((sceneClass) => {
            return sceneClass.name == nextSceneName;
        });
        if (nextSceneClass) {
            this.currentScene.dispose();
            this.currentScene = null;
            this.currentScene = new nextSceneClass(this);
        }
        const requestId = window.requestAnimationFrame(this.loop.bind(this));
        if (this.isEnd) {
            window.cancelAnimationFrame(requestId);
        }
    }
}
//# sourceMappingURL=GameApplication.js.map