$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});


$(document).ready(function () {
    let buttonsOrder = [];
    buttonsOrder.push('btnAdd');
    buttonsOrder.push('toggle');
    buttonsOrder.push('columns');
    buttonsOrder.push('refresh');
    $('#usuarios_tbl').bootstrapTable('refreshOptions', {
        buttonsOrder: buttonsOrder
    })
    $('[name="btnAdd"]').removeClass('btn-secondary');
    $('[name="btnAdd"]').addClass('btn-success');
    

    $('#password').on('keyup', function() {
        var clave = $(this).val();
        var error = [];
        if (clave.length < 8) {
            error.push('<li>La longitud debe ser de al menos 8 caracteres</li>');
        }
        // if (!/[a-zA-Z]/.test(clave)) {
        //     error.push('<li>Debe incluir al menos una letra</li>');
        // }
        // if (!/[A-Z]/.test(clave)) {
        //     error.push('<li>Debe incluir al menos una mayúscula</li>');
        // }
        // if (!/[a-z]/.test(clave)) {
        //     error.push('<li>Debe incluir al menos una minúscula</li>');
        // }
        // if (!/\d/.test(clave)) {
        //     error.push('<li>Debe incluir al menos un número</li>');
        // }
        // if (!/[-.!?@#$%^&*()_+=\[\]{}\\|;:'",.<>\/?]/.test(clave)) {
        //     error.push('<li>Debe incluir al menos un carácter especial (.-!?@#$%^&*()_+=[]{}\\|;:\'",.<>/?)</li>');
        // }
        if (error.length > 0) {
            $('#err_password').html('<ol>' + error.join('') + '</ol>');
        } else {
            $('#err_password').empty();
        }
    });

    listRoles();
});

$("#name,#email").on("blur", function () {
    if ($("#name").val().length == 0 || $("#email").val().length == 0) {
        $("#btn-guardar").attr("disabled", true);
    } else {
        $("#btn-guardar").attr("disabled", false);
    }
});

function formatterAcciones(value, row, index) {

    var eButton = "";
    var delButton ="";
    var disabled = row.email=='admin@themesbrand.com'?'disabled':'';

    var rol ="--";
    if(row.roles){
        row.roles.forEach(e => {
            rol = e.name
        });
    }    

    if(editar_usuario){
        eButton =  /*html*/
        `
            <button class="btn btn-primary btn-sm edit-tbl mx-1" ${disabled} data-rol="${rol}"  title="Editar" id="editar${row.id}" data-id="${row.id}">
                <i class="fas fa-edit"></i>
            </button>
        `
    }

    if(eliminar_usuario){      
        delButton =  /*html*/
        `
            <button class="btn btn-danger btn-sm delete-tbl mx-1" ${disabled}  title="Eliminar" id="eliminar${row.id}" data-id="${row.id}">
                <i class="fas fa-trash"></i>
            </button>
        `
    }

    var valores = /*html*/
        `
        <div class="d-flex justify-content-center align-items-center">
            ${eButton}
            ${delButton}
        </div>
    `
    return valores;
}

function formatterRole(value, row, index) {

    // console.log(row.roles);
    // Todo evaluar si roles tiene data imprimir el rol
    var rol ="--";
    if(row.roles){
        row.roles.forEach(e => {
            rol = e.name
        });
    }

    return rol;
}

function notiPrereserva(value, row, index) {
    var result="No";
    var tipo = "bg-danger";
    if(row.noti_prereserva==true){
        result="Si";
        tipo = "bg-success";
    }
    var valores = /*html*/
        `<span class="badge ${tipo}">${result}</span>`
    return valores;
}

function notiReserva(value, row, index) {
    var result="No";
    var tipo = "bg-danger";
    if(row.noti_reserva==true){
        result="Si";
        tipo = "bg-success";
    }
    var valores = /*html*/
        `<span class="badge ${tipo}">${result}</span>`
    return valores;
}

