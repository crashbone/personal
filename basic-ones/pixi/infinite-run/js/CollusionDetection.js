class CollusionDetection {
    sceneData;

    constructor(options) {
        this.initOptions(options)
        this.init();
    }

    initOptions(options) {
        const defaultOptions = {
            sceneData: null,
        };
        this.sceneData = options?.sceneData ?? defaultOptions.sceneData;
    }

    check() {
        this.sceneData.objects.forEach((object1, i) => {
            if (!object1.collusion){
                return;
            }
            this.sceneData.objects.forEach((object2, j) => {
                if (!object2.collusion){
                    return;
                }
                if (object1 === object2) {
                    return;
                }
                // console.log("hi");
                const aBox = object1.container.getBounds();
                const bBox = object2.container.getBounds();

                const collusion = aBox.x + aBox.width > bBox.x &&
                       aBox.x < bBox.x + bBox.width &&
                       aBox.y + aBox.height > bBox.y &&
                       aBox.y < bBox.y + bBox.height;

                if(collusion) {
                    // debugger;
                    object1.onCollusion(object2);
                    object2.onCollusion(object1);
                }

            });
        });

    }

    init() {
    }


}
