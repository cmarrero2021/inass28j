$(function() {

    changeRol();

    selecionarTodo();

    guardar();

});


function changeRol(){

    $('#rol').on('change', function () {

        $('#permisos_toggle').prop('checked', false);

        var id = $(this).val();
        if (id){
            permisosList(id);
        }else{
            $('.permisos_list').each(function() {
                $(this).prop('checked', false);
                $('#permisos_toggle').prop('disabled', true);
                $(this).prop('disabled', true)
                $('#btn-guardar').prop('disabled', true)
            })
        }
    });
}

function selecionarTodo(){

    // seleccionar el elemento checkbox con id 'permisos_toggle'
  var toggle = $('#permisos_toggle');

  // seleccionar todos los elementos checkbox con clase 'permisos_list'
  var checkboxes = $('.permisos_list');

  toggle.click(function() {
    // si el checkbox está seleccionado, seleccionar todos los elementos checkbox
    if ($(this).prop('checked')) {
      checkboxes.prop('checked', true);
    }
    // si el checkbox no está seleccionado, deseleccionar todos los elementos checkbox
    else {
      checkboxes.prop('checked', false);
    }
  });
}



function permisosList(id){

    $.ajax({
        type: "GET",
        url: base +"/asignar_permisos_rol_list/"+id,
        dataType: "JSON",

        success: function (response) {
            console.log(response);

            if(response.status==1){

                data = response.data;

                $('#permisos_toggle').prop('disabled', false);
                $('#btn-guardar').prop('disabled', false)

                $('.permisos_list').each(function() {

                    $(this).prop('disabled', false);
                    $(this).prop('checked', false);

                    data.forEach(e => {

                        if (this.value === e.name) { // si el valor esta presente
                            $(this).prop('checked', true)
                        }
                    });

                })

            }

        }
    });
}

function guardar(){

    $('#btn-guardar').on('click', function () {

        var formData = $("#formdata").serialize();

        $.ajax({
            type: "POST",
            url: base+"/asignar_permisos_rol",
            data: formData,
            headers: {
                "X-CSRF-TOKEN": $('meta[name="_token"]').attr('content') // Incluir el token en la cabecera de la solicitud
            },
            dataType: "JSON",
            success: function (response) {

                if(response.status == 1 ){

                    $('.permisos_list').each(function() {
                        $('#rol').val('');
                        $(this).prop('checked', false);
                        $('#permisos_toggle').prop('disabled', true);
                        $(this).prop('disabled', true)
                        $('#btn-guardar').prop('disabled', true)
                    })
                    toastr.success( response.mensaje);

                }else{
                    toastr.error( response.errors);
                }

            }
        });
    });
}
