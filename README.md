breakdance
==========

JavaScript defined breakpoints that can be used to trigger events and control CSS renders.

The thinking here is that you can:

1. Use these events to initiate or destroy interface elements depending on the size of the screen or as a browser window resizes either due to a change in font size, orientation or the user dragging a browser edge to resize, etc.
2. Use the CSS classes as a shothand for media queries.

You can view [an example](www.cubicstate.com/breakdance/breakdance.html) to see this working.

Setup
-----

breakdance does not have any dependancies - simply insert it into your document head

```JavaScript
<script src="breakdance-2.0.2.min.js" type="text/javascript"></script>
```

### Breakpoints

There are some default breakpoint values defined:

Name 		| Min Width 	| Max Width
----		| ---------		| ---------
mobileSmall	| 0				| 479
mobile 		| 0				| 690
tablet 		| 691			| 865
default 	| 866			| 1000
large		| 1001			| -

You can define breakpoints using the ```setBreakpoint()``` method like so:

```JavaScript
breakdance.setBreakpoint({
	"mobileSmall": 	[0,479],
	"mobile": 		[0,690],
	"tablet": 		[691,865],
	"default": 		[866,1000],
	"large": 		[1001]
});
````

This method takes a single argument which is an object that defined the breakpoints like so:
```JavaScript
{
	"breakpointName1": [minWidth, maxWidth],
	"breakpointName2": [minWidth, maxWidth],
	"breakpointName3": [minWidth]
}
```

Events
------

The following events get triggered:

* [breakpoint name]On - triggered when a breakpoint becomes active
* [breakpoint name]Off - triggered when a breakpoint becomes inactive
* breakpoint - triggered when a breakpoint event above occurs

These can be used in the following way:

```JavaScript
breakdance.on("mobileOn", function(){
	initMobile();
});

breakdance.on("mobileOff", function(){
	destroyMobile();
});

breakdance.on("breakpoint", function(){
	console.log(breakdance.is("mobile"));
});
```

CSS Body Class
--------------

In addition to firing JavaScript events, a class gets added to the ```body``` element that represents the currently active breakpoint/s. This lets you use class names to change the behaviour of elements if you wish:

```CSS
.testBox{background: white;}
.mobile .testBox{background: red;}
.tablet .testBox{background: orange;}
.large .testBox{background: green;}
```
