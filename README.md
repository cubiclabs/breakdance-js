breakdance
==========

Trigger jQuery events for responsive breakpoints defined in either CSS or JavaScript.

The thinking here is that you can use these events to initiate or destroy interface elements depending on the size of the screen or as a browser window resizes either due to a change in font size, orientation or the user dragging a browser edge to resize, etc.

You can control the breakpoints in one of two ways:

1. [CSS media querys](http://www.cubicstate.com/labs/breakdance/examples/cssBreakpoints.html)
2. [JavaScript](http://www.cubicstate.com/labs/breakdance/examples/scriptedBreakpoints.html)


Setup
-----

breakdance relies on jQuery so you will need to ensure that this is included in your page before you load the breackdance.js.

```JavaScript
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js" type="text/javascript"></script>
<script src="breakdance-1.0.1.min.js" type="text/javascript"></script>
```

How you set the breakpoints depends on the method that you have chosen: css or JavaScript

### CSS Breakpoints

CSS breakpoints are defined using media queries to insert a breakpoint name into an ```:after``` pseudo element on the ```body``` element.

```css
body:after {content: 'default'; position: absolute; left: -99999px;}
@media screen and (min-width:1101px){
	body:after {content: 'large';}
}
@media screen and (min-width:801px) and (max-width: 1100px){
	body:after {content: 'default';}
}
@media screen and (min-width:601px) and (max-width: 800px){
	body:after {content: 'tablet';}
}
@media all and (max-width: 600px) {
	body:after {content: 'mobile';}
}
```

Default 'tag' names are:
* mobile
* tablet
* default
* large

If you use more than these or want to change their names you must make breakdance aware of them using the ```setResponsiveTags()``` method:

```JavaScript
breakdance.setResponsiveTags(["small", "medium", "normal", "big", "veryBig"]);
````


### JavaScript Breakpoints

You define breakpoints in JavaScript using the ```addBreakpoint()``` method like so:

```JavaScript
breakdance.addBreakpoint("large", 1101);
breakdance.addBreakpoint("default", 801, 1100);
breakdance.addBreakpoint("tablet", 601, 800);
breakdance.addBreakpoint("mobile", 0, 600);
````

This method takes the following arguments:
```JavaScript
addBreakpoint(name, minWidth, maxWidth)
```

Parameter 	| Type 				| Description
--------- 	| ----				| -----------
name 		| string			| The name to use for the breakpoint and subsequent class body name
minWidth 	| integer or string	| The minimum width for which this breakpoint applies. This can be an integer or a css string such as '30em'
maxWidth 	| integer or string	| The maximum width for which this breakpoint applies. This can be an integer or a css string such as '30em'


Events
------

The following events get fired against the ```window``` element:

* draw
* [breakpoint name]On
* [breakpoint name]Off
* breakpoint

_Note the use of [breakpoint name]. This refers directly to either your CSS content values or you JavaScript breakpoint names._

These can be used in the following way:

```JavaScript
var app = function(window, document, $){
	// =========================
	// CONTRUCTOR
	var init = function(){
		// NOTE: we do not wrap this in document.ready as we want the events to fire as soon as breakdance.js initiates
		$(window).on("draw", draw);
		$(window).on("mobileOn", initMobile);
		$(window).on("mobileOff", destroyMobile);
		$(window).on("breakpoint", breakpointEvent);
	};

	var draw = function(){
		// code in here runs every time the browser is resized or the font size changes
	};

	var initMobile = function(){
		// code in here could initiate a mobile menu and destroy any desktop specific widgets
	};

	var destroyMobile = function(){
		// code in here could destroy any mobile specific widgets or menus
	};

	var breakpointEvent = function(e, pCurrent, pPrevious){
		// this gets called every time the breakpoint changes
	};
	
	
	// =========================
	init();
}(this, this.document, this.jQuery);
```

CSS Body Class
--------------

In addition to firing jQuery events, a class gets added to the ```body``` element that represents the current breakpoint. This lets you use class names to change the behaviour of elements if you wish:

```CSS
.testBox{background: white;}
.mobile .testBox{background: red;}
.tablet .testBox{background: orange;}
.large .testBox{background: green;}
```
