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

var listItems = $("[name=summary-list-item]");

// Remove grey background on premium listings. Otherwise, my active item doesn't
// stand out against such listings
$(".premium[name=summary-list-item]").css("background", "white");

listItems.mouseenter(function () {
	$(this).addClass("RES-active-list-item");
});

listItems.mouseleave(function () {
	$(this).removeClass("RES-active-list-item");
});
