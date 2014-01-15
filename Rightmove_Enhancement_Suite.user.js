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

function selectItem(item) {
    listItems.removeClass("RES-active-list-item");
    item.addClass("RES-active-list-item");
    currentlySelected = item;
}

var listItems = $("[name=summary-list-item]");

// Select top item
selectItem(listItems.first());
var currentlySelected = listItems.first();

// Remove grey background on premium listings. Otherwise, my active item doesn't
// stand out against such listings
$(".premium").css("background", "white");

listItems.click(function () {
    selectItem($(this));
});

$('body').bind('keyup', function(e) {
    var code = e.keyCode || e.which;
    if (e.keyCode == 74) {
        // j
        var next = currentlySelected.next("[name=summary-list-item]");
        if (next.length == 1)
            selectItem(next);
    } else if (e.keyCode == 75) {
        // k
        var prev = currentlySelected.prev("[name=summary-list-item]");
        if (prev.length == 1)
            selectItem(prev);
    }
});
