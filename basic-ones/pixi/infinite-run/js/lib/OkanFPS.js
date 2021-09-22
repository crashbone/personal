class OkanFPS {
    // pixi text
    options;
    noTickerWarned;
    data;

    constructor(options) {
        this.initOptions(options);
        this.noTickerWarned = false;
        this.noTextWarned = false;
        this.data = {
            fpsAvgLast: null,
            fpsArray: [],
            lastFpsCleanupTimestamp: null,
        };
    }

    initOptions(options) {
        const defaultOptions = {
            ticker: null,
            updateIntervalSeconds: 0.5,
            fpsArrayCleanupTimeStampSeconds: 5,
        }

        this.options = {
            text: options?.text ?? defaultOptions.text,
            ticker: options?.ticker ?? defaultOptions.ticker,
            updateIntervalSeconds: options?.updateIntervalSeconds ?? defaultOptions.updateIntervalSeconds,
            fpsArrayCleanupTimeStampSeconds: options?.fpsArrayCleanupTimeStampSeconds ?? defaultOptions?.fpsArrayCleanupTimeStampSeconds
        }
    }

    onTick() {
        if (!this.options.ticker) {
            this.noTickerWarned = true;
            console.log("ticker is not defined!")
            return;
        } else {
            this.noTickerWarned = false;
        }
        const lastTime = this.options.ticker.lastTime;

        // Add latest FPS to the array
        this.data.fpsArray.push(this.options.ticker.FPS);

        let lastFrames;
        if (this.data.fpsAvgLast) {
            const numberOfFrames = this.options.updateIntervalSeconds * this.data.fpsAvgLast;
            lastFrames =  this.data.fpsArray.slice(-numberOfFrames);
        } else {
            lastFrames = this.data.fpsArray;
        }
        const fpsSum = lastFrames.reduce((final, current) => final += current);
        const fpsAvg = fpsSum /  lastFrames.length
        this.data.fpsAvgLast = fpsAvg;

        // FPS array cleanup
        const fpsArrayCleanupTimeStampSeconds = 5;
        const numberOfFramesToKeep = this.options.updateIntervalSeconds * fpsAvg;
        const fpsCleanupTimeElapsed = lastTime - this.data.lastFpsCleanupTimestamp ?? 0;
        if (fpsCleanupTimeElapsed > fpsArrayCleanupTimeStampSeconds * 1000) {
            this.data.lastFpsCleanupTimestamp = lastTime;
            this.data.fpsArray = this.data.fpsArray.slice(-numberOfFramesToKeep);
        }

        return { fpsAvg };
    }
}
