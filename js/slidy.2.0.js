(function($) {
	
	var base = obj_width = timeout = item_count = obj = options = "";
	var count = 0;

	$.slidy = function(options)
	{
		base = this;

		base.init = function()
		{
			base.obj = $.obj;

			base.options = $.extend({}, $.slidy.defaultOptions, options);

			base.obj.css({
				opacity: 1,
				display: 'block'
			});

			base.obj.find('.slidy-content-container').css({
				width: base.options.width+'px',
				height: base.options.height+'px',
				overflow: 'hidden',
				position: 'relative'
			});

			//thumb set position
			if(base.options.thumb_position == 'center'){
				base.obj.find('.slidy-thumbnail-container').css({
					left: (options.width - base.obj.find('.slidy-thumbnail-container').width()) / 2 +'px'
				});
			}
			else if(base.options.thumb_position == 'left'){
				base.obj.find('.slidy-thumbnail-container').css({
					left: '5px'
				});
			}
			else if(base.options.thumb_position == 'right'){
				base.obj.find('.slidy-thumbnail-container').css({
					right: '5px'
				});
				base.obj.find('.slidy-thumbnail img').css('marginLeft', '-100px');
			}

			if(base.options.thumb == false)
			{
				base.obj.find('.slidy-thumbnail-container').css({
				zIndex: '-999'
			});
			}

			$.slidy.thumb_click();
			$.slidy.append(0);
			item_count = base.obj.find('.slidy-thumbnail').length;
			base.obj.find('.slidy-thumbnail:eq(0)').addClass('slidy-current-thumb');
			timeout = setInterval($.slidy.auto, base.options.delay);
		}

		// ayarları çalıştır.
		base.init();

	};

	$.slidy.auto = function()
	{
		if(item_count > count+1){ count+=1; }
		else { count = 0;}
		
		tobj = base.obj.find('.slidy-thumbnail:eq('+count+')');

		$.slidy.clicked(count, tobj);
	}

	$.slidy.thumb_click = function()
	{
		base.thumb_obj = base.obj.find('.slidy-thumbnail');
		$.each(base.thumb_obj, function(i){
			$(this).click(function(){
				$.slidy.clicked(i, $(this));
			});
		});
	}

	$.slidy.clicked = function(i, obj)
	{
		if(base.obj.find('.slidy-content').length <= 1)
		{
			if($('.slidy-current-thumb').index() != i)
			{
				count = i;
				window.clearInterval(timeout);
				timeout = setInterval($.slidy.auto, base.options.delay);
				$.slidy.change(i);
				$.slidy.append(i);
				$.slidy.effect(i);
				$(base.thumb_obj).removeClass('slidy-current-thumb');
				$(obj).addClass('slidy-current-thumb');
			}
		}
	}
	$.slidy.append = function(id)
	{
		var elem = $('.slidy-thumbnail img');
		var img_src = $(elem[id]).attr('src');
		var href_link = $(elem[id]).attr('link');
		href_link = (href_link) ? href_link : "javascript:;";

		var elem_cont = $('.slidy-content');
		
		base.obj_width = base.obj.find('.slidy-content:eq(0)').width();
		base.obj.find('.slidy-content-container').append('<div class="slidy-content"><a href="'+href_link+'"><img src="'+img_src+'" alt="" /></a></div>');
		base.obj.find('.slidy-content').css({
			width: base.options.width,
			height: base.options.height
		});
	}

	$.slidy.remove = function()
	{
		base.obj.find('.slidy-content:eq(0)').remove();
	}

	$.slidy.change = function(id)
	{
		var elem = $('.slidy-thumbnail img');
		var img_src = elem[id].src;

		base.obj.find('.slidy-content:eq(1) img').attr('src', img_src);
	}

	$.slidy.effect = function(i)
	{
		var id = base.obj.find('.slidy-current-thumb').index();

		if(i<id){
			base.obj.find('.slidy-content:eq(1)').css('left', '-'+base.obj_width+'px');

			base.obj.find('.slidy-content:eq(0)').animate({
				left : '+=' + base.obj_width
			}, 700, 'easeInOutExpo', function(){
				$.slidy.remove();
			});

			base.obj.find('.slidy-content:eq(1)').animate({
				left : '+=' + base.obj_width,
			}, 800, 'easeInOutExpo');
		}
		else {
			base.obj.find('.slidy-content:eq(1)').css('left', base.obj_width+'px');

			base.obj.find('.slidy-content:eq(0)').animate({
				left : '-=' + base.obj_width
			}, 700, 'easeInOutExpo', function(){
				$.slidy.remove();
			});

			base.obj.find('.slidy-content:eq(1)').animate({
				left : '-=' + base.obj_width,
			}, 800, 'easeInOutExpo');
		}
	}

	$.slidy.defaultOptions = {
		width 			: 600,
		height 			: 421,
		thumb 			: true,
		delay			: 5000, //min 5000
		thumb_position	: 'center' //left, center, right
	};

	$.fn.slidy = function(options)
	{
		$.obj = $(this);
		return new $.slidy(options);
	};
	
})(jQuery);

