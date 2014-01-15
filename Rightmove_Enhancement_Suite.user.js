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
var currentlySelected;

// Remove grey background on premium listings. Otherwise, my active item doesn't
// stand out against such listings
$(".premium").css("background", "white");

listItems.click(function () {
    listItems.removeClass("RES-active-list-item");
    $(this).addClass("RES-active-list-item");
    currentlySelected = $(this);
});

$('body').bind('keyup', function(e) {
    var code = e.keyCode || e.which;
    if (e.keyCode == 74) {
        // j
        var next = currentlySelected.next("[name=summary-list-item]");
        if (next.length == 1) {
            listItems.removeClass("RES-active-list-item");
            next.addClass("RES-active-list-item");
            currentlySelected = next;
        }
    }
});
