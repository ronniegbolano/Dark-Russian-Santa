var html2canvas;
var canvas = document.getElementById('snap');
// var dataURL = canvas.toDataURL();
var img;
var reader = new FileReader();
//This takes screenshot of the costume
(function(exports) {
  function urlsToAbsolute(nodeList) {
    if (!nodeList.length) {
      return [];
    }
    var attrName = "href";
    if (
      nodeList[0].__proto__ === HTMLImageElement.prototype ||
      nodeList[0].__proto__ === HTMLScriptElement.prototype
    ) {
      attrName = "src";
    }
    nodeList = [].map.call(nodeList, function(el, i) {
      var attr = el.getAttribute(attrName);
      if (!attr) {
        return;
      }
      var absURL = /^(https?|data):/i.test(attr);
      if (absURL) {
        return el;
      } else {
        return el;
      }
    });
    return nodeList;
  }

  function screenshotPage() {
    var wrapper = document.getElementById("snap");
    html2canvas(wrapper, {
      onrendered: function(canvas) {
        // email(canvas.toDataURL());
        canvas.toBlob(function(blob) {
          saveAs(blob, "Custome.png");
          // reader.readAsDataURL(blob);
          // email(reader.readAsDataURL(blob));
        });
      }
    });
  }

  function addOnPageLoad_() {
    window.addEventListener("DOMContentLoaded", function(e) {
      var scrollX = document.documentElement.dataset.scrollX || 0;
      var scrollY = document.documentElement.dataset.scrollY || 0;
      window.scrollTo(scrollX, scrollY);
    });
  }

  function generate() {
    screenshotPage();
  }
  exports.screenshotPage = screenshotPage;
  exports.generate = generate;
  
  //Sends email with attachment

  function email(){
  Email.send({
    Host : "smtp.elasticemail.com",
    Username : "seyed.alampour.10@my.csun.edu",
    Password : "D29F5D4002B5E3DB8CA07A88EF6D4AE6ACA6",
    To : 'seyed.alampour.10@my.csun.edu',
    From : "seyed.alampour.10@my.csun.edu",
    Subject : "This is the subject",
    Body : "And this is the body",
	Attachments : [
	{
		name : "Costume.png",
		// data : input
    		path : "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png"

	}]
}).then(
  message => alert(message)
);

}
  
})(window);





// Jquery for Costume Booth Drag and Drop 




  var snapImage;
      $(function() {
        $("img").resizable();
        $(".jean").draggable();
        $(".divdrag").draggable();
        $(".hat").draggable();
        $(".boot").draggable();
        

        $("#droppable2").droppable({
          drop: function(event, ui) {
            $(this)
              .addClass("ui-state-highlight")
              .find("divdrag")
              .html("Droppedd!");
              jQuery('#jqGrid').find('.ui-state-highlight').css('background', 'skyblue');
          }
        });
        $(".snap-button").click(clickedSnapButton);
      });
      function clickedSnapButton() {
        snapImage = new Image();
        snapImage.src =
          "https://cdn.glitch.com/17bead91-da87-4ad4-af59-b819fd94ae19%2Ftemplate_face.png?v=1576568595120";
        // snapImage.setAttributes('height', '10px');
        // $("#droppable2").append("<div id='myFace'>");
        $("#droppable2").append(snapImage);
        // $("#droppable2").append("</div>");
      }


      function finalCostume()
      {

        alert("Thanks for using the costume booth. Enjoy your costume!");
        document.getElementById("boothback").style.backgroundImage = "url('https://cdn.glitch.com/17bead91-da87-4ad4-af59-b819fd94ae19%2Fsnow.gif?v=1576632031534')";
  
      }

//taking the jpeg and attaching it to a buttonfunction allowDrop(ev) {
