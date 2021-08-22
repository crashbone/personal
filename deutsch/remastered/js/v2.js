// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
Array.prototype.remove = function(value) {
   const index = array.indexOf(value);
   if (index > -1) {
      array.splice(index, 1);
   }
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.removeIndex = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

String.prototype.copy = function(message=false) {
   let clipboard = document.getElementById("clipboard");
   if (!clipboard) {
      clipboard = document.createElement('textarea');
      clipboard.id = "clipboard";
      clipboard.style.display = "none";
      document.body.appendChild(clipboard);
   }
   clipboard.innerHTML = this;
   clipboard.select();
   const copy = document.execCommand('copy');
   alert("copied")
   return copy
}

var app = new Vue({
   el: '#main_container',
   created() {
      this.init()
   },
   mounted() {
      window.onresize = () => {
         this.windowWidth = window.innerWidth
      }
   },
   data: {
      ARTIKELS: ["der", "die", "das"],
      randomizeCounter: 0,
      notification: "",

      // ============================================
      // =============== DEBUG_MODE =================
      // ============================================
      debugEnabled: window.location.href.includes("file:"),

      version: "desktop",
      submitted: false,
      hideInputDiv: false,
      toggleInputButtonText: "",
      wordLimit: "0",
      textarea: "der	Sachen	Stuff\ndie	Anrede	hitap\nfluchen	küfretmek\nhereinlegen    bamboozle",
      words: [],
      modeall: 0,
      showMarked: false,

      links: [],
      windowWidth: window.innerWidth,

      splitter: ["\t", "    "], // ["\t", "::", "//", "--", "__"],
   },
   computed: {
      wordCol() {
         if (this.windowWidth < 500) {
            return 12
         }
         if (this.windowWidth < 1000) {
            return 6
         }
         if (this.windowWidth < 1500) {
            return 4
         }
         return 3
      }
   },

   methods: {
      init() {
         this.initTextArea();
         this.initLinks();
         window.alert = this.showNotification;
      },
      initTextArea() {
         this.textarea = (this.debugEnabled) ? this.textarea : util.readFileFromServer('/personal/deutsch/mylistutf.txt')
      },
      initLinks() {
         const dbLinks = this.getLocalStorage().links;
         if (dbLinks)
            this.links = this.getDBVersion("links", dbLinks, false);
      },
      submit() {
         this.resetWords()
         this.toggleInputDiv()
         this.setupWords()
         this.randomize()
         this.limitWord()
         this.submitted = true;
         // console.log(this.words)
      },

      randomize() {
         this.randomizeCounter++
         var a = this.words

         for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
         }

         return a;


      },
      resetWords() {
         this.words = []
      },
      toggleInputDiv() {
         this.toggleInputButtonText = (this.hideInputDiv) ? "Hide Input Field" : "Show Input Field"
         this.hideInputDiv = !this.hideInputDiv
      },
      setupWords() {
         //whole textarea input splitted into array using "\n"
         var allWordsArray = this.textarea.split("\n")


         allWordsArray.forEach(line => {
            var lineArray = util.splitLibrary.splitString(line, this.splitter)
            if (lineArray.length === 1 && line.length < 3) {
               return;
            }

            //If first section of the line is artikel
            if (this.ARTIKELS.includes(lineArray[0])) { //first tab is artikel
               var theWord = {
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
               var theWord = {
                  hasArtikel: false,
                  meaning: "",
                  word: lineArray[0],
                  context: lineArray[0],
                  mode: 0,
                  marker: false
               }
               if (lineArray[1]) theWord.meaning = lineArray[1]
            }
            this.words.push(theWord)
         });
      },
      limitWord(){
         if (this.wordLimit != "0"){
            var limit = (Number(this.wordLimit) > this.words.length) ? this.words.length : Number(this.wordLimit)
            this.words = this.words.slice(0, limit)
         }
      },

      // Add der, die, das to word's classlist
      wordClass(word) {
         return {
            der: word.artikel == "der",
            die: word.artikel == "die",
            das: word.artikel == "das",
            marked: word.marker
         }
      },
      markerClass(word) {
         return {
            active: word.marker
         }
      },

      wordDblClick(i) {
         if (this.version == "desktop") this.toggleWord(i)
      },
      wordClick(i) {
         if (this.version == "mobile") this.toggleWord(i)
      },
      meaning(i) {
         if (this.words[i].meaning) {
            this.words[i].context = this.words[i].meaning
            this.words[i].mode = 2
         } else {
            this.short(i)
         }
      },
      long(i) {
         if (this.words[i].hasArtikel) {
            this.words[i].context = this.words[i].artikel + " " + this.words[i].word + " > " + this.words[i].meaning
            this.words[i].mode = 1
         } else {
            this.words[i].context = this.words[i].word + " > " + this.words[i].meaning
            this.words[i].mode = 1
         }
      },
      short(i) {
         if (this.words[i].hasArtikel) {
            this.words[i].context = this.words[i].word
            this.words[i].mode = 0;
         } else {
            this.words[i].context = this.words[i].word
            this.words[i].mode = 0;
         }
      },
      toggleAll() {
         if (this.modeall == 0) {
            for (var i = 0; i < this.words.length; i++) {
               this.long(i)
            }
            this.modeall = 1;
         } else if (this.modeall == 1) {
            for (var i = 0; i < this.words.length; i++) {
               this.meaning(i)
            }
            this.modeall = 2;
         } else if (this.modeall == 2) {
            for (var i = 0; i < this.words.length; i++) {
               this.short(i)
            }
            this.modeall = 0;
         }
      },
      toggleWord(i) {
         if (this.words[i].mode == 0) {
            this.long(i)
         } else if (this.words[i].mode == 1) {
            this.meaning(i)
         } else if (this.words[i].mode == 2) {
            this.short(i)
         }
      },
      markerClick(i) {
         this.toggleMarker(i)
      },
      toggleMarker(i) {
         this.words[i].marker = !this.words[i].marker
      },
      showMarkedClick(){
         this.showMarked = !this.showMarked;
         if(!this.showMarked) return

         let input = document.querySelector("#marked")
         var string = ""
         this.words.forEach(function(word, index){
            if(word.marker){
               string+= (string == "" ? "" : "\n") + ((word.artikel) ? (word.artikel + "\t") : "") + word.word + "\t" + word.meaning
            }
         })
         input.value = string;
         string.copy();
      },
      getDBVersion(id, obj, to=true) {
         if(id === "links") {
            if (to) {
               const dbLinks = [];
               obj.forEach(link => {
                  const dbLink = {
                     url: link.url,
                  }
                  dbLinks.push(dbLink);
               })
               return dbLinks;
            } else {
               const newLinks = [];
               obj.forEach(dblink => {
                  const newLink = {
                     url: dblink.url,
                     editMode: false,
                  }
                  newLinks.push(newLink);
               })
               return newLinks;
            }
         }
      },
      onNewLink() {
         this.links.push({editMode: false, url: ""});
         this.storeLocal("links", this.getDBVersion("links", this.links))
      },
      onLinkEdit(index) {
         this.links[index].editMode = !this.links[index].editMode
         this.storeLocal("links", this.getDBVersion("links", this.links))
      },
      onLinkRemove(index) {
         this.links.removeIndex(index);
         this.storeLocal("links", this.getDBVersion("links", this.links))
      },
      storeLocal(key, obj) {
         const deutschv2 = this.getLocalStorage();
         deutschv2[key] = obj;
         window.localStorage.setItem("deutschv2",  JSON.stringify(deutschv2))
      },
      getLocalStorage() {
         try {
            return JSON.parse(window.localStorage.getItem('deutschv2')) ?? {};
         } catch (e) {
            console.log("json parse failed")
            return {};
         }
      },
      showNotification(text) {
         if (!this.notification) {
            this.notification = text;
            setTimeout(() => this.notification = "", 1000);
         }
      }
   }
})
