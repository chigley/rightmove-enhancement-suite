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

// From https://stackoverflow.com/questions/487073/check-if-element-is-visible-after-scrolling
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function selectItem(item) {
    listItems.removeClass("RES-active-list-item");
    item.addClass("RES-active-list-item");
    currentlySelected = item;

    // TODO: only scroll as much as needed, not such that new item is at top
    if (!isScrolledIntoView(item))
        $('html, body').scrollTop(item.offset().top);
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
