$.LoadingOverlaySetup({
    background: "rgba(0, 0, 0, 0.5)",
});

$(document).ready(function () {

    // $('#mdl-giftcard-finaliza-compra').modal('show');

    $('#datos_fact').hide();

    let buttonsOrder = [];
    buttonsOrder.push('btnAdd');
    buttonsOrder.push('toggle');
    buttonsOrder.push('columns');
    buttonsOrder.push('refresh');
    $('#giftcard_tbl').bootstrapTable('refreshOptions', {
        buttonsOrder: buttonsOrder
    })
    $('[name="btnAdd"]').removeClass('btn-secondary');
    $('[name="btnAdd"]').addClass('btn-success');
    $('#giftcard_tbl').bootstrapTable('hideColumn', 'credito');
    $('#giftcard_tbl').bootstrapTable('hideColumn', 'forma_pago');
    $('#giftcard_tbl').bootstrapTable('hideColumn', 'factura');
    $('#giftcard_tbl').bootstrapTable('hideColumn', 'telefono');
    $('#giftcard_tbl').bootstrapTable('hideColumn', 'razon_social');
    $('#giftcard_tbl').bootstrapTable('hideColumn', 'giro');
    $('#giftcard_tbl').bootstrapTable('hideColumn', 'direccion');

    const opcionesFetch0 = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
    }
    fetch(base + '/giftcard/auxiliares', opcionesFetch0)
        .then(response => response.json())
        .then(function (response) {
            $('#cestado,#sel_estado').empty();
            $('#sel_estado').append('<option value="" selected >Seleccione</option>')
            $('#cestado').append('<option value="" selected disabled>Seleccione</option>')
            response.estado.forEach(function (vector) {
                $('#cestado,#sel_estado').append('<option value="' + vector.id + '">' + vector.estado + '</option>')
            });

            $('#cestado_pago,#sel_pago').empty();
            $('#sel_pago').append('<option value="" selected >Seleccione</option>')
            $('#cestado_pago').append('<option value="" selected disabled>Seleccione</option>')
            response.estado_pago.forEach(function (vector) {
                if(vector.id!==3 && vector.id!==4){
                    $('#cestado_pago,#sel_pago').append('<option value="' + vector.id + '">' + vector.estado_pago + '</option>')
                }
            });
            $('#ccredito').empty();
            $('#ccredito').append('<option value="" selected disabled>Seleccione</option>')

            response.credito.forEach(function (vector) {
                $('#ccredito').append('<option value="' + vector.id + '">' + vector.credito + '</option>')
            });
            $('#cforma_pago').empty();
            $('#cforma_pago').append('<option value="" selected disabled>Seleccione</option>')

            response.forma_pago.forEach(function (vector) {
                $('#cforma_pago').append('<option value="' + vector.id + '">' + vector.forma_pago + '</option>')
            });
            // response.mesoneros.forEach(function(vector) {
            // 	$('#mesonero').append('<option value="' + vector.id + '">'+vector.mesonero+'</option>')
            // });

        });
    // $('#cfecha_vencimiento').on('blur change', function() {
    // 	let fechaVencimiento = moment($('#cfecha_vencimiento').val());
    // 	let fechaActual = moment();
    // 	if (fechaVencimiento.isSameOrBefore(fechaActual)) {
    // 		Swal.fire({
    // 			title: "Fecha de vencimiento inválida",
    // 			text: "La fecha de vencimiento debe ser mayor a la fecha actual",
    // 			icon: "error",
    // 			confirmButtonColor: "#f34e4e",
    // 			confirmButtonText: "Cerrar",
    // 		});
    // 	}
    // });
    $("#sel_estado,#sel_pago").on("change", function () {
        const opcionesFetch0 = {
            method: 'GET',
            headers: {
                'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
                'Content-Type': 'application/json'
            },
        }
        fetch(base + '/giftcard/filtros/' + ($(this).val() != '' ? +$(this).val() : 0) + '/' + $(this).attr('id'), opcionesFetch0)
            .then(response => response.json())
            .then(function (response) {
                $("#giftcard_tbl").bootstrapTable('load', response);
            });
    });
});
iconos();

$('#ccredito').on('change', function () {

    if($(this).val()==3){
        $('#cforma_pago').val("8");
        $('#cestado_pago').val("2");
        
    }else{
        $('#cforma_pago').val("");
        $('#cestado_pago').val("");
    }
});

function listarReservasFormatter(value, row, index) {
    let visible = [];
    let anul = '';
    let pro_pago ='';
    if (giftcard_anular) {

        if (row.estado_id == 1 || row.estado_id == 5) {
            anul = `<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-anular" data-bs-toggle="modal"  onclick="anular(` + row.id + `);">Anular</a></li>`;
        } else {
            anul = '';
        }
    }
    // Todo modificar esta parte ya qu eno esta tomando la resticción
    if(row.estado_pago_id !== 2 /*&& row.forma_pago_id==4*/ ){// Distinto a pagado
        
        if(row.forma_pago_id !=7){
            pro_pago = //html
            `
                <li><a href="proceso_pago/${row.codigo}" target="_blank" class="dropdown-item proceso_pago">Proceso de pago</a></li>
            `
            
        }
    }

    return [
        `
		<div class="dropdown">
			<a class="btn btn-link text-body shadow-none dropdown-toggle" href="#"
				role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="bx bx-dots-horizontal-rounded"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-end">
                <li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-giftcard-ver" data-bs-toggle="modal" onclick='ver(this);'>Ver</a></li>
                <li><a href="giftcard_check/${row.codigo}" target="_blank" class="dropdown-item ver-qr" onclick='ver(this);'>Ver QR</a></li> ` +
        anul + `
        ${pro_pago}
                <li><a class="dropdown-item envio-email-giftcard-${row.id}" data-bs-target="#mdl-giftcard-envio-email" data-email="${row.email}" data-bs-toggle="modal" onclick='enviar_email(${row.id});'>Enviar Giftcard</a></li>
			</ul>
		</div>`
    ]
}

function anular(id) {
    $("#tit_anular").html('ANULAR GIFTCARD ID ' + id);
};

function diasUsoFormatter(value, row) {
    var dias_uso = "";

    if (value) {

        dias_uso = value;

        if (value.length > 10) {
            var subcadena = value.substring(0, 10);
            dias_uso = subcadena + "....";
        }
    }

    dias_uso = //html
        ` <a href="javascript:void(0)" title="${value}" alt="${value}">${dias_uso}</a>
     `

    return dias_uso;
}


