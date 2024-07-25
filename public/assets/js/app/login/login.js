$(function(){

    $('#input-username').on('change', function () {
        $('.email-b').val($(this).val());
    });

    $('#password-input').on('change', function () {
        $('.password-b').val($(this).val());
    });

});


