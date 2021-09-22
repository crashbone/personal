class GameObject {
    name;
    spriteMainUrl;
    textureMain;
    spriteMain;
    spriteWidth;
    spriteHeight;
    container;
    collusion;
    sceneData;

    constructor(options) {
        this.initOptions(options)
        this.init();
    }

    initOptions(options) {
        const defaultOptions = {
            name: "unnamed",
            collusion: false,
            spriteMainUrl: null,
            sceneData: null,
            onCollusion: () => {},
        };
        this.name = options?.name ?? defaultOptions.name;
        this.spriteMainUrl = options?.spriteMainUrl ?? defaultOptions.spriteMainUrl;
        this.spriteWidth = options?.spriteWidth ?? defaultOptions.spriteWidth;
        this.spriteHeight = options?.spriteHeight ?? defaultOptions.spriteHeight;
        this.collusion = options?.collusion ?? defaultOptions.collusion;
        this.onCollusion = options?.onCollusion ?? defaultOptions.onCollusion;
        this.sceneData = options?.sceneData ?? defaultOptions.sceneData;
    }

    init() {
        this.sceneData.objects.push(this);
        this.container = new PIXI.Container();
        this.textureMain = PIXI.Texture.from(this.spriteMainUrl);
        this.spriteMain = PIXI.Sprite.from(this.textureMain);
        this.spriteMain.anchor.set(0.5);
        this.container.addChild(this.spriteMain);

        // this.container.pivot.x = this.container.width / 2;
        // this.container.pivot.y = this.container.height / 2;

        this.container.pivot.x = this.spriteWidth / 2;
        this.container.pivot.y = this.spriteHeight / 2;
    }
}
