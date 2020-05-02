var app = new Vue({
   el: '#main_container',
   data: {
      tekKesisteDropDusmeIhtimali: 0.01,
      bossKesmeSayisi: 80,
      // totaldeDropDusmeIhtimali: 0,
   },
   computed: {
      tekKesisteDropDusmemeIhtimali: function(){
         return 1-this.tekKesisteDropDusmeIhtimali
      },
      totaldeDropDusmeIhtimali: function(){
         return 1-(this.tekKesisteDropDusmemeIhtimali ** this.bossKesmeSayisi)
      }
   },
   methods: {
      hesaplaTotal() {
         this.totaldeDropDusmeIhtimali = 1 - (this.tekKesisteDropDusmemeIhtimali ** this.bossKesmeSayisi)
         console.log(this.tekKesisteDropDusmeIhtimali)
         console.log(this.tekKesisteDropDusmemeIhtimali)
         console.log(this.bossKesmeSayisi)
         console.log(this.totaldeDropDusmeIhtimali)
      }
   },
})
