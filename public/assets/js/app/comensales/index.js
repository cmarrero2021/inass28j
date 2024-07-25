
$(function() {   

});

function formatterAccion(value, row, index){
    var boton = /*html*/
    `
    <button type="button" class="btn btn-primary btn-sm edit-comensal" data-bs-target="#mdl-edit-comensales" data-bs-toggle="modal" title="Editar Comensal" data-id="${row.id}">
        <i class="fas fa-pencil-alt py-1"></i>
    </button>
    `
    return boton;
}
iconos();


$('#mdl-edit-comensales').on('hidden.bs.modal', function () {

    $('#comensal_edit_title span').html("");
    $('#err_nombre').html("");
    $('#err_birth_day').html("");
    $('#err_email').html("");

    
});

$('body table#comesales_tbl').on('click','.edit-comensal',function () {
    
    let id = $(this).data('id');

     $.ajax({
        type: "GET",
        url: base+"/comensales/comensales/"+ id,        
        dataType: "JSON",
        success: function (response) {
            
            if(response.status == 1){

                console.log(response)

                let data = response.data;

                $('#comensal_edit_title span').html(data.id);
                $('#edit-comensal-id').val(id);               
                $('#registro_hash').val(data.registro_hash);
                $('#nombre').val(data.nombre);
                $('#apellido').val(data.apellido);
                $('#email').val(data.email);
                $('#telefono').val(data.telefono);
                $('#birth_day').val(data.birth_day);
                $('#parent_registro_hash').val(data.parent_registro_hash);

            }            
        }
     });
});

//Todo: Luego crear funcion para validar emails
$('#email').on('blur change', function () {
    let correo = $(this).val();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
        $('#err_email').html('El correo ingresado no tiene un formato válido');
        $(this).val('');
    } else {
        $('#err_email').html('');
    }
});


$('#btn-edit-comensal').on('click', function () {    

    if(validar()){

        let id = $("#edit-comensal-id").val();
    
        var formData = $("#form-edit-comensal").serialize();   
    
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    
        $.ajax({
            type: "PUT",
            url: base+"/comensales/comensales/"+ id,
            // headers: {           
            //     "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content') // Incluir el token en la cabecera de la solicitud
            // },
            data: formData,
            dataType: "JSON",
            success: function (response) {
                // console.log(response)    
                if(response.status==1){
                    $('#comesales_tbl').bootstrapTable('refresh');
                    $("#mdl-edit-comensales").modal('hide');
    
                    toastr.success( response.mensaje);
                }else{
                    toastr.error('Ha ocurrido un error');
                }
            }
        });   
        
    }


});

