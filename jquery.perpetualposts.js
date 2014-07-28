/* jshint browser: true */
/* global console: true, jQuery: true */
(function ($) {
	'use strict';
	$.fn.perpetualPosts = function (options) {

		if (!options) {
			options = {};
		}
		var selector = options.selector || this.selector;
		var callback = options.callback;

		return this.each(function (index, anchor) {
			var $anchor = $(anchor);
			$anchor.click(function (event) {
				$.get($anchor[0].href, function (data) {

					// Create new content container.
					var $content = $('<div class="amp-eternal-article-content"></div>');
					var $data;
					$content.hide();

					// Process callback for developer manipulation of data.
					if (callback) {
						$data = callback(data);
					} else {
						$data = $(data);
					}

					var $script = $data.find('script');
					if ($script.length) {
						window.console && console.log('jQuery.perpetualPosts warning: <script> tags in HTML may cause you pain.');
					}

					// Insert new content after anchor.
					$content.append($data);
					$anchor.after($content);
					$content.fadeIn();

					// Rig up sonar to update push state.
					if (options.sonar) {
						$content.on('scrollin', function () {
							history.pushState({}, $anchor.text(), $anchor[0].href);
						});
					}

					// Find next URL and update anchor.
					$anchor = $data.find(selector);
					if ($anchor.length) {
						$anchor.perpetualPosts(options);
						$anchor.insertAfter($content);
					} else {
						throw 'Next jQuery.perpetualPosts anchor (' + selector + ') not found in data.';
					}
				});
				event.preventDefault();
			});

			if (options.sonar) {
				// Hide the anchor but ensure it still has layout.
				$anchor.css({
					height: 0,
					display: 'block',
					overflow: 'hidden'
				});

				// jQuery.sonar plugin
				// https://github.com/artzstudio/jQuery-Sonar
				if ($.sonar) {
					$anchor.on('scrollin', function () {
						$anchor.off('scrollin');
						$anchor.click();
					});
				} else {
					throw 'jQuery Sonar plugin not found.';
				}
			}
		});
	};
}(jQuery));
