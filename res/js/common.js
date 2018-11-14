(function () {
	function addEvent(element, evnt, funct) {
		if (element.attachEvent)
			return element.attachEvent('on' + evnt, funct);
		else
			return element.addEventListener(evnt, funct, false);
	}

	var doc = document;
	var win = window;
	// https://github.com/jfriend00/docReady/blob/master/docready.js
	(function (funcName, baseObj) {
		"use strict";
		funcName = funcName || "docReady";
		baseObj = baseObj || window;
		var readyList = [];
		var readyFired = false;
		var readyEventHandlersInstalled = false;

		function ready() {
			if (!readyFired) {
				readyFired = true;
				for (var i = 0; i < readyList.length; i++) {
					readyList[i].fn.call(window, readyList[i].ctx);
				}
				readyList = [];
			}
		}

		function readyStateChange() {
			if (doc.readyState === "complete") {
				ready();
			}
		}

		baseObj[funcName] = function (callback, context) {
			if (typeof callback !== "function") {
				throw new TypeError("callback for docReady(fn) must be a function");
			}
			if (readyFired) {
				setTimeout(function () {
					callback(context);
				}, 1);
				return;
			} else {
				readyList.push({fn: callback, ctx: context});
			}
			if (doc.readyState === "complete" || (!doc.attachEvent && doc.readyState === "interactive")) {
				setTimeout(ready, 1);
			} else if (!readyEventHandlersInstalled) {
				if (doc.addEventListener) {
					doc.addEventListener("DOMContentLoaded", ready, false);
					win.addEventListener("load", ready, false);
				} else {
					doc.attachEvent("onreadystatechange", readyStateChange);
					win.attachEvent("onload", ready);
				}
				readyEventHandlersInstalled = true;
			}
		}
	})("DOMReady", window);

	DOMReady(function () {
		if ((!Slideout) || (!document.getElementById('cMainPanel'))) {
			return;
		}

		var slideout = new Slideout({
			'panel': document.getElementById('cMainPanel'),
			'menu': document.getElementById('cSide'),
			'padding': 300,
			'tolerance': 70,
			'touch': false,
			'side': 'right'
		});
		addEvent(
			document.getElementById('cBtnSlide'),
			'click',
			function () {
				slideout.toggle();
			}
		);
		win._sidebar = slideout;
	});
})();