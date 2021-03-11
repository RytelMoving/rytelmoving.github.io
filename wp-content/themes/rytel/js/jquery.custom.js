/*-----------------------------------------------------------------------------------

 	Custom JS - All front-end jQuery
 
-----------------------------------------------------------------------------------*/

jQuery(window).load(function(){

	jQuery('.flexslider').flexslider({
		animation: "slide",
		controlNav: false,
		start: function(slider){
			jQuery('body').removeClass('loading');
		}
	});

});



/*-----------------------------------------------------------------------------------*/
/*	Let's get ready!
/*-----------------------------------------------------------------------------------*/

jQuery(document).ready(function() {
	
	if (jQuery.browser.msie && jQuery.browser.version == '7.0' ) {
		jQuery('body').addClass('ie7');
	}
	
/*-----------------------------------------------------------------------------------*/
/*	Superfish Settings - http://users.tpg.com.au/j_birch/plugins/superfish/
/*-----------------------------------------------------------------------------------*/

	jQuery('#primary-nav ul').superfish({
		delay: 200,
		animation: {opacity:'show', height:'show'},
		speed: 'fast',
		autoArrows: false,
		dropShadows: false
	}); 
	
/*-----------------------------------------------------------------------------------*/
/*	Image Overlays
/*-----------------------------------------------------------------------------------*/
	
	function tz_postThumbOverlay() {
	
		var postThumb = jQuery('.post-thumb a');
		
		postThumb.hover( function() {
		
			jQuery(this).find('.post-thumb-overlay').stop().css({
				opacity: 0,
				display: 'block'
			}).animate({
				opacity: 0.4
			}, 150);
			
		}, function() {
			jQuery(this).find('.post-thumb-overlay').stop().fadeOut(150);
		});
		
	}
	
	tz_postThumbOverlay();

/*-----------------------------------------------------------------------------------*/
/*	PrettyPhoto Lightbox
/*-----------------------------------------------------------------------------------*/
	
	function tz_fancybox() {
		
		if(jQuery().fancybox) {
			jQuery("a.lightbox").fancybox({
				'transitionIn'	:	'fade',
				'transitionOut'	:	'fade',
				'speedIn'		:	300, 
				'speedOut'		:	300, 
				'overlayShow'	:	true,
				'autoScale'		:	true,
				'titleShow'		: 	false,
				'margin'		: 	10,
				onClosed		: function() {
					jQuery('.post-thumb-overlay').fadeOut(200);
				}
			});
		}
	}
	
	tz_fancybox();

/*-----------------------------------------------------------------------------------*/
/*	Filter States
/*-----------------------------------------------------------------------------------*/

	var filterLinks = jQuery('#filter li');
	
	filterLinks.click( function(e) {
	
		filterLinks.removeClass('active');
		
		filterLinks.not(this).find('span.border').fadeOut(100);
		
		jQuery(this).addClass('active');
		
		e.preventDefault();
	});
	
	filterLinks.hover( function() {
		jQuery(this).not('.active').find('.border').stop().css({
			opacity: 0,
			display: 'block'
		}).animate({
			opacity: 1
		}, 150);
			
	}, function() {
		jQuery(this).not('.active').find('.border').stop().fadeOut(150);
	});

	
/*-----------------------------------------------------------------------------------*/
/*	Portfolio Sorting
/*-----------------------------------------------------------------------------------*/
	
	if (jQuery().quicksand) {

		(function($) {
			
			$.fn.sorted = function(customOptions) {
				var options = {
					reversed: false,
					by: function(a) {
						return a.text();
					}
				};
		
				$.extend(options, customOptions);
		
				$data = jQuery(this);
				arr = $data.get();
				arr.sort(function(a, b) {
		
					var valA = options.by($(a));
					var valB = options.by($(b));
			
					if (options.reversed) {
						return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;				
					} else {		
						return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;	
					}
			
				});
		
				return $(arr);
		
			};
		
		})(jQuery);
		
		jQuery(function() {
		
			var read_button = function(class_names) {
				
				var r = {
					selected: false,
					type: 0
				};
				
				for (var i=0; i < class_names.length; i++) {
					
					if (class_names[i].indexOf('selected-') == 0) {
						r.selected = true;
					}
				
					if (class_names[i].indexOf('segment-') == 0) {
						r.segment = class_names[i].split('-')[1];
					}
				};
				
				return r;
				
			};
		
			var determine_sort = function($buttons) {
				var $selected = $buttons.parent().filter('[class*="selected-"]');
				return $selected.find('a').attr('data-value');
			};
		
			var determine_kind = function($buttons) {
				var $selected = $buttons.parent().filter('[class*="selected-"]');
				return $selected.find('a').attr('data-value');
			};
		
			var $preferences = {
				duration: 500,
				adjustHeight: 'dynamic'
			}
		
			var $list = jQuery('.grid');
			var $data = $list.clone();
		
			var $controls = jQuery('#filter');
		
			$controls.each(function(i) {
		
				var $control = jQuery(this);
				var $buttons = $control.find('a');
		
				$buttons.bind('click', function(e) {
		
					var $button = jQuery(this);
					var $button_container = $button.parent();
					
					var button_properties = read_button($button_container.attr('class').split(' '));      
					var selected = button_properties.selected;
					var button_segment = button_properties.segment;
		
					if (!selected) {
		
						$buttons.parent().removeClass();
						$button_container.addClass('selected-' + button_segment);
		
						var sorting_type = determine_sort($controls.eq(1).find('a'));
						var sorting_kind = determine_kind($controls.eq(0).find('a'));
		
						if (sorting_kind == 'all') {
							var $filtered_data = $data.find('li');
						} else {
							var $filtered_data = $data.find('li.' + sorting_kind);
						}
		
						var $sorted_data = $filtered_data.sorted({
							by: function(v) {
								return parseInt(jQuery(v).find('.count').text());
							}
						});
		
						$list.quicksand($sorted_data, $preferences, function () {
								tz_fancybox();
								tz_postThumbOverlay();
						});
						
						//console.log($sorted_data);
			
					}
			
					e.preventDefault();
					
				});
			
			}); 
			
		});
	
	}

/*-----------------------------------------------------------------------------------*/
/*	Tabs and toggles
/*-----------------------------------------------------------------------------------*/

	jQuery("#tabs").tabs({ fx: { opacity: 'show' } });
	jQuery(".tabs").tabs({ fx: { opacity: 'show' } });
	
	
	jQuery(".toggle").each( function () {
		if(jQuery(this).attr('data-id') == 'closed') {
			jQuery(this).accordion({ header: 'h4', collapsible: true, active: false  });
		} else {
			jQuery(this).accordion({ header: 'h4', collapsible: true});
		}
	});


/*-----------------------------------------------------------------------------------*/
/*	All done!
/*-----------------------------------------------------------------------------------*/

});