function estadoFormatter(value, row) {

    var data = value;
    if (row.estado_id == 3) {

        data = //html
            `
        <a href="javascript:void(0)" class="edit-estado-${row.id}" data-id="${row.id}" data-estado_id="${row.estado_id}" data-bs-target="#mdl-giftcard-estado" data-bs-toggle="modal" onclick="edit_estado(${row.id})" >${value}</a>
        `
    } else if (row.estado_id == 4) {
        data = //html
            `
        <a href="javascript:void(0)" class="edit-vencido${row.id}" data-id="${row.id}" data-vencido_id="${row.estado_id}" data-bs-target="#mdl-giftcard-vencido" data-bs-toggle="modal" onclick="edit_vencimiento(${row.id})" >${value}</a>
        `
    }

    return data;

}

function edit_estado(id) {
    $("#tit_estado").html('CAMBIAR ESTADO DE GIFTCARD ID ' + id);
    var estado_id = $('.edit-estado-' + id).data('estado_id');
    // listEstadoGift(estado_id)
}

function edit_vencimiento(id) {
    $('#gift_vencimiento_edit').val('');
    $("#tit_vencido").html('CAMBIAR VENCIMIENTO DE GIFTCARD ID ' + id);
    // var estado_id = $('.edit-estado-'+id).data('estado_id');
    // listEstadoGift(estado_id)
}

function enviar_email(id) {

    $('#email_beneficiario').val('');
    $('#otra_cuenta_email').val('');
    $('#err_otro_email').html('');

    let email = $('.envio-email-giftcard-' + id).data('email');
    $("#tit_envio_email").html('ENVIAR EMAIL A BENEFICIARIO DE GIFTCARD ID ' + id);
    $('#email_beneficiario').val(email);

    if ($('#email_beneficiario').val() != "") {
        $('#btn_envio_email_giftcard').removeClass('disabled');
    } else {
        $('#btn_envio_email_giftcard').addClass('disabled');
    }
}

$('#otra_cuenta_email').on('input', function () {

    let email = $('#otra_cuenta_email').val();

    if (email) {
        var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(email)) {
            // Si el formato de correo electrónico no es válido
            $('#err_otro_email').html('El formato de correo electrónico no es válido');

            if ($('#email_beneficiario').val() != "") {

                $('#btn_envio_email_giftcard').removeClass('disabled');

            } else {

                $('#btn_envio_email_giftcard').addClass('disabled');
            }

        } else {

            $('#btn_envio_email_giftcard').removeClass('disabled');

            $('#err_otro_email').html('');
        }
        // $('#btn_envio_email_giftcard').removeClass('disabled');
    } else {

        if ($('#email_beneficiario').val() != "") {

            $('#btn_envio_email_giftcard').removeClass('disabled');

        } else {

            $('#btn_envio_email_giftcard').addClass('disabled');
        }
    }

});

$('#btn_envio_email_giftcard').on('click', function () {

    let id_giftcard = parseInt($("#tit_envio_email").html().replace('ENVIAR EMAIL A BENEFICIARIO DE GIFTCARD ID ', ''));

    let email_beneficiario = $('#email_beneficiario').val();
    let email_otro = $('#otra_cuenta_email').val();

    let data = {
        id: id_giftcard,
        email_beneficiario: email_beneficiario,
        email_otro: email_otro
    }
    const opcionesFetch = {
        method: 'POST',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id_giftcard,
            email_beneficiario: email_beneficiario,
            email_otro: email_otro
        })
    }

    fetch(base + '/giftcard/enviar_email', opcionesFetch)
        .then(response => response.json())
        .then(function (response) {
            if (response.status == 1) {
                $("#btn_cerrar_envio_email").trigger('click');
                toastr.success('Se ha enviado por correo La giftcard seleccionada')
                // refrescar_tabla();
            } else {
                Swal.fire({
                    title: "HA OCURRIDO UN ERROR",
                    text: "Ha ocurrido un error y no se ha podido enviar la giftcard",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Cerrar",
                });
                toastr.error(response.error);
            }
        });

});



$("#btn_estado_giftcard").on('click', function () {

    let gift_estado_id = $('#gift_estado_id').val();

    // alert(gift_estado_id);

    // return;

    let id_giftcard = parseInt($("#tit_estado").html().replace('CAMBIAR ESTADO DE GIFTCARD ID ', ''));

    if (gift_estado_id == "") {
        Swal.fire({
            title: "DEBE SELECCIONAR EL ESTADO",
            text: "El estado un campo obligatorio y debe ser proporcionado",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Cerrar",
        });

    } else {
        const opcionesFetch = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id_giftcard,
                estado_id: gift_estado_id
            })
        }
        fetch(base + '/giftcard/cambiar_estado', opcionesFetch)
            .then(response => response.json())
            .then(function (response) {
                if (response.status == 1) {
                    $("#gift_estado_id").val("");
                    $("#btn_cerrar_estado").trigger('click');
                    toastr.success('La giftcard se ha actualizado satisfactoriamente')
                    refrescar_tabla();
                } else {
                    Swal.fire({
                        title: "HA OCURRIDO UN ERROR",
                        text: "Ha ocurrido un error y no se ha podido actualizar la giftcard",
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Cerrar",
                    });
                    toastr.error(response.error);
                }
            });
    }
});

$('#btn_vencimiento_giftcard').on('click', function () {

    let id_giftcard = parseInt($("#tit_vencido").html().replace('CAMBIAR VENCIMIENTO DE GIFTCARD ID ', ''));

    let gift_vencimiento_edit = $('#gift_vencimiento_edit').val();

    if (gift_vencimiento_edit == "") {
        Swal.fire({
            title: "DEBE SELECCIONAR LOS DIAS DE VENCIMIENTO",
            text: "Los dias de vencimiento un campo obligatorio y debe ser proporcionado",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Cerrar",
        });

    } else {

        const opcionesFetch = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id_giftcard,
                fecha_vencimiento: gift_vencimiento_edit
            })
        }

        fetch(base + '/giftcard/cambiar_vencimiento', opcionesFetch)
            .then(response => response.json())
            .then(function (response) {
                if (response.status == 1) {
                    $("#gift_estado_id").val("");
                    $("#btn_cerrar_vencimiento").trigger('click');
                    $('#gift_vencimiento_edit').val('');
                    toastr.success(response.mensaje)
                    refrescar_tabla();
                } else {
                    Swal.fire({
                        title: "HA OCURRIDO UN ERROR",
                        text: "Ha ocurrido un error y no se ha podido actualizar la giftcard",
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Cerrar",
                    });
                    toastr.error(response.error);
                }
            });

    }





});





