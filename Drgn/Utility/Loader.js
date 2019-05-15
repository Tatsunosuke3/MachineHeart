export default class AssetLoader {
    constructor() {
        this.assets = [];
    }
    loadImage(fileName) {
        let asset = this.assets.find((asset) => {
            return asset.fileName == fileName;
        });
        if (asset) {
            return asset.object;
        }
        asset = new Asset(fileName);
        this.assets.push(asset);
        return asset.object;
    }
    checkLoadingStatus() {
        const status = new AssetLoadingStatus();
        status.total = this.assets.length;
        this.assets.forEach((asset) => {
            status.loadedCount += asset.isLoaded ? 1 : 0;
        });
        status.isLoaded = status.total == status.loadedCount;
        return status;
    }
    dispose() {
        this.assets.forEach((asset) => {
            asset.dispose();
        });
        this.assets = null;
    }
}
class Asset {
    constructor(fileName) {
        this.fileName = "";
        this.isLoaded = false;
        this.fileName = fileName;
        const tokens = fileName.split('.');
        const extension = tokens[tokens.length - 1].toLowerCase();
        switch (extension) {
            case "jpg":
            case "gif":
            case "png":
                this.object = new Image();
                this.object.src = fileName;
                break;
            case "mp4":
            case "ogg":
            case "ogv":
            case "webm":
                this.object = new HTMLVideoElement();
                this.object.src = fileName;
                break;
            default:
                throw new Error("読み込むファイルの拡張子に対応していません。");
        }
        this._loadEventListener = (e) => {
            this.isLoaded = true;
        };
        this.object.addEventListener("load", this._loadEventListener);
    }
    dispose() {
        this.object.removeEventListener("load", this._loadEventListener);
        this.object = null;
    }
}
class AssetLoadingStatus {
    constructor() {
        this.isLoaded = false;
        this.total = 0;
        this.loadedCount = 0;
    }
}
//# sourceMappingURL=Loader.js.map