document.addEventListener("DOMContentLoaded", () => {
    const mainData = {
        appWidth: 1152,
        appHeight: 864,
        textOptions1: {fontFamily : 'Arial', fontSize: 24, fill : 0xe0e000, align : 'center'},
        scenes: [],
        keys: {},
    }
    window.addEventListener("keydown", e => mainData.keys[e.keyCode] = true)
    window.addEventListener("keyup", e => mainData.keys[e.keyCode] = false)
    window.mainData = mainData;
    let app = new PIXI.Application({ width: mainData.appWidth, height: mainData.appHeight, backgroundColor: 0x000000, backgroundAlpha: 0.9 });
    // App FPS
    const maxFPS = 144;
    app.ticker.minFPS = 0.5;
    app.ticker.maxFPS = maxFPS + 1;
    document.body.appendChild(app.view);
    const mainScene = new MainScene(app, mainData);
    mainScene.execute(); // see MainScene.execute()
})
