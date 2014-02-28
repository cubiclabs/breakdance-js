var app = function(window, document, $){
	// =========================
	// instance variables
	var _ns = "app";
				
	// =========================
	// CONTRUCTOR
	var init = function(){
		// NOTE: we do not wrap this in document.ready as we want the events to fire as soon as CUBIC.js initiates
		$(window).on("draw", draw);
		$(window).on("mobileOn", initMobile);
		$(window).on("mobileOff", destroyMobile);
		$(window).on("breakpoint", breakpointEvent);
	};

	var draw = function(){
		showMsg("resized", "msg3");
		// code in here runs every time the browser is resized or the font size changes
	};

	var initMobile = function(){
		showMsg("initMobile");
		// code in here could initiate a mobile menu and destroy any desktop specific widgets
	};

	var destroyMobile = function(){
		showMsg("destroyMobile");
		// code in here could destroy any mobile specific widgets or menus
	};

	var breakpointEvent = function(e, pCurrent, pPrevious){
		showMsg("current breakpoint: " + pCurrent + "<br \/>" + "previous breakpoint: " + pPrevious, "msg2");
		// this gets called every time the breakpoint changes
	};

	// this is just used to ouput some information to our test screens
	var showMsg = function(pMsg, pID){
		if(pID == undefined) pID = "msg";
		$("#" + pID).html(pMsg).stop().show().css({opacity:1}).fadeOut(2000);
	};

	// =========================
	// public method declarations
	var pub = {
		
	}
	// =========================
	init();
	return pub;
}(this, this.document, this.jQuery);