$(function() {
    let buttonsOrder = [];
    buttonsOrder.push('btnAdd');
    buttonsOrder.push('toggle');
    buttonsOrder.push('columns');
    buttonsOrder.push('refresh');
    $('#roles_tbl').bootstrapTable('refreshOptions', {
        buttonsOrder: buttonsOrder
    })
    $('[name="btnAdd"]').removeClass('btn-secondary');
    $('[name="btnAdd"]').addClass('btn-success');

    tabelInit();
});

function tabelInit(){
    $('#roles_tbl').bootstrapTable('refresh');
}


$("#name").on("blur", function () {
    if ($("#name").val().length == 0) {
        $("#btn-guardar").attr("disabled", true);
    } else {
        $("#btn-guardar").attr("disabled", false);
    }
});


function formatterAcciones(value, row, index) {
    var editar ="";
    var eliminar ="";

    if(editar_roles){
        editar = /*html*/
        `
            <button class="btn btn-primary btn-sm edit-tbl" title="Editar" id="editar${row.id}" data-id="${row.id}" data-name="${row.name}">
                <i class="fas fa-edit"></i>
            </button>
        `
    }

    if(eliminar_roles){
        eliminar = /*html*/
        `

                <button class="btn btn-danger btn-sm delete-tbl" title="Eliminar" id="eliminar${row.id}" data-id="${row.id}">
                    <i class="fas fa-trash"></i>
                </button>

        `
    }
    var valores = /*html*/
    `
        <div class="d-flex justify-content-center align-items-center">
            ${editar}
            ${eliminar}
        </div>
    `
    return valores;
}

$("#btn-guardar").on("click", function () {
    if ($("#name").val().length == 0 ) {
        $("#btn-guardar").attr("disabled", true);
        Swal.fire({
            title: "¡No se pueden guardar los registros!",
            text: "El campos NOMBRE es obligatorio y no pueden estar vacios",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Advertencia",
        })
    }

    let name_rol_back = $("#name_rol_back").val();
    let name = $("#name").val();

    if ($(".modal-title").html() == "Creación de Rol") {
        metodo = 'POST';
        id = "";
        url = '/roles';
    } else {
        metodo = 'PUT';
        id = parseInt($(".modal-title").html().replace("Edición del Rol ID: ", "").trim());
        url = '/roles/'+id;
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
            name_rol_back :name_rol_back,
            name: name
        })
    };
    fetch(base + url, opcionesFetch)
        .then(response => response.json())
        .then(function (response) {

            $("#name_rol_back").val('');
            $("#name").val('');
            $('.modal-backdrop').remove();
            $("#mdl-rol").hide();
            toastr.success("El registro fué creado exitosamente");
            $('#roles_tbl').bootstrapTable('refresh');
        });
});

function guardar() {

    $("#btn-guardar").attr("disabled", true);
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $("#mdl-rol").hide();
    toastr.success("El registro fué creado exitosamente");
    $('#roles_tbl').bootstrapTable('refresh');
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
            fetch(base + '/roles/' + id, opcionesFetch)
                .then(response => response.json())
            $('#roles_tbl').bootstrapTable('refresh');
            toastr.success('El registro ha sido eliminado exitosamente');
        }
    });
});


$("body").on("click", 'button.edit-tbl', function (e) {
    let id = parseInt($(this).attr("id").replace("editar", "").trim());
    $(".modal-title").html("Edición del Rol ID: " + id);
    let mddl_rol = new bootstrap.Modal(document.getElementById('mdl-rol'), {});
    const opcionesFetch = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content')
        },
    }
    fetch(base + '/roles/' + id + '/edit', opcionesFetch)
        .then(response => response.json())
        .then(function (response) {

            $("#name").val(response.name);
            $("#btn-guardar").attr("disabled", false);
        });

    mddl_rol.show();

});

function btnAgrRol() {
    // if(crear_roles){
        return {
            btnAdd: {
                class: 'success',
                text: 'Crear Rol',
                icon: 'fas fa-plus-circle',
                event: function () {
                    $(".modal-title").html("Creación de Rol");
                    $('#mdl-rol').modal({
                        backdrop: 'static',
                        keyboard: false
                    });
                    $('#mdl-rol').modal('show');
                },
                attributes: {
                    title: 'Crear Rol'
                }
            }
        }
    // }else{
    //     return '';
    // }
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

$('#mdl-rol').on('hidden.bs.modal', function () {
    $("#name").val('');
    $("#btn-guardar").attr("disabled", true);
    $(".modal-title").html('');
    $('#password-error').empty();
})
