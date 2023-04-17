var app = new Vue({
   el: '#main_container',
   created(){
      this.init()
   },

   data: {
      eventBus: new Vue(),
      leblebi: "LEBLEBI",

      imgs: [
         "./img/1.jpg",
         "./img/2.jpg",
         "./img/3.jpg",
         "./img/4.jpg",
         "./img/5.jpg",
      ],

      duration: 1000,
      multiPage: 2,
      firstImageIndex: 0,
      animationTypes: [],

      opacityCheckbox: false,
      shrinkCheckbox: false,
      moveCheckbox: false

   },

   methods: {
      init(){
         this.eventBus.$on('sliderReady', this.initSlider)
      },
      initSlider(){
         this.eventBus.$emit("setImages", this.imgs)
         // duration, multiPage, firstImageIndex
         this.emitSetParams()
      },
      emitSetParams(){
         this.eventBus.$emit("setParams", this.duration, this.multiPage, this.firstImageIndex, this.animationTypes)
      },
      setAnimationTypes(){
         var newArray = []
         if(this.opacityCheckbox) newArray.push("opacity")
         if(this.shrinkCheckbox) newArray.push("shrink")
         if(this.moveCheckbox) newArray.push("move")
         this.animationTypes = newArray
      }
   },
   watch: {
      "duration": function(oldval, newval){this.emitSetParams()},
      "multiPage": function(oldval, newval){this.emitSetParams()},
      "firstImageIndex": function(oldval, newval){this.emitSetParams()},
      "animationTypes": function(oldval, newval){this.emitSetParams()},

      "opacityCheckbox": function(oldval, newval){this.setAnimationTypes()},
      "shrinkCheckbox": function(oldval, newval){this.setAnimationTypes()},
      "moveCheckbox": function(oldval, newval){this.setAnimationTypes()}

   }
})
