$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});

$(document).keypress(function(event) {
	if (event.which === 13) {

        if ($("#mdl-permiso-administracion").is(":visible")) {
            // Ejecuta la función para guardar los datos de la modal de reservas
            // guadar_validado_reserva();   
            envioFormuAdminCheck();     
            
        }
    
    }
})

// Todo: solucionar error al presionar enter

$('.shortcut_sw').on('click', function () {
   var estado =  $(this).data('estado'); 
    $('#estado-admin').val(estado);
});

$("#btn_envio_page_admin").on("click", function () {
   

    // if ($("#login-admin").val().length == 0) {
    //     $("#err_login-admin").html("Campo requerido");
    //     return false;
    // } else {
    //     $("#err_login-admin").html("");
    // }

    envioFormuAdminCheck();

    
});

function envioFormuAdminCheck(){

    $.LoadingOverlay("show");

    if ($("#password-admin").val().length == 0) {
        $("#err_password-admin").html("Campo requerido");
        $.LoadingOverlay("hide");
        return false;
    } else {
        $("#err_password-admin").html("");
    }

    
    var data = {      
        "password": $("#password-admin").val(),  
    };
    // console.log(data);

    // return;

    $.ajax({
        type: "POST",
        headers: {
            "X-CSRF-Token": $('meta[name="csrf-token"]').attr("content"),
            "Content-Type": "application/json",
        },
        url: base_inicio + "/administrar/admin_page",
        data: JSON.stringify( data ),
        dataType: "JSON",
        success: function (response) {
            console.log(response);
            // return;
            if (response.status == 1) {
                toastr.success(
                    response.mensaje + " será redirijido a la admnistración"
                );

                $("#mdl-permiso-administracion").modal("hide");

                var datos = {
                    // login: $("#login-admin").val(),
                    password: $("#password-admin").val(),
                    cod: response.cod,
                    user: response.usuario.id,
                    _token: $('meta[name="csrf-token"]').attr("content"),
                };

                var estado="";
                if( $('#estado-admin').val().length>0){
                    estado="?estado="+$('#estado-admin').val();
                }
                setTimeout(() => {
                    redirigirConPost(base_inicio + "/administrar"+estado, datos);
                }, 1000);
            } else {

                if(response.resultado== 422){

                    toastr.error('El campo password es obligatorio.');

                }else{
                    toastr.error(response.mensaje);
                }
            }

            $.LoadingOverlay("hide");            
        },
        error: function(xhr, status, error) {
            // Maneja los errores de la solicitud aquí
            console.log(error)
        }
    });
}

$("#mdl-permiso-administracion").on("hidden.bs.modal", function () {
    $("#login-admin").val('');
    $("#password-admin").val('');
    $("#err_login-admin").html('');
    $("#err_password-admin").html('');  
    $('#estado-admin').val('');
});

function redirigirConPost(url, parametros) {
    var form = $("<form></form>");
    form.attr("method", "post");
    form.attr("action", url);

    $.each(parametros, function (llave, valor) {
        var campo = $("<input></input>");
        campo.attr("type", "hidden");
        campo.attr("name", llave);
        campo.attr("value", valor);
        form.append(campo);
    });

    form.appendTo("body").submit();
}

// var datos = { parametro1: "valor1", parametro2: "valor2" };
// redirigirConPost("tu_url", datos);
