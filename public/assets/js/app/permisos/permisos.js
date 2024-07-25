
$(function() {
    let buttonsOrder = [];
    buttonsOrder.push('btnAdd');
    buttonsOrder.push('toggle');
    buttonsOrder.push('columns');
    buttonsOrder.push('refresh');
    $('#permisos_tbl').bootstrapTable('refreshOptions', {
        buttonsOrder: buttonsOrder
    })
    $('[name="btnAdd"]').removeClass('btn-secondary');
    $('[name="btnAdd"]').addClass('btn-success');

    tabelInit();

});

$("#name").on("blur", function () {
    if ($("#name").val().length == 0 ) {
        $("#btn-guardar").attr("disabled", true);
    } else {
        $("#btn-guardar").attr("disabled", false);
    }
});

function tabelInit(){
    $('#permisos_tbl').bootstrapTable('refresh');
}

function formatterAcciones(value, row, index) {
    // <button class="btn btn-danger btn-sm delete-tbl" title="Eliminar " id="elimina${row.id}" data-id="${row.id}">
    // <i class="fas fa-trash"></i>
    // </button>

    var eButton ="";

    if(editar_permisos){
        var eButton = /*html*/
        `
            <button class="btn btn-primary btn-sm edit-tbl" title="Editar" id="editar${row.id}" data-id="${row.id}">
                <i class="fas fa-edit"></i>
            </button>
        `
    }

    var valores = /*html*/
    `
        <div class="d-flex justify-content-center align-items-center">
            ${eButton}
        </div>
    `
    return valores;
}


$("#btn-guardar").on("click", function () {
    if ($("#name").val().length == 0 ) {
        $("#btn-guardar").attr("disabled", true);
        Swal.fire({
            title: "¡No se pueden guardar los registros!",
            text: "El campos NOMBRE, es obligatorio y no pueden estar vacios",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Advertencia",
        })
    }

    let name = $("#name").val();

    if ($(".modal-title").html() == "Creación del permiso") {
        metodo = 'POST';
        url = '/permisos';
        id = "";
    } else {
        metodo = 'PUT';
        id = parseInt($(".modal-title").html().replace("Edición del Permiso ID: ", "").trim());
        url = '/permisos/' + id;
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
        })
    };
    fetch(base + url, opcionesFetch)
        .then(response => response.json())
        .then(function (response) {

            $("#name").val('');

            $("#btn-guardar").attr("disabled", true);
            $("#btn-cerrar").trigger("click");
            toastr.success("El registro fué creado exitosamente");
            $('#permisos_tbl').bootstrapTable('refresh');
        });
});

function guardar() {

    $("#btn-guardar").attr("disabled", true);
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
    $("#mdl-permiso").hide();
    toastr.success("El registro fué creado exitosamente");
    $('#permisos_tbl').bootstrapTable('refresh');
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
            fetch(base + '/permisos/' + id, opcionesFetch)
                .then(response => response.json())
            $('#permisos_tbl').bootstrapTable('refresh');
            toastr.success('El registro ha sido eliminado exitosamente');
        }
    });
});


$("body").on("click", 'button.edit-tbl', function (e) {
    let id = parseInt($(this).attr("id").replace("editar", "").trim());
    $(".modal-title").html("Edición del Permiso ID: " + id);
    let mddl_cliente = new bootstrap.Modal(document.getElementById('mdl-permiso'), {});
    const opcionesFetch = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content')
        },
    }
    fetch(base + '/permisos/' + id + '/edit', opcionesFetch)
        .then(response => response.json())
        .then(function (response) {

            $("#name").val(response.name);

            $("#btn-guardar").attr("disabled", false);
        });

    mddl_cliente.show();

});

function btnAgrPermiso() {
    return {
        btnAdd: {
            class: 'success',
            text: 'Crear Permiso',
            icon: 'fas fa-plus-circle',
            event: function () {
                $(".modal-title").html("Creación del permiso");
                $('#mdl-permiso').modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $('#mdl-permiso').modal('show');
            },
            attributes: {
                title: 'Crear Permiso'
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

$('#mdl-permiso').on('hidden.bs.modal', function () {
    $("#name").val('');

    $("#btn-guardar").attr("disabled", true);
    $(".modal-title").html('');
    $('#password-error').empty();
})
