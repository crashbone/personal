var app = new Vue({
   el: '#app_container',
   beforeCreate() {

   },
   created() {
      this.init()
   },
   data: {
      yuvarlakMasadakiInsanlar: [],
      insanSayisi: 100,
      yaricap: 400,
      containerStyle: {},
      masaStyle: {},
      hiz: 100,
      konsol: "",

      gizlemeLimiti: 100,
      gizlemeCarpani: 10,

      yasayanKisiSayisiAz: false
   },

   methods: {
      init() {
         this.yasayanKisiSayisi = this.insanSayisi
         this.konsol = ""

         this.dereceCarpani = 360 / this.insanSayisi
         this.gizlemeLimitiniAyarla()
         this.containerStiliniOlustur()
         this.masaStiliniOlustur()
         this.kisileriOlustur()

      },
      containerStiliniOlustur(){
         var a = (this.yaricap*2) + "px"
         this.containerStyle = {
            width: a,
            height: a
         }
      },
      masaStiliniOlustur(){
         this.masaStyle = {
            width: "calc(" + this.yaricap*2 + "px - 5rem)",
            height: "calc(" + this.yaricap*2 + "px - 5rem)",
         }
      },
      kisileriOlustur(){
         this.yuvarlakMasadakiInsanlar = []
         for(var i=0; i<this.insanSayisi; i++) {
            var x, y, derece

            derece = i*this.dereceCarpani
            x = Math.cos(this.toRadian(derece)) * this.yaricap + this.yaricap
            y = Math.sin(this.toRadian(derece)) * this.yaricap + this.yaricap

            this.yuvarlakMasadakiInsanlar.push({
               devreDisi: false,
               style: {
                  left: x + "px",
                  top: y + "px",
               }
            })
         }
      },

      kisiClass(index){
         return {
            "devre-disi": this.yuvarlakMasadakiInsanlar[index].devreDisi,
            "gizle": (((index % this.gizlemeCarpani) != 0) && !this.yasayanKisiSayisiAz)
         }
      },
      toRadian(degree){
         return degree * Math.PI / 180
      },
      baslatButonu(event){
         this.baslat(0)
      },
      baslat(i){
         this.konsolaYaz("Yasayan kisi sayisi: " + this.yasayanKisiSayisi)
         if(this.yasayanKisiSayisi <= 1) {
            this.konsolaYaz("\n================================\n=============BİTTİ!=============\n================================")
            return
         }
         else{
            var oldurulecekIndex = this.sonrakiYasayanIndex(i)
            this.konsolaYaz((i+1) + ", " + (oldurulecekIndex+1) + " numarali kisiyi oldurecek!")
            this.oldur(oldurulecekIndex)
            this.konsolaYaz((i+1) + ", " + (oldurulecekIndex+1) + " numarali kisiyi oldurdu!")

            var sirasiGelenIndex = this.sonrakiYasayanIndex(i)
            this.konsolaYaz("Sira " + (sirasiGelenIndex+1) + " numaralı kiside!")

            if(this.yasayanKisiSayisiAz){
               var localHiz = this.hiz
               if((this.insanSayisi - this.yasayanKisiSayisi) < 5) localHiz = 7.5*1000/this.hiz
               else if((this.insanSayisi - this.yasayanKisiSayisi) < 5) localHiz = 5*1000/this.hiz
               setTimeout(()=>{this.baslat(sirasiGelenIndex)}, localHiz)
            }
            else{
               this.baslat(sirasiGelenIndex)
            }

            //
         }
      },
      reset(){
         this.init()
      },
      sonrakiYasayanIndex(suanki){
         var sayac = suanki
         for(var i=0; i<this.insanSayisi; i++){
            sayac = (sayac+1) % this.insanSayisi
            if(!this.yuvarlakMasadakiInsanlar[sayac].devreDisi) return sayac
         }
      },
      konsolaYaz(msg){
         this.konsol += "\n"+msg
      },
      oldur(index){
         this.yuvarlakMasadakiInsanlar[index].devreDisi = true
         this.yasayanKisiSayisi -= 1
         if(this.yasayanKisiSayisi < 100) this.yasayanKisiSayisiAz = true
      },
      gizlemeLimitiniAyarla(){
         this.gizlemeCarpani = Math.round(this.insanSayisi/this.gizlemeLimiti)
         if(this.insanSayisi <= this.gizlemeLimiti) this.yasayanKisiSayisiAz = true
         else this.yasayanKisiSayisiAz = false
      }
   },
   watch: {}
})
