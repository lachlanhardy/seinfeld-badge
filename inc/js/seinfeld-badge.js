/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, newcap: true, immed: true, strict: true */
/*global jQuery: false */

(function seinfeldBadge() {
	"use strict";
	
	jQuery(".seinfeld-badge").each(function () {
		var $seinfeld = jQuery(this), username = $seinfeld.attr("class").replace(/.*user-([a-z0-9]+).*/gi, "$1"), $table, $streaks, $progressed, $x;
		jQuery.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fcalendaraboutnothing.com%2F~" + username + "%22%20and%20xpath%3D%27%2F%2Fdiv%27&format=xml&callback=?", function (data) {
			$table = jQuery(data.results[2]);
			$streaks = jQuery("<div class=\"streaks\"/>").append(data.results[5]).append(data.results[6]);
			$table.find("thead th:contains('Month')").remove();
			$table.find("th.monthName").attr("colspan", "8");
			$seinfeld.append($table);
			$table.find("td.progressed").each(function () {
				$progressed = jQuery(this);
				$x = jQuery('<div class="xmarksthespot"/>').css({
					"height": $progressed.height(),
					"width": $progressed.width()
				}).append('<img src="http://calendaraboutnothing.com/images/x_1.png" height="80%" width="50%" />');
				$progressed.append($x);
			});
			$seinfeld.append($streaks).append('<p class="pimpage"><a href="http://github.com/lachlanhardy/seinfeld-badge">Want your own badge?</a></p>');
		});
	});
}());