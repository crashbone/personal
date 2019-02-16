var both = {
    paragraphClass(word) {
        return {
            der: word.artikel == "der" && word.mode == 1,
            die: word.artikel == "die" && word.mode == 1,
            das: word.artikel == "das" && word.mode == 1,
        }
    },
    submit() {
        app.submitted = true;
        var words = app.textarea.split("\n")
        app.shuffle(words)
        words.forEach(word => {
            var wordArray = util.splitLibrary.splitString(word, ["\t", "::", "//", "--", "__"])
            console.log(wordArray)
            if (app.artikels.includes(wordArray[0])) { //first tab is artikel
                var wordO = {
                    hasArtikel: true,
                    artikel: wordArray[0].toLowerCase(),
                    word: wordArray[1],
                    meaning: "",
                    context: wordArray[1],
                    mode: 0
                }
                if (wordArray[2]) wordO.meaning = wordArray[2]
            }
            else { //direct word
                var wordO = {
                    hasArtikel: false,
                    meaning: "",
                    word: wordArray[0],
                    context: wordArray[0],
                    mode: 0
                }
                if (wordArray[1]) wordO.meaning = wordArray[1]
            }
            app.words.push(wordO)
        });
    },
    meaning(i) {
        if (app.words[i].meaning) {
            app.words[i].context = app.words[i].meaning
            app.words[i].mode = 2
        }
        else {
            app.short(i)
        }
    },
    long(i) {
        if (app.words[i].hasArtikel) {
            app.words[i].context = app.words[i].artikel + " " + app.words[i].word + " > " + app.words[i].meaning
            app.words[i].mode = 1
        }
        else {
            app.words[i].context = app.words[i].word + " > " + app.words[i].meaning
            app.words[i].mode = 1
        }
    },
    short(i) {
        if (app.words[i].hasArtikel) {
            app.words[i].context = app.words[i].word
            app.words[i].mode = 0;
        }
        else {
            app.words[i].context = app.words[i].word
            app.words[i].mode = 0;
        }
    },
    toggleAll() {
        if (app.modeall == 0) {
            for (var i = 0; i < app.words.length; i++) {
                app.long(i)
            }
            app.modeall = 1;
        }
        else if (app.modeall == 1) {
            for (var i = 0; i < app.words.length; i++) {
                app.meaning(i)
            }
            app.modeall = 2;
        }
        else if (app.modeall == 2) {
            for (var i = 0; i < app.words.length; i++) {
                app.short(i)
            }
            app.modeall = 0;
        }
    },
    toggle(i) {
        if (app.words[i].mode == 0) {
            app.long(i)
        }
        else if (app.words[i].mode == 1) {
            app.meaning(i)
        }
        else if (app.words[i].mode == 2) {
            app.short(i)
        }
    },
    
    clicked(i) {
        app.toggle(i)
    },
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}