function giftcardVer(value, row, index) {
    var result="No";
    var tipo = "bg-danger";
    if(row.giftcard_ver==1){
        result="Si";
        tipo = "bg-success";
    }
    var valores = /*html*/
        `<span class="badge ${tipo}">${result}</span>`
    return valores;
}

function giftcardCrear(value, row, index) {
    var result="No";
    var tipo = "bg-danger";
    if(row.giftcard_crear==1){
        result="Si";
        tipo = "bg-success";
    }
    var valores = /*html*/
        `<span class="badge ${tipo}">${result}</span>`
    return valores;
}

function giftcardAnular(value, row, index) {
    var result="No";
    var tipo = "bg-danger";
    if(row.giftcard_anular==1){
        result="Si";
        tipo = "bg-success";
    }
    var valores = /*html*/
        `<span class="badge ${tipo}">${result}</span>`
    return valores;
}

$("#btn-guardar").on("click", function () {
    if ($("#name").val().length == 0 || $("#email").val().length == 0) {
        $("#btn-guardar").attr("disabled", true);
        Swal.fire({
            title: "¡No se pueden guardar los registros!",
            text: "Los campos NOMBRE, CORREO son obligatorios y no pueden estar vacios y la clave debe tener al menos 6 caracteres",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Advertencia",
        })
    }
    let name = $("#name").val();
    let email = $("#email").val();
    let username = $("#username").val();

    let noti_prereserva = $('input[name = noti_prereserva]:checked').val();
    let noti_reserva = $('input[name = noti_reserva]:checked').val();
    let password = $("#password").val();
    let giftcard_ver  = $('input[name = giftcard_ver]:checked').val();
    let giftcard_crear  = $('input[name = giftcard_crear]:checked').val();
    let giftcard_anular  = $('input[name = giftcard_anular]:checked').val();
    let role = $('#role').val();   

    if ($(".modal-title").html() == "Creación del usuario") {
        metodo = 'POST';
        url = '/usuarios/usuarios';
        id = "";
    } else {
        metodo = 'PUT';
        id = parseInt($(".modal-title").html().replace("Edición del Usuario ID: ", "").trim());
        url = '/usuarios/usuarios/' + id;
    }
    const opcionesFetch = {
        // method: 'POST',
        method: metodo,
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            name: name,
            email: email,
            noti_prereserva: noti_prereserva,
            noti_reserva: noti_reserva,
            password: password,
            giftcard_ver: giftcard_ver,
            giftcard_crear :giftcard_crear,
            giftcard_anular: giftcard_anular,
            role:role,
            username
        })
    };
    $.LoadingOverlay("show");
    fetch(base + url, opcionesFetch)
        .then(response => response.json())
        .then(function (response) {            

            if(response.status==1){
                $("#name").val('');
                $("#email").val('');
                $("#username").val('');
                $('#noti_prereserva_si').prop('checked', true)
                $('#noti_reserva_si').prop('checked', true)
                $("#password").val('');
                $("#btn-guardar").attr("disabled", true);
                $("#btn-cerrar").trigger("click");
                toastr.success(response.mensaje);
                
                $('#usuarios_tbl').bootstrapTable('refresh');

            }else{
                console.log(response);
                toastr.error(response.mensaje);

                if(response.hasOwnProperty('errors')){
                    $("#err_email").html(response.errors.hasOwnProperty('email')?response.errors.email[0]:"" ); //Si existe o no la propiedad
                    $("#err_username").html(response.errors.hasOwnProperty('username')?response.errors.username[0]:"" );
                    $("#err_password").html(response.errors.hasOwnProperty('password')?response.errors.password[0]:"" );      
                }              

            }

            $.LoadingOverlay("hide");

        });
    
});

function guardar() {

    $("#btn-guardar").attr("disabled", true);
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $("#mdl-usuario").hide();
    toastr.success("El registro fué creado exitosamente");
    $('#usuarios_tbl').bootstrapTable('refresh');
}