$("#btn_anular_giftcard").on('click', function () {
    let clave = $("#clave_anular").val().trim();
    const opcionesFetch0 = {
        method: 'POST',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clave: clave
        })
    }
    fetch(base + '/reservar/verificarclave', opcionesFetch0)
        .then(response => response.json())
        .then(function (response) {
            if (response[0].respuesta == 0) {
                Swal.fire({
                    title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
                    text: "Verifíquela y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Cerrar",
                });

            } else {
                let id_giftcard = parseInt($("#tit_anular").html().replace('ANULAR GIFTCARD ID ', ''));
                // let id_giftcard = $("#id_anular").html();
                let motivo_anulacion = $('#amotivo_anulacion').val().trim();

                // alert($('#amotivo_anulacion').val());

                if (motivo_anulacion.length === 0) {
                    Swal.fire({
                        title: "DEBE INDICAR EL MOTIVO",
                        text: "El motivo de la anulación es un campo obligatorio y debe ser proporcionado",
                        icon: "error",
                        confirmButtonColor: "#f34e4e",
                        confirmButtonText: "Cerrar",
                    });
                } else {
                    const opcionesFetch = {
                        method: 'PUT',
                        headers: {
                            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            id: id_giftcard,
                            motivo_anulacion: motivo_anulacion
                        })
                    }
                    fetch(base + '/giftcard/anular_giftcard', opcionesFetch)
                        .then(response => response.json())
                        .then(function (response) {
                            if (response[0].status == 1) {
                                $("#btn_cerrar_anulacion").trigger('click');
                                $("#estado").html('ANULADA');
                                $("#btn-canjear").removeClass('btn-success');
                                $("#btn-anular").removeClass('btn-danger');
                                $("#btn-canjear").addClass('btn-secondary');
                                $("#btn-anular").addClass('btn-secondary');
                                $("#btn-canjear").attr('disabled', true);
                                $("#btn-anular").attr('disabled', true);
                                toastr.success('La reserva se ha eliminado satisfactoriamente')
                                refrescar_tabla();

                            } else {
                                Swal.fire({
                                    title: "HA OCURRIDO UN ERROR",
                                    text: "Ha ocurrido un error y no se ha podido anular la reserva",
                                    icon: "error",
                                    confirmButtonColor: "#f34e4e",
                                    confirmButtonText: "Cerrar",
                                });
                                toastr.error(response[0].error);
                            }
                        });
                }
            }

        });
})
$('#mdl-anular').on('shown.bs.modal', function () {
    $("#clave_anular").val(' ');
    $("#motivo_anulación").val('');
    $("#btn-canjear").addClass('btn-success');
    $("#btn-anular").addClass('btn-danger');
    $("#btn-canjear").removeClass('btn-secondary');
    $("#btn-anular").removeClass('btn-secondary');
    $("#btn-canjear").attr('disabled', false);
    $("#btn-anular").attr('disabled', false);
});
$('#mdl-anular').on('hide.bs.modal', function () {
    $("#clave_anular").val(' ');
    $("#motivo_anulación").val('');
    $("#tit_anular").html("");
    $("#btn-canjear").addClass('btn-success');
    $("#btn-anular").addClass('btn-danger');
    $("#btn-canjear").removeClass('btn-secondary');
    $("#btn-anular").removeClass('btn-secondary');
    $("#btn-canjear").attr('disabled', false);
    $("#btn-anular").attr('disabled', false);

});

var uuid = uuidv4();
$('#session_id_masivo').val(uuid);

$('#mdl-giftcard-crear').on('shown.bs.modal', function () {
    limpiar_modal(0)
    const opcionesFetch0 = {
        method: 'GET',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-Type': 'application/json'
        },
    }

    var uuid = uuidv4();
    $('#session_id').val(uuid);
    
    fetch(base + '/giftcard/generar_qr', opcionesFetch0)
        .then(response => response.json())
        .then(function (response) {
            var img = new Image();
            img.src = 'data:image/png;base64,' + response.qr;
            $(img).on('load', function () {
                qr(response, 0);
            });
            $('#ccodigo').val(response.codigo);
            $('#cenlace').val(response.url);
        });
});

$('#ctipo_beneficio').on('change', function () {
    var tipo = $(this).val();

    if (tipo == 'MENÚ') {
        $('.adjunto-menu').removeClass('d-none');
    } else {
        $('.adjunto-menu').addClass('d-none');
    }
});



