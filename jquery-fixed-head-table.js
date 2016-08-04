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

	function init(el, height, killAutoUpdate){
		var $el = $(el);

		var $table = $el.children('table');
		if ( $table.length === 0) {
			return;
		}

		var $thead = $table.find('thead');
		var $tbodyTr = $table.find('tbody tr');
		if ( $thead.length === 0 || $tbodyTr.length === 0 ) {
			return;
		}

		$el.css('overflow', 'hidden');
		if ( height ) $el.height(height);

		$table.css({
			boxSizing: 'border-box',
			margin: '0',
			width: '100%'
		});

		var $head = $('<div class="fixed-head-table-head">').css('overflow', 'hidden').append($table.clone()).prependTo($el);

		$table.wrap('<div class="fixed-head-table-body"><div class="fixed-head-table-body-inner"></div></div>');
		var $bodyInner = $table.parent().css('overflow', 'hidden');
		var $body = $bodyInner.parent().css('overflowY', 'scroll');

		var bodyWidth, bodyInnerWidth, headHeight, bodyHeight;

		function update(){
			var _bodyWidth = $body.width();
			var _bodyInnerWidth = $bodyInner.width();
			var _headHeight = $.css($table.get(0), 'borderTopWidth', true) + $thead.outerHeight() + $.css($table.find('tbody > tr:first-child > *:first-child').get(0), 'borderTopWidth', true);
			var _bodyHeight = $el.height() - _headHeight;

			if (_bodyWidth === bodyWidth &&
				_bodyInnerWidth === bodyInnerWidth &&
				_headHeight === headHeight &&
				_bodyHeight === bodyHeight ) {
				return;
			}
			bodyWidth = _bodyWidth;
			bodyInnerWidth = _bodyInnerWidth;
			headHeight = _headHeight;
			bodyHeight = _bodyHeight;

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

		update();

		if ( !killAutoUpdate ) {
			$(window).on('resize', myThrottle(250, update));
			setInterval(update, 1000);
		}

		$el.data('fixedHeadTable-update', update);
	}

	$.fn.fixedHeadTable = function(height, killAutoUpdate){

		return this.each(function(){

			if ( height === 'update' ) {
				if ( $(this).data('fixedHeadTable-update') ) {
					$(this).data('fixedHeadTable-update')();
				}
			} else {
				init(this, height, !!killAutoUpdate);
			}

		});

	};

})(jQuery);