/* jQuery Easing */
jQuery.easing.jswing=jQuery.easing.swing;
jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a+c;return-b/2*(--a*(a-2)-1)+c},easeInCubic:function(e,a,c,b,d){return b*(a/=d)*a*a+c},easeOutCubic:function(e,a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeInOutCubic:function(e,a,c,b,d){if((a/=d/2)<1)return b/
2*a*a*a+c;return b/2*((a-=2)*a*a+2)+c},easeInQuart:function(e,a,c,b,d){return b*(a/=d)*a*a*a+c},easeOutQuart:function(e,a,c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeInOutQuart:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a+c;return-b/2*((a-=2)*a*a*a-2)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a*a*a*a+c;return b/2*((a-=2)*a*a*a*a+2)+c},easeInSine:function(e,
a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c},easeOutSine:function(e,a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeInOutSine:function(e,a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInExpo:function(e,a,c,b,d){return a==0?c:b*Math.pow(2,10*(a/d-1))+c},easeOutExpo:function(e,a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeInOutExpo:function(e,a,c,b,d){if(a==0)return c;if(a==d)return c+b;if((a/=d/2)<1)return b/2*Math.pow(2,10*(a-1))+c;return b/2*(-Math.pow(2,-10*--a)+2)+c},
easeInCirc:function(e,a,c,b,d){return-b*(Math.sqrt(1-(a/=d)*a)-1)+c},easeOutCirc:function(e,a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeInOutCirc:function(e,a,c,b,d){if((a/=d/2)<1)return-b/2*(Math.sqrt(1-a*a)-1)+c;return b/2*(Math.sqrt(1-(a-=2)*a)+1)+c},easeInElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return-(g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f))+c},easeOutElastic:function(e,
a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d)==1)return c+b;f||(f=d*0.3);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);return g*Math.pow(2,-10*a)*Math.sin((a*d-e)*2*Math.PI/f)+b+c},easeInOutElastic:function(e,a,c,b,d){e=1.70158;var f=0,g=b;if(a==0)return c;if((a/=d/2)==2)return c+b;f||(f=d*0.3*1.5);if(g<Math.abs(b)){g=b;e=f/4}else e=f/(2*Math.PI)*Math.asin(b/g);if(a<1)return-0.5*g*Math.pow(2,10*(a-=1))*Math.sin((a*d-e)*2*Math.PI/f)+c;return g*Math.pow(2,-10*(a-=1))*Math.sin((a*
d-e)*2*Math.PI/f)*0.5+b+c},easeInBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){if(f==undefined)f=1.70158;if((a/=d/2)<1)return b/2*a*a*(((f*=1.525)+1)*a-f)+c;return b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e,a,c,b,d){return(a/=
d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(e,a,c,b,d){if(a<d/2)return jQuery.easing.easeInBounce(e,a*2,0,b,d)*0.5+c;return jQuery.easing.easeOutBounce(e,a*2-d,0,b,d)*0.5+b*0.5+c}});
