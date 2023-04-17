if (typeof scrollOkan == "undefined"){
   var scrollOkan = {}
}
scrollOkan.mwheel = {
   // Offset tolerance to find whether a div is above or below on mousewheel event (is a div with Y:399 above current 400px?)
   ot: 100,

   /* Availability offset time for repeated mouse wheel events
   *  Example: A smooth scrolling animation is called via mouse wheel event.
   *  Scrolling duration is 500ms.
   *  If offset is set as -50, next mousewheel scrolling would be called 450ms (500 + (-50)) after the start of current scroll
   */
   mwTimeOutOffset: -50,

   // Scrolling duration for mouse wheel
   mwDuration: 500,
   mwAvailable: true,
   mwSelector: ".mw-selector",

   /**
   * Required
   * To be used to find spots to stop scrolling.
   */
   mwSetSelector(selector = ".mw-selector"){
      this.mwSelector = selector
   },

   // Optional
   mwSetParams(duration=this.mwDuration, ot=this.ot, mwTimeOutOffset=this.mwTimeOutOffset){
      this.mwDuration = duration
      this.ot = ot
      this.mwTimeOutOffset = mwTimeOutOffset

   },

   /**
   * This function should be triggered from 'wheel' event
   * Find closest above and below specified html element in the loop of saved selector by
   ** One: Finding if element is below or above by comparing "element.offsetTop" and "window offset before scrolling"
   ** Two: Finding closest one by comparing each "element.offsetTop" to "closest.offsetTop"
   */
   mwEvent(event){
      event.preventDefault()
      // // Debugging purposes
      // console.log("mousewheel: " + event.deltaY)
      // console.log("pageYOffset: " + window.pageYOffset)
      if(scrollOkan.mwheel.mwAvailable){
         scrollOkan.mwheel.setMwAvailable(false)
         setTimeout(function(){
            scrollOkan.mwheel.setMwAvailable(true)
         }.bind(this), scrollOkan.mwheel.mwDuration + scrollOkan.mwheel.mwTimeOutOffset)

         var elements = document.querySelectorAll(scrollOkan.mwheel.mwSelector)

         var closestAbove, closestBelow = null
         // Page loop to find closest above and below page_container
         for(var i=0; i<elements.length; i++){
            var page = elements[i]

            // // Debugging purposes
            // if(closestAbove != null)
            //    console.log("current closestAbove: " + closestAbove.offsetTop)
            // if(closestBelow != null)
            //    console.log("current closestBelow: " + closestBelow.offsetTop)
            // console.log(page.offsetTop + ": " + page.getAttribute("class"))

            //page is above
            if(page.offsetTop + scrollOkan.mwheel.ot < window.pageYOffset){
               if(closestAbove!=null && page.offsetTop > closestAbove.offsetTop)
                  closestAbove = page
               else if(closestAbove == null){
                  closestAbove = page
               }
            }

            //page is below
            else if(page.offsetTop - scrollOkan.mwheel.ot > window.pageYOffset){
               if(closestBelow == null)
                  closestBelow = page
               else if(closestBelow!=null && page.offsetTop < closestBelow.offsetTop){
                  closestBelow = page
               }
            }
         }

         // // Debugging purposes
         // if(closestAbove != null)
         //    console.log("End result closestAbove: " + closestAbove.offsetTop)
         // if(closestBelow != null)
         //    console.log("End result closestBelow: " + closestBelow.offsetTop)

         var target = null
         if(event.deltaY > 0)
            target = closestBelow
         else if(event.deltaY < 0)
            target = closestAbove

         if(target != null){
            scrollOkan.scroll.scrollToDiv(target, scrollOkan.mwheel.mwDuration)
         }
      }
   },
   setMwAvailable(bool){
      this.mwAvailable = bool
   }
}
