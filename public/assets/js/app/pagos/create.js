$(function() {
    showAdjunto();
});

function showAdjunto(){ 

    if( $('#forma_pago').val() == 4){    
        $(".adjunto_pago_html").fadeIn();
        $("#adjunto_pago").attr('required', true);

    }else{
        $(".adjunto_pago_html").fadeOut();
        $("#adjunto_pago").attr('required', false);
        $('#adjunto_pago').val('');
    }

    $('#forma_pago').on('change', function () {
        
        if( $('#forma_pago').val() == 4){    
            $(".adjunto_pago_html").fadeIn();
            $("#adjunto_pago").attr('required', true);
        }else{
            $(".adjunto_pago_html").fadeOut();
            $("#adjunto_pago").attr('required', false);
            $('#adjunto_pago').val('');
        }

    });

}