$("#btn-guardar").on('click', function () {


    let valido = validar();
    if (valido) {
        // let dias_uso = {
        //     domingo: $("#domingo").is(":checked"),
        //     lunes: $("#lunes").is(":checked"),
        //     martes: $("#martes").is(":checked"),
        //     miercoles: $("#miercoles").is(":checked"),
        //     jueves : $("#jueves").is(":checked"),
        //     viernes: $("#viernes").is(":checked"),
        //     sabado: $("#sabado").is(":checked"),
        //     domingo: $("#domingo").is(":checked"),
        //     martes: $("#martes").is(":checked"),
        // };
        let dias_uso = {};
        dias_uso["domingo"] = $("#domingo").is(":checked");
        dias_uso["lunes"] = $("#lunes").is(":checked");
        dias_uso["martes"] = $("#martes").is(":checked");
        dias_uso["miercoles"] = $("#miercoles").is(":checked");
        dias_uso["jueves"] = $("#jueves").is(":checked");
        dias_uso["viernes"] = $("#viernes").is(":checked");
        dias_uso["sabado"] = $("#sabado").is(":checked");

        // let data = {
        // 	codigo:$('#ccodigo').val(),
        // 	estado_pago_id:$('#cestado_pago').val(),
        // 	estado_id:$('#cestado').val(),
        // 	credito_id:$('#ccredito').val(),
        // 	forma_pago_id:$('#cforma_pago').val(),
        // 	beneficiario:$('#cbeneficiario').val(),
        // 	email:$('#ccorreo').val(),
        // 	telefono:$('#ctelefono').val(),
        // 	factura:$("#cfactura").is(":checked")?true:false,
        // 	fecha_vencimiento:$('#cfecha_vencimiento').val(),
        // 	dias_uso:dias_uso,
        // 	horario_uso_desde:$('#horario_desde').val(),
        // 	horario_uso_hasta:$('#horario_hasta').val(),
        // 	platos_excluidos:$('#cplatos_excluidos').val(),
        // 	beneficio:$('#cbeneficio').val(),
        // 	tipo_beneficio:$('#ctipo_beneficio').val(),
        // 	num_factura:$('#cnum_factura').val(),
        // 	razon_social:$('#crazon_social').val(),
        // 	rut:$('#crut').val(),
        // 	giro:$('#cgiro').val(),
        // 	direccion:$('#cdireccion').val(),
        // 	fecha_factura:$('#cfecha_factura').val(),
        // 	monto_factura:$('#cmonto_factura').val(),
        //     vendido_por:$('#cvendido_por').val(),
        // };

        let factura = $("#cfactura").is(":checked") ? true : false;

        const formData = new FormData();

        // formData.append('data', data);
        formData.append('codigo', $('#ccodigo').val());
        formData.append('estado_pago_id', $('#cestado_pago').val());
        formData.append('estado_id', $('#cestado').val());
        formData.append('credito_id', $('#ccredito').val());
        formData.append('forma_pago_id', $('#cforma_pago').val());
        formData.append('beneficiario', $('#cbeneficiario').val());

        formData.append('email', $('#ccorreo').val());
        formData.append('telefono', $('#ctelefono').val());
        formData.append('factura', factura);
        formData.append('fecha_vencimiento', $('#cfecha_vencimiento').val());
        formData.append('dias_uso', JSON.stringify(dias_uso));
        formData.append('horario_uso_desde', $('#horario_desde').val());
        formData.append('horario_uso_hasta', $('#horario_hasta').val());
        formData.append('platos_excluidos', $('#cplatos_excluidos').val());
        formData.append('beneficio', $('#cbeneficio').val());
        formData.append('tipo_beneficio', $('#ctipo_beneficio').val());
        // formData.append('num_factura', $('#cnum_factura').val());
        formData.append('num_factura',"");

        formData.append('razon_social', $('#crazon_social').val());
        formData.append('rut', $('#crut').val());
        formData.append('giro', $('#cgiro').val());
        formData.append('direccion', $('#cdireccion').val());
        formData.append('fecha_factura', $('#cfecha_factura').val());
        formData.append('monto_factura', $('#cmonto_factura').val());
        formData.append('vendido_por', $('#cvendido_por').val());
        formData.append('adjunto_menu', $('#cadjunto_menu')[0].files[0]);

        formData.append('nombre_comprador', $('#cnombre_comprador').val());
        formData.append('email_comprador', $('#cemail_comprador').val());
        formData.append('telefono_comprador', $('#ctelefono_comprador').val());
        formData.append('session_id', $('#session_id').val());

        // Si estos campos estan vacios no podemos avanzar para guardar
        if ($('#ctipo_beneficio').val() == "MENÚ") {

            if ($('#cadjunto_menu').val() == "") {
                // alert('aqui falta el aechivo')
                return;
            }
        }

        if ($('#cfactura').is(':checked')) {

            if ($('#crazon_social').val().length == 0 || $('#crut').val().length == 0 || $('#cgiro').val().length == 0 || $('#cdireccion').val().length == 0) {
                return;
            }
        }
        // if ($('#cnum_factura').val().length == 0 || $('#cfecha_factura').val().length == 0 || $('#cmonto_factura').val().length == 0) {
        //     return;
        // }
        if($('#cmonto_factura').val().length == 0){
            return;
        }

        const opcionesFetch0 = {
            method: 'POST',
            // headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
            headers: {
                'X-CSRF-Token': $('meta[name="_token"]').attr('content')
            },
            // body: JSON.stringify({  data:data })
            body: formData,

        }
        $.LoadingOverlay("show");

        fetch(base + '/giftcard/giftcard', opcionesFetch0)
            .then(response => response.json())
            .then(function (response) {
                if (response[0].status == 1) {
                    toastr.success('La giftcard ha sido creada exitosamente');

                    console.log(response[0]);
                    
                    $('#mdl-giftcard-crear').modal('hide');

                    $('#ccredito').val('');
                    $('#cestado_pago').val('');
                    $('#cforma_pago').val('');
                    $('#cvendido_por').val('');
                    $('#cfecha_vencimiento').val('');
                    $('#horario_desde').val('');
                    $('#horario_hasta').val('');
                    $('#ctipo_beneficio').val('');
                    $('#cbeneficio').val('');
                    $('#cdireccion').val('');

                    $('.nombre_ben_fin').html(response[0].data.beneficiario); 
                    $('.monto_ben_fin').html(response[0].data.format_monto); 
                    $('#email_beneficiario_fin_compra').val(response[0].data.email);     
                    $('#id_gift_fin_compra').val(response[0].data.id);      

                    var img = new Image();

                    img.src = 'data:image/png;base64,' + response[0].qr;
                    $(img).on('load', function () {
                        qr(response, 2);
                    });
                    
                    $('#mdl-giftcard-finaliza-compra').modal('show');
                    $.LoadingOverlay("hide");

                    refrescar_tabla();

                } else {
                    $.LoadingOverlay("hide");

                    toastr.error('Ha ocurrido un error al crear la giftcard');
                }
            });
        

    } else {
        Swal.fire({
            title: "FALTAN DATOS",
            text: "Ha dejado en blanco campos requerido; revise e intente de nuevo",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Cerrar",
        });
    }
})
$('#mdl-giftcard-ver').on('shown.bs.modal', function () {
    limpiar_modal(1);
});
$('#mdl-giftcard-ver').on('shown.bs.modal', function () {
    limpiar_modal();
    let id = $("#title_ver").html();
    $.ajax({
        url: '/giftcard/revisar_qr/' + id,
        type: 'GET',
        dataType: 'json',
        headers: {
            'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
            'Content-type': 'image/png'
        },
        success: function (response) {
            var img = new Image();
            img.src = 'data:image/png;base64,' + response.qr;
            $(img).on('load', function () {
                qr(response, 1);
            });
            /****GIFTCARD****/
            $("#enlace").val(response.url);
            $("#codigo").val(response.giftcard[0].codigo);
            $("#estado").val(response.giftcard[0].estado);
            $("#estado_pago").val(response.giftcard[0].estado_pago);
            $("#credito").val(response.giftcard[0].credito);
            $("#forma_pago").val(response.giftcard[0].forma_pago);

            var fecha_creacion = fechaFormatter(response.giftcard[0].fecha_creacion);
            var fecha_vencimiento = fechaFormatter(response.giftcard[0].fecha_vencimiento);
            $("#fecha_creacion").val(fecha_creacion);
            $("#fecha_vencimiento").val(fecha_vencimiento);

            $("#dias_uso").val(response.giftcard[0].dias_uso);
            $("#horario_uso").val(response.giftcard[0].horario_uso);
            /****ECONOMICOS****/
            $("#beneficiario").val(response.giftcard[0].beneficiario);
            $("#correo").val(response.giftcard[0].email);
            $("#telefono").val(response.giftcard[0].telefono);
            $("#factura").val(response.giftcard[0].factura);
            $("#razon_social").val(response.giftcard[0].razon_social);
            $("#rut").val(response.giftcard[0].rut);
            $("#giro").val(response.giftcard[0].giro);
            $("#direccion").val(response.giftcard[0].direccion);
            $("#beneficio").val("$"+ response.giftcard[0].gift_beneficio);
            $("#tipo_beneficio").val(response.giftcard[0].gift_tipo_beneficio);
            $("#platos_excuidos").val(response.giftcard[0].platos_excluidos);
            $("#num_factura").val(response.giftcard[0].num_factura);

            var fecha_factura = fechaFormatter(response.giftcard[0].fecha_factura);
            var fecha_anulacion = fechaFormatter(response.giftcard[0].fecha_anulacion);

            $("#fecha_factura").val(fecha_factura);

            $("#monto_factura").val("$"+ response.giftcard[0].monto_factura);
            $("#creado_por").val(response.giftcard[0].creado_por);
            $("#vendido_por").val(response.giftcard[0].vendido_por);
            $("#mesonero").val(response.giftcard[0].gift_mesonero);
            $("#anulado_por").val(response.giftcard[0].anulado_por);
            $("#fecha_anulacion").val(fecha_anulacion);
            $("#motivo_anulacion").val(response.giftcard[0].motivo_anulacion);

            $("#nombre_comprador").val(response.giftcard[0].nombre_comprador);
            $("#email_comprador").val(response.giftcard[0].email_comprador);
            $("#telefono_comprador").val(response.giftcard[0].telefono_comprador);


            // $("#vendido_por").val(response.giftcard[0].vendido_por);

            if (response.giftcard[0].factura == 'SI') {
                $("#ver_nfac").html('N° Factura');
                $("#ver_ffac").html('Fecha Factura');
                $("#ver_mfac").html('Monto Factura');
                // $('.factura').show();
                $('#ver_datos_fact').show();
            } else {
                $("#ver_nfac").html('N° Boleta<span class="requerido">*</span>');
                $("#ver_ffac").html('Fecha Boleta<span class="requerido">*</span>');
                $("#ver_mfac").html('Monto Boleta<span class="requerido">*</span>');
                // $('.factura').hide();
                $('#ver_datos_fact').hide();
            }
        }
    });
});

