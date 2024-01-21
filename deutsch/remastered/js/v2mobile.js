// https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
Array.prototype.remove = function (value) {
   const index = array.indexOf(value);
   if (index > -1) {
      array.splice(index, 1);
   }
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.removeIndex = function (from, to) {
   var rest = this.slice((to || from) + 1 || this.length);
   this.length = from < 0 ? this.length + from : from;
   return this.push.apply(this, rest);
};

String.prototype.copy = function (message = false) {
   let clipboard = document.getElementById("clipboard");
   if (!clipboard) {
      clipboard = document.createElement('textarea');
      clipboard.id = "clipboard";
      clipboard.style.position = "absolute";
      clipboard.style.opacity = "-1";
      clipboard.style.zIndex = "-1";
      clipboard.setAttribute("readonly", "readonly");
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
      wordsModel: window.okanDE.WordManager.instance.model,
      showMarked: false,

      links: [],
      windowWidth: window.innerWidth,

      dragging: false,
      dragStartEvent: undefined,
      hasTouchedBefore: false,
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
         this.textarea = (this.debugEnabled) ? this.textarea : window.okanDE.util.readFileFromServer('/personal/deutsch/mylistutf.txt')
      },
      initLinks() {
         const dbLinks = this.getLocalStorage().links;
         if (dbLinks)
            this.links = this.getDBVersion("links", dbLinks, false);
      },
      submit() {
         this.resetWords()
         this.toggleInputDiv()
         window.okanDE.WordManager.instance.setupWords(this.textarea)
         this.shuffle()
         this.limitWord()
         this.submitted = true;
      },

      shuffle() {
         this.randomizeCounter++
         window.okanDE.WordManager.instance.shuffle();
      },
      resetWords() {
         this.wordsModel.words = []
      },
      toggleInputDiv() {
         this.toggleInputButtonText = (this.hideInputDiv) ? "Hide Input Field" : "Show Input Field"
         this.hideInputDiv = !this.hideInputDiv
      },
      limitWord() {
         if (this.wordLimit != "0") {
            var limit = (Number(this.wordLimit) > this.wordsModel.words.length) ? this.wordsModel.words.length : Number(this.wordLimit)
            this.wordsModel.words = this.wordsModel.words.slice(0, limit)
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

      wordClick(i) {
         if (!this.dragging) {
            this.toggleWord(i)
         }
      },
      toggleAll() {
         window.okanDE.WordManager.instance.nextMode();
      },
      toggleWord(i) {
         window.okanDE.WordManager.instance.nextMode(i)
      },
      markerClick(i) {
         this.toggleMarker(i)
      },
      toggleMarker(i) {
         this.wordsModel.words[i].marker = !this.wordsModel.words[i].marker
      },
      showMarkedClick() {
         this.showMarked = !this.showMarked;
         if (!this.showMarked) return

         let input = document.querySelector("#marked")
         var string = ""
         this.wordsModel.words.forEach(function (word, index) {
            if (word.marker) {
               string += (string == "" ? "" : "\n") + ((word.artikel) ? (word.artikel + "\t") : "") + word.word + "\t" + word.meaning
            }
         })
         input.value = string;
         string.copy();
      },
      copyAll() {
         this.textarea.copy();
      },
      copyMarked() {
         let markedWordsString = "";
         this.wordsModel.words.forEach(word => {
            markedWordsString += (word.marker) ? ((word.artikel) ? (word.artikel + "\t") : "") + word.word + "\t" + word.meaning + "\n" : "";
         })
         markedWordsString.copy();
      },
      getDBVersion(id, obj, to = true) {
         if (id === "links") {
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
         this.links.push({ editMode: false, url: "" });
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
         window.localStorage.setItem("deutschv2", JSON.stringify(deutschv2))
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
      },
      touch(action, event, i) {
         if (event?.touches?.length > 0) {
            this.hasTouchedBefore = true;
         }
         // skip mouse events if touch events have been fired before
         if (event.type.includes('mouse') && this.hasTouchedBefore) {
            return;
         }

         const dragStartEventX = this.dragStartEvent?.screenX ?? this.dragStartEvent?.touches[0].screenX;
         const dragStartEventY = this.dragStartEvent?.screenY ?? this.dragStartEvent?.touches[0].screenY;
         const eventX = event.screenX ?? event.touches?.[0]?.screenX ?? this.lastDragMoveEvent?.screenX ?? this.lastDragMoveEvent?.touches?.[0]?.screenX ?? dragStartEventX;
         const eventY = event.screenY ?? event.touches?.[0]?.screenY ?? this.lastDragMoveEvent?.screenY ?? this.lastDragMoveEvent?.touches?.[0]?.screenY ?? dragStartEventY;
         const x = (action === 'start' || !this.dragStartEvent) ? 0 : eventX - dragStartEventX;
         const y = (action === 'start' || !this.dragStartEvent) ? 0 : eventY - dragStartEventY;
         if (action === 'start') {
            this.dragging = true;
            event.date = Date.now();
            this.dragStartEvent = event;
            event.customIndex = i;
            this.swipe(action, x, y, this.dragStartEvent.target, i);
         }
         if (action === 'move') {
            if (this.dragging) {
               this.lastDragMoveEvent = event;
               this.swipe(action, x, y, this.dragStartEvent.target, this.dragStartEvent.customIndex);
            }
         }
         if (action === 'end') {
            if (!this.dragStartEvent) {
               // already ended
               return;
            }
            this.dragging = false;
            this.swipe(action, x, y, this.dragStartEvent.target, this.dragStartEvent.customIndex);
            this.dragStartEvent = undefined;
            this.lastDragMoveEvent = undefined;
         }
      },
      swipe(action, x, y, target, i) {
         if(!!this.lastDragMoveEvent) {
            // debugger;
         }
         console.log(x, y)
         const slideableArea = target.querySelector('.slideable_area')
         if (action === 'start') {
            slideableArea.classList.add('animating')
         }
         if (action === 'move') {
            if (!slideableArea) {
               console.log('swipe failed');
               return;
            }
            // todo: only for debugging
            const e = this.lastDragMoveEvent;
            const t = e?.touches?.[0];
            // this.notification = x;
            this.notification = `layer: (${e.layerX},${e.layerY})<br>page: (${e.pageX},${e.pageY})<br>client: (${e.clientX},${e.clientY})<br>screen: (${e.screenX},${e.screenY})<br>touches: (${t?.pageX},${t?.pageY})<br>touches client: (${t?.clientX},${t?.clientY})<br>touches screen: (${t?.screenX},${t?.screenY})`;
            // swiping X
            if (this.isAHorizontalSwipe(x, y)) {
               slideableArea.classList.add('animating')
               slideableArea.style.width = `${-x}px`;
            }
            // swiping Y
            else {
               slideableArea.classList.remove('animating')
               slideableArea.style.width = 0;
            }
         }
         if (action === 'end') {
            slideableArea.style.width = 0;
            slideableArea.classList.remove('animating')
            if (x <= -100) {
               if (!this.isAHorizontalSwipe(x, y)) {
                  return;
               }
               this.swipedX(x, target, i);
            } else if (x >= 100) {
               // nothing
            } else {
               // click only if not pressed long

               if (this.isAHorizontalSwipe(x, y) && (Date.now() - this.dragStartEvent.date < 350)) {
                  this.wordClick(i);
               }
            }
         }
      },
      swipedX(x, target, i) {
         this.toggleMarker(i);
      },
      isAHorizontalSwipe(x, y) {
         const limit = 35
         return !(y <= -limit || y >= limit);
      }
   }
})
