mostrar_loader()
$(document).ready(function(){
	$('[aria-label="Exportar datos"]').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
		$("#ex-clave").val(' ');
		$('#mdl-clave').modal('toggle');
	});
	$("#btn-continuar_clv").on('click',function() {
		let clave = $("#ex-clave").val()
		const opcionesFetch0 = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  clave:clave })
		}
		fetch(base+'/reservar/verificarclave',opcionesFetch0)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].respuesta == 0) {
				Swal.fire({
					title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
					text: "Verifíquela y vuelva a intentar",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});

			} else {
				$('#mdl-clave').modal('toggle');
				$("#ex-clave").val(' ');
				$('#reservas_tbl').tableExport({
					type: 'xlsx',
					fileName: moment().format('YYYYMMDD_HHmmss')+'_reservas',
					ignoreColumn: ['archivo_1','archivo_2','actions'],
					exportHiddenCells: true,
				});
			}

		});
	})
    $('#reservas_tbl').bootstrapTable('hideColumn', 'telefono_cliente');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'email_cliente');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'nombre_empresa');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'nombre_hotel');
    // $('#reservas_tbl').bootstrapTable('hideColumn', 'fecha_reserva');
	$('#reservas_tbl').bootstrapTable('hideColumn', 'tsucursal');
	$('#reservas_tbl').bootstrapTable('hideColumn', 'tsalon');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_nombre_adicional');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_pax');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_valor_menu');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_total_sin_propina');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_total_propina');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_email_contacto');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_telefono_contacto');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_anticipo');
	$('#reservas_tbl').bootstrapTable('hideColumn', 'tevento_paga_en_local');
	$('#reservas_tbl').bootstrapTable('hideColumn', 'tevento_audio');
	$('#reservas_tbl').bootstrapTable('hideColumn', 'tevento_video');
	$('#reservas_tbl').bootstrapTable('hideColumn', 'tevento_video_audio');
	$('#reservas_tbl').bootstrapTable('hideColumn', 'tevento_restriccion_alimenticia');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_ubicacion');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_monta');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_detalle_restriccion');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'ambiente');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_comentarios');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_nombre_contacto');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_idioma');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_cristaleria');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_decoracion');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_mesa_soporte_adicional');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_extra_permitido');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_menu_impreso');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_table_tent');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'evento_logo');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'usuario_confirmacion');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'usuario_rechazo');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'fecha_confirmacion');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'fecha_rechazo');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'razon_rechazo');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'razon');
    $('#reservas_tbl').bootstrapTable('hideColumn', 'observacion_cancelacion');
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/reservar/razones',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$('#raz_canc').append('<option value="">Seleccione</option>')
		response.forEach(function(vector) {
			$('#raz_canc').append('<option value="' + vector.id + '">'+vector.razon+'</option>')
		})
	});
	fetch(base+'/reservar/estados',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$('#estado').append('<option value="">Seleccione</option>')
		response.forEach(function(vector) {
			if (vector.id != 4) {
				$('#estado').append('<option value="' + vector.id + '">'+vector.estado+'</option>')
			}
		})
	});
	$("#tipo_reserva").append('<option selected>Seleccione</option>');
	fetch(base+'/reservar/tipos',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$("#tipo_reserva").append('<option value = '+vector.id+'>'+vector.estado+'</option>');
		})
	});
	actualizar();
	$("#ssucursal").append('<option selected disabled>Seleccione</option>');
	fetch(base+'/reservas/reservassucursales',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		response.forEach(function(vector) {
			$("#ssucursal").append('<option value = '+vector.id +'>'+vector.sucursal+'</option>');
		})
	});
	inicio_telefono('telefono');
	inicio_telefono('telefono_contacto');
	// inicio_telefono('ctelefono');
	// $(".loader").hide();
});


