var app = new Vue({
   el: '#main_container',
   data: {
      page1_event: null,
      contents_container: null,
   },
   mounted() {
      this.contents_container = this.$refs.contents_container;
      window.okan1 = this.contents_container;
   },
   methods: {
      onContentsClick(event) {
         if(this.isValidClick(event)) {
            this.findAndSetTargetActive(event);
         }
      },
      isValidClick(event) {
         return event.srcElement.tagName === "LI";
      },
      findAndSetTargetActive(event) {
         const contents = Array.from(this.contents_container.querySelectorAll(".content_header"));
         contentText = event.srcElement.innerText;
         const target = contents.find(htmlElement => htmlElement.innerText.includes(contentText));
         contents.forEach(content => content.parentElement.classList.remove("active"));
         target.parentElement.classList.add("active");
         //scroll
         target.scrollIntoView();
         // window.scrollTo(undefined, window.scrollY - window.innerHeight / 10)

      }
   },
})
