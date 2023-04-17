if (typeof scrollOkan == "undefined"){
   var scrollOkan = {}
}
scrollOkan.scroll = {
   scrollDuration: 500,

   scrollToPos(currentPos, targetPos, duration, callback){
      console.log(currentPos)
      console.log(targetPos)
      var startTime = null
      var distance = targetPos - currentPos
      function animation(currentTime){
         if(startTime==null) startTime=currentTime
         var timeElapsed = currentTime - startTime
         var run = ease(timeElapsed, currentPos, distance, duration)
         window.scrollTo(0, run)
         if(timeElapsed < duration) requestAnimationFrame(animation)
         else if(callback) callback(true)
      }
      // http://www.gizma.com/easing/
      // there is multiple easing functions
      // linear, quadratic ease in/out, ...
      function  ease(t, b, c, d){
         t /= d/2;
      	if (t < 1) return c/2*t*t + b;
      	t--;
      	return -c/2 * (t*(t-2) - 1) + b;
      }

      if(distance != 0) requestAnimationFrame(animation)
   },

   scrollToSelector(selector, duration, callback){
      var div = document.querySelector(selector)
      this.scrollToDiv(div, duration, callback)
   },
   scrollToDiv(targetDiv, duration = scrollOkan.scroll.scrollDuration, callback){
      // doesn't work (?)
      // var targetYOffset = this.DOM[target].getBoundingClientRect().top
      if(typeof targetDiv != "undefined" && targetDiv != null){
         var targetYOffset = targetDiv.offsetTop
         var pageYOffset = window.pageYOffset
         this.scrollToPos(pageYOffset, targetYOffset, duration, callback)
      }
   },
}