function refrescar_tabla() {
    $('#giftcard_tbl').bootstrapTable('refresh');
}


function imageForm(anchor, value) {
    ///////////////////////////
    let url = null;
    let act = null;
    if (anchor) {
        let miAnchor = $('#' + anchor);
        let miImagen = miAnchor.find('img');
        if (miImagen.length > 0) {
            miImagen.remove();
        }
    }
    if (value == null) {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
    } else if (value == "") {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
    } else {
        let ext = value.substring(value.length - 3);
        switch (ext) {
            case 'pdf':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png';
                break;
            case 'png':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            case 'jpg':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            case 'jpeg':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            default:
                act = null;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png';
                break;
        }
        return '<a href="' + value + '"><img src="' + url + '" height="50px" width="50px"></a>';
    }
}

function imageFormatter(value) {
    ///////////////////////////
    let url = null;
    let act = null;
    if (value == null) {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
    } else if (value == "") {
        return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
    } else {
        let ext = value.substring(value.length - 3);
        switch (ext) {
            case 'pdf':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png';
                break;
            case 'png':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            case 'jpg':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            case 'jpeg':
                act = 1;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
                break;
            default:
                act = null;
                url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png';
                break;
        }
        return '<a href="' + value + '"><img src="' + url + '" height="50px" width="50px"></a>';
    }
}

function ver(res) {
    let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
    $("#title_ver").html(id);

}

// function verGiftcard(id){

//     $.ajax({
//         type: "method",
//         url: "url",
//         data: "data",
//         dataType: "dataType",
//         success: function (response) {

//         }
//     });

// }
function previoFormatter(value, row, index) {
    $resp = "";
    if (row.registro_previo != null && row.registro_previo != '') {
        let text = row.registro_previo;
        let link = "<a href='#' onclick='registro(" + row.id + ")' title='Mostrar Registro Previo' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>" + "<i class='fas fa-eye font-size-16'></i>" + "</a>";
        $resp = text.substring(0, 20) + "... ";
    }
    return $resp;
}

function actualFormatter(value, row, index) {
    $resp = "";
    if (row.registro_actual != null && row.registro_actual != '') {
        let text = row.registro_actual;
        let link = "<a href='#' onclick='registro(" + row.id + ")' title='Mostrar Registro Actual' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>" + "<i class='fas fa-eye font-size-16'></i>" + "</a>";
        $resp = text.substring(0, 20) + "... ";
    }
    return $resp;
}
$('#cfactura').on('change', function () {
    if (this.checked) {
        $("#nfac").html('N° Factura');
        $("#ffac").html('Fecha Factura');
        $("#mfac").html('Monto Factura');
        $('.factura').show();
        $('#crazon_social').addClass('req');
        $('#crut').addClass('req');
        $('#cgiro').addClass('req');
        $('#cdireccion').addClass('req');
        $('#datos_fact').show();
    } else {
        $("#nfac").html('N° Boleta<span class="requerido">*</span>');
        $("#ffac").html('Fecha Boleta<span class="requerido">*</span>');
        $("#mfac").html('Monto Boleta<span class="requerido">*</span>');
        $('.factura').hide();
        $('#crazon_social').removeClass('req');
        $('#crut').removeClass('req');
        $('#cgiro').removeClass('req');
        $('#cdireccion').removeClass('req');
        $('#datos_fact').hide();
    }
});

$('#horario_desde, #horario_hasta').on('change blur', function () {
    let horario_desde = moment($('#horario_desde').val(), 'HH:mm');
    let horario_hasta = moment($('#horario_hasta').val(), 'HH:mm');
    if (horario_hasta.isSameOrBefore(horario_desde)) {
        Swal.fire({
            title: "Horario no válido",
            text: "La hora desde deber menor a la hora hasta",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Cerrar",
        });
    }
});

// Pendiente de revisar esta fucionalidad
$('#crut').on('blur change', function () {
    let inputVal = $(this).val();
    let regex = /^[0-9\-kK]{9,10}$/;
    if (!regex.test(inputVal)) {
        $(this).val(inputVal.slice(0, -1));
    }
});
$('#crut').on('input', function () {
    if (Fn.validaRut($("#crut").val())) {
        $('#err_crut').html('');
    } else {
        $('#err_crut').html('El RUT ingresado no es válido');
    }
});

$('#ccorreo').on('blur change', function () {
    let correo = $(this).val();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
        $('#err_ccorreo').html('El correo ingresado no tiene un formato válido');
        $(this).val('');
    } else {
        $('#err_ccorreo').html('');
    }
});
$('#cemail_comprador').on('blur change', function () {
    let correo = $(this).val();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
        $('#err_cemail_comprador').html('El correo ingresado no tiene un formato válido');
        $(this).val('');
    } else {
        $('#err_cemail_comprador').html('');
    }
});

