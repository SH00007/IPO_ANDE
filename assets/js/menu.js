jQuery.noConflict();

jQuery(document).ready(function($){
	$('.responsive__btn').on('click',() => $('body').toggleClass('menu-responsive-open') );

	$(window).scrollTop() >= 5 ? $('body').addClass('scrolled') : $('body').removeClass('scrolled');

	$(window).scroll(function(){
		$(window).scrollTop() >= 5 ? $('body').addClass('scrolled') : $('body').removeClass('scrolled');
	});

	$(window).on('resize', () => {
		if( !$.isResponsive() )	return;

		$('.header__menu li.menu-item-has-children .menu__arrow').length || $('.header__menu li.menu-item-has-children').append('<span class="menu__arrow"></span>');

		$('.header__menu li.menu-item-has-children > span').unbind('click').click(function(){
			$(this).parent().toggleClass('active');
		});
	}).trigger('resize');
});
