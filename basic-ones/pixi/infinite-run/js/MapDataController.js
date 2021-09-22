class MapDataController {
    mainData;
    sceneData;

    container;
    player;
    mapData;

    firstDistance;

    lineDistance;
    laneAmount;

    obstacleMinAmount;
    obstacleMaxAmount;

    newMapDataDistance;
    keepLineAmount;
    addLineAmount;

    emptyID = "empty";
    obstacleID = "obstacle";

    constructor(options){
        this.mapData = []
        this.initOptions(options);
        this.laneLength = this.mainData.appWidth / this.laneAmount;
        window.okan = this;
    }

    initOptions(options) {
        const defaultOptions = {
            mainData: null,
            sceneData: null,

            container: null,
            player: null,

            firstDistance: 500,

            lineDistance: 400,
            laneAmount: 6,

            obstacleMinAmount: 1,
            obstacleMaxAmount: 2,

            newMapDataDistance: 500,
            keepLineAmount: 5,
            addLineAmount: 1,
        }

        this.mainData = options?.mainData ?? defaultOptions.mainData;
        this.sceneData = options?.sceneData ?? defaultOptions.sceneData;
        this.container = options?.container ?? defaultOptions.container;
        this.player = options?.player ?? defaultOptions.player;
        this.firstDistance = options?.firstDistance ?? defaultOptions.firstDistance;
        this.lineDistance = options?.lineDistance ?? defaultOptions.lineDistance;
        this.laneAmount = options?.laneAmount ?? defaultOptions.laneAmount;
        this.obstacleMinAmount = options?.obstacleMinAmount ?? defaultOptions.obstacleMinAmount;
        this.obstacleMaxAmount = options?.obstacleMaxAmount ?? defaultOptions.obstacleMaxAmount;
        this.newMapDataDistance = options?.newMapDataDistance ?? defaultOptions.newMapDataDistance;
        this.keepLineAmount = options?.keepLineAmount ?? defaultOptions.keepLineAmount;
        this.addLineAmount = options?.addLineAmount ?? defaultOptions.addLineAmount;
    }

    update() {
        if (!this.mapData.length){
            this.setNewMapData();
        } else if (this.player.container.y - this.getLatestY() < this.newMapDataDistance){
            this.cleanMapData();
            this.setNewMapData();
        }
    }

    setNewMapData() {
        for (let i = 0; i<this.addLineAmount; i++) {
            const y = this.getLatestY() - this.lineDistance;
            const line = {
                lanes: Array(this.laneAmount).fill({id: this.emptyID}),
                y
            };
            const obstacleAmount = this.randomIntFromInterval(this.obstacleMinAmount, this.obstacleMaxAmount)
            this.generateObstacles(line, obstacleAmount);
            this.mapData.push(line);
        }

        this.createGameObjects();
    }

    cleanMapData() {
        for (let i = 0; i<(this.mapData.length - this.keepLineAmount); i++){
            const line = this.mapData[i];
            line.lanes.forEach(lane => {
                const obj = lane.object;
                if (obj?.container) {
                    this.container.removeChild(obj.container);
                    this.sceneData.objects.splice(this.sceneData.objects.indexOf(obj), 1)
                }
            });
        }
        this.mapData = this.mapData.slice(-this.keepLineAmount);
    }

    generateObstacles(line, obstacleAmount) {
        let count = 0;
        while (count < obstacleAmount) {
            const index = this.randomIntFromInterval(0, this.laneAmount-1)
            if (line.lanes[index]?.id !== this.obstacleID) {
                line.lanes[index] = { id: this.obstacleID }
                count++
            }
        }
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    createGameObjects() {
        this.mapData.forEach((line, i) => {
            line.lanes.forEach((lane, j) => {
                if (lane?.id === this.obstacleID && !lane?.object) {
                    const obstacle = new GameObject({
                        name: this.obstacleID + i + j,
                        collusion: true,
                        spriteMainUrl: 'https://i.ibb.co/rwwtwVk/2.png',
                        spriteWidth: 146,
                        spriteHeight: 153,
                        sceneData: this.sceneData,
                    });
                    lane.object = obstacle;
                    const x = j * this.laneLength + this.laneLength / 2;
                    obstacle.container.position.set(x, line.y);
                    this.container.addChild(obstacle.container)
                }
            });
        });
    }

    getLatestY() {
        if (this.mapData.length) {
            return this.mapData[this.mapData.length-1]?.y
        } else {
            return this.firstDistance;
        }
    }
}