$('#tipo_reserva').on("change",function() {	

	if ($("#tipo_reserva option:selected").text()=='EVENTO' || $("#tipo_reserva option:selected").text()=='PRERESERVA' ) {
		$("#pax").val($("#pasajeros").val());
		$("#panel_eventos").css("visibility", "visible");

	} else {
		$("#panel_eventos").css("visibility", "hidden");
	}
});
$("#ssalon").on("change", function() {
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	let sal=$("#ssalon option:selected").val();
	if (sal !== 'Seleccione') {
		fetch(base+'/reservas/salonesmesas/'+sal,opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			$("#smesa").empty();
			$("#smesa").append('<option selected disabled>Seleccione</option>');
			if (response && response.length > 0) {
				response.forEach(function(vector) {
					$("#smesa").append('<option value = '+vector.mesa_id+'>'+vector.mesa+'</option>');
				})
			}
		});
	}
});
function sucursal(salon,mesa) {
	suc=$("#ssucursal option:selected").val();
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/reservas/salonessucursales/'+suc,opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
	$("#ssalon").empty();
	$("#ssalon").append('<option selected disabled>Seleccione</option>');
	$("#smesa").empty();
		response.forEach(function(vector) {
			let sseleccionado = vector.id==salon?' selected ':'';
			$("#ssalon").append('<option value = '+vector.id+sseleccionado+'>'+vector.salon+'</option>');
		})
	});
	let sal = salon?salon:$("#ssalon option:selected").val();
	if (sal > 1) {
		fetch(base+'/reservas/salonesmesas/'+sal,opcionesFetch)
		.then(response => response.json())
		.then(function(response) {
			$("#smesa").empty();
			$("#smesa").append('<option selected disabled>Seleccione</option>');
			if (response && response.length > 0) {
				response.forEach(function(vector) {
					let mseleccionado = vector.mesa_id==mesa?' selected ':'';
					$("#smesa").append('<option value = '+vector.mesa_id+' '+ mseleccionado +'>'+vector.mesa+'</option>');
				})
			}
		});
	}
}
$("#btn-cancelar1").on("click",function() {
	let clave = $("#clave_usuario").val()
	const opcionesFetch0 = {
		method: 'POST',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		body: JSON.stringify({  clave:clave })
	}
	fetch(base+'/reservar/verificarclave',opcionesFetch0)
	.then(response => response.json())
	.then(function(response) {
		if (response[0].respuesta == 0) {
			Swal.fire({
				title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
				text: "Verifíquela y vuelva a intentar",
				icon: "error",
				confirmButtonColor: "#f34e4e",
				confirmButtonText: "Continuar",
			});
		} else {
			let id = $("#can_res").html().substring($("#can_res").html().indexOf(": ")+2).trim();
			let razon = $('#raz_canc option:selected').val();

            if(razon===''){
                $("#raz_canc").focus();

                Swal.fire({
                    title: "LA RAZON DE CANCELACIÓN ES OBLIGATORIA",
                    text: "Debe selecccionar la razon de la cancelación; verifíque y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            }else{
                let obs = $("#obs_canc").val();
                const opcionesFetch1 = {
                    method: 'PUT',
                    headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                    body: JSON.stringify({  id:id,razon_cancelacion:razon,observacion_cancelacion:obs })
                }
                fetch(base+'/reservar/cancelar',opcionesFetch1)
                .then(response => response.json())
                .then(function(response) {
                    $("#clave_usuario").val('');
                    $("#raz_canc").val('');
                    $("#obs_canc").val('');
                    $("#btn-cerrar").trigger("click");
                    toastr.success("La reserva fue cancelada exitosamente");
                    $('#reservas_tbl').bootstrapTable('refresh');
                });
            }


		}

	});
})
$("#btn-rechazar").on("click",function() {
	let clave = $("#clave_usuario-r").val()
	const opcionesFetch0 = {
		method: 'POST',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		body: JSON.stringify({  clave:clave })
	}
	fetch(base+'/reservar/verificarclave',opcionesFetch0)
	.then(response => response.json())
	.then(function(response) {
		if (response[0].respuesta == 0) {
			Swal.fire({
				title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
				text: "Verifíquela y vuelva a intentar",
				icon: "error",
				confirmButtonColor: "#f34e4e",
				confirmButtonText: "Continuar",
			});
		} else {
			let razon = $('#raz_rechazo').val();
			if (razon ==='') {
				Swal.fire({
					title: "LA RAZÓN DEL RECHAZO ES OBLIGATORIA",
					text: "Debe incluir la razón del reachazo; verifíque y vuelva a intentar",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});
			} else {
				let id = $("#rec_res").html().substring($("#rec_res").html().indexOf(": ")+2).trim();
				const opcionesFetch1 = {
					method: 'PUT',
					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
					body: JSON.stringify({  id:id,razon_rechazo:razon })
				}
				fetch(base+'/reservar/rechazar',opcionesFetch1)
				.then(response => response.json())
				.then(function(response) {
					$("#clave_usuario-r").val('');
					$("#raz_rechazo").val('');
					$("#btn-cerrar_r").trigger("click");
					toastr.success("La reserva fue rechazada exitosamente");
					$('#reservas_tbl').bootstrapTable('refresh');
				});
			}
		}

	});
})


$("#btn-cancelar_ns").on("click",function() {
	let clave = $("#clave_usuario_es").val()
	const opcionesFetch0 = {
		method: 'POST',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		body: JSON.stringify({  clave:clave })
	}
	fetch(base+'/reservar/verificarclave',opcionesFetch0)
	.then(response => response.json())
	.then(function(response) {
		if (response[0].respuesta == 0) {
			Swal.fire({
				title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
				text: "Verifíquela y vuelva a intentar",
				icon: "error",
				confirmButtonColor: "#f34e4e",
				confirmButtonText: "Continuar",
			});
		} else {
			let id = $("#nsh_res").html().substring($("#nsh_res").html().indexOf(": ")+2).trim();
			const opcionesFetch1 = {
				method: 'PUT',
				headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				body: JSON.stringify({  id:id,estado:7 })
			}
			fetch(base+'/reservar/cambio_estado',opcionesFetch1)
			.then(response => response.json())
			.then(function(response) {
				$("#clave_usuario").val('');
				$("#btn-cerrar_ns").trigger("click");
				toastr.success("La reserva fue marcada No Show exitosamente");
				$('#reservas_tbl').bootstrapTable('refresh');
			});
		}

	});
})
$("#btn-cancelar_es").on("click",function() {
	let clave = $("#clv").val();
	const opcionesFetch0 = {
		method: 'POST',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		body: JSON.stringify({  clave:clave })
	}
	fetch(base+'/reservar/verificarclave',opcionesFetch0)
	.then(response => response.json())
	.then(function(response) {
		if (response[0].respuesta == 0) {
			Swal.fire({
				title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
				text: "Verifíquela y vuelva a intentar",
				icon: "error",
				confirmButtonColor: "#f34e4e",
				confirmButtonText: "Continuar",
			});
		} else {
			let id = $("#est_res").html().substring($("#est_res").html().indexOf(": ")+2).trim();
			let estado = $("#estado option:selected").val();

            if(estado===''){
                $("#estado").focus();
                Swal.fire({
                    title: "EL ESTADO ES OBLIGATORIO",
                    text: "Debe selecccionar el estado; verifíque y vuelva a intentar",
                    icon: "error",
                    confirmButtonColor: "#f34e4e",
                    confirmButtonText: "Continuar",
                });
            }else{
                const opcionesFetch1 = {
                    method: 'PUT',
                    headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
                    body: JSON.stringify({  id:id,estado:estado })
                }
                fetch(base+'/reservar/cambio_estado',opcionesFetch1)
                .then(response => response.json())
                .then(function(response) {
                    $("#clave_usuario").val('');
                    $("#btn-cerrar_es").trigger("click");
                    toastr.success("El cambio de estado fue realizado exitosamente");
                    $('#reservas_tbl').bootstrapTable('refresh');
                });
            }
		}
	});
})
iconos()
function listarReservasFormatter(value, row, index) {

    let can_edit_reserva = "";
	let visible=[];

    if($(".can-edit-reserva").length){
        can_edit_reserva =  /*html*/
        `<li>
            <a class="dropdown-item editar-reserva" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick='editar(${row.id});'>Editar Reserva</a>
        </li> `
    }


	return [
		`
		<div class="dropdown">
			<a class="btn btn-link text-body shadow-none dropdown-toggle" href="#"
				role="button" data-bs-toggle="dropdown" aria-expanded="false">
				<i class="bx bx-dots-horizontal-rounded"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-end">
				<li><a class="dropdown-item cancelar-reserva" data-bs-target="#mdl-cancelar" data-bs-toggle="modal" onclick='cancelar(this);'>Cancelar Reserva</a></li>
				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-noshow" data-bs-toggle="modal" onclick='noshow(this);'>No Show</a></li>
				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-rechazo" data-bs-toggle="modal" onclick='rechazo(this);'>Rechazar Reserva</a></li>
				<li><a class="dropdown-item noshow-reserva" data-bs-target="#mdl-estado" data-bs-toggle="modal" onclick='estado(this);'>Cambiar Estado</a></li>
				<hr/>
				<li><a class="dropdown-item editar" data-bs-target="#mdl-vreserva" data-bs-toggle="modal" onclick='ver(`+row.id+`);'>Ver Reserva</a></li>
				${can_edit_reserva}
			</ul>
		</div>`
	]
}
$('#mdl-vreserva').on('hidden.bs.modal', function () {
	$('fmenu1').val(null);
	$('fmenu2').val(null);
	$("#fprecuenta").val(null);
	$("#ffactura").val(null);
	$("#fotro").val(null);
	$("#flogo").val(null);
	$("#fecha_reserva").val(null);
	$("#hora_reserva").val(null);
	$("#spago_local").val(null);
	$("#saudio").val(null);
	$("#svideo").val(null);
	$("#svideo_audio").val(null);
	$("#adicional").val(null);
	$("#ubicacion").val(null);
	$("#smenu_impreso").val(null);
	$("#stable_tent").val(null);
	$("#srestriccion").val(null);
	$("#sextra").val(null);
	$("#detalle_restriccion").val(null);
	$("#pasajeros").val(null);
	$("#tipo_reserva").val(null);
	$("#cliente").val().trim(null) ;
	$("#empresa").val().trim(null);
	$("#hotel").val().trim(null);
	$("#telefono").val().trim(null);
	$("#correo").val().trim(null) ;
	$("#ssucursal").val(null);
	$("#ssalon").val(null);
	$("#smesa").val(null);
	$("#observaciones").val().trim(null);
	$("#nombre_adicional").val().trim(null);
	$("#pax").val(null);
	$("#nombre_contacto").val().trim(null);
	$("#telefono_contacto").val().trim(null);
	$("#correo_contacto").val().trim(null);
	$("#idioma").val().trim(null);
	$("#cristaleria").val().trim(null);
	$("#anticipo").val(null);
	$("#valor_menu").val(null);
	$("#total_s_propina").val(null);
	$("#total_c_propina").val(null);
	$("#autoriza").val(null);
	$("#telefono_autoriza").val(null);
	$("#monto_autorizado").val(null);
	$("#decoracion").val(null);
	$("#monta").val(null);
	$("#comentarios").val(null);
	$("#clave").val(' ');
	$("#div_passwd").hide();
	$('fmenu1').hide();
	$('fmenu2').hide();
	$("#fprecuenta").hide();
	$("#ffactura").hide();
	$("#fotro").hide();
	$("#flogo").hide();
	$("#id_reserva").html('');
});
function ver(id) {
	$("#div_passwd").hide();
	$(".requerido").hide();
	$("#tipo").show();
	$("#sucursal").show();
	$("#salon").show();
	$("#mesa").show();
	$("#pago_local").show();
	$("#audio").show();
	$("#video").show();
	$("#video_audio").show();
	$("#adicional").show();
	$("#extra").show();
	$("#menu_impreso").show();
	$("#table_tent").show();
	$("#restriccion").show();
	$("#tipo_reserva").hide();
	$("#ssucursal").hide();
	$("#ssalon").hide();
	$("#smesa").hide();
	$("#spago_local").hide();
	$("#saudio").hide();
	$("#svideo").hide();
	$("#svideo_audio").hide();
	$("#sadicional").hide();
	$("#sextra").hide();
	$("#smenu_impreso").hide();
	$("#stable_tent").hide();
	$("#srestriccion").hide();
	$("#fmenu1").hide();
	$("#fmenu2").hide();
	$("#fprecuenta").hide();
	$("#ffactura").hide();
	$("#flogo").hide();
	$("#fotro").hide();

	$("#fecha_reserva").attr("disabled",true);
	$("#hora_reserva").attr("disabled",true);
	$("#pasajeros").attr("disabled",true);
	$("#cliente").attr("disabled",true);
	$("#empresa").attr("disabled",true);
	$("#hotel").attr("disabled",true);
	$("#telefono").attr("disabled",true);
	$("#correo").attr("disabled",true);
	$("#observaciones").attr("disabled",true);
	$("#nombre_adicional").attr("disabled",true);
	$("#pax").attr("disabled",true);
	$("#nombre_contacto").attr("disabled",true);
	$("#telefono_contacto").attr("disabled",true);
	$("#correo_contacto").attr("disabled",true);
	$("#idioma").attr("disabled",true);
	$("#cristaleria").attr("disabled",true);
	$("#anticipo").attr("disabled",true);
	$("#valor_menu").attr("disabled",true);
	$("#total_s_propina").attr("disabled",true);
	$("#total_c_propina").attr("disabled",true);
	$("#autoriza").attr("disabled",true);
	$("#telefono_autoriza").attr("disabled",true);
	$("#monto_autorizado").attr("disabled",true);
	$("#detalle_restriccion").attr("disabled",true);
	$("#decoracion").attr("disabled",true);
	$("#ubicacion").attr("disabled",true);
	$("#monta").attr("disabled",true);
	$("#comentarios").attr("disabled",true);
	$("#id_reserva").html('Ver Reserva ID: '+id);
	$('a[href="#general"]')[0].click();
	$.ajax({
		url: base+'/reservar/get_reserva/'+id,
		type: 'get',
		dataType: 'json',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		success: function (response) {
			$("#fecha_reserva").val(response[0].fecha_reserva);
			$("#hora_reserva").val(response[0].hora_reserva);
			$("#pasajeros").val(response[0].cantidad_pasajeros);
			$("#tipo").val(response[0].tipo);
			$("#cliente").val(response[0].nombre_cliente);
			$("#empresa").val(response[0].nombre_empresa);
			$("#hotel").val(response[0].nombre_hotel);
			$("#telefono").val(response[0].telefono_cliente);
			$("#correo").val(response[0].email_cliente);
			$("#sucursal").val(response[0].tsucursal);
			$("#salon").val(response[0].tsalon);
			$("#mesa").val(response[0].mesa);
			$("#observaciones").val(response[0].observaciones);
			$("#nombre_adicional").val(response[0].evento_nombre_adicional);
			$("#pax").val(response[0].evento_pax);
			$("#nombre_contacto").val(response[0].evento_nombre_contacto);
			$("#telefono_contacto").val(response[0].evento_telefono_contacto);
			$("#correo_contacto").val(response[0].evento_email_contacto);
			$("#idioma").val(response[0].evento_idioma);
			$("#cristaleria").val(response[0].evento_cristaleria);
			$("#anticipo").val(response[0].evento_anticipo);
			$("#valor_menu").val(response[0].evento_valor_menu);
			$("#total_s_propina").val(response[0].evento_total_sin_propina);
			$("#total_c_propina").val(response[0].evento_total_propina);
			$("#pago_local").val(response[0].tevento_paga_en_local);
			$("#audio").val(response[0].tevento_audio);
			$("#video").val(response[0].tevento_video);
			$("#video_audio").val(response[0].tevento_video_audio);
			$("#adicional").val(response[0].tevento_mesa_soporte_adicional);
			$("#autoriza").val(response[0].autoriza);
			$("#telefono_autoriza").val(response[0].telefono_autoriza);
			$("#monto_autorizado").val(response[0].monto_autorizado);
			$("#menu_impreso").val(response[0].tevento_menu_impreso);
			$("#table_tent").val(response[0].tevento_table_tent);
			$("#restriccion").val(response[0].tevento_restriccion_alimenticia);
			$("#detalle_restriccion").val(response[0].evento_detalle_restriccion);
			$("#decoracion").val(response[0].evento_decoracion); //?
			$("#monta").val(response[0].evento_monta); //?
			$("#ubicacion").val(response[0].evento_ubicacion);
			$("#comentarios").val(response[0].evento_comentarios);
			$("#rsalon").val(response[0].salon);
			$("#rmesa").val(response[0].mesa);
			$("#lnk_menu1").append(imageForm('lnk_menu1',response[0].archivo_1));
			$("#lnk_menu2").append(imageForm('lnk_menu2',response[0].archivo_2));
			$("#lnk_precuenta").append(imageForm('lnk_precuenta',response[0].archivo_3));
			$("#lnk_factura").append(imageForm('lnk_factura',response[0].archivo_4));
			$("#lnk_otro").append(imageForm('lnk_otro',response[0].archivo_5));
			$("#lnk_logo").append(imageForm('lnk_logo',response[0].evento_logo));
		}
	});
	if ($("#tipo option:selected").text()=='EVENTO' || $("#tipo option:selected").text()=='PRERESERVA') {
		$("#pax").val($("#pasajeros").val());
		$("#panel_eventos").css("visibility", "visible");

	}
}
function editar(id) {

	$('#btn_reerva').prop('disabled', false);

	$("#div_passwd").show();
	$(".requerido").show();
	$("#tipo").hide();
	$("#sucursal").hide();
	$("#salon").hide();
	$("#mesa").hide();
	$("#pago_local").hide();
	$("#audio").hide();
	$("#video").hide();
	$("#video_audio").hide();
	$("#adicional").hide();
	$("#extra").hide();
	$("#menu_impreso").hide();
	$("#table_tent").hide();
	$("#restriccion").hide();
	$("#tipo_reserva").show();
	$("#ssucursal").show();
	$("#ssalon").show();
	$("#smesa").show();
	$("#spago_local").show();
	$("#saudio").show();
	$("#svideo").show();
	$("#svideo_audio").show();
	$("#sadicional").show();
	$("#sextra").show();
	$("#smenu_impreso").show();
	$("#stable_tent").show();
	$("#srestriccion").show();
	$("#fmenu1").show();
	$("#fmenu2").show();
	$("#fprecuenta").show();
	$("#ffactura").show();
	$("#flogo").show();
	$("#fotro").show();
	$("#fecha_reserva").attr("disabled",false);
	$("#hora_reserva").attr("disabled",false);
	$("#pasajeros").attr("disabled",false);
	$("#cliente").attr("disabled",false);
	$("#empresa").attr("disabled",false);
	$("#hotel").attr("disabled",false);
	$("#telefono").attr("disabled",false);
	$("#correo").attr("disabled",false);
	$("#observaciones").attr("disabled",false);
	$("#nombre_adicional").attr("disabled",false);
	$("#pax").attr("disabled",false);
	$("#nombre_contacto").attr("disabled",false);
	$("#telefono_contacto").attr("disabled",false);
	$("#correo_contacto").attr("disabled",false);
	$("#idioma").attr("disabled",false);
	$("#cristaleria").attr("disabled",false);
	$("#anticipo").attr("disabled",false);
	$("#valor_menu").attr("disabled",false);
	$("#total_s_propina").attr("disabled",false);
	$("#total_c_propina").attr("disabled",false);
	$("#autoriza").attr("disabled",false);
	$("#telefono_autoriza").attr("disabled",false);
	$("#monto_autorizado").attr("disabled",false);
	$("#detalle_restriccion").attr("disabled",false);
	$("#decoracion").attr("disabled",false);
	$("#ubicacion").attr("disabled",false);
	$("#monta").attr("disabled",false);
	$("#comentarios").attr("disabled",false);
	$("#id_reserva").html('Editar Reserva ID: '+id);
	$('a[href="#general"]')[0].click();
	mostrar_loader();
	$.ajax({
		url: base+'/reservar/get_reserva/'+id,
		type: 'get',
		dataType: 'json',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		success: function (response) {
			$("#fecha_reserva").val(response[0].fecha_reserva);
			$("#hora_reserva").val(response[0].hora_reserva);
			$("#pasajeros").val(response[0].cantidad_pasajeros);
			$("#tipo").val(response[0].tipo_reserva);
			panel(response[0].tipo);
			$("#tipo_reserva").val(response[0].tipo_reserva);
			$("#cliente").val(response[0].nombre_cliente);
			$("#empresa").val(response[0].nombre_empresa);
			$("#hotel").val(response[0].nombre_hotel);
			$("#telefono").val(response[0].telefono_cliente);
			$("#correo").val(response[0].email_cliente);
			$("#ssucursal").val(response[0].sucursal);
			sucursal(response[0].salon,response[0].mesa);
			$("#observaciones").val(response[0].observaciones);
			$("#nombre_adicional").val(response[0].evento_nombre_adicional);
			$("#pax").val(response[0].evento_pax);
			$("#nombre_contacto").val(response[0].evento_nombre_contacto);
			$("#telefono_contacto").val(response[0].evento_telefono_contacto);
			$("#correo_contacto").val(response[0].evento_email_contacto);
			$("#idioma").val(response[0].evento_idioma);
			$("#cristaleria").val(response[0].evento_cristaleria);
			$("#anticipo").val(response[0].evento_anticipo);
			$("#valor_menu").val(response[0].evento_valor_menu);
			$("#total_s_propina").val(response[0].evento_total_sin_propina);
			$("#total_c_propina").val(response[0].evento_total_propina);
			$("#spago_local").val(response[0].evento_paga_en_local);
			$("#saudio").val(response[0].evento_audio);
			$("#svideo").val(response[0].evento_video);
			$("#svideo_audio").val(response[0].evento_video_audio);
			$("#sadicional").val(response[0].evento_mesa_soporte_adicional);
			$("#sextra").val(response[0].evento_extra_permitido)
			$("#autoriza").val(response[0].autoriza);
			$("#telefono_autoriza").val(response[0].telefono_autoriza);
			$("#monto_autorizado").val(response[0].monto_autorizado);
			$("#smenu_impreso").val(response[0].evento_menu_impreso);
			$("#stable_tent").val(response[0].evento_table_tent);
			$("#srestriccion").val(response[0].evento_restriccion_alimenticia);
			$("#detalle_restriccion").val(response[0].evento_detalle_restriccion);
			$("#decoracion").val(response[0].evento_decoracion); //?
			$("#monta").val(response[0].evento_monta); //?
			$("#ubicacion").val(response[0].evento_ubicacion);
			$("#comentarios").val(response[0].evento_comentarios);
			$("#rsalon").val(response[0].salon);
			$("#rmesa").val(response[0].mesa);
			$("#lnk_menu1").append(imageForm('lnk_menu1',response[0].archivo_1));
			$("#lnk_menu2").append(imageForm('lnk_menu2',response[0].archivo_2));
			$("#lnk_precuenta").append(imageForm('lnk_precuenta',response[0].archivo_3));
			$("#lnk_factura").append(imageForm('lnk_factura',response[0].archivo_4));
			$("#lnk_otro").append(imageForm('lnk_otro',response[0].archivo_5));
			$("#lnk_logo").append(imageForm('lnk_logo',response[0].evento_logo));
			arch(JSON.stringify(response[0]))
			if (response[0].tipo=='EVENTO' || response[0].tipo=='PRERESERVA' ) {
				$("#pax").val($("#pasajeros").val());
				$("#panel_eventos").css("visibility", "visible");

			} else {
				$("#panel_eventos").css("visibility", "hidden");
			}
			inicio_telefono('telefono_contacto');
			// ocultar_loader();
		}
	});
	ocultar_loader();
}
function arch(resp) {
	let response= JSON.parse(resp);
	$("#arch1").val(response.archivo_1);
	$("#arch2").val(response.archivo_2);
	$("#arch3").val(response.archivo_3);
	$("#arch4").val(response.archivo_4);
	$("#arch5").val(response.archivo_5);
	$("#arch6").val(response.evento_logo);
}
function ocultar_loader() {
	$(".loader").hide();
}
function mostrar_loader() {
	$(".loader").show();
}
function panel(tipo) {
	if (tipo=='EVENTO' || tipo=='PRERESERVA') {
		$("#pax").val($("#pasajeros").val());
		$("#panel_eventos").css("visibility", "visible");

	} else {
		$("#panel_eventos").css("visibility", "hidden");
	}
}

function obsFormatter(value, row, index) {
    var textObs = "--";

    if (value) {
        textObs = value;

        if(value.length>55){

            var subcadena = value.substring(0, 55);
            textObs = subcadena +"....";
        }
    }

    var data = '<span data-bs-toggle="tooltip" data-bs-placement="top" title="'+value+'" >'+textObs+'</span>';

    return data;


}


// });
function imageForm(anchor,value) {
	///////////////////////////
	let url=null;
	let act = null;
	if (anchor) {
		let miAnchor = $('#'+anchor);
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
		switch(ext) {
			case 'pdf':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png';
				break;
			case 'png':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
				break;
			case 'jpg':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
			break;
			case 'jpeg':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
			break;
			default:
				act=null;
				url='https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png';
				break;
		}
		return '<a href="'+value+'"><img src="'+url+'" height="50px" width="50px"></a>';
	}
}
function imageFormatter(value) {
	///////////////////////////
	let url=null;
	let act = null;
	if (value == null) {
		return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
	} else if (value == "") {
		return '<img src="https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png" height="50px" width="50px">'
	} else {
		let ext = value.substring(value.length - 3);
		switch(ext) {
			case 'pdf':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png';
				break;
			case 'png':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
				break;
			case 'jpg':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
			break;
			case 'jpeg':
				act=1;
				url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
			break;
			default:
				act=null;
				url='https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/4d91dca73fbeb2f3694f15aa32912fde004d5838.png';
				break;
		}
		return '<a href="'+value+'"><img src="'+url+'" height="50px" width="50px"></a>';
	}
}
$('#mdl-cancelar').on('show.bs.modal', function (e) {
	$("#clave_usuario").val('');
	$("#raz_canc").val('');
	$("#obs_canc").val('');
})
$('#mdl-cancelar').on('hide.bs.modal', function (e) {
	$("#clave_usuario").val('');
	$("#raz_canc").val('');
	$("#obs_canc").val('');
})
$('#mdl-cancelar').on('show.bs.modal', function (e) {
	$("#clave_usuario").val('');
	$("#raz_canc").val('');
	$("#obs_canc").val('');
})
$('#mdl-cancelar').on('hide.bs.modal', function (e) {
	$("#clave_usuario").val('');
	$("#raz_canc").val('');
	$("#obs_canc").val('');
})
$('#mdl-estado').on('show.bs.modal', function (e) {
	$("#clv").val('');
	$("#estado").val('');
})
$('#mdl-estado').on('hide.bs.modal', function (e) {
	$("#clv").val('');
	$("#estado").val('');
})
$("#fecha_reserva").on('blur',function() {
	check_reserva();
})
$("#hora_reserva").on('blur',function() {
	check_reserva();
})
$("#btn_reerva").on("click",function() {
	mostrar_loader();
	let valido = validar();
	if (valido) {
		let clave = $("#clave").val()
		const opcionesFetch0 = {
			method: 'POST',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
			body: JSON.stringify({  clave:clave })
		}
		fetch(base+'/reservar/verificarclave',opcionesFetch0)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].respuesta == 0) {
				Swal.fire({
					title: "LA CLAVE INTRODUCIDA ES ERRÓNEA",
					text: "Verifíquela y vuelva a intentar",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});
			} else {
				fecha = $("#fecha_reserva").val();
				hora = $("#hora_reserva").val();
				const opcionesFetch3 = {
					method: 'GET',
					headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
				}
				fetch(base+'/reservar/check_bloqueo/'+fecha+'/'+hora,opcionesFetch3)
				.then(response => response.json())
				.then(function(response) {
					if (response[0].bloqueos > 0) {
						Swal.fire({
							title: "¡BLOQUEO DE FECHA!",
							text: "La fecha y hora seleccionadas presentan bloqueo; por favor seleccione otra fecha/hora",
							icon: "error",
							confirmButtonColor: "#f34e4e",
							confirmButtonText: "Continuar",
						});
					} else {
						/////////////
						let cli = $("#cliente").val().trim();
						const opcionesFetch0 = {
							method: 'POST',
							headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
							body: JSON.stringify({  cliente:cli })
						}
						fetch(base+'/clientes/buscarliente',opcionesFetch0)
						.then(response => response.json())
						.then(function(response) {
							if (response.respuesta == 0) {
								let data = [
									tipo = $("#tipo option:selected").val() != "Seleccione" ? $("#tipo option:selected").val():0,
									cliente = $("#cliente").val(),
									empresa = $("#empresa").val(),
									hotel = $("#hotel").val(),
									telefono = $("#telefono").val(),
									correo = $("#correo").val(),
								];
								const opcionesFetch1 = {
									method: 'POST',
									headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
									body: JSON.stringify({  data:data })
								}
								fetch(base+'/clientes/clientemin',opcionesFetch1)
								.then(response => response.json())
								.then(function(response) {
									if (response[0]['status']==1) {
										toastr.clear();
										toastr.success("reserva actualizada")
										actualizar();
										actualizar_reserva();
									} else {
											toastr.clear();
											let error="";
											if (response[0]['error'].indexOf('clientes_tipo_id_foreign')>-1) {
												error = 'No se ha podido crear el cliente debido a que no indicó el tipo de cliente';
											} else if (response[0]['error'].indexOf('el valor null para la columna «telefono»')>-1){
												error = 'No se ha podido crear el cliente debido a que no indicó el número de teléfono';
											} else {
												error = 'No se ha podido crear el cliente debido a que ocurrió un error';
											}
											toastr.error(error);
									}

								});
							} else {
								$('#btn_reerva').prop('disabled', true);
								actualizar_reserva();
								toastr.success("RESERVA ACTUALIZADA");
							}
						});

					}

				});
			}
			/////////////////////
		});
	} else {
		Swal.fire({
			title: "¡Tiene campos obligatorios por completar!",
			text: "Todos los campos maracados con un * son obligatorios, debe proporcionar la información solicitada",
			icon: "error",
			confirmButtonColor: "#f34e4e",
			confirmButtonText: "Regresr",
		});
	}
	ocultar_loader();
});
$("#ssucursal").on("change",function() {
	sucursal(1);
});
$("#sextra").on("change",function() {
	if ($(this).val() ==1) {
		$("#dvextras").show();
		$("#detalle_restriccion").height(25);
	} else {
		$("#dvextras").hide();
		$("#detalle_restriccion").height(150);
	}
});
function cancelar(res) {
	let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
	$("#can_res").html("Cancelar Reserva ID: "+id);
}
function rechazo(res) {
	let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
	$("#rec_res").html("Rechazar Reserva ID: "+id);
}
function noshow(res) {
	let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
	$("#nsh_res").html("No Show Reserva ID: "+id);
}
function estado(res) {
	let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
	$("#est_res").html("Cambio de estado Reserva ID: "+id);
}
function historial(res) {
	let id = res['parentElement']['parentElement']['parentElement']['parentElement']['parentElement']['children'][0]['textContent'];
	$("#historial_res").html("Historial de cambios reserva ID: "+id);
	$("#historial_tbl").bootstrapTable('refresh', {
    	url: "/reservar/historial_cambios/"+id
     })
}

