jQuery.noConflict();

jQuery(document).ready(function($){
    $.extend({
        getFiltersApplied : function(obj){
            if( typeof obj === "undefined" )
                return false;

            if( typeof obj === "string" )
                obj = $(obj);

            let queryString = [];
            var filters   =   obj.data('filters').selected_filters;
            if( typeof(filters) === 'string' )
                filters = JSON.parse(filters);

            if( obj.find('.filtersbox .filter').length )
            {
                obj.find('.filtersbox .filter').each(function(i,item){
                    filters.taxonomies[$(item).attr('data-name')] = $(this).attr('data-value');
                });
            }
            else
            {
                obj.find('.checklist--container').each(function(i,item){
                    filters.taxonomies[$(item).data('tax')]    =   [];
                    $(item).find('.checklist-item.active').each((k,value) => filters.taxonomies[$(item).data('tax')].push($(value).data('slug')));
                });
            }

            Object.entries(filters.taxonomies).map(item => item[1].length && queryString.push(item[0]+'='+item[1].join(',')) );
            window.history.pushState('','', (queryString.length ? '?'+queryString.join('&'):'?all'));
                
            return JSON.stringify(filters);
        },
        setPage: function(obj,page){
            if( typeof obj === "undefined" )
                return false;
            if( typeof obj === "string" )
                obj = $(obj);

            ( obj.parents('form').length ) ? obj.parents('form').data('page',page).submit() : obj.data('page',page).submit();
        },
        initPager: function(obj){
            if( typeof obj === "undefined" )
                return false;

            if( typeof obj === "string" )
                obj = $(obj);

            var $pager  =   obj.find('.wp-pagenavi a');
            $pager.unbind('click');
            $pager.click(function(e){
                e.preventDefault();
                var $page = $.trim($(this).attr('href').replace(ANDE.ajax_url+'?paged=',''));
                $page = $.trim($page.replace(window.location.href+'page/',''));
                $page = $page.replace('/','');
                $.setPage($(this),$page);
                $(this).parents('form').find('.js-results-container').scrollTo($.isResponsive() ? 150:200,0);
                return false;
            });
        },
        initDrops: function(){
            $('.filtersbox .filter > .option.selected').unbind('click');
            $('.filtersbox .filter > .option.selected').click(function(e){
                e.preventDefault();
                var $parent     =   $(this).parent();
                $parent.toggleClass('open');
                if( $parent.hasClass('open') )
                    $(".filtersbox .filter[data-name!='"+$parent.attr('data-name')+"']").removeClass('open');
                return false;
            });

            $('.filtersbox .filter .options .option').unbind('click');
            $('.filtersbox .filter .options .option').click(function(e){
                e.preventDefault();
                var $elem   =   $(this);
                var $form   =   $elem.parents('form');
                var $parent =   $elem.parents('.filter');
                $parent.removeClass('open').attr('data-value',$elem.attr('data-value')).find('.options .option').removeClass('selected');
                $parent.find('> .option.selected span.text').html($elem.html());
                $elem.addClass('selected');
                $.setPage($form,1);
                if( $parent.attr('data-avoidsubmit') != '1' )
                    $form.submit();
                return false;
            });

            $(document).mouseup(e => {
                var container = $('.filtersbox');
                (!container.is(e.target) && container.has(e.target).length === 0) && container.find('.filter').removeClass('open');
            });

            $(document).keyup(e => e.which == 27 && $('.filtersbox .filter').removeClass('open') );
        },
        initSubmitToggle : function(obj, className){
            if( typeof obj === "undefined" )
            return false;

            if( typeof obj === "string" )
                obj = $(obj);

            if( obj.length )
            {
                obj.unbind('click');
                obj.click(function(e){
                    e.preventDefault();
                    $(this).toggleClass(className);
                    $.setPage($(this),1);
                    return false;
                });
            }
        },
        initFilters: function(obj){
            if( typeof obj === "undefined" )
                return false;

            if( typeof obj === "string" )
                obj = $(obj);

            if( obj.length )
            {
                (!obj.find('.complex-list__column--left .complex-list__filter .complex-list__filter__item').length) && obj.parent().addClass('complex-list--full').find('.complex-list__column--left').remove();

                obj.find('.js-clear-filters').unbind('click').click(function(){
                    obj.find('.checklist-item.active').removeClass('active');
                    obj.submit();
                });

                obj.unbind('submit');
                obj.submit(function(e){
                    e.preventDefault();
                        
                    let frm      =  $(this);
                    let container=  frm.find('.js-results-container');
                    let options  =  frm.find('.js-options').val();
                    let $filters =  frm.data('filters');
                    $filters.selected_filters= $.getFiltersApplied(frm);
                    $filters.list_style = frm.data('style');
                    $filters.page=  frm.data('page');
                    $filters.complex=frm.data('complex') ? 1:0;
                    $filters.totals= frm.data('totals') ? 1:0;
                    $filters.title_totals= frm.data('title_totals');

                    $.initLoading(obj);
                        
                    $.ajax({
                        type:       'POST',
                        url:        ANDE.ajax_url,
                        dataType:   'JSON',
                        data:       { action: 'load_results', nonce: ANDE.nonce, filters: $filters, options: options },
                        success:    function(response){
                                        $.stopLoading(obj);
                                        container.html(response.data.content);
                                        $.initPager(container);
                                    }
                    });
                    
                    return false;
                });

                $.initPager(obj);
            }
        }
    });
        
    $.initSubmitToggle('.checklist-item','active');
    $.initFilters('form.simpleFilters');
    $.initFilters('form.complexFilters');
});