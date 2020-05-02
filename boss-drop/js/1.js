var app = new Vue({
   el: '#main_container',
   data: {
      tekKesisteDropDusmeIhtimali: 0.01,
      bossKesmeSayisi: 80,
      tamOlarakXTaneDussun: 1,
      // totaldeDropDusmeIhtimali: 0,
   },
   computed: {
      tekKesisteDropDusmemeIhtimali: function(){
         return 1-this.tekKesisteDropDusmeIhtimali
      },
      totaldeEnAz1KereDropDusmeIhtimali: function(){
         return 1-(this.tekKesisteDropDusmemeIhtimali ** this.bossKesmeSayisi)
      },
      sadeceXKezDusmeIhtimali: function(){
         return (this.tekKesisteDropDusmeIhtimali**this.tamOlarakXTaneDussun)*(this.tekKesisteDropDusmemeIhtimali**(this.bossKesmeSayisi-this.tamOlarakXTaneDussun))*this.kombinasyon(this.bossKesmeSayisi, this.tamOlarakXTaneDussun)
      },
   },
   methods: {
      hesaplaTotal() {
         this.totaldeDropDusmeIhtimali = 1 - (this.tekKesisteDropDusmemeIhtimali ** this.bossKesmeSayisi)
         console.log(this.tekKesisteDropDusmeIhtimali)
         console.log(this.tekKesisteDropDusmemeIhtimali)
         console.log(this.bossKesmeSayisi)
         console.log(this.totaldeDropDusmeIhtimali)
      },
      kombinasyon(x,y){
         let pay = 1;
         let payda = 1;
         for(let i = 0; i<y; i++){
            pay*=x-i
            payda*=y-i
         }
         return  pay/payda
      }
   },
})
