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
               names:{
                  tr: "Aletler",
                  en: "Tools"
               },
               lowest: 330,
               highest: 545,
               imgPath: "tools.png",
            },
            {
               names:{
                  tr: "Keten",
                  en: "Linen"
               },
               lowest: 190,
               highest: 340,
               imgPath: "linen.png",
            },
            {
               names:{
                  tr: "İşlenmiş deri",
                  en: "Leatherwork"
               },
               lowest: 200,
               highest: 300,
               imgPath: "leatherwork.png",
            },
            {
               names:{
                  tr: "Deri",
                  en: "Hides"
               },
               lowest: 85,
               highest: 158,
               imgPath: "hides.png",
            },
            {
               names:{
                  tr: "Pamuk Kumaş",
                  en: "Wool Cloth"
               },
               lowest: 132,
               highest: 450,
               imgPath: "wool-cloth.png",
            },
            {
               names:{
                  tr: "Çömlek",
                  en: "Pottery"
               },
               lowest: 70,
               highest: 200,
               imgPath: "pottery.png",
            },
            {
               names:{
                  tr: "Keten Bohçası",
                  en: "Flax Bundle"
               },
               lowest: 33,
               highest: 300,
               imgPath: "flax-bundle.png",
            },
            {
               names:{
                  tr: "Tuz",
                  en: "Salt"
               },
               lowest: 50,
               highest: 280,
               imgPath: "salt.png",
            },
            {
               names:{
                  tr: "Yağ",
                  en: "Oil"
               },
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
         console.log(this.items)
         for(var i=0; i<this.items.length; i++){
            for(var j=0; j<this.items.length-1; j++){
               console.log(i + " " + j)
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
