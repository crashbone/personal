var app = new Vue({
   el: '#main_container',
   beforeCreate() {

   },
   computed: {
      totalMoney(){
         return this.lastTotalMoney + this.oneTimeEarnings
      }
   },
   created() {
      this.init()
   },
   data: {
      lastTotalMoney: 0,
      frame: 0,
      limit: 10000000,
      tickRate: 15,
      startRef: -1,
      latestTickTimeMS: -1,
      oneTimeEarnings: 0,

      passiveMode: true,
   },

   methods: {
      init() {
         this.startRef = Date.now()
         window.requestAnimationFrame(this.loop)
      },
      loop() {
         this.frame++;
         const currentTime = Date.now() - this.startRef
         const tickPeriod = 1000/this.tickRate
         // console.log("currentTime: " + currentTime)
         // console.log("latestTickTimeMS: " + this.latestTickTimeMS)
         // console.log("oneTimeEarnings: " + this.oneTimeEarnings)
         if(this.frame>this.limit){
            return
         }
         if(currentTime-this.latestTickTimeMS > tickPeriod){
            //DO SOMETHING
            // console.log("=====DO SOMETHING====")
            this.latestTickTimeMS = currentTime
            this.customLoop()
         }

         window.requestAnimationFrame(this.loop)
      },
      customLoop(){
         this.oneTimeEarnings++
         this.addBlock()
      },

      addBlock(){
         const currentOneTime = document.querySelector('#current-one-time')

         var oneBlock = document.createElement("div")
         let oneBlockClass = "oneBlock"
         oneBlockClass += this.passiveMode ? " passive" : " second-job"
         oneBlock.setAttribute("class", oneBlockClass)

         currentOneTime.appendChild(oneBlock)

      },

      togglePassiveMode(){
         this.passiveMode = !this.passiveMode
         this.clearPassiveJob()
         console.log(this.passiveMode)
      },
      clearPassiveJob(){
         const currentOneTime = document.querySelector('#current-one-time')
         this.lastTotalMoney += this.oneTimeEarnings
         this.oneTimeEarnings = 0
         currentOneTime.innerHTML = ''
      }
   },
   watch: {}
})
