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
         /* this.sortRequest('flat')
         this.sortRequest('flat') */
      },
      /* itemInit() {
         var items = [
            {
               name: "Tools",
               lowest: 380,
               highest: 430,
               imgPath: "tools",
            },
            {
               name: "Linen",
               lowest: 220,
               highest: 270,
               lowestTerritories: ["Sargoth"],
               highestTerritories: ["Bariyye"],
               imgPath: "linen",
            },
            {
               name: "Leatherwork",
               lowest: 190,
               highest: 240,
               imgPath: "leatherwork",
            },
            {
               name: "Hides",
               lowest: 90,
               highest: 130,
               imgPath: "hides",
            },
            {
               name: "Wool Cloth",
               lowest: 210,
               highest: 270,
               lowestTerritories: ["Ahmerrad"],
               highestTerritories: ["Dhirim"],
               imgPath: "wool-cloth",
            },
            {
               name: "Pottery",
               lowest: 50,
               highest: 130,
               lowestTerritories: ["Sarranid"],
               highestTerritories: ["Yalen"],
               imgPath: "pottery",
            },
            {
               name: "Flax Bundle",
               lowest: 110,
               highest: 200,
               highestTerritories: ["Tihr", "Durquba"],
               imgPath: "flax-bundle",
            },
            {
               name: "Salt",
               lowest: 120,
               highest: 260,
               lowestTerritories: ["Wercheg", "Tulga"],
               highestTerritories: ["Jelkala"],
               imgPath: "salt",
            },
            {
               name: "Oil",
               lowest: 340,
               highest: 470,
               lowestTerritories: ["Suno"],
               highestTerritories: ["Sargoth"],
               imgPath: "oil",
            },
            {
               name: "Iron",
               lowest: 180,
               highest: 290,
               lowestTerritories: ["Curaw"],
               highestTerritories: ["Rivacheg", "Khudan", "Wercheg"],
               imgPath: "iron",
            },
            {
               name: "Raw Silk",
               lowest: 300,
               highest: 650,
               lowestTerritories: ["Rivacheg", "Vezin"],
               highestTerritories: ["Jelkala"],
               imgPath: "raw-silk",
            },
            {
               name: "Furs",
               lowest: 280,
               highest: 400,
               lowestTerritories: ["Rivacheg"],
               highestTerritories: ["Yalen", "Jelkala", "Veluca", "Shariz", "Bariyye"],
               imgPath: "furs",
            },
            {
               name: "Spice",
               lowest: 400,
               highest: 950,
               lowestTerritories: ["Tulga", "Khergit"],
               highestTerritories: ["Nord", "Rhodok", "Swadia", "Vaegir"],
               imgPath: "spice",
            },
            {
               name: "Dyes",
               lowest: 120,
               highest: 210,
               imgPath: "dyes",
            },
            {
               name: "Wool",
               lowest: 85,
               highest: 190,
               lowestTerritories: ["Yalen"],
               highestTerritories: ["Ichamur"],
               imgPath: "wool",
            },
            {
               name: "Date Fruit",
               lowest: 70,
               highest: 135,
               lowestTerritories: ["Sarranid"],
               highestTerritories: ["Yalen", "Wercheg"],
               imgPath: "date-fruit",
            },
            {
               name: "Wine",
               lowest: 200,
               highest: 290,
               lowestTerritories: ["Veluca"],
               highestTerritories: ["Bariyye"],
               imgPath: "wine",
            }
         ]
         this.addItems(items)
      }, */
      itemInit() {
         const scopes = [
            { name: "1x/4x Scope", imgPath: "1-1x-4x-scope", bigImgCount: 4 },
            { name: "1x/6x Sight", imgPath: "2-1x-6x-sight", bigImgCount: 4 },
            { name: "2x Scope", imgPath: "3-2x", bigImgCount: 2 },
            { name: "30mm + 1x/6x Scope", imgPath: "4-30mm-1x-6x-scope", bigImgCount: 4 },
            { name: "30mm + 2x/7x Scope", imgPath: "5-30mm-2x-7x-scope", bigImgCount: 4 },
            { name: "3x Scope", imgPath: "6-3x-scope", bigImgCount: 2 },
            { name: "3x Holo", imgPath: "7-3x-holo", bigImgCount: 2 },
            { name: "4x Holographic Triangle", imgPath: "8-4x-holographic-triangle", bigImgCount: 2 },
            { name: "533 Holographic", imgPath: "9-533-holographic" },
            { name: "EKP-8-18 Reflex", imgPath: "10-ekp-8-18-reflex" },
            { name: "Classic Holo", imgPath: "11-classic-holo" },
            { name: "Compact Universal + 3.5x Scope", imgPath: "12-compact-universal-3.5x-scope", bigImgCount: 2 },
            { name: "Compact Universal + 4x Scope", imgPath: "13-compact-universal-4x-scope", bigImgCount: 2 },
            { name: "Compact Sight Bottom Rail + Compact Reflex", imgPath: "14-compact-sight-bottom-rail-compact-reflex", bigImgCount: 2 },
            { name: "Mini Red Dot Rail + Classic Red Dot Reflex", imgPath: "15-mini-red-dot-rail-classic-red-dot-reflex", bigImgCount: 2 },
            { name: "PK-06 Reflex", imgPath: "16-pk-06-reflex" },
            { name: "PZ3 Thermal", imgPath: "17-pz3-thermal", bigImgCount: 2 },
            { name: "Simple Red Dot", imgPath: "18-simple-red-dot" },
            { name: "Triangle Precision", imgPath: "19-triangle-precision" },
            
            // { name: "EKP-8-02 Reflex", imgPath: "1-ekp-8-02-reflex" },
            // { name: "OKP-7 Reflex", imgPath: "2-okp-7-reflex" },
            // { name: "Classic Red Dot Reflex", imgPath: "4-classic-red-dot-reflex" },
            // { name: "3.5x AK Scope", imgPath: "5-3.5x-ak-scope" },
            // { name: "F200 1.6 Optical", imgPath: "6-f200-1.6-optical" },
            // { name: "Full Vision Triangle Reflex", imgPath: "7-full-vision-triangle-reflex" },
            
            // { name: "Compact Reflex", imgPath: "9-compact-reflex" },
            // { name: "Mosin Dedicated 3.5x", imgPath: "10-mosin-dedicated-3.5x" },
            
            // { name: "PSO 4x", imgPath: "12-pso-4x" },
            // { name: "Triangle Precision", imgPath: "13-triangle-precision" },
            // { name: "Simple Red Dot", imgPath: "14-simple-red-dot" },
            // { name: "4x Scope", imgPath: "16-4x-scope" },
            // { name: "1x/6x Scope", imgPath: "17-1x-6x-scope", bigImgCount: 2 },
            // { name: "1x/4x Scope", imgPath: "18-1x-4x-scope", bigImgCount: 2 },
            // { name: "2x/7x Scope", imgPath: "19-2x-7x" },
            // { name: "4x/16x Scope", imgPath: "20-4x-16x", bigImgCount: 2 },
            // { name: "6.5x-20x Scope", imgPath: "21-6.5x-20x", bigImgCount: 2 },
            // { name: "2x Tactical", imgPath: "22-2x-tactical" },
            // { name: "3.5x Scope", imgPath: "24-3.5x-scope" },
            
            // { name: "3x", imgPath: "26-3x" },
            // { name: "PS320 1x-6x", imgPath: "27-ps320-1x-6x", bigImgCount: 2 },
            
         ];
      
         this.items = scopes.map((scope, index) => ({
            id: index + 1,
            name: scope.name,
            lowest: 100,
            highest: 1000,
            lowestTerritories: ["Tulga"],
            highestTerritories: ["Ichamur"],
            imgPath: scope.imgPath,
            bigImgCount: scope.bigImgCount || 1,
            hover: -1,
         }));
      },
      imgSmallPath(path) {
         return "./img/small/" + path + ".jpg";
      },
      imgBigPath(path, n) {
         return "./img/big/" + path + "-" + n + ".jpg";
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
      openInNewTab(url) {
         window.open(url, '_blank');
      },

   },
   watch: {}
})