$("body").on("click", 'button.delete-tbl', function (e) {
    let id = parseInt($(this).attr("id").replace("eliminar", "").trim());
    Swal.fire({
        title: "¿Está seguro que desa eliminar el registro?",
        text: "Una vez realizada esta acción, la misma no podrá ser revertida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#51d28c",
        cancelButtonColor: "#f34e4e",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar"
    }).then(function (result) {
        if (result.value) {
            const opcionesFetch = {
                method: 'DELETE',
                headers: {
                    'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id
                })
            }
            fetch(base + '/usuarios/usuarios/' + id, opcionesFetch)
            .then(response => response.json())
            .then(function (response) {

                if(response.status == 1){
                    $('#usuarios_tbl').bootstrapTable('refresh');
                    toastr.success(response.mensaje);
                }else{
    
                    toastr.success(response.error);
                }

            })
        }
    });
});


$("body").on("click", 'button.edit-tbl', function (e) {
    
    $('#pass_req').hide();
    let id = parseInt($(this).attr("id").replace("editar", "").trim());
    $(".modal-title").html("Edición del Usuario ID: " + id);
    let mddl_cliente = new bootstrap.Modal(document.getElementById('mdl-usuario'), {});

    listRoles($(this).data('rol'));
        
    
    const opcionesFetch = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content')
        },
    }

    $.LoadingOverlay("show");

    fetch(base + '/usuarios/usuarios/' + id , opcionesFetch)
        .then(response => response.json())
        .then(function (response) {

            $("#name").val(response.name);
            $("#email").val(response.email);
            $("#username").val(response.username);
            response.noti_reserva == true ? $('#noti_reserva_si').prop('checked', true) : $('#noti_reserva_no').prop('checked', true)
            response.noti_prereserva == true ? $('#noti_prereserva_si').prop('checked', true) : $('#noti_prereserva_no').prop('checked', true)
            response.giftcard_ver == 1 ? $('#giftcard_ver_si').prop('checked', true) : $('#giftcard_ver_no').prop('checked', true)
            response.giftcard_crear == 1 ? $('#giftcard_crear_si').prop('checked', true) : $('#giftcard_crear_no').prop('checked', true)
            response.giftcard_anular == 1 ? $('#giftcard_anular_si').prop('checked', true) : $('#giftcard_anular_no').prop('checked', true)

            $("#btn-guardar").attr("disabled", false);
        });
        $.LoadingOverlay("hide");

    mddl_cliente.show();

});

function btnAgrCliente() {
    return {
        btnAdd: {
            class: 'success',
            text: 'Crear Cliente',
            icon: 'fas fa-plus-circle',
            event: function () {
                $(".modal-title").html("Creación del usuario");
                $('#mdl-usuario').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#mdl-usuario').modal('show');
                $('#pass_req').show();
            },
            attributes: {
                title: 'Crear Usuario'
            }
        }
    }
}

window.icons = {
    refresh: 'fa-refresh',
    toggleOn: 'fa-toggle-on',
    toggleOff: 'fa-toggle-on',
    columns: 'fa-th-list',
    paginationSwitch: 'fa-toggle-on',
    refresh: 'fa-sync',
    fullscreen: 'fa-arrows-alt',
    export: 'fa-download',
}

$('#mdl-usuario').on('hidden.bs.modal', function () {
    $("#name").val('');
    $("#email").val('');
    $("#username").val('');
    $('#noti_reserva_si').prop('checked', true);
    $('#noti_prereserva_si').prop('checked', true);
    $('#giftcard_ver_si').prop('checked', true);
    $('#giftcard_crear_si').prop('checked', true);
    $('#giftcard_anular_si').prop('checked', true);

    $("#password").val('');
    $("#btn-guardar").attr("disabled", true);
    $(".modal-title").html('');
    $('#err_password').empty();
});

