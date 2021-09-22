// only 1 instance
class MainScene {
    app;
    mainData;
    constructor(app, mainData) {
        this.app = app
        this.mainData = mainData;
        this.sceneData = { objects: [] };
        this.mainData.scenes.push(this.sceneData)
    }
    execute() {
        // collusionDetection
        const collusionDetection = new CollusionDetection({sceneData: this.sceneData});

        // virtualCam
        const mainContainerVirtualCam = new PIXI.Container();
        this.app.stage.addChild(mainContainerVirtualCam);

        // Player
        const player = new GameObject({
            name: "player",
            spriteMainUrl: 'https://i.ibb.co/rwwtwVk/2.png',
            spriteWidth: 146,
            spriteHeight: 153,
            sceneData: this.sceneData,
            collusion: true,
            onCollusion() { this.container.y += 3; this.runSpeed = 0; this.inputSpeed = 0; location.reload(); }
        });
        window.player = player;
        player.runSpeed = 5;
        player.inputSpeed = 15;
        const playerUpdate = delta => {
            player.container.y -= delta * player.runSpeed;
            if (mainData.keys[65]) {
                player.container.x -= delta * player.inputSpeed
            }
            if (mainData.keys[68]) {
                player.container.x += delta * player.inputSpeed
            }
            if (player.container.x < 50) {
                player.container.x = 50
            }
            if (player.container.x > mainData.appWidth) {
                player.container.x = mainData.appWidth
            }
        }

        mainContainerVirtualCam.addChild(player.container);

        player.container.x = this.mainData.appWidth / 2;
        // player.container.y = this.mainData.appHeight - 100;
        player.container.y = mainData.appHeight;
        // window.player = player;

        // OkanFPS
        const okanFPS = new OkanFPS({
            ticker: this.app.ticker,
        })

        // FPS text
        const textFps = new PIXI.Text("##", this.mainData.textOptions1);
        const textFpsUpdate = () => {
            const lastTime = this.app.ticker.lastTime;
            const okanFPSData = okanFPS.onTick();
            const decimalMultiplier = 10 ** 2;
            const fpsAvgText = Math.round(okanFPSData.fpsAvg * decimalMultiplier) / decimalMultiplier;
            textFps.text = fpsAvgText
        }

        // Map DATA
        const mapDataController = new MapDataController({
            mainData: this.mainData,
            sceneData: this.sceneData,
            container: mainContainerVirtualCam,
            player
        })
        window.mapDataController = mapDataController;

        this.app.stage.addChild(textFps);
        // Add a ticker callback to scroll the text up and down
        this.app.ticker.add((delta) => {
            collusionDetection.check();
            mainContainerVirtualCam.y = mainData.appHeight - player.container.y;
            playerUpdate(delta);

            textFpsUpdate();
            mapDataController.update()
        });
    }
}
