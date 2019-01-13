function Sasic(selector) {
	// Can be id or class

	var element = document.getElementById(selector);
	if (element) {
		this.initComparator(element);
	} else {
		var elements = document.getElementsByClassName(selector);
		for (var i = 0; i < elements.length; i++) {
			this.initComparator(elements[i]);
		}
	}
}

Sasic.prototype.initComparator = function (element) {
	var img = element.getElementsByClassName("sasic-overlay")[0];

	var slider, clicked = 0, w, h;

    w = img.offsetWidth;
    h = img.offsetHeight;

    img.style.width = (w / 2) + "px";

    slider = this.initSlider(element, h, w, slideReady, slideFinish);

    var flag = true;
    function slideReady(e) {
      e.preventDefault();
      clicked = 1;
      if (flag) {
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
        flag = false;
      }
    }
    function slideFinish() {
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      if (clicked == 0) return false;
      pos = getCursorPos(e)
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      slide(pos);
    }
    function getCursorPos(e) {
      var a;
      e = e || window.event;
      a = img.getBoundingClientRect();
      return e.pageX - a.left - window.pageXOffset;
    }
    function slide(x) {
      img.style.width = x + "px";
      slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) - 2 + "px";
    }
}

Sasic.prototype.initSlider = function (element, imgh, imgw, slideReady, slideFinish) {
	
    slider = element.getElementsByClassName("sasic-slider")[0];
    slider.style.top = (imgh / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (imgw / 2) - (slider.offsetWidth / 2) - 2 + "px";

    slider1 = slider.getElementsByClassName("sasic-slider-line")[0];
    slider1.style.height = (imgh / 2) + "px";
    slider1.style.top = (-1 * imgh / 2) + "px";

    slider2 = slider.getElementsByClassName("sasic-slider-line")[1];
    slider2.style.height = (imgh / 2) + "px";
    slider2.style.top = slider.offsetHeight -3 + "px";

    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchstop", slideFinish);

    return slider;
}
