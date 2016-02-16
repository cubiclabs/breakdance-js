/*
 * CUBICstate breakdance
 * http://cubicstate.com
 *
 * Date: 15/02/2016
 * Version 2.0.2
 */

/**
* container object for our breakdance namespace
* 
* @return object
*/
var breakdance = function(window, document){
	// =========================
	// instance variables
	var _events = {};
	var _breakpoints = {
		"mobileSmall": 	[0,479],
		"mobile": 		[0,690],
		"tablet": 		[691,865],
		"default": 		[866,1000],
		"large": 		[1001]
	};
	

	// =========================
	// CONTRUCTOR

	/**
	* initiates breakdance once the document is ready
	* 
	* @method init
	* @return void
	*/
	var init = function(){
		if(document.addEventListener){
			document.addEventListener("DOMContentLoaded", function(){
				document.removeEventListener( "DOMContentLoaded", arguments.callee, false);
				initTests();
			});
		}else if(document.attachEvent){
			// ie8
			document.attachEvent("onreadystatechange", function(){
				if(document.readyState === "complete"){
					document.detachEvent("onreadystatechange", arguments.callee);
					initTests();
				}
			});
		}
	};

	// =========================
	// METHODS

	/**
	* adds event listeners to window resize event
	* 
	* @method initTests
	* @return void
	*/
	var initTests = function(){
		doTests();
		if(window.addEventListener){
			window.addEventListener("resize", doTests);	
		}else if(window.attachEvent){
			// ie8
			window.attachEvent("onresize", doTests);
		}
	}

	/**
	* sets our breakpoint names and sizes
	* 
	* @method setBreakPoints
	* @param breakpoints - an object containing breakpoint definition - see default above for an example
	* @return void
	*/
	var setBreakPoints = function(breakpoints){
		_breakpoints = breakpoints;
		doTests();
	};


	/**
	* performs our breakpoint tests against our window size
	* 
	* @method doTests
	* @return void
	*/
	var doTests = function(){
		var w = getViewport().width;

		var hasTriggered = false;

		for(var bp in _breakpoints){
			var dimensions = _breakpoints[bp];
			var minW = dimensions[0];
			var maxW = 0;
			if(dimensions.length > 1){
				maxW = dimensions[1];
			}
			if((minW <= w) && ((maxW == 0) || (maxW >= w))){
				// on
				if(!is(bp)){
					addBodyClass(bp);
					trigger(bp + "On");
					hasTriggered = true;
				}
			}else{
				// off
				if(is(bp)){
					removeBodyClass(bp);
					trigger(bp + "Off");
					hasTriggered = true;
				}
			}
		}

		if(hasTriggered){
			trigger("breakpoint");
		}
	};

	/**
	* shorthand for bodyHasClass. Returns true if a given breakpoint is active
	* 
	* @method is
	* @param what - string - the breakpoint to test for
	* @return boolean
	*/
	var is = function(what){
		return bodyHasClass(what);
	};

	/**
	* test our body element for a given class name
	* 
	* @method bodyHasClass
	* @param className - string - class name to test for
	* @return boolean
	*/
	var bodyHasClass = function(className){
		var body = getBody();
		var bodyClass = body.className.split(" ");
		for(var i=0; i<bodyClass.length; i++){
			if(bodyClass[i] === className){
				return true;
			}
		}
		return false;
	};

	/**
	* adds one or more given class names to our body element
	* 
	* @method addBodyClass
	* @param className - string - class name to add. Mulitple class names can be separated by a space
	* @return void
	*/
	var addBodyClass = function(className){
		var splitClass = className.split(" ");
		var body = getBody();
		var bodyClass = body.className.split(" ");
		for(var i=0; i<splitClass.length; i++){
			var add = true;
			for(var j=0; j<bodyClass.length; j++){
				if(bodyClass[j] === splitClass[i]){
					add = false;
					break;
				}
			}
			if(add && splitClass[i].length) bodyClass.push(splitClass[i]);
		}
		body.className = bodyClass.join(" ");
	};

	/**
	* removes one or more given class names from our body element
	* 
	* @method removeBodyClass
	* @param className - string - class name to remove. Mulitple class names can be separated by a space
	* @return void
	*/
	var removeBodyClass = function(className){
		var splitClass = className.split(" ");
		var body = getBody();
		var bodyClass = body.className.split(" ");
		var newClass = [];
		for(var i=0; i<bodyClass.length; i++){
			var add = true;
			for(var j=0; j<splitClass.length; j++){
				if(splitClass[j] === bodyClass[i]){
					add = false;
					break;
				}
			}
			if(add && bodyClass[i].length) newClass.push(bodyClass[i]);
		}
		body.className = newClass.join(" ");
	};

	/**
	* returns the DOM body element
	* 
	* @method getBody
	* @return element
	*/
	var getBody = function(){
		return document.getElementsByTagName("body")[0];
	};

	/**
	* returns our viewport dimensions
	* 
	* @method getViewport
	* @return object - {width, height}
	*/
	var getViewport = function(){
		var w;
		var h;

		// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		if (typeof window.innerWidth != 'undefined') {
			w = window.innerWidth,
			h = window.innerHeight
		}else if(typeof document.documentElement != 'undefined'
			&& typeof document.documentElement.clientWidth !=
			'undefined' && document.documentElement.clientWidth != 0) {
			// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
				w = document.documentElement.clientWidth,
				h = document.documentElement.clientHeight
		}else{
			// older versions of IE
			w = document.getElementsByTagName('body')[0].clientWidth,
			h = document.getElementsByTagName('body')[0].clientHeight
		}
		return {width:w, height:h};
	};

	/* simple event handling start
	====================================*/

	/**
	* triggers an event
	* 
	* @method trigger
	* @param e - the event name
	* @return void
	*/
	var trigger = function(e){ /*, [args] */
		if(e in _events){
			for(var i=0; i<_events[e].length; i++){
				_events[e][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	/**
	* add an event listener
	* 
	* @method on
	* @param e - the event name
	* @param fnc - the function to call when the event is triggered
	* @return void
	*/
	var on = function(e, fnc){
		_events[e] = _events[e]	|| [];
		_events[e].push(fnc);
	};

	/**
	* remove an event listener
	* 
	* @method off
	* @param e - the event name
	* @param fnc - the function associated with the listener
	* @return void
	*/
	var off = function(e, fnc){
		if(e in _events){
			_events[e].splice(_events[e].indexOf(fnc), 1);
		}
	};

	/* simple event handling end
	====================================*/


	// =========================
	// public method declarations
	var pub = {
		setBreakPoints:setBreakPoints,
		is:is,
		trigger:trigger,
		on:on,
		off:off,
		getViewport:getViewport
	}
	
	// =========================
	init();
	return pub;
}(this, this.document);