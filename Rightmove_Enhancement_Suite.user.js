// ==UserScript==
// @name        Rightmove Enhancement Suite
// @namespace   https://github.com/chigley/
// @description Keyboard shortcuts
// @include     http://www.rightmove.co.uk/*
// @version     1
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @resource    style style.css
// ==/UserScript==

var $ = unsafeWindow.jQuery;

GM_addStyle(GM_getResourceText("style"));

$("[name=summary-list-item]").mouseenter(function () {
	$(this).addClass("RES-active-list-item");
});

$("[name=summary-list-item]").mouseleave(function () {
	$(this).removeClass("RES-active-list-item");
});
