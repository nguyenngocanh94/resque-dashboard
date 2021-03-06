angular.module("app", ["ngResource", "ui.bootstrap"]), hljs.initHighlightingOnLoad(), $("body").tooltip({
	html: !0,
	container: "body",
	selector: "[data-event~=tooltip]"
}), $("[data-event~=popover]").popover({html: !0}), $("[data-event~=collapse-all]").on("click", function (a) {
	a.preventDefault(), $(".collapse.in").collapse("hide")
}), $("[data-event~=expand-all]").on("click", function (a) {
	a.preventDefault(), $(".collapse").not(".in").collapse("show")
}), $(".navigator").on("change", "select", function () {
	window.location = $("option", this).filter(":selected").val()
});
const formatISO = function (a) {
	var b = d3.time.format.iso;
	return b.parse(a)
}, ANIMATION_DURATION = 1500;
$(".infinite-scroll").infinitescroll({
	navSelector: "ul.pager",
	nextSelector: "ul.pager li.next a",
	itemSelector: ".infinite-scroll li",
	loading: {finishedMsg: "No more pages to load.", img: "http://www.infinite-scroll.com/loading.gif"},
	bufferPx: 5e3
});
var setStatus = function (a) {
	"use strict";
	var b = {message: "The Cube server is online", iconClass: "icon-circle", "class": "status-ok"};
	a === !1 && (b.message = "Unable to connect to the Cube server", b.iconClass = "icon-info-sign", b.class = "status-error");
	var c = $("#server-status li[data-server=cube]");
	c.removeClass("status-unknown").addClass(b.class), c.popover("destroy"), c.popover({content: b.message})
};
$.ajax({
	type: "GET", url: "//" + CUBE_URL + "/1.0/types/get?", dataType: "json", statusCode: {
		200: function () {
			setStatus(!0)
		}, 404: function () {
			setStatus(!0)
		}
	},
	error: function () {
        setStatus(!0)
    }
});
