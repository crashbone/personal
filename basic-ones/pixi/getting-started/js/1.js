document.addEventListener("DOMContentLoaded", () => {
    // ==== COMMON CODE START ====

    // Create the application helper and add its render target to the page
    const appWidth = 1152;
    const appHeight = 864
    let app = new PIXI.Application({ width: appWidth, height: appHeight, backgroundColor: 0x33aaaa, backgroundAlpha: 0.95 });
    document.body.appendChild(app.view);
    const textOptions1 = {fontFamily : 'Arial', fontSize: 24, fill : 0xe0e000, align : 'center'};
    const inOutFunction = (x,y) => {const modx = x % (2*y); return modx <= y ? modx : 2*y-modx}
    // ==== COMMON CODE END ====

    // ==== #1 START ====
    // sprite
    const eggAnimation = {
        startX: 0,
        lengthX: 400,
        speed: 600, // pixel per second
        imageUrl: 'https://i.ibb.co/rwwtwVk/2.png'
    }
    window.eggAnimation = eggAnimation;
    const eggTexture = PIXI.Texture.from(eggAnimation.imageUrl);
    window.eggTexture = eggTexture;
    let eggSprite1 = PIXI.Sprite.from(eggTexture);
    app.stage.addChild(eggSprite1);
    // App FPS
    const maxFPS = 144;
    app.ticker.minFPS = 0.5;
    app.ticker.maxFPS = maxFPS + 1;

    // FPS text
    let textFps = new PIXI.Text("##", textOptions1);
    app.stage.addChild(textFps);

    // OkanFPS
    const okanFPS = new OkanFPS({
        ticker: app.ticker,
    })

    // ==== #1 END ====


    // ==== #2 START ====

    //  - frame (PIXI.Graphics) (gray background)
    //    - container1 (PIXI.Container)
    //      - mask (PIXI.Graphics)
    //      - text (PIXI.Text)

    // frame
    const _frame1 = {
        _container1: {
            _mask: {},
            _text: {},
        },
    }

    // frame background
    _frame1.position = {x: 0, y: 200},
    _frame1.backgroundWidth = appWidth,
    _frame1.backgroundHeight = 150

    // container1
    _frame1._container1.imaginaryPadding = {left: 25, right: 25, top: 25, bottom: 25},
    _frame1._container1.position = {x: _frame1._container1.imaginaryPadding.left, y: _frame1._container1.imaginaryPadding.top},
    _frame1._container1.imaginaryWidth = _frame1.backgroundWidth - _frame1._container1.imaginaryPadding.left - _frame1._container1.imaginaryPadding.right;
    _frame1._container1.imaginaryHeight = _frame1.backgroundHeight - _frame1._container1.imaginaryPadding.top - _frame1._container1.imaginaryPadding.bottom;

    // mask
    _frame1._container1._mask.position = {x: 10, y: 10}
    _frame1._container1._mask.width = 550
    _frame1._container1._mask.height = 100;

    // text
    _frame1._container1._text.wordWrapWidth = 0;

    let frame1 = new PIXI.Graphics();
    frame1.beginFill(0x666666);
    frame1.lineStyle({ color: 0x000000, width: 1, alignment: 0 }); // border
    frame1.drawRect(0, 0, _frame1.backgroundWidth, _frame1.backgroundHeight);
    frame1.position.set(_frame1.position.x, _frame1.position.y);
    app.stage.addChild(frame1);
    let mask = new PIXI.Graphics();
    mask.beginFill(0xffffff);
    mask.drawRect(0,0, _frame1._container1._mask.width, _frame1._container1._mask.height);
    mask.endFill();
    let container1 = new PIXI.Container();
    container1.mask = mask;
    container1.addChild(mask);
    container1.position.set(_frame1._container1.position.x, _frame1._container1.position.y);
    frame1.addChild(container1);

    // Create contents for the masked container1
    let text2 = new PIXI.Text(
      'This text will scroll up and be masked, so you can see how masking works.  Lorem ipsum and all that.\n\n' +
      'You can put anything in the container1 and it will be masked!',
      {
        fontSize: 18,
        fill: 0xffffff,
        wordWrap: true,
        wordWrapWidth: _frame1._container1.imaginaryWidth,
      }
    );
    container1.addChild(text2);

    // ==== #2 END ====

    // ==== #3 START ====
    const container2 = new PIXI.Container();
    window.container2 = container2;
    for (let i = 0; i < 6; i++) {
        const eggSprite2 = new PIXI.Sprite(eggTexture);
        eggSprite2.anchor.set(0.5);
        eggSprite2.x = (i % 3) * 150;
        eggSprite2.y = Math.floor(i / 3) * 150;
        container2.addChild(eggSprite2);
    }
    app.stage.addChild(container2);
    container2.x = eggAnimation.startX + eggAnimation.lengthX + 150 * 3 / 2 + 200;
    container2.y = 150 * 3 / 2;
    container2.pivot.x = container2.width / 2;
    container2.pivot.y = container2.height / 2;

    // ==== #3 END ====

    // ==== COMMON CODE START ====
    // Add a ticker callback to scroll the text up and down
    let elapsed = 0.0;
    app.ticker.add((delta) => {
        const lastTime = app.ticker.lastTime;
        // ==== COMMON CODE END ====

        // ==== #1 START ====
        const x1 = (eggAnimation.speed*lastTime/1000);
        eggSprite1.x = inOutFunction(x1, eggAnimation.lengthX);
        const okanFPSData = okanFPS.onTick();
        const decimalMultiplier = 10 ** 2;
        const fpsAvgText = Math.round(okanFPSData.fpsAvg * decimalMultiplier) / decimalMultiplier;
        textFps.text = fpsAvgText
        // ==== #1 END ====

        // ==== #2 START ====
        text2.y = Math.cos(lastTime/250.0) * 50.0;
        // ==== #2 END ====

        // ==== #3 START ====
        container2.rotation = 1 * lastTime/1000;
        // ==== #3 END ====

    });
})
