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
      items2: [], // filtered
      search: "",

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
         "Iron": {
            tr: "Demir"
         },
         "Raw Silk": {
            tr: "Ham İpek"
         },
         "Furs": {
            tr: "Kürk"
         },
         "Spice": {
            tr: "Baharat"
         },
         "Dyes": {
            tr: "İplik Boyası"
         },
         "Wool": {
            tr: "Yün"
         },
         "Date Fruit": {
            tr: "Hurma"
         },
         "Wine": {
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
         this.items.forEach(function (item) {
            item.flatDif = item.highest - item.lowest
            item.percentageDif = Math.round(Number(item.flatDif / item.lowest) * 100)
         })
         /* this.sortRequest('flat')
         this.sortRequest('flat') */
      },
      itemInit() {
         const scopes = [
            { name: "MINI-FLEX-1.00X", imgPath: "1-MINI-FLEX-1_00X.png" },
            { name: "R-MR-1.00X", imgPath: "2-R-MR-1_00X.png" },
            { name: "OSA-7-1.00X", imgPath: "3-OSA-7-1_00X.png" },
            { name: "CQ-RDS-1.25X", imgPath: "4-CQ-RDS-1_25X.png" },
            { name: "RO-S-1.25X", imgPath: "5-RO-S-1_25X.png" },
            { name: "2-PRO-1.25X", imgPath: "6-2-PRO-1_25X.png" },
            { name: "ROX-1.50X", imgPath: "7-ROX-1_50X.png" },
            { name: "SU-231-1.50X", imgPath: "8-SU-231-1_50X.png" },
            { name: "1P87-1.50X", imgPath: "9-1P87-1_50X.png" },
            { name: "A-P2-1.75X", imgPath: "10-A-P2-1_75X.png" },
            { name: "RO-M-1.75X", imgPath: "11-RO-M-1_75X.png" },
            { name: "3VZR-1.75X", imgPath: "12-3VZR-1_75X.png" },
            { name: "CCO-2.00X", imgPath: "13-CCO-2_00X.png" },
            { name: "R4T-2.00X", imgPath: "14-R4T-2_00X.png" },
            { name: "BF-2M-2.50X", imgPath: "15-BF-2M-2_50X.png" },
            { name: "BAKER-3.00X", imgPath: "16-BAKER-3_00X.png" },
            { name: "SDO-3.50X", imgPath: "17-SDO-3_50X.png" },
            { name: "PVQ-31-4.00X", imgPath: "18-PVQ-31-4_00X.png" },
            { name: "LDS-4.50X", imgPath: "19-LDS-4_50X.png" },
            { name: "SD-PRISIM-5.00X", imgPath: "20-SD-PRISIM-5_00X.png" },
            { name: "SF-G2-5.00X", imgPath: "21-SF-G2-5_00X.png" },
            { name: "NGFC-LPVO-VAR1-5X", imgPath: "22-NGFC-LPVO-VAR1-5X.png" },
            { name: "GRIM-1.50X", imgPath: "23-GRIM-1_50X.png" },
            { name: "PAS-35-3.00X", imgPath: "24-PAS-35-3_00X.png" }
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

         this.filterItems();
      },
      imgSmallPath(path) {
         path = 'placeholder' // no implementation yet
         return "./img/small/" + path + ".png";
      },
      imgBigPath(path, n) {
         // return "./img/big/" + path + "-" + n + ".png"; no multi image
         return "./img/big/" + path;
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
      territoryClass(territory) {
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
      filterItems() {
         console.log(this.search)
         if (this.search.length === 0 || this.search === "🔍") {
            this.items2 = this.items;
            return;
         }
         // normalize: küçük harf, özel karakterleri kaldır
         const normalize = str => str.toLowerCase().replace(/[^a-z0-9]/gi, '');
         const searchNorm = normalize(this.search);



         // items2 oluştur
         this.items2 = this.items.filter(item => {
            const nameNorm = normalize(item.name);
            return nameNorm.includes(searchNorm);
         });
      }


   },
   mounted() {
      // Sayfa yüklendiğinde input'a focus ver
      this.$refs.searchEl.focus();
   },
   watch: {}
})
