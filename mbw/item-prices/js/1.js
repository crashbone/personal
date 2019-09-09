var app = new Vue({
   el: '#main_container',
   created() {
      this.init()
   },
   data: {
      items:[
         {
            names:{
               tr: "Aletler",
               en: "Tools"
            },
            lowest: 330,
            highest: 545,
            imgPath: "tools.png",
            hover: false,
         },
         {
            names:{
               tr: "Keten",
               en: "Linen"
            },
            lowest: 190,
            highest: 340,
            imgPath: "linen.png",
            hover: false,
         },
         {
            names:{
               tr: "İşlenmiş deri",
               en: "Leatherwork"
            },
            lowest: 200,
            highest: 300,
            imgPath: "leatherwork.png",
            hover: false,
         },
         {
            names:{
               tr: "Deri",
               en: "Hides"
            },
            lowest: 85,
            highest: 158,
            imgPath: "hides.png",
            hover: false,
         },
         {
            names:{
               tr: "Pamuk Kumaş",
               en: "Wool Cloth"
            },
            lowest: 132,
            highest: 450,
            imgPath: "wool-cloth.png",
            hover: false,
         },
         {
            names:{
               tr: "Çömlek",
               en: "Pottery"
            },
            lowest: 70,
            highest: 200,
            imgPath: "pottery.png",
            hover: false,
         }
      ],
      flatMin: 125,
      flatMax: 200,
      percentageMin: 20,
      percentageMax: 70,

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
         //ITEM-LOOP
         this.items.forEach(function(item){
            item.flatDif = item.highest - item.lowest
            item.percentageDif = Math.round(Number(item.flatDif / item.lowest)*100)
         })
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
      }


   },
   watch: {

   }
})
