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

// From https://stackoverflow.com/questions/4217962/scroll-to-an-element-using-jquery
$.fn.scrollMinimal = function() {
    var cTop = this.offset().top;
    var cHeight = this.outerHeight(true);
    var windowTop = $(window).scrollTop();
    var visibleHeight = $(window).height();

    if (cTop < windowTop)
        $(window).scrollTop(cTop);
    else if (cTop + cHeight > windowTop + visibleHeight)
        $(window).scrollTop(cTop - visibleHeight + cHeight);
};

function selectItem(item) {
    listItems.removeClass("RES-active-list-item");
    item.addClass("RES-active-list-item");
    currentlySelected = item;
    item.scrollMinimal();
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

$(window).bind('keyup', function(e) {
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
    } else if (e.keyCode == 13) {
        // enter
        var url = currentlySelected.find(".price-new a").attr("href");
        window.open(url, "_blank"); // TODO: avoid popup blockers?
    }
});