function horaFormatter(value,row,index){

    let hora = row.hora_reserva;
    let newHora= hora.slice(0, -3);

    return newHora;
}

function previoFormatter(value,row,index) {
	$resp ="";
	if(row.registro_previo !=null && row.registro_previo!='')
	{
		let text=row.registro_previo;
		let link = "<a href='#' onclick='registro("+row.id+")' title='Mostrar Registro Previo' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>"+"<i class='fas fa-eye font-size-16'></i>"+"</a>";
		$resp = text.substring(0, 20) +"... ";
	}
	return $resp;
}
function actualFormatter(value,row,index) {
	$resp ="";
	if(row.registro_actual !=null && row.registro_actual!='')
	{
		let text=row.registro_actual;
		let link = "<a href='#' onclick='registro("+row.id+")' title='Mostrar Registro Actual' class='delete text-dark' data-bs-toggle='modal' data-bs-target='#mdl-registro'>"+"<i class='fas fa-eye font-size-16'></i>"+"</a>";
		$resp = text.substring(0, 20) +"... ";
	}
	return $resp;
}
function registro(id) {
	const opcionesFetch1 = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/reservar/registro_cambio/'+id,opcionesFetch1)
	.then(response => response.json())
	.then(function(response) {
		let res = JSON.parse(response[0]);
		var data = [
			{
				'id':0,
				'fecha_reserva':'fgg',
			}
		]
		$("#registro_tbl").bootstrapTable({data:data});
	});
}
function validar() {
	let valido = true;
	$(".req").each(function(){
		let id=null;
		switch($(this)[0]["tagName"]) {
			case 'INPUT':
				id = $(this)[0]["id"];
				if ($("#"+id).val().length ==0 && $("#"+id).is(':visible')) {
					valido=false;
					$("#err_"+id).html("Campo obligatorio");
				}
			break;
			case 'SELECT':
				id = $(this)[0]["id"];
				if ($("#"+id+" option:selected").val()=="Seleccione" || $("#"+id+" option:selected").val()==undefined) {
					valido=false;
					$("#err_"+id).html("Campo obligatorio");
				}
			break;
		}
	});
	return valido;
}
function cambiar_archivo(etiqueta,anchor,ctl) {
	$("#"+etiqueta).html('')
	let miAnchor = $('#'+anchor);
	let miImagen = miAnchor.find('img');
	if (miImagen.length > 0) {
		miImagen.remove();
	}
	let pdf = $("#"+ctl)[0].files[0].type.indexOf('pdf');
	let jpeg = $("#"+ctl)[0].files[0].type.indexOf('jpeg');
	let jpg = $("#"+ctl)[0].files[0].type.indexOf('jpg');
	let png = $("#"+ctl)[0].files[0].type.indexOf('png');
	if (pdf == -1 && jpeg == -1 && jpg == -1 && png == -1 ) {
		$("#"+ctl).val(null);
		toastr.error("El archivo no ha sido cargado debido a que sólo puede cargar archivos pdf, jpeg, jpg, png; intente de nuevo con un arcivo válido")
	} else {
		if (pdf > -1 ) {
			url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/272a0577357ca4502d5111c5af4228fe22810758.png';
		} else if (jpeg > -1 || jpg > -1 || png > -1 ) {
			url = 'https://dataloggers.nyc3.digitaloceanspaces.com/b94_reservas2/reserva/753821c946a3ac5755c8d9b92907c09318e031ad.png';
		}
		miAnchor.append('<img src="'+url+'" height="50px" width="50px" title="'+$("#"+ctl)[0].files[0].name+'"></img>');
		let nombre=''
		if ($(window).width() > 992) {
			nombre = $("#"+ctl)[0].files[0].name.length >17?$("#"+ctl)[0].files[0].name.substring(0,14)+'...':$("#"+ctl)[0].files[0].name
		} else {
			nombre = $("#"+ctl)[0].files[0].name
		}
		$("#"+etiqueta).html(nombre);
		$("#"+etiqueta).attr('title',$("#"+ctl)[0].files[0].name);
	}
}
$("#fmenu1,#fmenu2,#fprecuenta,#ffactura,#flogo,#fotro").on('change',function() {
	let id = $(this).attr('id');
	switch (id) {
		case 'fmenu1':
			cambiar_archivo("lbl-fmenu1","lnk_menu1",id);
		break;
		case 'fmenu2':
			cambiar_archivo("lbl-fmenu2","lnk_menu2",id);
		break;
		case 'fprecuenta':
			cambiar_archivo("lbl-fprecuenta","lnk_precuenta",id);
		break;
		case 'ffactura':
			cambiar_archivo("lbl-ffactura","lnk_factura",id);
		break;
		case 'flogo':
			cambiar_archivo("lbl-flogo","lnk_logo",id);
		break;
		case 'fotro':
			cambiar_archivo("lbl-fotro","lnk_otro",id);
		break;
	}
})
function actualizar_reserva() {
	$('#btn_reerva').prop('disabled', true);

	const id =  parseInt($("#id_reserva").html().substring($("#id_reserva").html().indexOf('ID: ')+4).trim());
	let dianoche=null;
	let horaInicio= moment($("#hora_reserva").val(),"h:mma");
	var horaFin = moment("4:00pm", "h:mma");
	if (horaInicio.isBefore(horaFin)) {
		dianoche=0;
	} else {
		dianoche=1;
	}
    const formData = new FormData();
    const archivo1 = typeof $("#fmenu1")[0].files[0]==='undefined'?$("#arch1").val():$('#fmenu1')[0].files[0];
    const archivo2 = typeof $('#fmenu2')[0].files[0]==='undefined'?$("#arch2").val():$('#fmenu2')[0].files[0];
    const archivo3 = typeof $("#fprecuenta")[0].files[0]==='undefined'?$("#arch3").val():$("#fprecuenta")[0].files[0];
    const archivo4 = typeof $("#ffactura")[0].files[0]==='undefined'?$("#arch4").val():$("#ffactura")[0].files[0];
    const archivo5 = typeof $("#fotro")[0].files[0]==='undefined'?$("#arch5").val():$("#fotro")[0].files[0];
	const evento_logo = typeof $("#flogo")[0].files[0]==='undefined'?$("#arch6").val():$("#flogo")[0].files[0];
    const fecha_reserva = $("#fecha_reserva").val();
	const hora_reserva = $("#hora_reserva").val();
    const evento_paga_en_local = $("#spago_local option:selected").val()=="Seleccione"?2:$("#spago_local option:selected").val();
    const evento_audio = $("#saudio option:selected").val()=="Seleccione"?2:$("#saudio option:selected").val();
    const evento_video = $("#svideo option:selected").val()=="Seleccione"?2:$("#svideo option:selected").val();
    const evento_video_audio = $("#svideo_audio option:selected").val()=="Seleccione"?2:$("#svideo_audio option:selected").val();
    const evento_mesa_soporte_adicional = $("#adicional option:selected").val()=="Seleccione"?2:$("#sadicional option:selected").val();
    const evento_ubicacion = $("#ubicacion").val();
    const evento_menu_impreso = $("#smenu_impreso option:selected").val()=="Seleccione"?2:$("#smenu_impreso option:selected").val();
    const evento_table_tent = $("#stable_tent option:selected").val()=="Seleccione"?2:$("#stable_tent option:selected").val();
    const evento_restriccion_alimenticia = $("#srestriccion option:selected").val()=="Seleccione"?2:$("#srestriccion option:selected").val();
    const evento_extra_permitido = $("#sextra option:selected").val()=="Seleccione"?2:$("#sextra option:selected").val();
    const evento_detalle_restriccion = $("#detalle_restriccion").val();
    formData.append('id', id);
    formData.append('fecha_reserva', fecha_reserva);
    formData.append('hora_reserva', hora_reserva);
    formData.append('pasajeros', $("#pasajeros").val());
    formData.append('tipo', $("#tipo_reserva option:selected").val());
    formData.append('cliente', $("#cliente").val().trim() );
    formData.append('empresa', $("#empresa").val().trim());
    formData.append('hotel', $("#hotel").val().trim());
    formData.append('telefono', $("#telefono").val().trim());
    formData.append('correo', $("#correo").val().trim());   ;
    formData.append('sucursal', $("#ssucursal option:selected").val());
    formData.append('salon', $("#ssalon option:selected").val());
    formData.append('mesa', $("#smesa option:selected").val());
    formData.append('observaciones', $("#observaciones").val().trim());

    formData.append('evento_nombre_adicional', $("#nombre_adicional").val().trim());
    formData.append('evento_pax', $("#pax").val());
    formData.append('evento_nombre_contacto', $("#nombre_contacto").val().trim());
    formData.append('evento_telefono_contacto', $("#telefono_contacto").val().trim());
    formData.append('evento_correo_contacto', $("#correo_contacto").val().trim());
    formData.append('evento_idioma', $("#idioma").val().trim());
    formData.append('evento_cristaleria', $("#cristaleria").val().trim());
    formData.append('evento_anticipo',$("#anticipo").val());
    formData.append('evento_valor_menu',$("#valor_menu").val());
    formData.append('evento_valor_menu',$("#valor_menu").val());
    formData.append('evento_total_sin_propina',$("#total_s_propina").val());
    formData.append('evento_total_propina',$("#total_c_propina").val());
    formData.append('evento_paga_en_local',evento_paga_en_local);

    formData.append('evento_audio',evento_audio);
    formData.append('evento_video',evento_video);
    formData.append('evento_video_audio',evento_video_audio);
    formData.append('evento_mesa_soporte_adicional',evento_mesa_soporte_adicional);
    formData.append('evento_ubicacion',evento_ubicacion);

    formData.append('evento_menu_impreso',evento_menu_impreso);
    formData.append('evento_table_tent',evento_table_tent);
    formData.append('evento_restriccion_alimenticia',evento_restriccion_alimenticia);
    formData.append('evento_detalle_restriccion',evento_detalle_restriccion);
    formData.append('evento_extra_permitido',evento_extra_permitido);
    formData.append('autoriza',$("#autoriza").val());
    formData.append('telefono_autoriza',$("#telefono_autoriza").val());
    formData.append('monto_autorizado',$("#monto_autorizado").val());

    formData.append('evento_decoracion', $("#decoracion").val());
    formData.append('ambiente', $("#ubicacion").val());
    formData.append('evento_monta', $("#monta").val());
    formData.append('evento_comentarios',$("#comentarios").val());
    formData.append('dianoche', dianoche);

    formData.append('archivo_1', archivo1);
    formData.append('archivo_2',archivo2);
    formData.append('archivo_3', archivo3);
    formData.append('archivo_4',archivo4);
    formData.append('archivo_5',archivo5);
    formData.append('evento_logo',evento_logo);
	const opcionesFetch = {
		method: 'POST',
        headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content')},
		body: formData,
	}
	fetch(base+'/reservar/actualizar',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		if (response[0].status ==0) {
			toastr.error(response[0].error);
		} else {
			$("#frm-general").trigger('reset');
			$("#frm-evento").trigger('reset');
			$("#clave").val(' ');
			$("#panel_eventos").css("visibility", "hidden");
			Swal.fire({
				title: "La reserva ha sido actualizada exitosamente",
				text: "",
				icon: "success",
				confirmButtonColor: "#51d28c",
				confirmButtonText: "Continuar",
			}).then(function (result) {
				$('#mdl-vreserva').modal('toggle');
				$('#reservas_tbl').bootstrapTable('refresh');

				$('#btn_reerva').prop('disabled', false);
			});
		}
	});
 }