$('#cemail_dte').on('blur change', function () {
    let correo = $(this).val();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correo)) {
        $('#err_cemail_dte').html('El correo ingresado no tiene un formato válido');
        $(this).val('');
    } else {
        $('#err_cemail_dte').html('');
    }
});


let Fn = {
    validaRut: function (rutCompleto) {
        rutCompleto = rutCompleto.replace("‐", "-");
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
            return false;
        let tmp = rutCompleto.split('-');
        let digv = tmp[1];
        let rut = tmp[0];
        if (digv == 'K')
            digv = 'k';
        return (Fn.dv(rut) == digv);
    },
    dv: function (T) {
        let M = 0,
            S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}

function validar() {
    let valido = true;
    let id = null;
    let dias = false;

    let correo = $('#ccorreo').val().trim();
    if (correo.length > 0) {
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(correo)) {
            $('#err_ccorreo').html('El correo ingresado no tiene un formato válido');
            $('#ccorreo').val('');
        } else {
            $('#err_ccorreo').html('');
        }
    }

    // if($('#cadjunto_menu').val()===""){
    //     $("#err_"+id).html("Campo obligatorio");
    // }
    if (Fn.validaRut($("#crut").val())) {
        $('#err_crut').html('');
    } else {
        $('#err_crut').html('El RUT ingresado no es válido');
    }
    let horario_desde = moment($('#horario_desde').val(), 'HH:mm');
    let horario_hasta = moment($('#horario_hasta').val(), 'HH:mm');
    if (horario_hasta.isSameOrBefore(horario_desde)) {
        $('#err_horario_desde').html("La hora desde debe ser menor a la hora hasta");
        $('#err_horario_hasta').html("La hora hasta debe ser mayor a la hora desde");
    } else {
        $('#err_horario_desde').html("");
        $('#err_horario_hasta').html("");
    }
    $('#mdl-giftcard-crear #dias input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            dias = true;
            // return false;
        }
    });

    if (dias) {
        $("#err_dias").html('');
    } else {
        $("#err_dias").html('Debe seleccionar al menos un día');
    }
    $('#mdl-giftcard-crear .req').each(function () {
        id = $(this).prop('id')
        if ($(this).prop('type') === 'select-one' && $("#" + id + " option:selected").text() == "Seleccione") {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'textarea' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
            // } else if ($("#"+id).is(':visible') && $(this).prop('type') ==='checkbox'){
            // 	valido=false;
            // 	$("#err_"+id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'date' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'time' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'text' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'file' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#control").val() === null && $("#" + id).is(':visible') && $("#" + id).val().length == 0) {
            $("#err_" + id).html("Campo obligatorio");
        } else {
            $("#err_" + id).html("");
        }
    });
    return valido;
}

function validarMasivo() {
    let valido = true;
    let id = null;
    let dias = false;
    let nomb_bene = false;

    // let correo = $('#ccorreo').val().trim();
    // if (correo.length > 0) {
    //     let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!regex.test(correo)) {
    //         $('#err_ccorreo').html('El correo ingresado no tiene un formato válido');
    //         $('#ccorreo').val('');
    //     } else {
    //         $('#err_ccorreo').html('');
    //     }
    // }

    if($('#cadjunto_menu').val()===""){
        $("#err_"+id).html("Campo obligatorio");
    }
    if (Fn.validaRut($("#crut").val())) {
        $('#err_crut').html('');
    } else {
        $('#err_crut').html('El RUT ingresado no es válido');
    }
    let horario_desde = moment($('#horario_desde').val(), 'HH:mm');
    let horario_hasta = moment($('#horario_hasta').val(), 'HH:mm');
    if (horario_hasta.isSameOrBefore(horario_desde)) {
        $('#err_horario_desde').html("La hora desde debe ser menor a la hora hasta");
        $('#err_horario_hasta').html("La hora hasta debe ser mayor a la hora desde");
    } else {
        $('#err_horario_desde').html("");
        $('#err_horario_hasta').html("");
    }
    $('#formMasivoGift #dias input[type="checkbox"]').each(function () {
        if ($(this).is(':checked')) {
            dias = true;
            // return false;
        }
    });
    if (dias) {
        $("#err_dias").html('');
    } else {
        $("#err_dias").html('Debe seleccionar al menos un día');
    }

    $("#tablaBeneficiarios .nombre_bene").each(function (index, element) {
        if($(this).val().trim()!=""){
            nomb_bene = true;
        }
    });

    if(nomb_bene){
        $("#err_beneficiario_masivo").html('');
    } else {
        $("#err_beneficiario_masivo").html('Debe agregar al menos un beneficiario');
    }

    //Limpiar

    $(".err_email_beneficiario").html("");

    $('#tablaBeneficiarios .req-2').each(function (index, element) {

        var nombre = $('.nombre_bene').val().trim();
        var correo = $('.email_bene').val().trim();

        if(nombre ==""){

            $(".err_nombre_beneficiario.requerido.mostrar").html("Campo obligatorio");

        }else{
            $(".err_nombre_beneficiario.requerido.mostrar").html("");
        }


        if(correo ==""){

            $(".err_email_beneficiario.requerido.mostar").html("Campo obligatorio");

        }else{

            if (correo.length > 0) {
                let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!regex.test(correo)) {
                    $(".err_email_beneficiario.requerido.mostar").html("El correo ingresado no tiene un formato válido");
                    // valido = false;
                } else {
                    $(".err_email_beneficiario.requerido.mostar").html("");
                    // valido = true;
                }
            }

        }
    });


    $('#formMasivoGift .req').each(function () {
        id = $(this).prop('id')
        if ($(this).prop('type') === 'select-one' && $("#" + id + " option:selected").text() == "Seleccione") {
            $("#err_" + id).html("Campo obligatorio");

        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'textarea' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");


            // } else if ($("#"+id).is(':visible') && $(this).prop('type') ==='checkbox'){
            // 	valido=false;
            // 	$("#err_"+id).html("Campo obligatorio");
        }else if ($("#" + id).is(':visible') && $(this).prop('type') === 'email' && $("#" + id).val().trim() == '') {
                $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'date' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'time' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'text' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#" + id).is(':visible') && $(this).prop('type') === 'file' && $("#" + id).val().trim() == '') {
            $("#err_" + id).html("Campo obligatorio");
        } else if ($("#control").val() === null && $("#" + id).is(':visible') && $("#" + id).val().length == 0) {
            $("#err_" + id).html("Campo obligatorio");
        } else {
            $("#err_" + id).html("");
        }
    });
    return valido;
}

 // let correo = $('#ccorreo').val().trim();
    // if (correo.length > 0) {
    //     let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     if (!regex.test(correo)) {
    //         $('#err_ccorreo').html('El correo ingresado no tiene un formato válido');
    //         $('#ccorreo').val('');
    //     } else {
    //         $('#err_ccorreo').html('');
    //     }
    // }

