var app = new Vue({
   el: '#main_container',
   beforeCreate() {

   },
   created() {
      this.init()
   },
   data: {
      sortCounter: 0,
      flatSorted: false,
      percentageSorted: false,
      items: [],

      flatMin: 70,
      flatMax: 200,
      percentageMin: 50,
      percentageMax: 100,

      language: "tr",
      dict: {
         // ===============================================================
         // ============================ ITEMS ============================
         // ===============================================================
         "Tools": {
            tr: "Aletler",
         },
         "Linen": {
            tr: "Keten",
         },
         "Leatherwork": {
            tr: "İşlenmiş deri",
         },
         "Hides": {
            tr: "Deri",
         },
         "Wool Cloth": {
            tr: "Pamuk Kumaş",
         },
         "Pottery": {
            tr: "Çömlek",
         },
         "Flax Bundle": {
            tr: "Keten Bohçası",
         },
         "Salt": {
            tr: "Tuz",
         },
         "Oil": {
            tr: "Yağ",
         },
         "Iron":{
            tr: "Demir"
         },
         "Raw Silk":{
            tr: "Ham İpek"
         },
         "Furs":{
            tr: "Kürk"
         },
         "Spice":{
            tr: "Baharat"
         },
         "Dyes":{
            tr: "İplik Boyası"
         },
         "Wool":{
            tr: "Yün"
         },
         "Date Fruit":{
            tr: "Hurma"
         },
         "Wine":{
            tr: "Şarap"
         },
         // ===============================================================
         // ========================== ITEMS END ==========================
         // ===============================================================

         "Profit": {
            tr: "Kazanç"
         },
         "Percentage Profit": {
            tr: "Yüzdesel Kazanç"
         },
         "Pair of values to highlight for flat difference": {
            tr: "Kazancın vurgulanacağı değer aralığı"
         },
         "For percentage difference": {
            tr: "Yüzdesel olan için de ayarlayın"
         },
         "Language": {
            tr: "Dil"
         },
         "Sort by percentage difference": {
            tr: "Yüzdesel kazanca göre sırala"
         },
         "Sort by flat difference": {
            tr: "Kazanca göre sırala"
         },
         "Some useful links": {
            tr: "Bazı yararlı linkler"
         },
         "Min buy": {
            tr: "En uygun alış"
         },
         "Max sell": {
            tr: "En kârlı satış"
         },
         "Buy from": {
            tr: "Al"
         },
         "Sell to": {
            tr: "Sat"
         }
      }
   },

   methods: {
      init() {
         //ITEM-INIT
         this.itemInit()
         //ITEM-LOOP
         this.items.forEach(function(item) {
            item.flatDif = item.highest - item.lowest
            item.percentageDif = Math.round(Number(item.flatDif / item.lowest) * 100)
         })
         this.sortRequest('flat')
         this.sortRequest('flat')
      },
      itemInit() {
         var items = [
            {
               name: "Tools",
               lowest: 380,
               highest: 430,
               imgPath: "tools.png",
            },
            {
               name: "Linen",
               lowest: 220,
               highest: 270,
               lowestTerritories: ["Sargoth"],
               highestTerritories: ["Bariyye"],
               imgPath: "linen.png",
            },
            {
               name: "Leatherwork",
               lowest: 190,
               highest: 240,
               imgPath: "leatherwork.png",
            },
            {
               name: "Hides",
               lowest: 90,
               highest: 130,
               imgPath: "hides.png",
            },
            {
               name: "Wool Cloth",
               lowest: 210,
               highest: 270,
               lowestTerritories: ["Ahmerrad"],
               highestTerritories: ["Dhirim"],
               imgPath: "wool-cloth.png",
            },
            {
               name: "Pottery",
               lowest: 50,
               highest: 130,
               lowestTerritories: ["Sarranid"],
               highestTerritories: ["Yalen"],
               imgPath: "pottery.png",
            },
            {
               name: "Flax Bundle",
               lowest: 110,
               highest: 200,
               highestTerritories: ["Tihr", "Durquba"],
               imgPath: "flax-bundle.png",
            },
            {
               name: "Salt",
               lowest: 120,
               highest: 260,
               lowestTerritories: ["Wercheg", "Tulga"],
               highestTerritories: ["Jelkala"],
               imgPath: "salt.png",
            },
            {
               name: "Oil",
               lowest: 340,
               highest: 470,
               lowestTerritories: ["Suno"],
               highestTerritories: ["Sargoth"],
               imgPath: "oil.png",
            },
            {
               name: "Iron",
               lowest: 180,
               highest: 290,
               lowestTerritories: ["Curaw"],
               highestTerritories: ["Rivacheg", "Khudan", "Wercheg"],
               imgPath: "iron.png",
            },
            {
               name: "Raw Silk",
               lowest: 300,
               highest: 650,
               lowestTerritories: ["Rivacheg", "Vezin"],
               highestTerritories: ["Jelkala"],
               imgPath: "raw-silk.png",
            },
            {
               name: "Furs",
               lowest: 280,
               highest: 400,
               lowestTerritories: ["Rivacheg"],
               highestTerritories: ["Yalen", "Jelkala", "Veluca", "Shariz", "Bariyye"],
               imgPath: "furs.png",
            },
            {
               name: "Spice",
               lowest: 400,
               highest: 950,
               lowestTerritories: ["Tulga", "Khergit"],
               highestTerritories: ["Nord", "Rhodok", "Swadia", "Vaegir"],
               imgPath: "spice.png",
            },
            {
               name: "Dyes",
               lowest: 120,
               highest: 210,
               imgPath: "dyes.png",
            },
            {
               name: "Wool",
               lowest: 85,
               highest: 190,
               lowestTerritories: ["Yalen"],
               highestTerritories: ["Ichamur"],
               imgPath: "wool.png",
            },
            {
               name: "Date Fruit",
               lowest: 70,
               highest: 135,
               lowestTerritories: ["Sarranid"],
               highestTerritories: ["Yalen", "Wercheg"],
               imgPath: "date-fruit.png",
            },
            {
               name: "Wine",
               lowest: 200,
               highest: 290,
               lowestTerritories: ["Veluca"],
               highestTerritories: ["Bariyye"],
               imgPath: "wine.png",
            }
         ]
         this.addItems(items)
      },
      imgFullPath(path) {
         return "./img/" + path;
      },
      flatDifTextClass(flatDif) {
         var number = Number(flatDif)
         return {
            "item-tooltip-text-low": number < this.flatMin,
            "item-tooltip-text-high": number > this.flatMax
         }
      },
      percentageDifTextClass(percentageDif) {
         var number = Number(percentageDif)
         return {
            "item-tooltip-text-low": number < this.percentageMin,
            "item-tooltip-text-high": number > this.percentageMax
         }
      },
      translate(str) {
         if (this.language == "en") return str
         else if (typeof this.dict[str] == 'undefined' || typeof this.dict[str][this.language] == 'undefined') {
            return str
         } else {
            return this.dict[str][this.language]
         }
      },
      addItem(item) {
         item.hover = false
         if (typeof item.highestTerritories == 'undefined') item.highestTerritories = []
         if (typeof item.lowestTerritories == 'undefined') item.lowestTerritories = []
         this.items.push(item)
      },
      addItems(items) {
         items.forEach(this.addItem)
      },
      sortRequest(requestType) {
         if (requestType == "flat") {
            if (this.flatSorted) {
               this.reverse()
            } else {
               this.sortBy("flatDif")
               this.flatSorted = true
               this.percentageSorted = false
            }

         } else if (requestType == "percentage") {
            if (this.percentageSorted) {
               this.reverse()
            } else {
               this.sortBy("percentageDif")
               this.flatSorted = false
               this.percentageSorted = true
            }

         }
         this.sortCounter++
      },
      sortBy(sortBy) {
         for (var i = 0; i < this.items.length; i++) {
            for (var j = 0; j < this.items.length - 1; j++) {
               if (this.items[j][sortBy] > this.items[j + 1][sortBy]) {
                  var temp = this.items[j]
                  this.items[j] = this.items[j + 1]
                  this.items[j + 1] = temp
               }
            }
         }
      },
      reverse() {
         this.items = this.items.reverse()
      },
      territoryClass(territory){
         return {
            rhodok: ["Rhodok", "Jelkala", "Veluca", "Yalen"].includes(territory),
            nord: ["Nord", "Tihr", "Wercheg", "Sargoth"].includes(territory),
            vaegir: ["Vaegir", "Rivacheg", "Curaw", "Khudan", "Reyvadin"].includes(territory),
            swadia: ["Swadia", "Praven", "Uxhal", "Dhirim", "Suno"].includes(territory),
            khergit: ["Khergit", "Halmar", "Tulga", "Ichamur", "Narra"].includes(territory),
            sarranid: ["Sarranid", "Shariz", "Durquba", "Ahmerrad", "Bariyye"].includes(territory)
         }
      },

   },
   watch: {}
})
