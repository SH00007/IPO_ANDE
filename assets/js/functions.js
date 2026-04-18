jQuery.noConflict();

jQuery(document).ready(function($){
  $('.header .open-search').click(function(e){
    e.preventDefault();
    $('.header .search-box').slideToggle();
    $('.header .open-search').toggleClass('open');
    return false;
  });

  $('.slider__carousel').each(function(key, item){
    $(item).slick({
      infinite: true,
      arrows: true,
      dots: false,
      fade: true,
      speed: 1000,
      adaptiveHeight: true,
      autoplay: ( $(this).attr('data-autoplay') == 'true' ),
      autoplaySpeed: 5000,
      pauseOnHover: false,
      pauseOnFocus: false,
      nextArrow: $(this).find('.image-slider__controls__arrows__next'),
      prevArrow: $(this).find('.image-slider__controls__arrows__prev'),
    });
  });

  var sub_count = $(".submenu--cont").children().length;
  if( sub_count > 5 || $.isResponsive() ){
    $('.submenu--cont').each(function(key, item){
      $(item).slick({
        infinite: false,
        arrows: true,
        dots: false,
        slidesToShow: 1,
        variableWidth: false,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 3
            }
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 4
            }
          },
          {
            breakpoint: 1050,
            settings: {
              slidesToShow: 5,
              variableWidth: true
            }
          },
          
        ]
      });
    });
  }

  //  cards sliders
  $('.cards__carousel').each(function(key, item){
    $(item).on('init reInit afterChange', (event, slick, currentSlide, nextSlide) => {
      let i = currentSlide / slick.slickGetOption('slidesToScroll');
      let elem = $(this).parents('section.cards').find('.cards__controls__number');
      elem.html(`${elem.data('label')} ${i ? ++i:1} of ${slick.$dots[0].children.length}`);
    }).slick({
      infinite: false,
      arrows: true,
      dots: true,
      nextArrow: $(this).parents('section.cards').find('.cards__controls__arrows__next'),
      prevArrow: $(this).parents('section.cards').find('.cards__controls__arrows__prev'),
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  });

  $('#member_map').length && $.initMap('#member_map');
  $('.gpnf-dialog').on('dialogopen', () => $.isResponsive() || $.initScrollBar('.gpnf-dialog'));
  $('.woocommerce a.showcoupon').length && $('.woocommerce a.showcoupon').on('click', () => $('.checkout_coupon').slideToggle(400));
});