function limpiar_modal(llamado) {
    switch (llamado) {
        case 0:
            $('#mdl-giftcard-crear input, #mdl-giftcard-ver textarea, #mdl-giftcard-ver select').val('');
            $('#horario_desde').val('00:00');
            $('#horario_hasta').val('23:59');

            $('#mdl-giftcard-crear input[type="checkbox"]').prop('checked', true);
            $('#cfactura').prop('checked', false);
            $('#datos_fact').hide();
            break;
        case 1:
            $('#mdl-giftcard-ver input, #mdl-giftcard-ver textarea, #mdl-giftcard-ver select').val('');
            $('#mdl-giftcard-ver input[type="checkbox"]').prop('checked', false);
            break;
    }
}

function qr(response, llamado) {
    switch (llamado) {
        case 0:
            $('#cimagenQR').attr('src', 'data:image/png;base64,' + response.qr);
            break;
        case 1:
            $('#imagenQR').attr('src', 'data:image/png;base64,' + response.qr);
            break;
        case 2:
            $('#imagenCompraFinQR').attr('src', 'data:image/png;base64,' + response[0].qr);
            break;
    }
    return
}


// Agregar fila al presionar el botón "Agregar Fila"
$(".agregar-fila").on('click', function () {


    var fila = //html
        `
        <tr class="tr">
            <td data-label="Nombre">
                <input type="text" class="form-control nombre_bene req-2"  name="nombre_bene[]" >
                <div class='err_nombre_beneficiario requerido mostrar'></div>
            </td>
            <td data-label="Email">
                <input type="text"  class="form-control email_bene " name="email_bene[]">
                <div class='err_email_beneficiario requerido'></div>
            </td>
            <td data-label="Teléfono">
                <input type="text"  class="form-control telefono_bene" name="telefono_bene[]">
            </td>
            <td data-label="Mensaje">
                <input type="text"  class="form-control mensaje_bene" name="mensaje_bene[]">
            </td>
            <td data-label="Notificar">
                <div class="seccion-notifica-button">
                    <div class="form-check">
                        <input class="form-check-input notifica_ben" type="checkbox" value="" name="notificar[]" >
                    </div>
                </div>
            </td>
            <td data-label="Eliminar">
                <div class="seccion-delete-button">
                    <button type="button" class="btn btn-sm btn-danger delete-button" title="Eliminar">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `
    $('#tablaBeneficiarios tbody').append(fila);
});

// Eliminar fila al presionar el botón "Eliminar"
$('#tablaBeneficiarios').on('click', '.delete-button', function () {
    $(this).closest('tr').remove();
});



$('#tablaBeneficiarios').on('click', '.notifica_ben',  function () {

    validar_email_beneficiario();

});

function validar_email_beneficiario() {

    // Obtener todas las filas de la tabla
    var filas = $('.tr');

    // Recorrer cada fila
    filas.each(function (index, fila) {
        // Obtener la casilla de verificación y el campo de correo electrónico de la fila actual
        var casillaNotificar = $(fila).find('input[name="notificar[]"]');
        var campoEmail = $(fila).find('input[name="email_bene[]"]');
        var messageEmail =  $(fila).find('.err_email_beneficiario');

        var campoNombre = $(fila).find('input[name="nombre_bene[]"]');
        var messageNombre =  $(fila).find('.err_nombre_beneficiario');


        // Verificar si la casilla de verificación está marcada
        if (casillaNotificar.is(':checked')) {
            // Hacer que el campo de correo electrónico sea obligatorio
            // campoEmail.prop('required', true);
            campoEmail.addClass('req-2');
            messageEmail.addClass('mostar');

            // campoNombre.addClass('req-2');
            // messageNombre.addClass('mostar');

        }else{
            // campoEmail.prop('required', false);
            campoEmail.removeClass('req-2');
            messageEmail.removeClass('mostar');

            // campoNombre.removeClass('req-2');
            // messageNombre.removeClass('mostar');
        }
    });
}

// Validar email email_beneficiario_fin_compra


$('#email_beneficiario_fin_compra').on('input', function () {
    
    validaEmail('email_beneficiario_fin_compra');   
});

// $('#email_beneficiario_fin_compra').on('change', function () {
//     validaEmail('email_beneficiario_fin_compra');  
// });

$('#btn_envio_email_giftcard_fin_compra').on('click', function () {    

    if( validaEmail('email_beneficiario_fin_compra')){

        const opcionesFetch = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': $('meta[name="_token"]').attr('content'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: $('#id_gift_fin_compra').val(),
                email_beneficiario: $('#email_beneficiario_fin_compra').val(),
                email_otro: "",
            })
        }
        

        fetch(base + '/giftcard/enviar_email', opcionesFetch)
        .then(response => response.json())
        .then(function (response) {
            if (response.status == 1) {
                $("#btn_cerrar_envio_emai_fc").trigger('click');
                toastr.success('Se ha enviado por correo La giftcard seleccionada')
                // refrescar_tabla();
            } else {
                Swal.fire({
                    title: "HA OCURRIDO UN ERROR",
                    text: "Ha ocurrido un error y no se ha podido enviar la giftcard",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Cerrar",
                });
                toastr.error(response.error);
            }
        });

    }else{
        console.log('Error no puedo continuar, revisar el campo email')
    }
   
});

function validaEmail(email){
    
    let correo = $('#'+email).val();

    if(correo!=""){
        let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(correo)) {
            $('#err_'+email).html('El correo ingresado no tiene un formato válido');    
            return false;   
        } else {
            $('#err_'+email).html('');
            return true;
        }
    }else{
        $('#err_'+email).html('Este campo es obligatorio');  
    }
}


