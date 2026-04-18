jQuery.noConflict();

jQuery(document).ready(function($){
    $.extend({
        isResponsive: function(){
            return $(window).width() < 1051;
        },
        initLoading: function(obj){
            if( typeof obj === "undefined" )
                return false;

            if( typeof obj === "string" )
                obj = $(obj);

            obj.addClass('loading');
        },
        stopLoading: function(obj){
            if( typeof obj === "undefined" )
                return false;

            if( typeof obj === "string" )
                obj = $(obj);

            obj.removeClass('loading');
        },
        initClose: function(obj){
            if( typeof obj === "undefined" )
                return false;

            if( typeof obj === "string" )
                obj = $(obj);
                
            obj.find('.close').unbind('click').click(function(e){
                e.preventDefault();
                $(this).parent().hide();
                return false;
            });

            $(document).mouseup(function(e){
                var container = obj;
                if( !container.is(e.target) && container.has(e.target).length === 0 )
                    obj.find('.close').click();
            });

            $(document).keyup(function(e){
                if( e.which == 27 )
                    obj.find('.close').click();
            });
        },
        initAnimatedAnchor: function(){
            $('a[href^="#"]').unbind('click').click(function(e){
                e.preventDefault();
                var $href   =   $(this).attr('href');
                if( $href.length > 1 && $(this).hasClass('animate-scroll') )
                    $($href).scrollTo(( $(this).data('scrolldiff') ? $(this).data('scrolldiff'):500));
                return false;
            });
        },
        initAccordion: function(callback){
            $('.js-accordion--container .js-accordion--opener').click(function(e){
                e.stopPropagation();
                let elem = $(this).closest('.js-accordion-item');
                elem.hasClass('js-accordion-open') ? 
                    elem.removeClass('js-accordion-open').find('> .js-accordion-content').slideUp() : 
                    elem.addClass('js-accordion-open').find('> .js-accordion-content').slideDown();
                callback && callback();
            });
        },
        initTabs: function(selector, callback){
            $(selector).unbind('click').click(function(){
                let elem = $(this);
                let container = elem.parents('.js-tab--container');
                let useSlide = elem.hasClass('js-slide-effect') ? true : false;

                if( !elem.hasClass('js-tab-active') ){
                    useSlide ? container.find('.js-tab-content.js-tab-active').slideUp() : container.find('.js-tab-content.js-tab-active').fadeOut();
                    container.find('.js-tab-active').removeClass('js-tab-active');
                    useSlide ? container.find('.js-tab-content[data-tab=\''+ elem.data('tab') +'\']').addClass('js-tab-active').slideDown() : container.find('.js-tab-content[data-tab=\''+ elem.data('tab') +'\']').addClass('js-tab-active').fadeIn();
                    elem.addClass('js-tab-active');
                }else{
                    if( elem.hasClass('js-toggle-enable') ){    
                        useSlide ? container.find('.js-tab-content.js-tab-active').slideUp() : container.find('.js-tab-content.js-tab-active').fadeOut();
                        container.find('.js-tab-active').removeClass('js-tab-active');
                    }
                }
                callback && callback();
            });
        },
        initChecks: function(selector, callback){
            $(selector).unbind('click').click(function(){
                let isChecked = $(this).next().is(':checked');
                $(this).toggleClass('checked').next().prop("checked",!isChecked);
                callback && callback();
            });
        },
        initStickyBoxes: function(){
            $(window).on('scroll', () => {
                const spaceTop = 120;
                const positionDiff = 230;
                $('.js-sticky-box').each(function(){
                    let box = $(this);
                    let child = box.children().first();
                    let stopper = box.parents('.js-sticky-box-container').next();
                    let stopPosition = stopper.length ? stopper.offset().top : $('footer').offset().top;

                    ( $(window).scrollTop() >= (box.offset().top - spaceTop) ) ? box.addClass('fixed') : box.removeClass('fixed');
                    ( $(window).scrollTop() >= (stopPosition - child.outerHeight() - positionDiff) ) ? box.addClass('bottom') : box.removeClass('bottom');
                });
            });
        },
        initScrollBar: function(selector, options){
            $(selector).mCustomScrollbar(options || { theme:"dark-3" });
        },
        initGlobalActions: function(){
            $.initAnimatedAnchor();
            $.initAccordion();
            $.initTabs('.js-tab-link');
            $.initClose('body');
            $.initChecks('.check');
            $.initStickyBoxes();
        }
    });
        
    $.fn.extend({
        toggleText: function (a, b){
            this.html(this.html() == b ? a : b);
            return this;
        },
        scrollTo: function($diff, $duration = 1000 ){
            $diff   =   $diff || 0;
            $('html, body').stop().animate({scrollTop: this.offset().top-$diff}, $duration);
        },
    });

    $.initGlobalActions();
});