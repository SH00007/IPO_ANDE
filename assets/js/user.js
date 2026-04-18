jQuery.noConflict();

jQuery(document).ready(function($){
    $('.frmEditGroups').submit(function(e){
        let frm = $(this);

        if( frm.find("[name='email_address']") )
            Cookies.set('newsletter_email', frm.find("[name='email_address']").val(), { expires: 365 });

        if( frm.find("[name='first_step']").length )
            return true;

        e.preventDefault();

        $.initLoading('.preferences__column--right');
        frm.parents('.preferences').scrollTo(200,0);
        frm.prev('.preferences__message').addClass('hidden');

        $.post( ANDE.ajax_url, 
                frm.serializeArray(), 
                response => {
                    let status = response.success ? 'success':'error';
                    (status === 'success') && frm.hide();
                    frm.prev('.preferences__message').removeClass('hidden')
                                                     .addClass('preferences__message--'+status)
                                                     .html(`<div class="preferences__title">${response.data.msg}</div>`);
                    $.stopLoading('.preferences__column--right');
                });
            
        return false;
    });

    $('.avatar-edit__delete').on('click',function(){
        $('.avatar-edit__image').hide();
        $('.avatar-edit__form').addClass('visible').find('.gform_delete').click();
    })

    $('.btn-choose').click(function(e){
        e.preventDefault();
        $('.ginput_container_fileupload input').click();
    });
    
    if( $('.edt-prfl').length > 0 && $('.edt-prfl_wrapper').hasClass("gform_validation_error") ){
        $('.avatar-edit__image').hide();
        $('.avatar-edit__form').addClass('visible');
    }

    //  subscription update 2023
    $('.js-preference-subscribe').on('click', function(){
        const el = $(this), action = el.hasClass('is-subscribed') ? 'Unsubscribe' : 'Subscribe';
        $.ajax({
            type: "POST",
            url: ANDE.ajax_url,
            data: { action: 'subscribe_to_list', nonce: ANDE.nonce, list: el.data('list'), to_do: action},
            success: (response) => {
                el.toggleClass('is-subscribed');
                el.text(response.data.text);
            },
            async: false
        });
    });
});