$("#btn-guardar-masivo").on('click', function () {

    // var datos_beneficiario = [];
    var nombre_ben         = []; // Para un array vacío
    var email_ben          = []; // Para un array vacío
    var telefono_ben       = []; // Para un array vacío
    var mensaje_ben        = [] // Para un array vacío
    var notifica_ben       = []; // Para un array vacío


    $('.nombre_bene').each(function() {
        var dato = $(this).val(); // Obtener el valor del input actual
        nombre_ben.push(dato);
    });


    $('.email_bene').each(function() {
        var dato = $(this).val(); // Obtener el valor del input actual
        email_ben.push(dato)
    });


    $('.telefono_bene').each(function() {
        var dato = $(this).val(); // Obtener el valor del input actual
        telefono_ben.push(dato)
    });

    $('.mensaje_bene').each(function() {
        var dato = $(this).val(); // Obtener el valor del input actual
        mensaje_ben.push(dato)
    });

    $('.notifica_ben').each(function() {
        var dato = $(this).is((":checked")) ? true: false; // Obtener el valor del input actual
        notifica_ben.push(dato);
    });



    let valido = validarMasivo();

    if (valido) {

        let dias_uso = {};
        dias_uso["domingo"] = $("#domingo").is(":checked");
        dias_uso["lunes"] = $("#lunes").is(":checked");
        dias_uso["martes"] = $("#martes").is(":checked");
        dias_uso["miercoles"] = $("#miercoles").is(":checked");
        dias_uso["jueves"] = $("#jueves").is(":checked");
        dias_uso["viernes"] = $("#viernes").is(":checked");
        dias_uso["sabado"] = $("#sabado").is(":checked");


        let factura = $("#cfactura").is(":checked") ? true : false;

        const formData = new FormData();

        // formData.append('data', data);
        formData.append('codigo', $('#ccodigo').val());
        formData.append('estado_pago_id', $('#cestado_pago').val());
        // formData.append('estado_id', $('#cestado').val());
        formData.append('credito_id', $('#ccredito').val());
        formData.append('forma_pago_id', $('#cforma_pago').val());
        // formData.append('beneficiario', $('#cbeneficiario').val());

        // formData.append('email', $('#ccorreo').val());
        // formData.append('telefono', $('#ctelefono').val());
        formData.append('factura', factura);
        formData.append('fecha_vencimiento', $('#cfecha_vencimiento').val());
        formData.append('dias_uso', JSON.stringify(dias_uso));
        formData.append('horario_uso_desde', $('#horario_desde').val());
        formData.append('horario_uso_hasta', $('#horario_hasta').val());
        formData.append('platos_excluidos', $('#cplatos_excluidos').val());
        formData.append('beneficio', $('#cbeneficio').val());
        formData.append('tipo_beneficio', $('#ctipo_beneficio').val());
        // formData.append('num_factura', $('#cnum_factura').val());
        formData.append('num_factura', "");

        formData.append('razon_social', $('#crazon_social').val());
        formData.append('rut', $('#crut').val());
        formData.append('giro', $('#cgiro').val());
        formData.append('direccion', $('#cdireccion').val());
        formData.append('email_dte', $('#cemail_dte').val());

        // formData.append('fecha_factura', $('#cfecha_factura').val());
        formData.append('monto_factura', $('#cmonto_factura').val());
        formData.append('vendido_por', $('#cvendido_por').val());
        formData.append('adjunto_menu', $('#cadjunto_menu')[0].files[0]);

        formData.append('nombre_comprador', $('#cnombre_comprador').val());
        formData.append('email_comprador', $('#cemail_comprador').val());
        formData.append('telefono_comprador', $('#ctelefono_comprador').val());
        formData.append('nombre_beneficiario',JSON.stringify(nombre_ben));
        formData.append('email_beneficiario',JSON.stringify(email_ben));
        formData.append('telefono_beneficiario',JSON.stringify(telefono_ben));
        formData.append('mensaje_beneficiario',JSON.stringify(mensaje_ben));
        formData.append('notifica_beneficiario',JSON.stringify(notifica_ben));
        formData.append('session_id_masivo', $('#session_id_masivo').val());

        // Si estos campos estan vacios no podemos avanzar para guardar
        if ($('#ctipo_beneficio').val() == "MENÚ") {

            if ($('#cadjunto_menu').val() == "") {
                // alert('aqui falta el aechivo')
                return;
            }
        }

        if ($('#cfactura').is(':checked')) {

            if ($('#crazon_social').val().length == 0 || $('#crut').val().length == 0 || $('#cgiro').val().length == 0 || $('#cdireccion').val().length == 0 || $('#cemail_dte').val().length == 0  ) {
                return;
            }
        }
        // if ($('#cnum_factura').val().length == 0 || $('#cfecha_factura').val().length == 0 || $('#cmonto_factura').val().length == 0) {
        //     return;
        // }
        if ($('#cmonto_factura').val().length == 0)  {
            return;
        }

        if($("#err_beneficiario_masivo").html()=='Debe agregar al menos un beneficiario'){
            return;
        }

        // Seleccionar todos los campos de entrada a validar
        var campos = $('input.req-2[name="email_bene[]"]');

        // Variable para verificar si hay campos vacíos
        var camposEmailVacios = false;

        // Iterar sobre cada campo de entrada
        campos.each(function() {

            var email = $(this).val().trim();

            // Verificar si el valor del campo está vacío
            if ( email === '') {
                // Establecer la variable de campos vacíos en true
                camposEmailVacios = true;
                // Detener la iteración
                return false;

            }
            else if($(".err_email_beneficiario.requerido.mostar").html()=="El correo ingresado no tiene un formato válido"){
                camposEmailVacios = true;
                // Detener la iteración
                return false;
            }

        });

        // Verificar si hay campos vacíos o con errores
        if (camposEmailVacios) {
            // No continuar con la acción deseada
            console.log('No pasa de aqui');
            return false;
        }

        const opcionesFetch0 = {
            method: 'POST',
            // headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
            headers: {
                'X-CSRF-Token': $('meta[name="_token"]').attr('content')
            },
            // body: JSON.stringify({  data:data })
            body: formData,

        }
        $.LoadingOverlay("show");

        fetch(base + '/giftcard/guardar_masivo', opcionesFetch0)
            .then(response => response.json())
            .then(function (response) {
                if (response[0].status == 1) {
                    toastr.success('La(s) giftcard(S) ha(n) sido creada(s) exitosamente');

                    // $('#mdl-giftcard-crear').modal('hide');

                    // window.location.href = 'https://www.ejemplo.com';

                    $('#ccredito').val('');
                    $('#cestado_pago').val('');
                    $('#cforma_pago').val('');
                    $('#cvendido_por').val('');
                    $('#cfecha_vencimiento').val('');
                    $('#horario_desde').val('');
                    $('#horario_hasta').val('');
                    $('#ctipo_beneficio').val('');
                    $('#cbeneficio').val('');
                    $('#cdireccion').val('');

                    $.LoadingOverlay("hide");

                    setTimeout(function() {
                        window.location.href = base +"/giftcard/giftcard/";
                      }, 3000);

                    // refrescar_tabla();

                } else {
                    $.LoadingOverlay("hide");
                    toastr.error('Ha ocurrido un error al crear la giftcard');
                }
            });
    } else {
        Swal.fire({
            title: "FALTAN DATOS",
            text: "Ha dejado en blanco campos requerido; revise e intente de nuevo",
            icon: "error",
            confirmButtonColor: "#f34e4e",
            confirmButtonText: "Cerrar",
        });
    }
});

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}
