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
      items:[],

      flatMin: 125,
      flatMax: 200,
      percentageMin: 75,
      percentageMax: 200,

      language: "tr",
      dict: {

         "Tools":{
            tr: "Aletler",
         },
         "Linen":{
            tr: "Keten",
         },
         "Leatherwork":{
            tr: "İşlenmiş deri",
         },

         "Hides":{
            tr: "Deri",
         },

         "Wool Cloth":{
            tr: "Pamuk Kumaş",
         },

         "Pottery":{
            tr: "Çömlek",
         },

         "Flax Bundle":{
            tr: "Keten Bohçası",
         },

         "Salt":{
            tr: "Tuz",
         },

         "Oil":{
            tr: "Yağ",
         },


         "Profit":{
            tr: "Kazanç"
         },
         "Percentage Profit":{
            tr: "Yüzdesel Kazanç"
         },
         "Pair of values to highlight for flat difference":{
            tr: "Kazancın vurgulanacağı değer aralığı"
         },
         "For percentage difference":{
            tr: "Yüzdesel olan için de ayarlayın"
         },
         "Language":{
            tr: "Dil"
         },
         "Sort by percentage difference":{
            tr: "Yüzdesel kazanca göre sırala"
         },
         "Sort by flat difference":{
            tr: "Kazanca göre sırala"
         },






         flatDif: {
            tr: "Kazanç",
            en: "Profit"
         },
         percentageDif: {
            tr: "Yüzdesel Kazanç",
            en: "Percentage Profit",
         },
         flatDifLabel:{
            tr: "Kazancın vurgulanacağı değer aralığı",
            en: "Pair of values to highlight for flat difference"
         },
         percentageDifLabel:{
            tr: "Yüzdesel olan için de ayarlayın",
            en: "For percentage difference"
         },
         language: {
            tr: "Dil",
            en: "Language"
         },
         flatSortLabel:{
            tr: "Kazanca göre sırala",
            en: "Sort by flat difference"
         },
         percentageSortLabel:{
            tr: "Yüzdesel kazanca göre sırala",
            en: "Sort by percentage difference"
         }
      }
   },

   methods: {
      init(){
         //ITEM-INIT
         this.itemInit()
         //ITEM-LOOP
         this.items.forEach(function(item){
            item.flatDif = item.highest - item.lowest
            item.percentageDif = Math.round(Number(item.flatDif / item.lowest)*100)
         })
         this.sortRequest('flat')
         this.sortRequest('flat')
      },
      itemInit(){
         var items = [
            {
               name: "Tools",
               lowest: 330,
               highest: 545,
               imgPath: "tools.png",
            },
            {
               name: "Linen",
               lowest: 190,
               highest: 340,
               imgPath: "linen.png",
            },
            {
               name: "Leatherwork",
               lowest: 200,
               highest: 300,
               imgPath: "leatherwork.png",
            },
            {
               name: "Hides",
               lowest: 85,
               highest: 158,
               imgPath: "hides.png",
            },
            {
               name: "Wool Cloth",
               lowest: 132,
               highest: 450,
               imgPath: "wool-cloth.png",
            },
            {
               name: "Pottery",
               lowest: 70,
               highest: 200,
               imgPath: "pottery.png",
            },
            {
               name: "Flax Bundle",
               lowest: 33,
               highest: 300,
               imgPath: "flax-bundle.png",
            },
            {
               name: "Salt",
               lowest: 50,
               highest: 280,
               imgPath: "salt.png",
            },
            {
               name: "Oil",
               lowest: 300,
               highest: 550,
               imgPath: "oil.png",
            }
         ]
         this.addItems(items)
      },
      imgFullPath(path){
         return "./img/" + path;
      },
      flatDifTextClass(flatDif){
         var number = Number(flatDif)
         return {
            "item-tooltip-text-low": number < this.flatMin,
            "item-tooltip-text-high": number > this.flatMax
         }
      },
      percentageDifTextClass(percentageDif){
         var number = Number(percentageDif)
         return {
            "item-tooltip-text-low": number < this.percentageMin,
            "item-tooltip-text-high": number > this.percentageMax
         }
      },
      getString(list){
         return list[this.language]
      },
      translate(str){
         if(this.language=="en") return str
         else if(typeof this.dict[str] == 'undefined' || typeof this.dict[str][this.language] == 'undefined'){
            return str
         }
         else{
            return this.dict[str][this.language]
         }
      },
      addItem(item){
         item.hover = false
         this.items.push(item)
      },
      addItems(items){
         items.forEach(this.addItem)
      },
      sortRequest(requestType){
         if(requestType == "flat"){
            if(this.flatSorted){
               this.reverse()
            }
            else{
               this.sortBy("flatDif")
               this.flatSorted = true
               this.percentageSorted = false
            }

         }
         else if(requestType == "percentage"){
            if(this.percentageSorted){
               this.reverse()
            }
            else{
               this.sortBy("percentageDif")
               this.flatSorted = false
               this.percentageSorted = true
            }

         }
         this.sortCounter++
      },
      sortBy(sortBy){
         for(var i=0; i<this.items.length; i++){
            for(var j=0; j<this.items.length-1; j++){
               if(this.items[j][sortBy] > this.items[j+1][sortBy]){
                  var temp = this.items[j]
                  this.items[j] = this.items[j+1]
                  this.items[j+1] = temp
               }
            }
         }
      },
      reverse(){
         this.items = this.items.reverse()
      }

   },
   watch: {
   }
})
