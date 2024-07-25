function tabla(tabla) {
    // function updateTableOptions(tableId) {
    let buttonsOrder = [];
    buttonsOrder.push('btnAdd');
    buttonsOrder.push('toggle');
    buttonsOrder.push('columns');
    buttonsOrder.push('refresh');
    // $('#'+tableId).bootstrapTable('refreshOptions', {
    // 	buttonsOrder: buttonsOrder
    // })
    // $("[name='btnAdd']").removeClass('btn-secondary');
    $("[name='btnAdd']").addClass('btn-success');
    $('.edit-control').hide();
    $('#agr_categoria').hide();
}

function btnAgregar() {
    return {
        btnAdd: {
            class: 'btn-success',
            text: titulo,
            icon: 'fas fa-plus-circle',
            event: function () {
                switch (act) {
                    case 'categoria':
                        categoria();
                        break;
                    case 'tipos':
                        tipos();
                        break;
                    case 'estados':
                        estados();
                        break;
                    case 'razones':
                        razones();
                        break;
                    case 'comunas':
                        comunas();
                        break;
                    case 'sucursales':
                        sucursales();
                        break;
                    case 'salones':
                        salones();
                        break;
                    case 'mesas':
                        mesas();
                        break;
                    case 'bloqueos':
                        bloqueos();
                        break;
                    case 'configuracion':
                        configuracion();
                        break;

                }
            },
            attributes: {
                title: titulo
            }
        }
    }
}

function categoria() {
    $("#agr_categoria").show();
}

function tipos() {
    $("#agr_tipo").show();
}

function estados() {
    $("#agr_tipo").show();
}

function razones() {
    $("#agr_tipo").show();
}

function comunas() {
    $("#agr_comuna").show();
}

function sucursales() {
    $("#agr_sucursal").show();
}

function salones() {
    $("#agr_salon").show();
}

function mesas() {
    $("#agr_mesa").show();
}

function bloqueos() {
    $("#btn-an").hide();
    $("#clave_usuario_bl").val('');
    $("#fechainicio").val('');
    $('#horainicio').val('');
    $('#fechafin').val('');
    $('#horafin').val('');
    $('#nombrebloqueo').val('');
    $("#blq_res").html('Bloquear Fecha');
    $("#btn-bl").html('Bloquear');
    $("#mdl-bloquear").modal('show');
}

function configuracion() {

    $(".modal-title").html("Creación de configuración");
    $("#mdl-configuracion").modal('show');

}
