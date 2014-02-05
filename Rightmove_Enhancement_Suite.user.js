// ==UserScript==
// @name        Rightmove Enhancement Suite
// @namespace   https://github.com/chigley/
// @description Keyboard shortcuts
// @include     http://www.rightmove.co.uk/*
// @version     0.2
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
if (listItems.length > 0) {
    selectItem(listItems.first());
    var currentlySelected = listItems.first();
}

// Remove grey background on premium listings. Otherwise, my active item doesn't
// stand out against such listings
$(".premium").css("background", "white");

listItems.click(function () {
    selectItem($(this));
});

$(window).bind('keyup', function(e) {
    var code = e.keyCode || e.which;
    if (code == 72) {
        // h
        var currentPage = $("#sliderBottom .current").parent();
        currentPage.css("background", "red");
        var prevPage = currentPage.prev();
        if (prevPage.length == 1)
            window.location = prevPage.find("a").attr("href");
    } else if (code == 74) {
        // j
        if (typeof currentlySelected !== "undefined") {
            var next = currentlySelected.next("[name=summary-list-item]");
            if (next.length == 1)
                selectItem(next);
        }
    } else if (code == 75) {
        // k
        if (typeof currentlySelected !== "undefined") {
            var prev = currentlySelected.prev("[name=summary-list-item]");
            if (prev.length == 1)
                selectItem(prev);
        }
    } else if (code == 76) {
        // l
        var currentPage = $("#sliderBottom .current").parent();
        var nextPage = currentPage.next().find("a");
        if (nextPage.length == 1)
            window.location = nextPage.attr("href");
    } else if (code == 13) {
        // enter
        if (typeof currentlySelected !== "undefined") {
            var url = currentlySelected.find(".price-new a").attr("href");
            window.open(url, "_blank"); // TODO: avoid popup blockers?
        }
    } else if (code == 221) {
        // ]
        var currentThumb = $(".js-gallery-thumbnail.selected");
        var nextThumb = currentThumb.next(".js-gallery-thumbnail");
        if (nextThumb.length == 1)
            nextThumb.click();
    } else if (code == 219) {
        // [
        var currentThumb = $(".js-gallery-thumbnail.selected");
        var prevThumb = currentThumb.prev(".js-gallery-thumbnail");
        if (prevThumb.length == 1)
            prevThumb.click();
    }
});
