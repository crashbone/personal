/**
 * @typedef {{
 *  hasArtikel: boolean,
 *  artikel: string,
 *  word: string,
 *  meaning: string,
 *  context: string,
 *  mode: number,
 *  marker: boolean
 * }} WordModel
 */

/** @typedef {'SHORT' | 'LONG' | 'MEANING'} WordModeNames */

/**
 * @typedef {{
 *  modeAll: WordModeNames,
 *  words: WordModel[]
 * }} WordsModel
 */



/**
 * @typedef {{
 *   id: number,
 *   buildContext: (word: Word) => string
 * }} WordMode
 */

window.okanDE = window.okanDE ?? {};
window.okanDE.WordManager = class WordManager {
    static _instance = null;
    splitter = ["\t", "    ", " | "]; // ["\t", "::", "//", "--", "__"],
    ARTIKELS = ["der", "die", "das"];
    /**
     * @type {WordsModel}
     */
    model = {
        modeAll: 0,
        words: []
    }

    /**
     * @type {{[key: WordModeNames]: WordMode}}
     */
    static WordModes = {
        SHORT: {
            id: 0,
            buildContext(word) {
                return word.word;
            }
        },
        LONG: {
            id: 1,
            buildContext(word) {
                return word.hasArtikel ? `${word.artikel} ${word.word} > ${word.meaning}` : `${word.word} > ${word.meaning}`;
            }
        },
        MEANING: {
            id: 2,
            buildContext(word) {
                return word.meaning;
            }
        }
    }

    static getModeName(modeID) {
        console.log('TEST')
        return Object.entries(WordManager.WordModes).find(([modeName, mode]) => {
            if (mode.id === modeID) return modeName;
        })[0];
    }

    static getMode(modeID) {
        const id = WordManager.getModeName(modeID);
        if (id) return WordManager.WordModes[id];
        return undefined;
    }

    /** @returns WordManager */
    static get instance() {
        if (!WordManager._instance) {
            WordManager._instance = new WordManager(true);
        }
        return WordManager._instance;
    }
    constructor(singleton = false) {
        if (!singleton)
            throw new Error("Cannot instantiate singleton");
    }

    /**
     * @param {string} allWords
     * @returns {WordModel[]}
     */

    setupWords(allWords) {
        //whole textarea input splitted into array using "\n"
        const allWordsArray = allWords.split("\n")
        allWordsArray.forEach(line => {
            const lineArray = window.okanDE.util.splitLibrary.splitString(line, this.splitter)
            if (lineArray.length === 1 && line.length < 3) {
                return;
            }
            /**
             * @type {WordModel}
             */
            let theWord;

            //If first section of the line is artikel
            if (this.ARTIKELS.includes(lineArray[0])) { //first tab is artikel
                theWord = {
                    hasArtikel: true,
                    artikel: lineArray[0].toLowerCase(),
                    word: lineArray[1],
                    meaning: "",
                    context: lineArray[1],
                    mode: 0,
                    marker: false
                }
                if (lineArray[2]) theWord.meaning = lineArray[2]
            } else { //direct word
                theWord = {
                    hasArtikel: false,
                    meaning: "",
                    word: lineArray[0],
                    context: lineArray[0],
                    mode: 0,
                    marker: false
                }
                if (lineArray[1]) theWord.meaning = lineArray[1]
            }
            this.model.words.push(theWord)
        });
    }

    /**
     * @param {number | undefined} wordIndex
     * @param {WordModeNames} modeName
     */
    switchMode(wordIndex, modeName) {
        const mode = WordManager.WordModes[modeName];
        if (wordIndex === undefined) {
            this.model.modeAll = mode.id;
            this.model.words.forEach((word,index) => {
                this.switchMode(index, modeName);
            });
        } else {
            this.model.words[wordIndex].context = mode.buildContext(this.model.words[wordIndex]);
            this.model.words[wordIndex].mode = mode.id;
        }
    }

    /**
     * @param {number | undefined} wordIndex
     */
    nextMode(wordIndex) {
        if (wordIndex === undefined) {
            const nextModeID = this.model.modeAll + 1;
            this.switchMode(undefined, WordManager.getModeName(nextModeID % 3));
        } else {
            const nextModeID = this.model.words[wordIndex].mode + 1;
            this.switchMode(wordIndex, WordManager.getModeName(nextModeID % 3));
        }

    }

    shuffle() {
        window.okanDE.util.shuffle(this.model.words);
    }
}