function actualizar() {
	const opcionesFetch = {
		method: 'GET',
		headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
	}
	fetch(base+'/clientes/clienteslista',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaClientes").empty();
		response.forEach(function(vector) {
			$("#listaClientes").append('<option value="'+vector.nombre+'">');
		})
	});

	fetch(base+'/clientes/clientesempresas',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaEmpresas").empty();
		response.forEach(function(vector) {
			$("#listaEmpresas").append('<option value="'+vector.empresa+'">');
		})
	});

	fetch(base+'/clientes/clienteshoteles',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaHoteles").empty();
		response.forEach(function(vector) {
			$("#listaHoteles").append('<option value="'+vector.hotel+'">');
		})
	});

	fetch(base+'/clientes/clientestelefonos')
	.then(response => response.json())
	.then(function(response) {
		$("#listaTelefonos").empty();
		response.forEach(function(vector) {
			$("#listaTelefonos").append('<option value="'+vector.telefono+'">');
		})
	});

	fetch(base+'/clientes/clientescorreos',opcionesFetch)
	.then(response => response.json())
	.then(function(response) {
		$("#listaCorreos").empty();
		response.forEach(function(vector) {
			$("#listaCorreos").append('<option value="'+vector.email+'">');
		})
	});
}
function check_reserva() {
	let fecha = $("#fecha_reserva").val();
	let hora = $("#hora_reserva").val();
	if (fecha.length > 0 && hora.length > 0) {
		const opcionesFetch3 = {
			method: 'GET',
			headers: {'X-CSRF-Token': $('meta[name="_token"]').attr('content'),'Content-Type': 'application/json'},
		}
		fetch(base+'/reservar/check_bloqueo/'+fecha+'/'+hora,opcionesFetch3)
		.then(response => response.json())
		.then(function(response) {
			if (response[0].bloqueos > 0) {
				Swal.fire({
					title: "¡BLOQUEO DE FECHA!",
					text: "La fecha y hora seleccionadas presentan bloqueo; por favor seleccione otra fecha/hora",
					icon: "error",
					confirmButtonColor: "#f34e4e",
					confirmButtonText: "Continuar",
				});

			}
		});
	}
}
$('.archivos').on ("click",function(e) {
	e.preventDefault();
	let url = $(this).html().substr(9,$("#lnk_menu1").html().indexOf('<img')-11)
	$('#mdl-documento iframe').attr('src', url);
	$('#mdl-documento').modal('show');
});


//////////////////////////////////
