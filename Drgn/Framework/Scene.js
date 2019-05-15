export default class Scene {
    constructor(application) {
        this.sceneStatus = "load";
        this.application = application;
    }
    load() {
    }
    loading() {
        return true;
    }
    main() {
        return;
    }
    update() {
        switch (this.sceneStatus) {
            case "load":
                this.load();
                this.sceneStatus = "loading";
                return "";
            case "loading":
                const isLoaded = this.loading();
                if (isLoaded) {
                    this.sceneStatus = "main";
                }
                return "";
            case "main":
                return this.main();
        }
    }
    dispose() {
        this.application = null;
    }
}
//# sourceMappingURL=Scene.js.map