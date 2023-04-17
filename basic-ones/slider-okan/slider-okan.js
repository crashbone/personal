Vue.component('slider-okan', {
   created(){
      this.internalInit()
   },
   data(){
      return {
         animating: 0,
         currentIndex: 0,
         animationTypes: [],

         firstImageIndex: 0,
         duration: 500,
         multiPage: 1,

         imgs: [],
      }
   },
   methods:{
      // Trigger sliderReady on eventBus after $on functions are defined.
      internalInit(){
         if(typeof this.eventBus !== 'undefined'){
            this.eventBus.$on('setParams', this.setParams)
            this.eventBus.$on('setImages', this.setImages)
            this.eventBus.$emit("sliderReady")
         }
      },
      setImages(imgs = []){
         this.imgs = imgs
      },
      setParams(duration=this.duration, multiPage=this.multiPage, firstImageIndex=this.firstImageIndex, animationTypes=this.animationTypes){
         this.duration=duration
         this.multiPage=multiPage
         this.firstImageIndex=firstImageIndex
         this.animationTypes=animationTypes
      },

      // Triggered on clicking left button
      sliderLeft(){
         this.move(-1)
      },
      // Triggered on clicking right button
      sliderRight(){
         this.move(1)
      },
      /**
      * Starts animation by calling animate() when triggered
      * Changes the current index in the middle of the animation (duration/2)
      */
      move(direction){
         this.animate(direction)
         setTimeout(function(){
            if(direction > 0)
               this.currentIndex += this.multiPage
            else
               this.currentIndex -= this.multiPage
            this.currentIndex = this.mod(this.currentIndex, this.imgs.length)
            if(direction > 0 && this.currentIndex < this.multiPage)
               this.currentIndex = 0;
         }.bind(this), this.duration/2)

      },
      /**
      * Changes this.animating boolean, which is used on animatingClass() function.
      * The animatingClass() function is called from the div "slider-image-container"
      */
      animate(direction){
         this.animating = direction
         setTimeout(function(){
            this.animating = false
         }.bind(this), this.duration/2)
      },
      /**
      * The div "slider-image-container" calls this function in order to animate by CSS.
      */
      animatingClass(){
         return {
            "animating-right animating": this.animating == 1,
            "animating-left animating": this.animating == -1,
            "opacity": this.animationTypes.includes("opacity"),
            "shrink": this.animationTypes.includes("shrink"),
            "move": this.animationTypes.includes("move"),
         }
      },
      infoIconClass(index){
         return {
            "active": (index >= this.currentIndex && index < (this.currentIndex + this.multiPage))
         }
      },
      mod(n, m) {
         return ((n % m) + m) % m;
      },
      /**
      * Image container style is dynamicly created instead of using CSS and classes.
      * By this way it's possible to pass duration as variable to this component
      */
      imageContainerStyle(index){
         // Index is decremented because v-loop starts from 1 instead 0.
         index--

         var availableImageCount = this.multiPage
         if (this.currentIndex + this.multiPage > this.imgs.length)
            availableImageCount = this.imgs.length - this.currentIndex
         /**
         * Check if there is not image on that index.
         * This is possible when multiPage is larger than 1
         */
         if(this.currentIndex+index >= this.imgs.length)
            return {
               transition: 'all ' + this.duration/2000 + 's ease-in-out',
               width: (0) + '%',
            }
         return {
            backgroundImage: 'url(' + this.imgs[this.currentIndex+index] + ')',
            transition: 'all ' + this.duration/2000 + 's ease-in-out',
            width: (100/availableImageCount) + '%',
         }
      }
   },

   props: ["eventBus"],

   template: `


   <div class="slider-okan-main-container">
      <div v-for="index in multiPage" class="slider-image-container" :style="imageContainerStyle(index)" v-bind:class="animatingClass()">
      </div>
      <div class="slider-info">
         <span class="slider-info-text">{{currentIndex+1}}/{{imgs.length}}</span>
         <div class="slider-info-icons">
            <div v-for="(img, index) in imgs" class="slider-info_icon" v-bind:class="infoIconClass(index)"></div>
         </div>
      </div>

      <div v-on:click="sliderLeft" class="slider-controller slider-left"></div>
      <div v-on:click="sliderRight" class="slider-controller slider-right"></div>

   </div>`
})
