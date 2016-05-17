(function($){

	function myThrottle(delay, callback){
		var timer = null;
		return function(){
			if ( timer ) {
				clearTimeout();
			}
			timer = setTimeout(function(){
				timer = null;
				callback();
			}, delay);
		};
	}

	$.fn.fixedHeadTable = function(height){

		return this.each(function(){

			var $el = $(this).css('overflow', 'hidden');
			if ( height ) $el.height(height);

			var $table = $el.children('table').css({
				boxSizing: 'border-box',
				margin: '0',
				width: '100%'
			});

			var $thead = $table.find('thead');

			var $head = $('<div class="fixed-head-table-head">').css('overflow', 'hidden').append($table.clone()).prependTo($el);

			$table.wrap('<div class="fixed-head-table-body"><div class="fixed-head-table-body-inner"></div></div>');
			var $bodyInner = $table.parent().css('overflow', 'hidden');
			var $body = $bodyInner.parent().css('overflowY', 'scroll');

			update();
			$(window).on('resize', myThrottle(250, update));

			function update(){
				var bodyWidth = $body.width();
				var bodyInnerWidth = $bodyInner.width();
				var headHeight = $.css($table.get(0), 'borderTopWidth', true) + $thead.outerHeight() + $.css($table.find('tbody > tr:first-child > *:first-child').get(0), 'borderTopWidth', true);
				var bodyHeight = $el.height() - headHeight;
				console.log(headHeight);

				$head.css({
					width: bodyWidth === bodyInnerWidth ? '' : bodyInnerWidth + 'px',
					height: headHeight + 'px'
				});
				$body.css({
					height: bodyHeight + 'px'
				});
				$bodyInner.css({
					marginTop: - headHeight + 'px'
				});
			}

		});

	};

})(jQuery);